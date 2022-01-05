const orderBy = require("lodash/orderBy");

const fetch = require("node-fetch");

const http = require("http");
const fs = require("fs");


const TARGET_FOLDER = "./batch_jobs/elo";



const totalResults = [];
let currentResults = null;
const limitStep = 100000;
let limitStart = 0;
let count = 0;
// http://fdmfdm.nl/EloChecker.html
console.log("start downloading");
(async function loop() {
  if (currentResults === null || currentResults.length !== 0) {
    const url = `http://fdmfdm.nl/GetAllUserElo.php?limitStart=${limitStart}&limitStep=${limitStep}`;
    console.log(url);
    console.log(`Fetching count : ${count} totalResults: ${totalResults.length}`);
    const response = await fetch(url);
    const data = await response.json();

    currentResults = data;

    const normalized = currentResults.map(({ User_id, Id, Elo1v1, Elo2v2Team, Elo2v2Solo }) => ({
      User_id: parseInt(User_id),
      Id: parseInt(Id),
      Elo1v1: parseInt(Elo1v1),
      Elo2v2Team: parseInt(Elo2v2Team),
      Elo2v2Solo: parseInt(Elo2v2Solo)
    }));



    const prevLimited = normalized.filter(({Elo1v1, Elo2v2Team, Elo2v2Solo}) => Elo1v1 > 1600 || Elo2v2Team > 1600 || Elo2v2Solo > 1600 );

    console.log(prevLimited.length)
    // const limited = sortedBy.slice(0, 50000);

    totalResults.push(...prevLimited);
    limitStart = limitStart + limitStep;
    count = count + 1;
    await loop();
  }

  const sortedBy = orderBy(totalResults, ["Elo2v2Solo"], ["desc"]);

  fs.writeFile(`./batch_jobs/elo/all.json`, JSON.stringify(sortedBy), err => {
    if (err) {
      console.error(err)
      return;
    }
  })

}());



console.log("downloads ended");

const players = [1575050];
let pos = 0;
(async function loopSingles() {
  if (currentResults === null || currentResults.length !== 0) {
  //  const response = await fetch(url);
  //  const data = await response.json();

        const response = await fetch(`http://fdmfdm.nl/GetUserElo.php?userID=${players[pos]}`);
        const playerResponse = await response.json();
        const singlePlayer = playerResponse[0];

        fs.writeFile(`./batch_jobs/elo/${singlePlayer.User_id}.json`, JSON.stringify(singlePlayer), err => {
          if (err) {
            console.error(err)
            return;
          }
        });

        pos = pos+1;
  }
}());

console.log("Everything completed");