import { Transform } from "stream";
import { stdin, stdout } from "node:process";

const transform = async () => {
  const reverseText = new Transform({
    transform(chunk, _encoding, callback) {
      callback(null, chunk.reverse().toString("utf-8"));
    },
  });

  stdin.pipe(reverseText).pipe(stdout);
};

await transform();
