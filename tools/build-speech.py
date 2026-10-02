"""Build fixed American English mp3s with local Piper and Kokoro models."""

import json
import re
import subprocess
import wave
from pathlib import Path

import numpy as np
import soundfile as sf
from piper import PiperVoice
from piper.config import SynthesisConfig

ROOT = Path(__file__).resolve().parents[1]
MODELS = ROOT / "voice-models"
PHONEME_RAW = {
    "i": "ˈiː",
    "ɪ": "ˈɪ",
    "e": "ˈeɪ",
    "ɛ": "ˈɛ",
    "æ": "ˈæ",
    "ə": "əˑ",
    "ʌ": "ˈʌ",
    "u": "ˈuː",
    "ʊ": "ˈʊ",
    "o": "ˈoʊ",
    "ɔ": "ˈɔː",
    "ɑ": "ˈɑː",
    "ɚ": "ɚ",
    "ɝ": "ˈɜː",
    "aɪ": "ˈaɪ",
    "aʊ": "ˈaʊ",
    "ɔɪ": "ˈɔɪ",
    "p": "p",
    "b": "b",
    "t": "t",
    "d": "d",
    "k": "k",
    "g": "ɡ",
    "f": "fː",
    "v": "vː",
    "θ": "θː",
    "ð": "ðː",
    "s": "sː",
    "z": "zː",
    "ʃ": "ʃː",
    "ʒ": "ʒː",
    "tʃ": "tʃ",
    "dʒ": "dʒ",
    "h": "h",
    "m": "mː",
    "n": "nː",
    "ŋ": "ŋː",
    "l": "lː",
    "r": "ɹː",
    "w": "w",
    "j": "j",
}


def load_site():
    extractor = r"""
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source = readFileSync('data.js','utf8') + '\n' + readFileSync('phrases-v2.js','utf8');
const sandbox = {};
vm.createContext(sandbox);
const site = vm.runInContext(source + '\n;({phonemeManifest, phonemeSlug, practiceWords, positionWords, practicePhrases})', sandbox);
process.stdout.write(JSON.stringify(site));
"""
    result = subprocess.run(
        ["node", "--input-type=module", "-e", extractor],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def prepare(audio, sample_rate):
    audio = np.asarray(audio, dtype=np.float32).reshape(-1)
    loud = np.flatnonzero(np.abs(audio) > 0.015)
    if len(loud) == 0:
        raise RuntimeError("合成結果是靜音")
    pad = int(sample_rate * 0.03)
    clip = audio[max(0, loud[0] - pad) : min(len(audio), loud[-1] + pad)]
    peak = float(np.max(np.abs(clip)))
    clip = clip / peak * 0.92
    lead = np.zeros(int(sample_rate * 0.06), dtype=np.float32)
    tail = np.zeros(int(sample_rate * 0.08), dtype=np.float32)
    return np.concatenate([lead, clip, tail])


def write_mp3(audio, sample_rate, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    wav_path = path.with_suffix(".wav")
    pcm = np.clip(audio, -1, 1)
    pcm = (pcm * 32767).astype(np.int16)
    with wave.open(str(wav_path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        wav.writeframes(pcm.tobytes())
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(wav_path), "-codec:a", "libmp3lame", "-qscale:a", "4", str(path)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    wav_path.unlink()


def piper_audio(voice, text, config):
    chunks = list(voice.synthesize(text, syn_config=config))
    audio = np.concatenate([chunk.audio_float_array for chunk in chunks])
    return audio, chunks[0].sample_rate


def main():
    site = load_site()
    missing = [sym for sym in site["phonemeManifest"] if sym not in PHONEME_RAW]
    extra = [sym for sym in PHONEME_RAW if sym not in site["phonemeManifest"]]
    if missing or extra:
        raise SystemExit(f"音標對照不一致 missing={missing} extra={extra}")

    piper = PiperVoice.load(str(MODELS / "en_US-lessac-high.onnx"))
    phoneme_config = SynthesisConfig(length_scale=1.05, normalize_audio=True)
    word_config = SynthesisConfig(normalize_audio=True)
    id_map = piper.config.phoneme_id_map
    for sym, raw in PHONEME_RAW.items():
        unknown = [ch for ch in raw if ch not in id_map]
        if unknown:
            raise SystemExit(f"{sym} 含有 Piper 不認得的音素 {unknown}")

    print("音標")
    for sym, raw in PHONEME_RAW.items():
        audio, sample_rate = piper_audio(piper, "[[" + raw + "]]", phoneme_config)
        destination = ROOT / site["phonemeManifest"][sym]
        write_mp3(prepare(audio, sample_rate), sample_rate, destination)
        print(sym, destination.name)

    words = {}
    for listings in site["practiceWords"].values():
        for word in listings:
            words.setdefault(word.lower(), word)
    for listings in site["positionWords"].values():
        for word in listings:
            if word:
                words.setdefault(word.lower(), word)
    print("例字", len(words))
    for index, (name, text) in enumerate(sorted(words.items()), start=1):
        if not re.fullmatch(r"[a-z]+", name):
            raise SystemExit(f"例字檔名無法使用：{name}")
        audio, sample_rate = piper_audio(piper, text, word_config)
        write_mp3(prepare(audio, sample_rate), sample_rate, ROOT / "assets" / "words" / f"{name}.mp3")
        if index % 25 == 0 or index == len(words):
            print(f"例字 {index}/{len(words)}")

    from kokoro_onnx import Kokoro

    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    phrase_total = sum(len(items) for items in site["practicePhrases"].values())
    done = 0
    print("短句", phrase_total)
    for sym, phrases in site["practicePhrases"].items():
        slug = site["phonemeSlug"].get(sym)
        if not slug or len(phrases) != 20:
            raise SystemExit(f"{sym} 短句數量或檔名有問題")
        for index, phrase in enumerate(phrases, start=1):
            text = phrase.replace("[", "").replace("]", "").strip()
            if not text:
                raise SystemExit(f"{sym} 第 {index} 句是空的")
            samples, sample_rate = kokoro.create(text, voice="af_heart", speed=1.0, lang="en-us")
            destination = ROOT / "assets" / "phrases" / slug / f"{index:02d}.mp3"
            write_mp3(prepare(samples, sample_rate), sample_rate, destination)
            done += 1
            if done % 25 == 0 or done == phrase_total:
                print(f"短句 {done}/{phrase_total}")
    print("完成")


if __name__ == "__main__":
    main()
