import fs from "fs";
import * as url from "url";
import path from "node:path";
import { filesDir } from "../constants/files.js";
import { ErrorCodes, OPERATION_FAILED } from "../constants/errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fileToReadName = "fileToRead.txt";
const filePath = path.join(__dirname, filesDir, fileToReadName);

const read = async () => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === ErrorCodes.NoFileOrDirectory) {
        throw new Error(OPERATION_FAILED);
      }
      throw err;
    }
    console.log(data);
  });
};

await read();
