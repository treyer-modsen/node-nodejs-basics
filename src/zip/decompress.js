import fs from "fs";
import * as url from "url";
import path from "node:path";
import zlib from "zlib";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const inputFileName = "archive.gz";
const outputFileName = "fileToCompress.txt";
const inputFilePath = path.join(__dirname, filesDir, inputFileName);
const outputFilePath = path.join(__dirname, filesDir, outputFileName);

const decompress = async () => {
  fs.createReadStream(inputFilePath)
    .pipe(zlib.createUnzip())
    .pipe(fs.createWriteStream(outputFilePath));
};

await decompress();
