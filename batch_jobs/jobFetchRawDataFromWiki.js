const fetch = require("node-fetch");
const fs = require('fs');

const TARGET_FILE = "./batch_jobs/generated/jobFetchRawDataFromWiki.json";

// alternatively: https://minionmasters.gamepedia.com/api.php?action=query&generator=categorymembers&gcmtitle=Category:Cards&prop=revisions&rvprop=content&rvslots=main
async function fetchPageContent(gcmcontinue = "") {
    let categoryCardsUrl = `https://minionmasters.gamepedia.com/api.php?action=query&generator=categorymembers&gcmtitle=Category:Cards&prop=revisions&rvprop=content&rvslots=main&format=json`;
    if (gcmcontinue) {
        categoryCardsUrl += `&gcmcontinue=${gcmcontinue}`;
    }
    const response = await fetch(categoryCardsUrl);
    const data = await response.json();
    return data;
}

const errorList = [];


const SKIP_SPECIAL_PAGES = [1951, 1952];
const SKIP_REMOVED_UNMAINTAINED_CARDS = [722, 1854, 1856];

console.log("to")

const mapToArray = response => {
    return Object.keys(response.query.pages).map(pageId => {

        if (SKIP_SPECIAL_PAGES.includes(parseInt(pageId)) || SKIP_REMOVED_UNMAINTAINED_CARDS.includes(parseInt(pageId))) {
            return;
        }
        const propsAsArrayString = response.query.pages[pageId].revisions[0].slots.main['*'].match(/(?<=\|+)(.*\=*)/g);
        if (!propsAsArrayString) {
            console.log("error on: " + pageId);
            return;
        }
        const propsAsMap = propsAsArrayString.reduce((map, str) => {
            const [key, value] = str.split("=");
            map[key] = value;
            return map;
        }, {});

        propsAsMap.pageId = parseInt(pageId);
        return propsAsMap;
    });
};

(async () => {
    // const cardPageIds = JSON.parse(fs.readFileSync("jobCardPageIds.json"));
    let overallCardData = [];

    const fetchAll = async () => {
        const cardDataInitial = await fetchPageContent();
        let gcmcontinue = cardDataInitial.continue.gcmcontinue;
        overallCardData = [...overallCardData, ...mapToArray(cardDataInitial)];

        while (gcmcontinue) {
            const nextPageData = await fetchPageContent(gcmcontinue);
            gcmcontinue = nextPageData.continue && nextPageData.continue.gcmcontinue;
            overallCardData = [...overallCardData, ...mapToArray(nextPageData)];
        }

        const overallCardDataRemoveSkippedPages = overallCardData.filter(cardData => !!cardData);

        fs.writeFileSync(TARGET_FILE, JSON.stringify(overallCardDataRemoveSkippedPages, null, 4));
    };

    await fetchAll();

    if (errorList.length === 0) {
        console.log("raw data were successful loaded from wiki.");
    } else {
        console.error(JSON.stringify(errorList, null, 2));
    }
})();
