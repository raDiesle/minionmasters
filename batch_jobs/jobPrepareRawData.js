const invert = require('lodash.invert');
const _mapValues = require('lodash.mapvalues');
const fs = require('fs');

const SRC_GAMEDATA = './batch_jobs/CardData.JSON';
const SRC_WIKI = './batch_jobs/generated/jobCardPropsGenerator.json';
const TARGET_FILE = "./batch_jobs/generated/jobCardProps.json";

// https://drive.google.com/open?id=0B-3hJBoCehBpQVBUYVdxZDVNSms
const cardDataFromGameRaw = fs.readFileSync(SRC_GAMEDATA);
let cardDataFromGame = JSON.parse(cardDataFromGameRaw);


const cardDataFromWikiRaw = fs.readFileSync(SRC_WIKI);
const cardDataFromWiki = JSON.parse(cardDataFromWikiRaw);


const errorList = [];

function normalizeWikiData(propsAsMap) {

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
                return propsAsMap;
            }

            if (isNaN(currentPropValue)) {
                propsAsMap[prop] = currentPropValue.replace(/\D/g, '');
                console.info(`cheated to parse:${currentPropValue} to "${propsAsMap[prop]}" of "${propsAsMap.pageId}"`);
            } else {
                propsAsMap[prop] = parseInt(currentPropValue);
            }

        }
    });

    propsAsMap.description = propsAsMap.description.replace(/[[(.*?)]]/gm, "<span className='htmlCardRef' data-card='$1'>$1</span>");

    // might be obsolete
    const werewolveInlineInfo = `Accursed - Minion
        - 400 health.
        - 40 damage (DPS: 36,4).
        - 1,1 sec. attackspeed.
        - Melee.
        - speed: 8.
        `;
    propsAsMap.description = propsAsMap.description.replace(/\<span class\=\'htmlCardRef\' data\-card\=\'Werewolf\'>Werewolf\<\/span\>/gm, `<span class='htmlTextRef' data-inline-text='${werewolveInlineInfo}'><span class='htmlHighlight' data-highlight='Werewolf'>Werewolf</span></span>`);

    return propsAsMap;
}

