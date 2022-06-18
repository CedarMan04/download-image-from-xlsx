// TestrailからExportしたExcelシートに記述されている
// 画像のURL（を想定した文字列）を読み取り、ダウンロードするプログラム
import xlsx from "xlsx";
import { downloadImageFromUrl } from "./downloadImageFromUrl.mjs";

// Excelファイル／シート／データ記載範囲の取得
const book = xlsx.readFile("sample_test_export.xlsx");
const sheet = book.Sheets[book.SheetNames[0]];
const range = xlsx.utils.decode_range(sheet["!ref"]);

const siteOfImage = "https://images.unsplash.com/";
let fullUrlList = [];

for (let row = range.s.r; row <= range.e.r; row++) {
  for (let col = range.s.c; col <= range.e.c; col++) {
    const address = xlsx.utils.encode_cell({ r: row, c: col });
    const cell = sheet[address];

    if (cell) {
      const cellValue = cell.w;
      if (cellValue.match(/(?<=\[\]\!\()[^\(\)]+(?=\))/g)) {
        const linksInsideBracket = cellValue.match(
          /(?<=\[\]\!\()[^\(\)]+(?=\))/g
        );

        for (const link of linksInsideBracket) {
          fullUrlList.push(siteOfImage + link);
        }
      }
    }
  }
}

downloadImageFromUrl(fullUrlList);
