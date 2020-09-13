const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const fs = require("fs");
exports.mm = functions.https.onRequest((request, response) => {
  const file = fs.readFileSync("./index2.html");

  const isSavedDeckPreview = !!request.query.deckId;
  const isDeckManagerWithAnyCardSelected = request.path === "/" && !!request.query.iD;

  const title = request.query.title || "Minionmasters Manager";
  const description = request.query.description || "";

  const IS_PREVIEW_MODE = request.originalUrl.includes("?") ? "&isPreview=true" : "?isPreview=true";

  const isPreviewModeWithReducedPage = isSavedDeckPreview || isDeckManagerWithAnyCardSelected;

  const queryEncoded = encodeURIComponent(
    request.protocol + "://" + request.hostname + request.originalUrl + IS_PREVIEW_MODE
  )
    // Note that although RFC3986 reserves "!", RFC5987 does not,
    // so we do not need to escape it
    .replace(/['()]/g, escape) // i.e., %27 %28 %29
    .replace(/\*/g, "%2A")
    // The following are not required for percent-encoding per RFC5987,
    // so we can allow for a little better readability over the wire: |`^
    .replace(/%(?:7C|60|5E)/g, unescape);

  // should be in sync with export-as-image settings
  const DECK_MANAGER_HEIGHT = "310";
  const PREMADE_HEIGHT = "347";

  const WIDTH = `945`;
  const height = isPreviewModeWithReducedPage
    ? isDeckManagerWithAnyCardSelected
      ? DECK_MANAGER_HEIGHT
      : PREMADE_HEIGHT
    : 1000;
  const dimensions = `?width=${WIDTH}&height=${height}`;

  const imageMeta = (property) =>
    `<meta property="${property}" content="https://minionmastersmanager-286215.ew.r.appspot.com/screenshot/${queryEncoded}${dimensions}"/>`;

  const newHtmlFile = file
    .toString()
    .replace(/<meta property="og:image" content=".*?"\/>/, imageMeta("og:image"))
    .replace(/<meta property="twitter:image" content=".*?"\/>/, imageMeta("twitter:image"))
    .replace(
      `<meta property="og:title" content="Minionmasters Manager"/>`,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      `<meta name="description" content="Minionmasters Manager"/>`,
      `<meta name="description" content="${description}"/>`
    )
    .replace(
      `<meta property="og:description" content="Minionmasters Manager"/>`,
      `<meta property="og:description" content="${description}"/>`
    );

  response.status(200).send(`${newHtmlFile}`);
});
