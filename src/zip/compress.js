import fs from "fs";
import * as url from "url";
import path from "node:path";
import zlib from "zlib";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const inputFileName = "fileToCompress.txt";
const outputFileName = "archive.gz";
const inputFilePath = path.join(__dirname, filesDir, inputFileName);
const outputFilePath = path.join(__dirname, filesDir, outputFileName);

const compress = async () => {
  fs.createReadStream(inputFilePath)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(outputFilePath));
};

await compress();
