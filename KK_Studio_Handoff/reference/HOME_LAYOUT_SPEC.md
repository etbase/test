# 首頁總表排版建議

## 核心目標
首頁不是只有「查表」，而是同時做到：
- 一眼看懂音標分類
- 看起來高級、乾淨、像教育型設計網站
- 點擊任一音標即可進入 detail page
- 不破壞手機閱讀體驗

## 風格方向（參考 BUNKITSU 的精神，不直接複製）
- 大量留白
- 柔和低飽和色塊
- 標題有編輯設計感
- 圖文分區乾淨
- 圓角卡片與細線邊框
- 適度插圖，但以資訊可讀性優先

## 首頁結構
### 1. Hero 區
- 標題：KK Phonetic Learning / KK 音標互動學習
- 副標：透過圖表、口型與短動畫快速理解發音
- 小功能：
  - KK / IPA 顯示切換
  - 搜尋音標或例字
  - 篩選：母音 / 子音 / 半母音

### 2. 母音區 Vowels
建議不要只平鋪長條表，而是以**前中後 + 高中低**的學習邏輯整理。

#### 2-1 單母音 Monophthongs
- Front：i, ɪ, e, ɛ, æ
- Central：ə, ʌ, ɚ / ɝ
- Back：u, ʊ, o, ɔ, ɑ

做法：
- 左側列出 Front / Central / Back
- 上方用 High / Mid / Low 或 Closed / Mid / Open 輔助
- 每個 cell 顯示：
  - 大字：KK
  - 小字：IPA
  - 點擊後進 detail

#### 2-2 雙母音 Diphthongs
- aʊ, aɪ, ɔɪ
- 單獨做一列卡片，視覺上和單母音區分

### 3. 半母音 Semi-vowels
- j, w
- 可用兩張大卡處理，不必做成很重的表格

### 4. 子音區 Consonants
建議比你現在的表更標準、也更好學：

- 欄：發音部位 Place of Articulation
  - Bilabial
  - Labiodental
  - Dental / Interdental
  - Alveolar
  - Postalveolar / Palatal
  - Velar
  - Glottal

- 列：發音方式 Manner of Articulation
  - Stops
  - Affricates
  - Fricatives
  - Nasals
  - Liquids / Approximants

並在每個格子裡把清濁成對放在一起，例如：
- bilabial stop: p / b
- alveolar stop: t / d
- velar stop: k / g
- affricate: tʃ / dʒ
- fricative: f / v、θ / ð、s / z、ʃ / ʒ、h
- nasal: m / n / ŋ
- liquids & approximants: l / r / j / w

## Detail page（發音教室）建議結構
### A. Header
- 返回總表
- 當前分類 breadcrumbs
- 音標大字

### B. 主內容兩欄（桌機）
左欄：
- 口型插圖
- 舌位示意圖
- 3–5 秒動畫

右欄：
- KK / IPA
- 中文 / 英文說明
- 發音技巧重點（舌頭、嘴型、聲帶是否震動）
- 例字 3–5 個
- 播放按鈕

### C. 底部學習區
- 常見混淆音比較
- 下一個 / 上一個音標
- 小測驗入口

## 手機版
- 總表允許橫向捲動，但要有固定標題欄或 sticky label
- 點入 detail 後改為上下堆疊：
  1. 音標標題
  2. 圖片
  3. 動畫
  4. 解說
  5. 例字

