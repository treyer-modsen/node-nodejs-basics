import * as url from "url";
import path from "node:path";
import os from "os";
import { Worker, MessageChannel } from "node:worker_threads";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const workerFileName = "worker.js";
const workerPath = path.join(__dirname, workerFileName);

const startingNumber = 10;

const performCalculations = async () => {
  const coresCount = os.cpus().length;

  const result = [];
  let resolvedCount = 0;

  for (let i = 0; i < coresCount; i++) {
    const { port1, port2 } = new MessageChannel();

    const worker = new Worker(workerPath, {
      workerData: {
        value: startingNumber + i,
        index: i,
      },
    });
    worker.postMessage({ port: port1 }, [port1]);

    port2.on("message", (value) => {
      result[i] = { status: "resolved", data: value };
      resolvedCount++;
    });
    worker.on("error", () => {
      result[i] = { status: "error", data: null };
      resolvedCount++;
    });
    worker.on("exit", () => {
      if (resolvedCount === coresCount) console.log(result);
    });
  }
};

await performCalculations();
