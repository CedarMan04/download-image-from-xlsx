# download-image-from-xlsx
TestrailからExportしたExcelファイル内に記述されているURLから画像をダウンロードするサンプルプログラム

## 動作環境
Ubuntu 20.04.4 LTS
Node.js v16.15.1

## 使い方
`node main.mjs sample_test_export.xlsx https://images.unsplash.com/ avif`
`main.mjs`以降の引数はそれぞれ、`"URLを抜き出したいXLSXファイル" "画像が保管されているサイトのURL" "画像の形式"`
