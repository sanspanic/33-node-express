const fs = require("fs");
const process = require("process");
const axios = require("axios");

const fileName = process.argv[2];

function read(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) {
      // handle possible error
      console.error(err);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    return data;
  });
}

const data = await read(fileName);
console.log(data);
