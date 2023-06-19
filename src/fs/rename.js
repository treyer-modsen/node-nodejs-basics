import fs from "fs";
import * as url from "url";
import path from "node:path";
import { filesDir } from "../constants/files.js";
import { ErrorCodes, OPERATION_FAILED } from "../constants/errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fileToRename = "wrongFilename.txt";
const newFileName = "properFilename.md";
const filePath = path.join(__dirname, filesDir, fileToRename);
const newFilePath = path.join(__dirname, filesDir, newFileName);

const rename = async () => {
  fs.access(newFilePath, fs.F_OK, (err) => {
    if (err) {
      fs.rename(filePath, newFilePath, (err) => {
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

await rename();
