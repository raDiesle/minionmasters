const fs = require('fs');

// https://drive.google.com/open?id=0B-3hJBoCehBpQVBUYVdxZDVNSms
const cardDataFromGameRaw = fs.readFileSync('./CardData.JSON');
let cardDataFromGame = JSON.parse(cardDataFromGameRaw);

const cardDataFromWikiRaw = fs.readFileSync('./generated/jobCardPropsGenerator.json');
let cardDataFromWiki = JSON.parse(cardDataFromWikiRaw);

const errorList = [];

function mapDataFromOneResponse(propsAsMap) {

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
    propsAsMap.isGameDescr = typeof matchedDataSetFromGame !== 'undefined';
    if (typeof matchedDataSetFromGame !== 'undefined') {
        propsAsMap.iD = parseInt(matchedDataSetFromGame.iD);
        propsAsMap.description = matchedDataSetFromGame.description;
        propsAsMap.unitToSummon = matchedDataSetFromGame.unitToSummon;


        // match by id manual
        // toIdMappingConfig
        propsAsMap.description = propsAsMap.description.replace(/\<link="spell_info:(.*?)>(.*?)<\/link>/gm, "<span class='htmlCardRef' data-card='$1'>$2</span>");
        propsAsMap.description = propsAsMap.description.replace(/\<link="actor_info:(.*?)>(.*?)<\/link>/gm, "<span class='htmlCardRef' data-card='$1'>$2</span>");
        propsAsMap.description = propsAsMap.description.replace(/\<link="plain_text:(.*?)>(.*?)<\/link>/gm, "<span class='htmlTextRef' data-inline-text='$1'>$2</span>");
        propsAsMap.description = propsAsMap.description.replace(/\<b\><color\=orange>(.*?)<\/color>\<\/b\>/gm, "<span class='htmlHighlight' data-highlight='$1'>$1</span>");
    } else {
        propsAsMap.description = propsAsMap.description.replace(/[[(.*?)]]/gm, "<span className='htmlCardRef' data-card='$1'>$1</span>");
    }

    const werewolveInlineInfo = `Accursed - Minion
        - 400 health.
        - 40 damage (DPS: 36,4).
        - 1,1 sec. attackspeed.
        - Melee.
        - speed: 8.
        `;
    propsAsMap.description = propsAsMap.description.replace(/\<span class\=\'htmlCardRef\' data\-card\=\'Werewolf\'>Werewolf\<\/span\>/gm, `<span class='htmlTextRef' data-inline-text='${werewolveInlineInfo}'><span class='htmlHighlight' data-highlight='Werewolf'>Werewolf</span></span>`);

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

    if (typeof propsAsMap.iD === 'undefined') {
        errorList.push("Cannot match data from:" + propsAsMap.name);
    }
    if (propsAsMap.iD === null) {
        errorList.push("No mapping required:" + propsAsMap.name);
    }

    if (propsAsMap.iD === 183) {
        propsAsMap.description = 'Summon 2 Spear Throwsers, If you do not control any bridges summon 1 extra. They all gain Rage.';
    } else if (propsAsMap.iD === 21) {
        propsAsMap.description = 'Generates 15 XP over 45 sec - regards, XP INC. When in Mana Frenzy the shrine overheats and takes 3x decay damage.';
    } else if (propsAsMap.iD === 184) {
        propsAsMap.description = 'If a friendly minion has Rage, summon 5 more.';
    } else if (propsAsMap.iD === 115) {
        propsAsMap.name = "Armored Scrat";
    } else if (propsAsMap.iD === 249) {
        propsAsMap.description = "Summon 1 Slitherbound Lancer and 1 Slitherbound Darter";
    } else if (propsAsMap.iD === 214) {
        propsAsMap.description = propsAsMap.description.replace(/class\=\'htmlCardRef\' data\-card\=\'SquirePuff\'/gm, "");
    }

    const imageNormalized = propsAsMap.image.charAt(0).toUpperCase() + propsAsMap.image.slice(1);
    propsAsMap.image = imageNormalized;


    console.log("loaded:" + propsAsMap.pageId);
    return propsAsMap;
}


const cardDataWikiAsMasterMergedWithGameData = cardDataFromWiki.map(cardData => {
    const mappedData = mapDataFromOneResponse(cardData);
    return mappedData;
});

fs.writeFileSync("src/generated/jobCardProps.json", JSON.stringify(cardDataWikiAsMasterMergedWithGameData, null, 4));
// cardDataFromGame