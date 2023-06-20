import fs from "fs";
import * as url from "url";
import path from "node:path";
import { stdin } from "node:process";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fileName = "fileToWrite.txt";
const filePath = path.join(__dirname, filesDir, fileName);

const write = async () => {
  stdin.pipe(fs.createWriteStream(filePath));
  stdin.resume();
};

await write();
