const orderBy = require("lodash/orderBy");

const fetch = require("node-fetch");

// const functions = require("firebase-functions");
const functions = require('@google-cloud/functions-framework');

const { getStorage } = require("firebase-admin/storage");

const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");

const {onSchedule} = require("firebase-functions/v2/scheduler");

const serviceAccount = require("./minionmastersmanager-54a5965bae76.json");

const {setGlobalOptions} = require("firebase-functions/v2");
setGlobalOptions({maxInstances: 1, });

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "minionmastersmanager.appspot.com",
});

const db = getFirestore();
const bucket = getStorage().bucket();

// Run once a day at midnight, to clean up the users
// Manually run the task here https://console.cloud.google.com/cloudscheduler
exports.scheduledFunctionGen2 = onSchedule({schedule : "every day 00:00", memory: "512MB", timeoutSeconds: 540}, async (event) => {
//functions.cloudEvent('refreshEloV2', async(cloudEvent) => {
// http('scheduledFunctionGen2', (req, res) => {
// onSchedule("every day 00:00", async (event) => {
//functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
// functions.cloudEvent("eloUpdate", async (cloudEvent) => {
  const ELO_GENERATED_ROOT_PATH = "elo/";

  const totalResults = [];
  let currentResults = null;
  const limitStep = 100000;
  let limitStart = 0;
  let count = 0;
  // http://fdmfdm.nl/EloChecker.html
  console.log("start downloading");

  const requestHeader = { gzip: true, contentType: "application/json" };

  /* eslint-disable */

  async function loop() {
    if (currentResults === null || currentResults.length !== 0) {
      const url = `http://fdmfdm.nl/GetAllUserElo.php?limitStart=${limitStart}&limitStep=${limitStep}`;
      console.log(url);
      console.log(`Fetching count : ${count} totalResults: ${totalResults.length}`);
      const response = await fetch(url);
      const data = await response.json();
      console.log("returned dataset");
      currentResults = data;

      const normalized = currentResults.map(({ User_id, Id, Elo1v1, Elo2v2Team, Elo2v2Solo }) => ({
        User_id: parseInt(User_id),
        Id: parseInt(Id),
        Elo1v1: parseInt(Elo1v1),
        Elo2v2Team: parseInt(Elo2v2Team),
        Elo2v2Solo: parseInt(Elo2v2Solo),
      }));

      const prevLimited = normalized.filter(
        ({ Elo1v1, Elo2v2Team, Elo2v2Solo, User_id }) =>
          Elo1v1 > 1200 ||
          Elo2v2Team > 1200 ||
          Elo2v2Solo > 1200 
          //|| [15, 218347, 5537284, 218347, 5537284, 848452].includes(User_id)
      );
      console.log("used data to proceed: " + prevLimited.length);
      // const limited = sortedByElo2v2Solo.slice(0, 50000);

      totalResults.push(...prevLimited);
      limitStart = limitStart + limitStep;
      count = count + 1;
      await loop();
      return Promise.resolve();
    }


    console.log("Continue with fetched data: " + totalResults.length)

    const sortedByElo1v1 = orderBy(totalResults, ["Elo1v1"], ["desc"]).map(
      ({ User_id }) => User_id
    );
    const sortedByElo2v2Solo = orderBy(totalResults, ["Elo2v2Solo"], ["desc"]).map(
      ({ User_id }) => User_id
    );
    const sortedByElo2v2Team = orderBy(totalResults, ["Elo2v2Team"], ["desc"]).map(
      ({ User_id }) => User_id
    );

    const enhancedByEveryEloRankingData = totalResults.map((singlePlayer) => {
      const { User_id } = singlePlayer;
      const eloRanks = {
        Elo1v1Rank: sortedByElo1v1.indexOf(User_id) + 1,
        Elo2v2SoloRank: sortedByElo2v2Solo.indexOf(User_id) + 1,
        Elo2v2TeamRank: sortedByElo2v2Team.indexOf(User_id) + 1,
      };
      const overallRankAbsolute = {
        overallRankAbsolute: Math.floor(
          eloRanks.Elo1v1Rank + eloRanks.Elo2v2SoloRank + eloRanks.Elo2v2TeamRank / 3
        ),
      };
      const merged = { ...singlePlayer, ...eloRanks, ...overallRankAbsolute };
      return merged;
    });

    const sortedByOverallRanking = orderBy(
      enhancedByEveryEloRankingData,
      ["overallRankAbsolute"],
      ["asc"]
    );
    const overallRankingUserIds = sortedByOverallRanking.map(({ User_id }) => User_id);
    const withOverallEloRank = sortedByOverallRanking.map((data) => ({
      ...data,
      ...{ overallRank: overallRankingUserIds.indexOf(data.User_id) + 1 },
    }));


    async function uploadFromMemoryAll() {
      console.log("start uploading of all.json: " + withOverallEloRank.length);
      await bucket
        .file(`${ELO_GENERATED_ROOT_PATH}all.json`)
        .save(JSON.stringify(withOverallEloRank), requestHeader);
      console.log("finished uploading all.json");
    }
    await uploadFromMemoryAll().catch(console.error);

    console.log("continue to read playermappings.");
    db.collection("playermappings")
      .get()
      .then(async (querySnapshot) => {
        const playersObject = {};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          playersObject[doc.id] = doc.data().username;
        });

      const players = Object.keys(playersObject);
      let pos = 0;

      async function loopSingles() {
        try{
          const isContinueLoop = pos < players.length;
          console.log("Continue with next player: " + String(isContinueLoop));
        if (isContinueLoop) {
          /* const response = await fetch(`http://fdmfdm.nl/GetUserElo.php?userID=${players[pos]}`);
        const playerResponse = await response.json();
        const singlePlayer = playerResponse[0];*/
          console.log("fetch data mapping of " + players[pos]);
          const currentPlayerId = parseInt(players[pos]);
          console.log("Current playerId: " + currentPlayerId);
          const singlePlayer = withOverallEloRank.find(
            ({ User_id }) => User_id === currentPlayerId
          );
          if (typeof singlePlayer === "undefined") {
            console.log("Player could not be found: " + currentPlayerId);
            pos = pos + 1;
            await loopSingles();
            return Promise.resolve();
          }
          const playerFilePath = `${ELO_GENERATED_ROOT_PATH}details/${singlePlayer.User_id}.json`;

          let playerFileContent = null;
          try {
            const file = bucket.file(playerFilePath);
            const data = await file.download();
            playerFileContent = JSON.parse(data);
          } catch (error) {
            playerFileContent = [];
          }

          const date =
            new Date().getFullYear() +
            "-" +
            (1 + new Date().getMonth()) +
            "-" +
            new Date().getDate();

          if (playerFileContent.length !== 0) {
            const lastEntryDate = playerFileContent[playerFileContent.length - 1].date;
            const todayDataWasAlreadyWritten = lastEntryDate === date;
            if (todayDataWasAlreadyWritten) {
              console.log("for date there was already data. Will update.");
              playerFileContent.pop();
            }
          }
          const newPlayerHistory = { ...singlePlayer, ...{ date } };
          playerFileContent.push(newPlayerHistory);

          const finalPlayerDetailsDataContent = JSON.stringify(playerFileContent, null, "\t");

          async function uploadFromMemory() {
            await bucket.file(playerFilePath).save(finalPlayerDetailsDataContent, requestHeader);
          }
          await uploadFromMemory().catch(console.error);

          pos = pos + 1;
          await loopSingles();
          return Promise.resolve();
        }else{
          console.log("Finished player details.");
          return Promise.resolve();
        }
        }catch(error){
          console.error(error);
          console.error("of player:" + players[pos])
        }
      }

      await loopSingles();
    })
    .catch(e => console.error(e));

    

    const statusContents = JSON.stringify(
      { timeFetched: Date.now(), totalResultsSize: totalResults.length },
      null,
      "\t"
    );

    async function uploadFromMemoryStatus() {
      await bucket
        .file(`${ELO_GENERATED_ROOT_PATH}status.json`)
        .save(statusContents, requestHeader);
    }
    await uploadFromMemoryStatus().catch(console.error);
    console.log("Successfully uploaded status.json");
  }

  try{
    console.log("Start all");
    await loop();
    console.log("Finished all");
  }catch(e) {
    console.error(e)
  }

  console.log("Finished everything successfully!");
  return Promise.resolve();
});
