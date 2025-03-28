const { TYPE_CARD_REF, TYPE_INLINE, TYPE_TERM, TYPE_SUBTEXT, TYPE_HIGHLIGHT, TYPE_BOLD, TYPE_FLAVOR } = require("./card-description-types");
const {loadAllParsedGameData, getText} = require("./card_data/cardDataFunctions")

const fs = require("fs");

const SRC_GAMEDATA = "./batch_jobs/CardData.JSON";
const TARGET_FILE = "./src/generated/jobCardProps.json";

// https://drive.google.com/open?id=0B-3hJBoCehBpQVBUYVdxZDVNSms
const cardDataFromGameRaw = fs.readFileSync(SRC_GAMEDATA);
let cardDataFromGame = JSON.parse(cardDataFromGameRaw);
const gameData = loadAllParsedGameData();

const errorList = [];

function normalizeGameCardData(propsAsMap) {
  propsAsMap.faction = propsAsMap.Faction === "Highlander" ? "Stoutheart" : propsAsMap.Faction;

  if (["Spell", "SummonSpell", "DefensiveSpell"].includes(propsAsMap.type)) {
    propsAsMap.typeSpell = propsAsMap.type;
    propsAsMap.type = "Spell";
  } else if (["Minion", "MultiMinion"].includes(propsAsMap.type)) {
    if (propsAsMap.flying == true) {
      propsAsMap.type = "Flying Minion";
    } else {
      propsAsMap.type = propsAsMap.stationary ? "Building" : "Minion";
    }
  }

  propsAsMap.targets = propsAsMap.hitsFlying === "True" ? "Ground & Air" : "Ground";
  propsAsMap.targets = propsAsMap.attackOnlyStationary === "True" ? "Building" : propsAsMap.targets;
  if (propsAsMap.type === "Spell") {
    propsAsMap.targets = "Is Spell";
  }

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
  //formatting and highlighting
  text = text.replace(
    /\[mec:([^\]]*?)\]/gm,
    `$1`
  );
  text = text.replace(
    /\[b:([^\]]*?)\]/gm,
    (match, text) => {return `{"${text}", "${TYPE_BOLD}", ""}`}
  );
  text = text.replace(
    /\[f:([^\]]*?)\]/gm,
    (match, text) => {return `{"${text}", "${TYPE_FLAVOR}", ""}`}
  );
  text = text.replace(
    /\[actor(?:skill)*?info:([^\[]*?)\,([^\[]*?)\]/gm,
    (match, infoKey, text) => {
      if (gameData.actorsMap.has(infoKey)) return `{"${text}", "${TYPE_CARD_REF}", "${infoKey}"}`
      else return match
    }
  );

  //actorskill-, actor- and spell-info
  if (calledRecursively) {
    text = text.replace(
      /\[(?!text).+?info:([^\[]*?)\,([^\[]*?)\]/gm,
      (match, infoKey, text) => {return `{"${text}", "${TYPE_HIGHLIGHT}", ""}`}
    );
    //escape quotation marks
    text = text.replaceAll('"', '"*');
  }
  else {
    text = text.replace(
      /\[(?!text).+?info:([^\[]*?)\,([^\[]*?)\]/gm,
      (match, infoKey, text) => {return `{"${text}", "${TYPE_TERM}", "${getInfoText(infoKey + "Description")}"}`}
    );
    text = text.replace(
      /\[textinfo:([^\[]*?)\,([^\[]*?)\]/gm,
      (match, infoText, text) => {return `{"${text}", "${TYPE_TERM}", "${infoText}"}`}
    );
    text = text.replace(
      /(?:\\n)+/g,
      (match) => `{${match}}`,
    );
  }
  return text
}

function getInfoText(key){
  const OVERWRITE_INFO_KEYS = new Map([
    ["SpiderlingDescription", "SpiderlingsDescription"],
  ])
  if (OVERWRITE_INFO_KEYS.has(key)){
    key = OVERWRITE_INFO_KEYS.get(key);
  }
  //recursive, hopefully nothing breaks
  // console.log(`key: ${key} \n` +getText(key, gameData));
  return applyFormatting(getText(key, gameData), calledRecursively = true);
}

const normalizedGameData = cardDataFromGame.map((cardData) => {
  return normalizeGameCardData(cardData);
});
fs.writeFileSync(TARGET_FILE, JSON.stringify(normalizedGameData, null, 4));
// cardDataFromGame

errorList.forEach((err) => console.error(err));

console.log("count of cards from game including perk cards:" + cardDataFromGame.length);
