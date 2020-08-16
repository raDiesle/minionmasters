const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const fs = require("fs");
exports.mm = functions.https.onRequest((request, response) => {
  const file = fs.readFileSync("/index.html", "utf8");
  response.status(200).send(`${file}_`);
});
