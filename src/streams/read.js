import fs from "fs";
import * as url from "url";
import path from "node:path";
import { stdout } from "node:process";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fileName = "fileToRead.txt";
const filePath = path.join(__dirname, filesDir, fileName);

const read = async () => {
  fs.createReadStream(filePath).pipe(stdout);
};

await read();
