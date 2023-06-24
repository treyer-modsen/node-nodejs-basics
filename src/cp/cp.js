import { fork } from "child_process";
import * as url from "url";
import path from "path";
import { filesDir } from "../constants/files.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const scriptFileName = "script.js";
const scriptPath = path.join(__dirname, filesDir, scriptFileName);

const spawnChildProcess = async (args) => {
  fork(scriptPath, args);
};

spawnChildProcess(["a", "b", "c", "d", 1, 2, 3, 4]);
