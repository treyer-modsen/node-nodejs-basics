const parseArgs = () => {
  console.log(
    process.argv
      .reduce((res, el, index, arr) => {
        if (el.startsWith("--") && arr[index + 1]) {
          res.push(`${el.slice(2)} is ${arr[index + 1]}`);
        }
        return res;
      }, [])
      .join(", ")
  );
};

parseArgs();
