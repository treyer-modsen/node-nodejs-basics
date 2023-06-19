import fs from "fs";
import * as url from "url";
import path from "node:path";
import { ErrorCodes, OPERATION_FAILED } from "../constants/errors.js";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fileName = "fresh.txt";
const filePath = path.join(__dirname, filesDir, fileName);
const fileContent = "I am fresh and young";

const create = async () => {
  fs.open(filePath, "wx", (err, fd) => {
    if (err) {
      if (err.code === ErrorCodes.FileExists) {
        throw new Error(OPERATION_FAILED);
      }
      throw err;
    }

    try {
      fs.writeFile(fd, fileContent, (err) => {
        if (err) {
          throw err;
        }
      });
    } finally {
      fs.close(fd, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  });
};

await create();
