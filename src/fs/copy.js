import fs from "fs";
import * as url from "url";
import path from "node:path";
import { filesDir, filesCopyDir } from "../constants/files.js";
import { ErrorCodes, OPERATION_FAILED } from "../constants/errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const dirPath = path.join(__dirname, filesDir);
const copyDirPath = path.join(__dirname, filesCopyDir);

const copy = async () => {
  fs.access(copyDirPath, fs.F_OK, (err) => {
    if (err) {
      fs.cp(dirPath, copyDirPath, { recursive: true }, (err) => {
        if (err) {
          if (err.code === ErrorCodes.NoFileOrDirectory) {
            throw new Error(OPERATION_FAILED);
          }
          throw err;
        }
      });
    } else {
      throw new Error(OPERATION_FAILED);
    }
  });
};

await copy();
