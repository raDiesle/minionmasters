const fetch = require("node-fetch");
const fs = require('fs');


let cardDataFromGameRaw = fs.readFileSync('./CardData.JSON');
let cardDataFromGame = JSON.parse(cardDataFromGameRaw);


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
                    propsAsMap[prop] = currentPropValue.replace(/\D/g, '');
                    errorList.push(`cheated to parse:${currentPropValue} to "${propsAsMap[prop]}" of "${propsAsMap.pageId}"`);
                } else {
                    propsAsMap[prop] = parseInt(currentPropValue);
                }

            }
        });


        // merge wiki data with game data
        const specialMapConfigByName = {
            "A.I.M Bot": "A.I.M. Bot",
            "Brothers of Light": "Brothers Of Light",
            "Disruptor Puff": "Disruptor Puffs",
            "Mountainshaper": "",
            "Queen's Dragon": "The Queen's Dragon",
            "Re-boomer": "Re-Boomer",
            "Shieldguard of Light": "Shieldguard Of Light",
        };

        const toIdMappingConfig = {
            "Arcane Ring": 263, // missing
            "Caber Tosser": 265, // missing Highland Logger
            "Fergus Flagon Fighter": 267, // missing Highland Spinner
            "Frostfeathers": 266, // missing
            "Frostfeather Flyby": 269, // missing
            "Gor'Rakk Brutes": 161, // missing  Dynamic Duo
            "Glenn's Brew": 264, // missing  LegendaryBrew
            "Leiliel's Vortex": 262, // missing  Crystal Vortex
            "Shars'Rakk Twins": 169, // missing Deadly Twins
            "Woodsman": 260, // missing HighlandWoodsman
            "Mountainshaper": 268, // missing
            "Slitherbound": 249, // missing SlitherSlaves
            "Border Patrol": 239, // missing Forward Scouts
            "High-Mage Leiliel": undefined, // missing
            "Nyrvir Slumbers": undefined, // missing but linked
            "Crossbow Trap": null, // master card
            "Decoy Trap": null, // master card
            "Blast Entry": null // master card
        };

        const matchedDataSetFromGame = cardDataFromGame.find(({name}) => propsAsMap.name === name);
        if (typeof matchedDataSetFromGame !== 'undefined') {
            propsAsMap.iD = parseInt(matchedDataSetFromGame.iD);
            propsAsMap.description = matchedDataSetFromGame.description;

        }
        propsAsMap.isGameDescr = typeof matchedDataSetFromGame !== 'undefined';

        // match by name
        const matchedDataFromGame = cardDataFromGame.find(({name}) => specialMapConfigByName[propsAsMap.name] === name);
        if (typeof propsAsMap.iD === 'undefined' && matchedDataFromGame) {
            propsAsMap.iD = parseInt(matchedDataFromGame.iD);
            propsAsMap.name = matchedDataFromGame.name;
            propsAsMap.description = matchedDataFromGame.description;
        }

        if (typeof propsAsMap.iD === 'undefined') {
            propsAsMap.iD = toIdMappingConfig[propsAsMap.name];
        }

        // match by id manual
        // toIdMappingConfig

        if (propsAsMap.isGameDescr) {
            propsAsMap.description = propsAsMap.description.replace(/\<link="spell_info:(.*?)>(.*?)<\/link>/, "<a href='$1'>$2</a>");
            // <link=\"actor_info:CrystalSentry>Crystal Sentries</link> with <link=\"plain_text:+50% Attack Speed while you have 6 or more Mana><b><color=orange>Mana Surge</color></b></link> to escort the next Ranged Minion you play. No, not <b>that</b> kind of escort!",
            // <link="plain_text:+50% Damage><b><color=orange>Rage</color></b></link>.

        }


        if (typeof propsAsMap.iD === 'undefined') {
            errorList.push("Cannot match data from:" + propsAsMap.name);
        }
        if (propsAsMap.iD === null) {
            errorList.push("No mapping required:" + propsAsMap.name);
        }


        const imageNormalized = propsAsMap.image.charAt(0).toUpperCase() + propsAsMap.image.slice(1);
        propsAsMap.image = imageNormalized;

        const mappedCardData = [propsAsMap];

        console.log("loaded:" + propsAsMap.pageId);
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
