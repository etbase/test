# KK 音標視覺改版：本機 Cursor 交接包

把整個 `KK_Studio_Handoff` 資料夾複製到 Cursor 已開啟的專案根目錄。然後開啟 Cursor Agent，貼上 `CURSOR_完整指令.md` 全文。

## 內容
- `CURSOR_完整指令.md`：專為本機測試專案撰寫的整合指令
- `assets/phonemes/`：5 組 SVG 靜態視覺與 4 秒循環動畫概念樣本
- `reference/prototype.html/css/js`：先前原型圖表的設計參考，非可直接替換的正式程式碼
- `reference/HOME_LAYOUT_SPEC.md`、`ANIMATION_PLAN.md`：資訊架構與動畫策略

## 限制
- 素材是簡化口型/舌位示意，**不是經語音學專家驗證的發音動作**。
- 示例只包含 5 個音，並非全套音標動畫。
- prototype 是版面概念，不是正式專案碼；原型表格和內容需要按原專案資料核對。
- 須透過 Cursor 在本機專案內整合，並測試功能後才能部署。
