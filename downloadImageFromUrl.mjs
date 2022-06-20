import https from "https";
import fs from "fs";

export const downloadImageFromUrl = (urlList, imageType) => {
    for (const url of urlList) {
      const file = fs.createWriteStream(url.match(/(?<=\.com\/)[^\(\)]+(?=\?)/g) + "." + imageType)
      https.get(url, (response) => {
        response.pipe(file);
      })
      file.on("finish", () => {
        file.close();
      })
    }
  };