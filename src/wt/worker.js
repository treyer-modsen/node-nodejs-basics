import { parentPort, workerData } from "worker_threads";

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  parentPort.once("message", ({ port }) => {
    port.postMessage(nthFibonacci(workerData.value));
    port.close();
  });
};

sendResult();
