const fetch = require("node-fetch");
const fs = require('fs');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

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

const SKIP_SPECIAL_PAGES = [1951, 1952];
const SKIP_REMOVED_UNMAINTAINED_CARDS = [722, 1854, 1856];

function mapDataFromOneResponse(nextPageData) {
    let mappedWithinResponse = [];
    Object.keys(nextPageData.query.pages).forEach(pageId => {
        if (SKIP_SPECIAL_PAGES.includes(parseInt(pageId)) || SKIP_REMOVED_UNMAINTAINED_CARDS.includes(parseInt(pageId))) {
            return;
        }
        const propsAsArrayString = nextPageData.query.pages[pageId].revisions[0].slots.main['*'].match(/(?<=\|+)(.*\=*)/g);
        if (!propsAsArrayString) {
            console.log("error on: " + pageId);
            return;
        }
        const propsAsMap = propsAsArrayString.reduce((map, str) => {
            const [key, value] = str.split("=");
            map[key] = value;
            return map;
        }, {});
        propsAsMap.pageId = pageId;
        const mappedCardData = [propsAsMap];
        console.log(pageId);
        mappedWithinResponse = [...mappedWithinResponse, ...mappedCardData];
    });
    return mappedWithinResponse;
}


(async () => {
    // const cardPageIds = JSON.parse(fs.readFileSync("jobCardPageIds.json"));
    let overallCardData = [];

    const fetchAll = async () => {
        const cardDataInitial = await fetchPageContent();
        let gcmcontinue = cardDataInitial.continue.gcmcontinue;
        overallCardData = [...overallCardData, ...mapDataFromOneResponse(cardDataInitial)];
        while (gcmcontinue) {
            const nextPageData = await fetchPageContent(gcmcontinue);
            gcmcontinue = nextPageData.continue && nextPageData.continue.gcmcontinue;
            overallCardData = [...overallCardData, ...mapDataFromOneResponse(nextPageData)];
        }

        fs.writeFileSync("src/generated/jobCardProps.json", JSON.stringify(overallCardData, null, 4));
    };

    fetchAll();
})();
