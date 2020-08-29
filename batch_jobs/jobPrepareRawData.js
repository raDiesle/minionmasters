const { TYPE_CARD_REF, TYPE_INLINE, TYPE_TERM, TYPE_SUBTEXT } = require("./card-description-types");

const invert = require("lodash.invert");
const _mapValues = require("lodash.mapvalues");
const fs = require("fs");

const SRC_GAMEDATA = "./batch_jobs/CardData.JSON";

const TARGET_FILE = "./src/generated/jobCardProps.json";

// https://drive.google.com/open?id=0B-3hJBoCehBpQVBUYVdxZDVNSms
const cardDataFromGameRaw = fs.readFileSync(SRC_GAMEDATA);
let cardDataFromGame = JSON.parse(cardDataFromGameRaw);

const errorList = [];

function normalizeGameCardData(propsAsMap) {
  // match by id manual
  propsAsMap.iD = parseInt(propsAsMap.iD);

  propsAsMap.faction = propsAsMap.Faction;

  propsAsMap.faction = propsAsMap.faction === "Highlander" ? "Stoutheart" : propsAsMap.faction;

  delete propsAsMap.Faction;

  const isIllusoryCleaver = propsAsMap.iD === 39;
  if (typeof propsAsMap.InheritFromId != "undefined" && !isIllusoryCleaver) {
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
    propsAsMap.typeSpell = propsAsMap.type;
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

  /*
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

  propsAsMap.description = propsAsMap.description.replace("ERROR_[r:ZealotLeaderFirst]", "Ardera");
*/
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

  // Herard bug
  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_skill:Cohort><b><color=orange>Call Slitherbound</color></b> (2)</link>`,
    `<link="actor_skill:Cohort><b><color=orange>Call Slitherbound</color></b></link> (2)`
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
  // <link="actor_skill:Cohort><b><color=orange>Call Slitherbound</color></b></link>
  // <link="actor_skill:Cohort><b><color=orange>Call Slitherbound</color></b>
  // <link="actor_skill:Cohort><b><color=orange>Call Slitherbound</color></b></link>
  propsAsMap.description = propsAsMap.description.replace(
    /<link="actor_skill:([ a-zA-Z]+?)><b><color=orange>([ a-zA-Z(0-9)-]+?)<\/color><\/b><\/link>/gm,
    `{"$2", "${TYPE_TERM}","$1"}`
  );

  /*
    propsAsMap.description = propsAsMap.description.replace("[r:Jahun]", "Jahun");
  propsAsMap.description = propsAsMap.description.replace(
    "ERROR_[r:WitchQueenBookEffect1DescriptionPerk1][mec:[r:WitchQueenPerk2]]: [r:WitchQueenBookEffect1DescriptionPerk2]",
    "Summon 3 on Perk 1, 6 on Perk 2 Skelettons"
  );

  propsAsMap.description = propsAsMap.description.replace("[av:DecoyTrap.LifeTime]", " 15 ");

  propsAsMap.description = propsAsMap.description.replace("[av:DecoyTrap.MaxHealth]", " 300 ");
  propsAsMap.description = propsAsMap.description.replace("[r:DionaCrossBowTrap]", "Crossbow Trap");

  propsAsMap.description = propsAsMap.description.replace("[mec:[r:Nyrvir]]", "Nyrvir");

  propsAsMap.description = propsAsMap.description.replace("[mec:[av:Nyrvir.MaxHealth]", " 2000 ");

  propsAsMap.description = propsAsMap.description.replace("[av:CrossbowTrap.MaxHealth]", " 100 ");

  propsAsMap.description = propsAsMap.description.replace("[av:Nyrvir.Damage]", " 320 ");

  propsAsMap.description = propsAsMap.description.replace("(Dps: [dps:Nyrvir])]", " (Dps: 40) ");

  propsAsMap.description = propsAsMap.description.replace("[r:DionaDecoyTrap]", "Decoy Trap");

    propsAsMap.description = propsAsMap.description.replace(
    "[cv:ShieldedCrossbowDudes.SummonAmounts*0]",
    " 1 "
  );
  propsAsMap.description = propsAsMap.description.replace(
    "[f:Still a group of weak ranged Minions. Still great friends.]",
    "Still a group of weak ranged Minions. Still great friends."
  );

  */

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

  // propsAsMap.description = propsAsMap.description.replace(/ERROR_/, "");

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

const normalizedGameData = cardDataFromGame
  .filter(({ iD }) => {
    const SKIP_CARDS = [
      18, // all in
      109, // cursed fireball
      307, // Searing Light
      281, // black hole adventure card
    ];
    return !SKIP_CARDS.includes(parseInt(iD));
  })
  .map((cardData) => {
    return normalizeGameCardData(cardData);
  });

fs.writeFileSync(TARGET_FILE, JSON.stringify(normalizedGameData, null, 4));
// cardDataFromGame

errorList.forEach((err) => console.error(err));

console.log("count of cards from game including perk cards:" + cardDataFromGame.length);
