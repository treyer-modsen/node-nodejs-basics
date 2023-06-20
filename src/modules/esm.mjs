import path from "node:path";
import fs from "fs";
import * as url from "url";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);
const fileAPath = path.join(__dirname, "/files/a.json");
const fileSPath = path.join(__dirname, "/files/b.json");

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = JSON.parse(fs.readFileSync(fileAPath));
} else {
  unknownObject = JSON.parse(fs.readFileSync(fileSPath));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export default { unknownObject, myServer };