function normalizeGameCardData(propsAsMap) {
    // match by id manual
    // wikiNameToGameIDMappingConfig
    propsAsMap.iD = parseInt(propsAsMap.iD);

    if (propsAsMap.type === "DefensiveSpell") {
        propsAsMap.type = "Spell";
    }

    propsAsMap.description = propsAsMap.description.replace(/\<link="spell_info:(.*?)>(.*?)<\/link>/gm, "<span class='htmlCardRef' data-card='$1'>$2</span>");
    propsAsMap.description = propsAsMap.description.replace(/\<link="actor_info:(.*?)>(.*?)<\/link>/gm, "<span class='htmlCardRef' data-card='$1'>$2</span>");
    propsAsMap.description = propsAsMap.description.replace(/\<link="plain_text:(.*?)>(.*?)<\/link>/gm, "<span class='htmlTextRef' data-inline-text='$1'>$2</span>");
    propsAsMap.description = propsAsMap.description.replace(/\<b\><color\=orange>(.*?)<\/color>\<\/b\>/gm, "<span class='htmlHighlight' data-highlight='$1'>$1</span>");


    function mapInlineWordInfo(word, description) {
        const regex = new RegExp(`\\<span class\\=\\'htmlHighlight\\' data\\-highlight\\=\\'${word}\\'\\>${word}\\<\\/span\\>`, 'gm');

        propsAsMap.description = propsAsMap.description.replace(
            regex,
            `
        <span class='htmlTextRef' data-inline-text='${description}'>
            <span class='htmlHighlight' data-highlight='${word}'>${word}</span>
         </span>
         `
        );
    }

    mapInlineWordInfo("Taunt", `All nearby Enemies will target this Minion. Radius 5.`);
    mapInlineWordInfo("Explodes", `Detonates shortly after being summoned and deals damage to all nearby Units.`);
    mapInlineWordInfo("Netherstep", `Instantly jump through the nether to a different location. Cooldown 1, Teleport Distance 8.`);
    mapInlineWordInfo("Poison", `Deals damage over time to a Minion`);
    mapInlineWordInfo("Voidborne Wound", `If a Voidborne Minion deals damage to enemy Master while this card is in your hand`);
    mapInlineWordInfo("Stuns", `Stunned Units are unable to move or attack.`);


    propsAsMap.description = propsAsMap.description.replace(/ERROR_/, '');


    propsAsMap.description = propsAsMap.description.replace(new RegExp(/\. /, 'g'), ".<br />");

    propsAsMap.description = propsAsMap.description.replace(new RegExp(/\'\'\'Mana Freeze \(2\)\'\'\'/, 'g'), "<span class='htmlTextRef' data-inline-text='Lock 2 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.'><span class='htmlHighlight' data-highlight='Mana Freeze(2)'>Mana Freeze(2)</span></span>");
    propsAsMap.description = propsAsMap.description.replace(new RegExp(/\'\'\'Mana Freeze\(1\)\'\'\'/, 'g'), "<span class='htmlTextRef' data-inline-text='Lock 1 Mana Crystal. The next time you would gain mana, instead unlock a mana crystal.'><span class='htmlHighlight' data-highlight='Mana Freeze(1)'>Mana Freeze(1)</span></span>");


    /* fix new inline syntax */
    propsAsMap.description = propsAsMap.description.replace(/\[actorinfo\:(.*?)\,\[r\:(.*?)\]\]/gm, `<span className='htmlCardRef' data-card='$1'>$1</span>`);


    propsAsMap.description = propsAsMap.description.replace(/\[cv\:DeadlyTwins\.AdditionalUnitTriggerVariable\]/gm, `5`);
    propsAsMap.description = propsAsMap.description.replace(/\[math\:\[av\:Jahun\.Damage\]\/2]/gm, `75`);

    propsAsMap.description = propsAsMap.description.replace(/\[spellinfo:(.*?)\,\[r:(.*?)\]\]/gm, `<span className='htmlCardRef' data-card='$1'>$1</span>`);


    const propsAsMapParsedValues = _mapValues(propsAsMap, val => {
        if (val === "True") {
            return true;
        } else if (val === "False") {
            return false;
        } else {
            return val;
        }
    });

    return propsAsMapParsedValues;
}

function mapGameDataToWikiData(cardDataFromGame, cardDataFromWiki) {

    // merge wiki data with game data
    const wikiPageIdToGameIdMappingConfig = {
        1663: 172,
        1838: 212,
        1950: 49,
        1969: 268,
        1907: 243,
        781: 34, // reboomer
        1835: 211,
        1955: 263, //
        1959: 265, //  Highland Logger
        1954: 267, //  Highland Spinner
        1957: 266, //
        1971: 269, //
        1688: 161, //   Dynamic Duo
        1963: 264, //   LegendaryBrew
        1965: 262, //   Crystal Vortex
        1689: 169, //  Deadly Twins
        1961: 260, //  HighlandWoodsman
        1969: 268, //
        1925: 249, //  SlitherSlaves
        1877: 239, //  Forward Scouts
        1967: 261, //
        1883: 241, // Nyvir the fallen
        1793: 207, // master card
        1794: 208, // master card
        1643: 89, // master card
        1999: 279
    };
    const gameiDToWikiPageIdMappingConfig = invert(wikiPageIdToGameIdMappingConfig);
    const matchedDataFromWikiByName = cardDataFromWiki.find(({name}) => cardDataFromGame.name === name);

    // match by name
    const matchedDataFromWikiById = matchedDataFromWikiByName || cardDataFromWiki.find(({pageId}) => parseInt(gameiDToWikiPageIdMappingConfig[cardDataFromGame.iD]) === pageId);
    if (matchedDataFromWikiById) {
        cardDataFromGame.pageId = parseInt(matchedDataFromWikiById.pageId);
        cardDataFromGame.image = matchedDataFromWikiById.image;
        cardDataFromGame.targets = matchedDataFromWikiById.targets; // to be replaced with hitsTarget, when fixed in dataset
        cardDataFromGame.faction = matchedDataFromWikiById.faction;

    } else {
        const gameIdToCustomImage = {
            270: "Malshar.jpg",
            278: "ArdentAegis.jpg",
            274: "BrotherOfTheBurningFist.jpg",
            273: "HiArdera.jpg",
            271: "JadeFlingers.jpg",
            276: "JadeSparkWatchers.jpg",
            275: "Jahun.jpg",
            280: "ShensShockStick.jpg",
            277: "Smite.jpg",
            272: "TingTengTung.jpg",
            279: "Windwalker.jpg"
        };
        cardDataFromGame.image = gameIdToCustomImage[cardDataFromGame.iD] || "Notavailable.png";
    }


    if (typeof cardDataFromGame.pageId === 'undefined') {
        errorList.push("Cannot match data from:" + cardDataFromGame.name);
    }
    if (cardDataFromGame.pageId === null) {
        errorList.push("No mapping required:" + cardDataFromGame.name);
    }

    /*
    if (cardDataFromGame.iD === 183) {
        cardDataFromGame.description = 'Summon 2 Spear Throwsers, If you do not control any bridges summon 1 extra. They all gain Rage.';
    } else if (cardDataFromGame.iD === 21) {
        cardDataFromGame.description = 'Generates 15 XP over 45 sec - regards, XP INC. When in Mana Frenzy the shrine overheats and takes 3x decay damage.';
    } else if (cardDataFromGame.iD === 184) {
        cardDataFromGame.description = 'If a friendly minion has Rage, summon 5 more.';
    } else if (cardDataFromGame.iD === 115) {
        cardDataFromGame.name = "Armored Scrat";
    } else if (cardDataFromGame.iD === 249) {
        cardDataFromGame.description = "Summon 1 Slitherbound Lancer and 1 Slitherbound Darter";
    } else if (cardDataFromGame.iD === 214) {
        cardDataFromGame.description = cardDataFromGame.description.replace(/class\=\'htmlCardRef\' data\-card\=\'SquirePuff\'/gm, "");
    }
*/
    if (cardDataFromGame.image) {
        const imageNormalized = cardDataFromGame.image.charAt(0).toUpperCase() + cardDataFromGame.image.slice(1);
        cardDataFromGame.image = imageNormalized;
    } else {
        errorList.push("could not find image for: " + cardDataFromGame.name);
    }

    console.log("loaded:" + cardDataFromGame.pageId);
    return cardDataFromGame;
}

const normalizedWikiData = cardDataFromWiki.map(cardData => {
    const normalizedDataSet = normalizeWikiData(cardData);
    return normalizedDataSet;
});

const normalizedGameData = cardDataFromGame.filter(({iD}) => {
    return ![18, 109].includes(parseInt(iD));
}).map(cardData => {
    return normalizeGameCardData(cardData);
});
console.log(normalizeWikiData);
const cardDataWikiAsMasterMergedWithGameData = normalizedGameData.map(gameDataset => {
    return mapGameDataToWikiData(gameDataset, normalizedWikiData);
});

fs.writeFileSync(TARGET_FILE, JSON.stringify(cardDataWikiAsMasterMergedWithGameData, null, 4));
// cardDataFromGame


errorList.forEach(err => console.error(err));

console.log("count of cards from game:" + cardDataFromGame.length);
console.log("count of cards from wiki:" + cardDataFromWiki.length);
console.log("count of merged data:" + cardDataWikiAsMasterMergedWithGameData.length);