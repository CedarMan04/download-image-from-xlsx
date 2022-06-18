import https from "https";
import fs from "fs";

export const downloadImageFromUrl = (urlList) => {
    for (const url of urlList) {
      const file = fs.createWriteStream(url.match(/(?<=\.com\/)[^\(\)]+(?=\?)/g) + ".avif")
      https.get(url, (response) => {
        response.pipe(file);
      })
      file.on("finish", () => {
        file.close();
      })
    }
  };