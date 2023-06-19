import fs from "fs";
import * as url from "url";
import path from "node:path";
import { filesDir } from "../constants/files.js";
import { ErrorCodes, OPERATION_FAILED } from "../constants/errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fileToRemove = "fileToRemove.txt";
const filePath = path.join(__dirname, filesDir, fileToRemove);

const remove = async () => {
  fs.unlink(filePath, function (err) {
    if (err) {
      if (err.code === ErrorCodes.NoFileOrDirectory) {
        throw new Error(OPERATION_FAILED);
      }
      throw err;
    }
  });
};

await remove();
