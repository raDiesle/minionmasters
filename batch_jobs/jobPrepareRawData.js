const { TYPE_CARD_REF, TYPE_INLINE, TYPE_TERM, TYPE_SUBTEXT } = require("./card-description-types");

const invert = require("lodash.invert");
const _mapValues = require("lodash.mapvalues");
const fs = require("fs");

const SRC_GAMEDATA = "./batch_jobs/CardData.JSON";
const SRC_WIKI = "./batch_jobs/generated/jobFetchRawDataFromWiki.json";
const TARGET_FILE = "./src/generated/jobCardProps.json";

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
    1704: "Melee",
  };
  const bugsPageIdToCountMapperWikiBugsConfig = {
    1877: 2,
    1688: 2,
    1706: 5,
    1689: 2,
    1925: 2,
  };

  if (Object.keys(bugsPageIdToRangeMapperWikiBugsConfig).includes("" + propsAsMap.pageId)) {
    propsAsMap.range = bugsPageIdToRangeMapperWikiBugsConfig[propsAsMap.pageId];
  }
  if (Object.keys(bugsPageIdToCountMapperWikiBugsConfig).includes("" + propsAsMap.pageId)) {
    propsAsMap.count = bugsPageIdToCountMapperWikiBugsConfig[propsAsMap.pageId];
  }

  const PROPS_PARSE_TO_INT = [
    "pageId",
    "health",
    "attackspeed",
    "attackdelay",
    "duration",
    "range",
    "speed",
    "damage",
    "manacost",
    "radius",
    "count",
  ];
  PROPS_PARSE_TO_INT.forEach((prop) => {
    let currentPropValue = propsAsMap[prop];
    if (typeof currentPropValue !== "undefined") {
      let isToConvertMeleeToNumeric = prop === "range" && currentPropValue === "Melee";
      if (isToConvertMeleeToNumeric) {
        propsAsMap[prop] = 0;
        return propsAsMap;
      }

      if (isNaN(currentPropValue)) {
        propsAsMap[prop] = currentPropValue.replace(/\D/g, "");
        console.info(
          `cheated to parse:${currentPropValue} to "${propsAsMap[prop]}" of "${propsAsMap.pageId}"`
        );
      } else {
        propsAsMap[prop] = parseInt(currentPropValue);
      }
    }
  });

  propsAsMap.description = propsAsMap.description.replace(
    /[[(.*?)]]/gm,
    "<span className='htmlCardRef' data-card='$1'>$1</span>"
  );

  // might be obsolete
  const werewolveInlineInfo = `Accursed - Minion
        - 400 health.
        - 40 damage (DPS: 36,4).
        - 1,1 sec. attackspeed.
        - Melee.
        - speed: 8.
        `;
  propsAsMap.description = propsAsMap.description.replace(
    /\<span class\=\'htmlCardRef\' data\-card\=\'Werewolf\'>Werewolf\<\/span\>/gm,
    `<span class='htmlTextRef' data-inline-text='${werewolveInlineInfo}'><span class='htmlHighlight' data-highlight='Werewolf'>Werewolf</span></span>`
  );

  return propsAsMap;
}

