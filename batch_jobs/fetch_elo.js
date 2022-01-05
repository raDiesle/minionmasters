const fetch = require("node-fetch");

const http = require("http");
const fs = require("fs");

const download = (url, path) =>
  new Promise((resolve, reject) => {
    http.get(url, (response) => {
      const statusCode = response.statusCode;

      if (statusCode !== 200) {
        return reject("Download error!");
      }
      let body = '';
      response.on('data', function (chunk) {
        body = body + chunk;
      });

      const writeStream = fs.createWriteStream(path);
      response.pipe(writeStream);

      writeStream.on("error", (err ) => {
        console.error("Error writing to file!" + err.message);
        reject("Error writing to file!")
      });
      writeStream.on("finish", () => {
        writeStream.close(() => resolve(JSON.parse(body)));
      });

      response.on('end', function() {
        console.log("single download finished");
      });
    });
  }).catch((err) => console.error(err));

const TARGET_FOLDER = "./batch_jobs/elo";


const totalResults = [];
let currentResults = null;
const limitStep = 100000;
let limitStart = 0;
let count = 0;
// http://fdmfdm.nl/EloChecker.html
console.log("start downloading");
(function loop() {
  if (currentResults === null || currentResults.length !== 0) {
    const url = `http://fdmfdm.nl/GetAllUserElo.php?limitStart=${limitStart}&limitStep=${limitStep}`;
    console.log(url);
    console.log(`Fetching count : ${count} totalResults: ${totalResults.length}`);
    download(url, TARGET_FOLDER + "/elo_" + count + ".json")
      .then(data => {
        debugger;
      currentResults = data;
      totalResults.push(...data);
      limitStart = limitStart + limitStep;
      count = count + 1;
      loop();
    });
  }
}());
console.log("downloads ended");

