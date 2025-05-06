const { TYPE_CARD_REF, TYPE_INLINE, TYPE_TERM, TYPE_SUBTEXT, TYPE_HIGHLIGHT, TYPE_BOLD, TYPE_FLAVOR } = require("./card-description-types");
const {loadAllParsedGameData, getText} = require("./card_data/cardDataFunctions")

const fs = require("fs");

const SRC_GAMEDATA = "./batch_jobs/CardData.JSON";
const TARGET_FILE = "./src/generated/jobCardProps.json";

// outdated data: https://drive.google.com/open?id=0B-3hJBoCehBpQVBUYVdxZDVNSms
const cardDataFromGameRaw = fs.readFileSync(SRC_GAMEDATA);
let cardDataFromGame = JSON.parse(cardDataFromGameRaw);
const gameData = loadAllParsedGameData();

const errorList = [];

function normalizeGameCardData(propsAsMap) {
  propsAsMap.faction = propsAsMap.faction === "Highlander" ? "Stoutheart" : propsAsMap.faction;

  if (["Spell", "SummonSpell", "DefensiveSpell"].includes(propsAsMap.type)) {
    propsAsMap.typeSpell = propsAsMap.type;
    propsAsMap.type = "Spell";
  } else if (["Minion", "MultiMinion", "BaseMinion"].includes(propsAsMap.type)) {
    if (propsAsMap.flying == true) {
      propsAsMap.type = "Flying Minion";
    } else {
      propsAsMap.type = propsAsMap.stationary ? "Building" : "Minion";
    }
  }

  propsAsMap.targets = propsAsMap.hitsFlying ? "Ground & Air" : "Ground";
  propsAsMap.targets = propsAsMap.attackOnlyStationary ? "Building" : propsAsMap.targets;
  if (propsAsMap.type === "Spell" || propsAsMap.type === "Ability") {
    propsAsMap.targets = "Is Spell";
    propsAsMap.attackType = propsAsMap.type
  }
  
  propsAsMap.attackType = propsAsMap.isMelee ? "Melee":
  propsAsMap.isRanged ? "Ranged": 
    propsAsMap.isSpecial ? "Special": 
    propsAsMap.cantAttack ? "None":
    propsAsMap.attackType;

  const iDsMasterAbilitySpells = [
    104, // arcane golem
    103, // arcane missiles
    244, // drain live
    245, // spirit
    246, // skelettons
    247, // fobidden knowledge
    248, // book of death
    55, // trick swap
    58, // burn the bridges
    59, // tombstone
    387, // tombstone 2
    88, // shield totem
    89, // blast entry
    116, // more dakka
    207, // crossbow trap
    208, // decoy trap
    243, // queen dragon
    282, // voidborne black hole
  ];

  if (iDsMasterAbilitySpells.includes(propsAsMap.iD) || propsAsMap.catagory == "AbilityCard") {
    propsAsMap.rarity = "Perk";
  }
  propsAsMap.description = applyFormatting(propsAsMap.description)

  return propsAsMap
}


function applyFormatting(text, calledRecursively = false){
  let blocks = splitBrackets(text);
  let preparedText = text;
  if (blocks.length > 1) {
    formattedBlocks = blocks.map(blockText => {
      if (blockText.match(/^\[.*\]$/)) return applyFormatting(blockText, true);
      return blockText;
    });
    preparedText = formattedBlocks.join("");
  }
  // formatting and highlighting
  preparedText = preparedText.replace(
    /\[mec:([^\[]*?)\]/gm,
    // `$1`
    (match, text) => {return `{"${text}", "${TYPE_HIGHLIGHT}", ""}`}
  );
  preparedText = preparedText.replace(
    /\[b:([^\[]*?)\]/gm,
    (match, text) => {return `{"${text}", "${TYPE_BOLD}", ""}`}
  );
  preparedText = preparedText.replace(
    /\[f:([^\[]*?)\]/gm,
    (match, text) => {return `{"${text}", "${TYPE_FLAVOR}", ""}`}
  );
  //this can be improved, some links don't work. (because actor != card)
  preparedText = preparedText.replace(
    /\[actor(?:skill)*?info:([^\[]*?)\,([^\[]*?)\]/gm,
    (match, infoKey, text) => {
      if (gameData.actorsMap.has(infoKey)) return `{"${text}", "${TYPE_CARD_REF}", "${infoKey}"}`
      else return match
    }
  );

  //actorskill-, actor- and spell-info
  if (!calledRecursively || true) {
    preparedText = preparedText.replace(
      /\[(?!text)[^\[]+?info:([^\[]*?)\,([^\[]*?)\]/gm,
      (match, infoKey, text) => {return `{"${text}", "${TYPE_TERM}", "${getInfoText(infoKey + "Description")}"}`}
    );
    preparedText = preparedText.replace(
      /\[textinfo:([^\[]*?)\,([^\[]*?)\]/gm,
      (match, infoText, text) => {return `{"${text}", "${TYPE_TERM}", "${infoText}"}`}
    );
  }
  // this might be necessary if there are loops in the info references
  // if (calledRecursively) {
  //   preparedText = preparedText.replace(
  //     /\[(?!text)[^\[]+?info:([^\[]*?)\,([^\[]*?)\]/gm,
  //     (match, infoKey, text) => {return `{"${text}", "${TYPE_HIGHLIGHT}", ""}`}
  //   );
  // }

  //escape quotation marks
  if(calledRecursively) {
    preparedText = preparedText.replaceAll('"', '"*');
  }
  else {
    preparedText = preparedText.replace(
      /(?:\\n)+/g,
      (match) => `{${match}}`,
    );
  }     
  return preparedText
}

function getInfoText(key){
  const OVERWRITE_INFO_KEYS = new Map([
    ["SpiderlingDescription", "SpiderlingsDescription"],
  ])
  if (OVERWRITE_INFO_KEYS.has(key)){
    key = OVERWRITE_INFO_KEYS.get(key);
  }
  // console.log(`key: ${key} \n` +getText(key, gameData));
  return applyFormatting(getText(key, gameData), calledRecursively = true);
}

function splitBrackets(str, brackets = ["[","]"], depth = 1) {
  let results = [];
  let startIndexes = [];
  let outsideIndex = 0;
  for (let i = 0; i < str.length; i++) {
      if (str[i] === brackets[0]) {
          if (startIndexes.length === depth && outsideIndex < i) results.push(str.substring(outsideIndex, i));
          startIndexes.push(i);
      } else if (str[i] === brackets[1]) {
          if (startIndexes.length > 0) {
              let start = startIndexes.pop();
              if (startIndexes.length === depth || depth < 0) results.push(str.substring(start, i + 1)); // Capture the bracketed expression
              if (startIndexes.length === depth) outsideIndex = i + 1;
          }
      }
  }
  if (outsideIndex < str.length) results.push(str.substring(outsideIndex, str.length));
  return results;
}

const normalizedGameData = cardDataFromGame.map((cardData) => {
  return normalizeGameCardData(cardData);
});
fs.writeFileSync(TARGET_FILE, JSON.stringify(normalizedGameData, null, 4));
// cardDataFromGame

errorList.forEach((err) => console.error(err));

console.log("count of cards from game including perk cards:" + cardDataFromGame.length);