function normalizeGameCardData(propsAsMap) {
  // match by id manual
  // wikiNameToGameIDMappingConfig
  propsAsMap.iD = parseInt(propsAsMap.iD);

  propsAsMap.faction = propsAsMap.Faction;

  propsAsMap.faction = propsAsMap.faction === "Highlander" ? "Stoutheart" : propsAsMap.faction;

  delete propsAsMap.Faction;

  if (typeof propsAsMap.InheritFromId != "undefined") {
    const inheritFromData = cardDataFromGame.find(
      ({ UnitId }) => parseInt(UnitId) === parseInt(propsAsMap.InheritFromId)
    );
    const propsToInherit = [
      "speed",
      "dps",
      "range",
      "attackDelay",
      "attackspeed",
      "damage",
      "health",
    ];
    if (typeof inheritFromData !== "undefined") {
      propsToInherit.forEach((propKey) => {
        const valueToTake = inheritFromData[propKey];
        // only inherit, if original value is 0 or ""
        const isToOverrideValue = !propsAsMap[propKey];
        if (isToOverrideValue) {
          propsAsMap[propKey] = valueToTake;
        }
      });
    } else {
      errorList.push("cannot inherit from: " + propsAsMap.InheritFromId);
    }
  }

  if (["Spell", "SummonSpell", "DefensiveSpell"].includes(propsAsMap.type)) {
    propsAsMap.type = "Spell";
  } else if (["Minion", "MultiMinion"].includes(propsAsMap.type)) {
    if (propsAsMap.flying === "True") {
      propsAsMap.type = "Flying Minion";
    } else {
      propsAsMap.type =
        propsAsMap.type === "Trap" || propsAsMap.speed === 0 ? "Building" : "Minion";
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
    88, // shield totem
    89, // blast entry
    116, // more dakka
    207, // crossbow trap
    208, // decoy trap
    243, // queen dragon
  ];

  if (iDsMasterAbilitySpells.includes(propsAsMap.iD)) {
    propsAsMap.rarity = "Perk";
  }

  /* special parsings */
  propsAsMap.description = propsAsMap.description.replace(
    "[cv:DeadlyTwins.AdditionalUnitTriggerVariable]",
    `5`
  );
  propsAsMap.description = propsAsMap.description.replace("[math:[av:Jahun.Damage]/2]", `75`);

  propsAsMap.description = propsAsMap.description.replace(
    "[cv:DynamicDuo.AdditionalUnitTriggerVariable]",
    `3`
  );

  propsAsMap.description = propsAsMap.description.replace(
    "[math:[v:DamageSelfOnAttack.SELF_DAMAGE_PERCENT]/[av:ZealotLeader.AttackCooldown]]",
    `6`
  );
  propsAsMap.description = propsAsMap.description.replace(
    "[cv:PropellerHorde.SummonAmounts*0]",
    "2"
  );

  propsAsMap.description = propsAsMap.description.replace(
    "ERROR_[actorskillinfo:Cohort,[mec:[r:Cohort]]] ([cv:Hypnotize.Variable])",
    `{"Slitherbound (2)", "${TYPE_TERM}","CohortTwo"}`
  );

  propsAsMap.description = propsAsMap.description.replace("ERROR_[r:ZealotLeaderFirst]", "Ardera");

  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:ShiHouMonkey>Shi-Hou</link>`,
    `{"Shi-Hou", "${TYPE_CARD_REF}", "Windwalker Shi-Hou "}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:RangedMonkey>Mu-Hou</link>`,
    `{"Mu-Hou", "${TYPE_CARD_REF}", "Jade Flingers"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `<link="plain_text:+2 range><b><color=orange>Marksmanship</color></b></link>`,
    `{"Marksmanship", "${TYPE_TERM}","Marksmanship"}`
  );
  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:GaxEgg>Egg</link>`,
    `{"Egg", "${TYPE_TERM}","GaxEgg"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:BoomerEgg>Egg</link>`,
    `{"Egg", "${TYPE_TERM}","BoomerEgg"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:ReBoomerEgg>Egg</link>`,
    `{"Egg", "${TYPE_TERM}","ReBoomerEgg"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    "[math:[av:BridgeShrine.LifeTime]/[math:[v:GeneratePowerOverTime.POWER_DELAY]/1000]]",
    "18"
  );
  propsAsMap.description = propsAsMap.description.replace("[av:BridgeShrine.LifeTime]", "45");
  propsAsMap.description = propsAsMap.description.replace(
    "[v:TakeDamageOverTimeExtraDuringManaFrenzy.OVERHEAT_MULTIPLIER]",
    "3"
  );
  propsAsMap.description = propsAsMap.description.replace("[cv:Skeletons.SummonAmounts*0]", "3");
  propsAsMap.description = propsAsMap.description.replace("[r:SkeletonUnits]", "Skeletons");
  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:SlitherDarterSlave>Slitherbound Darter</link>`,
    `{"Slitherbound Darter", "${TYPE_TERM}","SlitherDarterSlave"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:SlitherLancerSlave>Slitherbound Lancer</link>`,
    `{"Slitherbound Lancer", "${TYPE_TERM}","SlitherLancerSlave"}`
  );

  propsAsMap.description = propsAsMap.description.replace("<b>each team</b>", "each team");

  propsAsMap.description = propsAsMap.description.replace("[r:Jahun]", "Jahun");

  propsAsMap.description = propsAsMap.description.replace(
    /\<link="spell_info:([ a-zA-Z]+?)>([ a-zA-Z]+?)<\/link>/gm,
    `{"$2", "${TYPE_CARD_REF}", "$1"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    /<link="actor_info:([ a-zA-Z]+?)><b><color=orange>([ a-zA-Z]+?)<\/color><\/b><\/link>/gm,
    `{"$2", "${TYPE_CARD_REF}","$1"}`
  );

  // <link="actor_skill:SoulDetonateBuff><b><color=orange>Soul Detonate</color></b></link>
  // <link="actor_skill:ManaSurgeBuff><b><color=orange>Mana Surge</color></b></link>
  // <link="actor_skill:Overload><b><color=orange>Mana Freeze (1)</color></b></link>
  propsAsMap.description = propsAsMap.description.replace(
    /<link="actor_skill:([ a-zA-Z]+?)><b><color=orange>([ a-zA-Z(0-9)-]+?)<\/color><\/b><\/link>/gm,
    `{"$2", "${TYPE_TERM}","$1"}`
  );
  propsAsMap.description = propsAsMap.description.replace(
    "ERROR_[r:WitchQueenBookEffect1DescriptionPerk1][mec:[r:WitchQueenPerk2]]: [r:WitchQueenBookEffect1DescriptionPerk2]",
    "Summon 3 on Perk 1, 6 on Perk 2 Skelettons"
  );
  propsAsMap.description = propsAsMap.description.replace(
    "[math:[av:CrossbowTrap.Damage]/[av:CrossbowTrap.AttackCooldown]]",
    " 30 "
  );
  propsAsMap.description = propsAsMap.description.replace(
    "[av:CrossbowTrap.LifeTime]",
    "15 seconds "
  );
  propsAsMap.description = propsAsMap.description.replace("[av:DecoyTrap.LifeTime]", " 15 ");

  propsAsMap.description = propsAsMap.description.replace("[av:DecoyTrap.MaxHealth]", " 300 ");
  propsAsMap.description = propsAsMap.description.replace("[r:DionaCrossBowTrap]", "Crossbow Trap");

  propsAsMap.description = propsAsMap.description.replace("[mec:[r:Nyrvir]]", "Nyrvir");

  propsAsMap.description = propsAsMap.description.replace("[mec:[av:Nyrvir.MaxHealth]", " 2000 ");

  propsAsMap.description = propsAsMap.description.replace("[av:CrossbowTrap.MaxHealth]", " 100 ");

  propsAsMap.description = propsAsMap.description.replace("[av:Nyrvir.Damage]", " 320 ");

  propsAsMap.description = propsAsMap.description.replace("(Dps: [dps:Nyrvir])]", " (Dps: 40) ");

  propsAsMap.description = propsAsMap.description.replace("[sv:BlastEntry.Damage]", " 50 ");
  propsAsMap.description = propsAsMap.description.replace("[av:SettsuMinion.MaxHealth]", " 300 ");

  propsAsMap.description = propsAsMap.description.replace("[r:DionaDecoyTrap]", "Decoy Trap");
  propsAsMap.description = propsAsMap.description.replace(
    "[cv:ShieldedCrossbowDudes.SummonAmounts*0]",
    " 1 "
  );
  propsAsMap.description = propsAsMap.description.replace(
    "[f:Still a group of weak ranged Minions. Still great friends.]",
    "Still a group of weak ranged Minions. Still great friends."
  );

  //  <link="actor_info:CrystalSentry>Crystal Sentries</link>
  // <link="actor_info:ShiHouMonkey>Shi-Hou</link>
  propsAsMap.description = propsAsMap.description.replace(
    /<link="actor_info:([ a-zA-Z]+?)>([ a-zA-Z-]+?)<\/link>/gm,
    `{"$2", "${TYPE_CARD_REF}","$1"}`
  );
  propsAsMap.description = propsAsMap.description.replace(
    "<b><color=orange>Unholy Bargain</color></b>",
    " Unholy Bargain"
  );

  // <b><color=orange>Unholy Bargain</color></b>
  // only to be used when not nested with other variables, otherwise handled above
  propsAsMap.description = propsAsMap.description.replace(
    /<b><color=orange>([ a-zA-Z]?)<\/color><\/b>/gm,
    `{"$1", "${TYPE_TERM}"}` // REQUIRES DATA
  );

  propsAsMap.description = propsAsMap.description.replace(
    /<size=20><color=#808080>(.*?)<\/color><\/size>/,
    `{"$1", "${TYPE_SUBTEXT}"}`
  );

  /* fix new inline syntax */
  propsAsMap.description = propsAsMap.description.replace(
    /\[actorinfo\:(.*?)\,\[r\:(.*?)\]\]/gm,
    `{"$1", "${TYPE_CARD_REF}", "$2"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    /\[spellinfo:(.*?)\,\[r:(.*?)\]\]/gm,
    `{"$1", "${TYPE_TERM}", "$2"}`
  );
  propsAsMap.description = propsAsMap.description.replace(
    /\[actorskillinfo:(.*?)\,.*?\:\[r:(.*?)\]\]\]/gm,
    `{"$1", "${TYPE_TERM}", "$2"}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    /\[r:(.*?)\]/gm,
    `{"$1", "${TYPE_TERM}", "$1"}`
  );

  propsAsMap.description = propsAsMap.description.replace(/ERROR_/, "");

  /*
  propsAsMap.description = propsAsMap.description.replace(
    new RegExp(/\. /, "g"),
    ".<br />"
  );
  */

  const propsAsMapParsedValues = _mapValues(propsAsMap, (val) => {
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
    1925: 249, //  SlitherSlaves
    1877: 239, //  Forward Scouts
    1967: 261, //
    1883: 241, // Nyvir the fallen
    1793: 207, // master card
    1794: 208, // master card
    1643: 89, // master card
    1999: 279,
  };
  const gameiDToWikiPageIdMappingConfig = invert(wikiPageIdToGameIdMappingConfig);
  const matchedDataFromWikiByName = cardDataFromWiki.find(
    ({ name }) => cardDataFromGame.name === name
  );

  // match by name
  const matchedDataFromWikiById =
    matchedDataFromWikiByName ||
    cardDataFromWiki.find(
      ({ pageId }) => parseInt(gameiDToWikiPageIdMappingConfig[cardDataFromGame.iD]) === pageId
    );
  if (matchedDataFromWikiById) {
    cardDataFromGame.pageId = parseInt(matchedDataFromWikiById.pageId);
    cardDataFromGame.image = matchedDataFromWikiById.image;
    //cardDataFromGame.targets = matchedDataFromWikiById.targets; // to be replaced with hitsTarget, when fixed in dataset
    // cardDataFromGame.type = matchedDataFromWikiById.type;
    // NOT REQUIRED ANYMORE cardDataFromGame.faction = matchedDataFromWikiById.faction;
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
      279: "Windwalker.jpg",
      291: "SummonUndyingCorpse.jpg",
      292: "GroundMinionsAndSummonSkeletons.jpg",
      293: "CorpseExplosion.jpg",
      218: "MorgrulsRagers.jpg",
    };
    cardDataFromGame.image = gameIdToCustomImage[cardDataFromGame.iD] || "Notavailable.png";
  }

  if (typeof cardDataFromGame.pageId === "undefined") {
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
    const imageNormalized =
      cardDataFromGame.image.charAt(0).toUpperCase() + cardDataFromGame.image.slice(1);
    cardDataFromGame.image = imageNormalized;

    const imageSrc = cardDataFromGame.image.split(".");
    const OVERRIDE_FORMAT = ""; // .webp
    cardDataFromGame.image = imageSrc[0] + OVERRIDE_FORMAT;
  } else {
    errorList.push("could not find image for: " + cardDataFromGame.name);
  }

  console.log("loaded:" + cardDataFromGame.pageId);
  return cardDataFromGame;
}

const normalizedWikiData = cardDataFromWiki.map((cardData) => {
  const normalizedDataSet = normalizeWikiData(cardData);
  return normalizedDataSet;
});

const normalizedGameData = cardDataFromGame
  .filter(({ iD }) => {
    const SKIP_CARDS = [18, 109];
    return !SKIP_CARDS.includes(parseInt(iD));
  })
  .map((cardData) => {
    return normalizeGameCardData(cardData);
  });
console.log(normalizeWikiData);
const cardDataWikiAsMasterMergedWithGameData = normalizedGameData.map((gameDataset) => {
  return mapGameDataToWikiData(gameDataset, normalizedWikiData);
});

fs.writeFileSync(TARGET_FILE, JSON.stringify(cardDataWikiAsMasterMergedWithGameData, null, 4));
// cardDataFromGame

errorList.forEach((err) => console.error(err));

console.log("count of cards from game:" + cardDataFromGame.length);
console.log("count of cards from wiki:" + cardDataFromWiki.length);
console.log("count of merged data:" + cardDataWikiAsMasterMergedWithGameData.length);
