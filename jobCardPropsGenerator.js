const fetch = require("node-fetch");
const fs = require('fs');

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

const errorList = [];

function mapDataFromOneResponse(nextPageData) {
    let mappedCardDataOfFullResponse = [];
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

        propsAsMap.pageId = parseInt(pageId);


        const bugsPageIdToRangeMapperWikiBugsConfig = {
            686: 100,
            741: "Melee",
            781: 100,
            1702: "Melee",
            1280: "Melee",
            1704: "Melee"
        };
        const bugsPageIdToCountMapperWikiBugsConfig = {
            1877: 2,
            1688: 2,
            1706: 5,
            1689: 2,
            1925: 2
        };

        if (Object.keys(bugsPageIdToRangeMapperWikiBugsConfig).includes("" + propsAsMap.pageId)) {
            propsAsMap.range = bugsPageIdToRangeMapperWikiBugsConfig[propsAsMap.pageId];
        }
        if (Object.keys(bugsPageIdToCountMapperWikiBugsConfig).includes("" + propsAsMap.pageId)) {
            propsAsMap.count = bugsPageIdToCountMapperWikiBugsConfig[propsAsMap.pageId];
        }


        const PROPS_PARSE_TO_INT = ["pageId", "health", "attackspeed", "attackdelay", "duration", "range", "speed", "damage", "manacost", "radius", "count"];
        PROPS_PARSE_TO_INT.forEach(prop => {
            let currentPropValue = propsAsMap[prop];
            if (typeof currentPropValue !== 'undefined') {
                let isToConvertMeleeToNumeric = prop === "range" && currentPropValue === "Melee";
                if (isToConvertMeleeToNumeric) {
                    propsAsMap[prop] = 0;
                    return;
                }

                if (isNaN(currentPropValue)) {
                    errorList.push(`cannot parse:${currentPropValue} of ${propsAsMap.pageId}`);
                } else {
                    propsAsMap[prop] = parseInt(currentPropValue);
                }

            }
        });

        const mappedCardData = [propsAsMap];

        console.log(pageId);
        mappedCardDataOfFullResponse = [...mappedCardDataOfFullResponse, ...mappedCardData];
    });
    return mappedCardDataOfFullResponse;
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

    await fetchAll();

    if (errorList.length === 0) {
        console.log("Fetch from jobCardPropsGenerator was successful");
    } else {
        console.error(JSON.stringify(errorList, null, 2));
    }
})();
