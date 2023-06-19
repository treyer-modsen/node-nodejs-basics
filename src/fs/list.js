import fs from "fs";
import * as url from "url";
import path from "node:path";
import { ErrorCodes, OPERATION_FAILED } from "../constants/errors.js";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const dirPath = path.join(__dirname, filesDir);

const list = async () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      if (err.code === ErrorCodes.NoFileOrDirectory) {
        throw new Error(OPERATION_FAILED);
      }
      throw err;
    }
    console.log(files.map((file) => String(file)));
  });
};

await list();
