# KK 音標互動學習

靜態網站，含三層頁面、41 個音標的音檔、口型與舌位圖片，以及練習短句和繁體中文翻譯。沒有外部套件或建置步驟。

網站就是這個網址：

https://etbase.github.io/kk-phonetic-learning/

首頁是 `index.html`。倉庫根目錄的 `.nojekyll` 讓 GitHub Pages 直接打開學習頁，不會把這份 README 當成網站首頁。

## 在本機預覽

安裝 Node.js 後，在專案根目錄執行：

```bash
npm run dev
```

再開啟 http://localhost:8000。不需執行 `npm install`。

也可以直接開啟 `index.html`。請保留 `assets` 資料夾的位置。音標音檔與圖片隨專案附上。例字和短句在產生固定音檔之前，仍使用瀏覽器或作業系統的美式英語語音。

## 固定美式語音

單字與短句使用同一套 Azure Neural 語音：`en-US-JennyNeural`。金鑰只放在本機環境變數，不要寫進 JavaScript，也不要提交到 GitHub。

```bash
export AZURE_SPEECH_KEY="你的金鑰"
export AZURE_SPEECH_REGION="eastus"
npm run speech
```

腳本會把 182 個例字寫入 `assets/words/`，820 句寫入 `assets/phrases/`，並把 `speech-manifest.js` 標成可用。完成後，網站改播這些 mp3，不再使用裝置語音。免費層約每分鐘 20 次，整批大約需要一小時；中斷後再執行會略過已完成的檔案。

音標仍播放 `assets/phonemes/` 裡的現有音檔。標準美式錄音請依 `data.js` 的 `phonemeSlug` 命名，例如 `ih.mp3`、`ae.mp3`、`th-unvoiced.mp3`，放進同一資料夾後再替換對照表。

## 主要檔案

- `index.html`：網頁入口與載入順序。
- `styles.css`：版面與樣式。
- `app.js`：三層頁面、播放和互動邏輯。
- `data.js`、`word-kk.js`、`phrases-v2.js`、`translations.js`：音標、例字、練習短句與中文翻譯。
- `assets/`：圖片和音檔。
- `side-manifest.js`：本機直接開啟時也能顯示側面圖；`side-manifest.json` 是原始對照表。
- `speech-manifest.js`：例字與短句的固定音檔是否已經備妥。
- `tools/synthesize.mjs`：用本機的 Azure 金鑰產生例字與短句音檔。
