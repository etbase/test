import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const voice = process.env.AZURE_SPEECH_VOICE || 'en-US-JennyNeural';
const outputFormat = 'audio-24khz-160kbitrate-mono-mp3';
const checkOnly = process.argv.includes('--check');
const force = process.argv.includes('--force');

function loadSite() {
  const sandbox = {};
  vm.createContext(sandbox);
  const source = ['data.js', 'phrases-v2.js'].map(name => readFileSync(resolve(root, name), 'utf8')).join('\n');
  return vm.runInContext(`${source}\n;({vowels, consonants, phonemeSlug, practiceWords, positionWords, practicePhrases})`, sandbox, { filename: 'site-data.js' });
}

function plainPhrase(phrase) {
  return phrase.replace(/[\[\]]/g, '');
}

function escapeXml(text) {
  return text.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[ch]));
}

function collect(site) {
  const symbols = [...site.vowels, ...site.consonants].map(row => row[0]);
  const missingSlug = symbols.filter(sym => !site.phonemeSlug[sym]);
  const slugValues = Object.values(site.phonemeSlug);
  const duplicateSlugs = slugValues.filter((slug, index) => slugValues.indexOf(slug) !== index);
  const words = new Map();
  for (const list of Object.values(site.practiceWords)) {
    for (const word of list) words.set(word.toLowerCase(), word);
  }
  for (const list of Object.values(site.positionWords)) {
    for (const word of list) if (word) words.set(word.toLowerCase(), word);
  }
  const badWords = [...words.keys()].filter(name => !/^[a-z]+$/.test(name));
  const phraseJobs = [];
  const phraseErrors = [];
  for (const sym of symbols) {
    const phrases = site.practicePhrases[sym];
    const slug = site.phonemeSlug[sym];
    if (!phrases) phraseErrors.push(`${sym} 沒有練習短句`);
    if (!slug) continue;
    if (!phrases) continue;
    if (phrases.length !== 20) phraseErrors.push(`${sym} 有 ${phrases.length} 句，預期 20 句`);
    phrases.forEach((phrase, index) => {
      const text = plainPhrase(phrase).trim();
      if (!text) phraseErrors.push(`${sym} 第 ${index + 1} 句是空的`);
      phraseJobs.push({
        sym,
        text,
        file: resolve(root, 'assets/phrases', slug, String(index + 1).padStart(2, '0') + '.mp3')
      });
    });
  }
  const wordJobs = [...words.entries()].map(([name, text]) => ({
    text,
    file: resolve(root, 'assets/words', name + '.mp3')
  }));
  return { symbols, missingSlug, duplicateSlugs, badWords, phraseErrors, wordJobs, phraseJobs };
}

function report(inventory) {
  const problems = [
    ...inventory.missingSlug.map(sym => `缺少音標檔名：${sym}`),
    ...inventory.duplicateSlugs.map(slug => `音標檔名重複：${slug}`),
    ...inventory.badWords.map(word => `例字檔名含非英文字母：${word}`),
    ...inventory.phraseErrors
  ];
  console.log(`音標 ${inventory.symbols.length} 個，例字 ${inventory.wordJobs.length} 個，短句 ${inventory.phraseJobs.length} 句`);
  if (problems.length) {
    for (const problem of problems) console.error(problem);
    process.exit(1);
  }
}

function ssml(text, rate) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
  <voice name="${escapeXml(voice)}">
    <prosody rate="${rate}">${escapeXml(text)}</prosody>
  </voice>
</speak>`;
}

async function sleep(ms) {
  await new Promise(resolveSleep => setTimeout(resolveSleep, ms));
}

async function synthesize(text, rate, file, key, region) {
  const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  let pause = 3000;
  for (let attempt = 1; attempt <= 6; attempt++) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': outputFormat,
        'User-Agent': 'kk-phonetic-learning'
      },
      body: ssml(text, rate)
    });
    if (response.status === 429 || response.status >= 500) {
      const retryAfter = Number(response.headers.get('retry-after'));
      await sleep((Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : pause / 1000) * 1000);
      pause *= 2;
      continue;
    }
    if (!response.ok) {
      const detail = (await response.text()).replaceAll(key, '[redacted]').slice(0, 300);
      throw new Error(`Azure ${response.status} ${detail}`);
    }
    const audio = Buffer.from(await response.arrayBuffer());
    if (audio.length < 1000 || !(audio.subarray(0, 3).toString() === 'ID3' || audio[0] === 0xff)) {
      throw new Error(`音檔內容無效：${file}`);
    }
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, audio);
    return;
  }
  throw new Error('Azure 忙碌，重試後仍無法合成');
}

const inventory = collect(loadSite());
report(inventory);
if (checkOnly) process.exit(0);

const key = (process.env.AZURE_SPEECH_KEY || '').trim();
const region = (process.env.AZURE_SPEECH_REGION || '').trim();
if (!key || !region) {
  console.error('請先設定 AZURE_SPEECH_KEY 與 AZURE_SPEECH_REGION。金鑰只留在本機環境變數，不要寫進檔案或提交到 GitHub。');
  process.exit(1);
}

const interval = Number(process.env.AZURE_SPEECH_INTERVAL_MS || 3200);
const jobs = [
  ...inventory.wordJobs.map(job => ({ ...job, rate: '90%', label: job.text })),
  ...inventory.phraseJobs.map(job => ({ ...job, rate: '100%', label: `${job.sym} ${job.text}` }))
];
let lastCall = 0;
let created = 0;
for (let index = 0; index < jobs.length; index++) {
  const job = jobs[index];
  if (!force && existsSync(job.file)) {
    console.log(`${index + 1}/${jobs.length} 略過 ${job.label}`);
    continue;
  }
  const wait = lastCall + interval - Date.now();
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();
  await synthesize(job.text, job.rate, job.file, key, region);
  created += 1;
  console.log(`${index + 1}/${jobs.length} ${job.label}`);
}

const missing = jobs.filter(job => !existsSync(job.file));
if (missing.length) {
  console.error(`還有 ${missing.length} 個音檔未完成，網站會繼續使用裝置語音。`);
  process.exit(1);
}

const manifest = { ready: true, voice, words: inventory.wordJobs.length, phrases: inventory.phraseJobs.length };
writeFileSync(resolve(root, 'speech-manifest.js'), `window.__SPEECH_MANIFEST__=${JSON.stringify(manifest)};\n`);
console.log(`完成。新合成 ${created} 個音檔，語音為 ${voice}。`);
