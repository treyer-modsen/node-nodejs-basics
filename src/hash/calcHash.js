import fs from "fs";
import * as url from "url";
import path from "node:path";
import crypto from "crypto";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fileName = "fileToCalculateHashFor.txt";
const filePath = path.join(__dirname, filesDir, fileName);

const calculateHash = async () => {
  const hash = crypto.createHash("sha256");
  const fb = fs.readFileSync(filePath);
  hash.update(fb);
  const hex = hash.digest("hex");
  console.log(hex);
};

await calculateHash();
