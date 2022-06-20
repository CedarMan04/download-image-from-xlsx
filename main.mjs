// TestrailからExportしたExcelシートに記述されている
// 画像のURL（を想定した文字列）を読み取り、ダウンロードするプログラム
import xlsx from "xlsx";
import { downloadImageFromUrl } from "./downloadImageFromUrl.mjs";

// Excelファイル／シート／データ記載範囲の取得
// 本サンプルでは"sample_test_export.xlsx"
const excelFileName = process.argv[2];
const book = xlsx.readFile(excelFileName);
const sheet = book.Sheets[book.SheetNames[0]];
const range = xlsx.utils.decode_range(sheet["!ref"]);

// 画像が保管されているサイトのURL
// 本サンプルでは"https://images.unsplash.com/"
const siteOfImage = process.argv[3];
let fullUrlList = [];

const imageType = process.argv[4];

for (let row = range.s.r; row <= range.e.r; row++) {
  for (let col = range.s.c; col <= range.e.c; col++) {
    const address = xlsx.utils.encode_cell({ r: row, c: col });
    const cell = sheet[address];

    if (cell) {
      const cellValue = cell.w;
      if (cellValue.match(/(?<=\!\[\]\()[^\(\)]+(?=\))/g)) {
        // ![](　)で括られたURLを抽出
        const linksInsideBracket = cellValue.match(
          /(?<=\!\[\]\()[^\(\)]+(?=\))/g
        );

        for (const link of linksInsideBracket) {
          fullUrlList.push(siteOfImage + link);
        }
      }
    }
  }
}

// 完成形のURLリストと画像の形式を渡すと、画像をDL
// 本サンプルでは"avif"
downloadImageFromUrl(fullUrlList, imageType);
