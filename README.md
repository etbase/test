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

也可以直接開啟 `index.html`。請保留 `assets` 資料夾的位置。單音音檔與圖片隨專案附上；例字和短句的朗讀使用瀏覽器或作業系統的美式英語語音，音色會因裝置而異。

## 主要檔案

- `index.html`：網頁入口與載入順序。
- `styles.css`：版面與樣式。
- `app.js`：三層頁面、播放和互動邏輯。
- `data.js`、`word-kk.js`、`phrases-v2.js`、`translations.js`：音標、例字、練習短句與中文翻譯。
- `assets/`：圖片和音檔。
- `side-manifest.js`：本機直接開啟時也能顯示側面圖；`side-manifest.json` 是原始對照表。
