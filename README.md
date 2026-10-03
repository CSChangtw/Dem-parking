# 乾拌砂漿粉體緻密堆積模擬（DEM PWA）

水泥、120 級高細爐石粉、F 級飛灰與 ECC 專用石英細砂之粉體緻密堆積模擬工具。
週期邊界 DEM 壓縮—鬆弛法，粉體／砂雙尺度計算，再以 de Larrard CPM 二成分式組合。
全部計算於瀏覽器本機執行，可安裝為 PWA 離線使用。

## 檔案結構（全部置於儲存庫根目錄）

| 檔案 | 用途 |
|---|---|
| index.html | 主程式（單一檔案，內含 DEM 引擎） |
| manifest.webmanifest | PWA 安裝資訊 |
| sw.js | Service Worker（離線快取） |
| icon-192.png、icon-512.png | 應用程式圖示 |
| icon-maskable-192.png、icon-maskable-512.png | Android 自適應圖示 |
| apple-touch-icon.png | iOS 主畫面圖示 |
| favicon.ico、favicon-32.png | 瀏覽器分頁圖示 |

## 部署步驟

1. 於 GitHub 建立新儲存庫（例：`dem-packing`）。
2. 將上述全部檔案上傳至儲存庫根目錄。
3. Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾 `/ (root)`，儲存。
4. 約 1 分鐘後即可由 `https://<帳號>.github.io/dem-packing/` 開啟。
5. 手機開啟後：Android Chrome 選「安裝應用程式」；iOS Safari 選「分享 → 加入主畫面」。

## 更新程式

修改 `index.html` 後，請同時將 `sw.js` 第 3 行之 `VERSION` 遞增（例：`dem-pack-v1.0.1`），
已安裝之使用者開啟時即會出現「已有新版本可使用」提示。

## 注意

本版參數為文獻暫代值，尚未以實際材料試驗校準，成果僅供配比比較與趨勢分析。
