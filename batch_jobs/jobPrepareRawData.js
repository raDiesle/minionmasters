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

  const possiblePropsTypeNumber = ["manacost", "CardCount", "damage", "delay", "duration", "radius", "travelSpeed", "count", "attackspeed", "attackDelay", "range", "UnitId", "Weight", "speed", "dps"];


  possiblePropsTypeNumber.forEach(prop => {
    if(typeof propsAsMap[prop] !== "undefined" && propsAsMap[prop] !== null){
      propsAsMap[prop] = parseInt(propsAsMap[prop]);
    }
  })


  propsAsMap.faction = propsAsMap.Faction === "Highlander" ? "Stoutheart" : propsAsMap.Faction;


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
        propsAsMap.type === "Trap" || (propsAsMap.speed === 0 && ![39, 77, 139].includes(propsAsMap.iD))   ? "Building" : "Minion";
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

  if (iDsMasterAbilitySpells.includes(propsAsMap.iD)) {
    propsAsMap.rarity = "Perk";
  }


  propsAsMap.description = propsAsMap.description.replace(`<link="actor_skill:PermafrostBuff><b><color=orange>Defrost: (35)</color></b></link>`, "Defrost");

  propsAsMap.description = propsAsMap.description.replace(
    `([cv:SpellMultipleMissiles.Variable])]].On each draw: add [v:SpellMultipleMissiles.MISSILES_PER_DRAW] SpellMultipleMissileStacks stacks (Max. [v:SpellMultipleMissiles.MAX_STACKS], starts at [v:SpellMultipleMissiles.STARTING_MISSILES]).Fire an SpellMultipleMissile at a random target in the area for each SpellMultipleMissileStacks stack`,
    `On each draw: add 1 Barrage stacks (Max. 10, starts at 3). Fire an Arcane Projectile at a random target in the area for each Barrage stack.`);

  propsAsMap.description = propsAsMap.description.replace(`ERROR_ERROR_[actorskillinfo:OverloadMulti,[mec:[r:Overload] ([cv:SpellMultipleMissiles.Variable])]].On each draw: add [v:SpellMultipleMissiles.MISSILES_PER_DRAW] [r:SpellMultipleMissileStacks] stacks (Max. [v:SpellMultipleMissiles.MAX_STACKS], starts at [v:SpellMultipleMissiles.STARTING_MISSILES]).Fire an [r:SpellMultipleMissile] at a random target in the area for each [r:SpellMultipleMissileStacks] stack.`,
    `[r:Overload] .On each draw: add 1 Barrage stacks  (Max. 10, starts at 3).Fire an Arcane projectile at a random target in the area for each Barrage stack.`
    );


  propsAsMap.description = propsAsMap.description.replace(
    `<b><color=orange><link="spell_info:MoveScratSpawner>Emergency Tunneling</link></color></b>`, `Emergency Tunneling`);

  propsAsMap.description = propsAsMap.description.replace(
    `<link=\"actor_skill:AccursedAffinity><b><color=orange>Accursed Ascension</color></b></link>`, `Accursed Ascension`);

  propsAsMap.description = propsAsMap.description.replace(
    `<b><color=orange><link=\"actor_info:Skeleton>Skeleton</link></color></b>`, `Skeleton`);

  propsAsMap.description = propsAsMap.description.replace(
    `<link=\"actor_skill:CrystallineSweep><b><color=orange>Crystalline Sweep</color></b></link>`, `Crystalline Sweep`);

  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:BattleDrone>Gn4ts</link>`, `Gn4ts: 15 Health, 10 Damage (DPS: 14.3), 0,7 Sec. Attack delay, Ground & Air attack, Range: 10, Movement Speed: 10`);

  propsAsMap.description = propsAsMap.description.replace(
    `<b><color=orange><link="actor_skill:SideCannons>Side Cannons</link></color></b>.<link="actor_skill:AbilityCard>Ability</link>`, `Side Cannons: Each of the two Side Cannons target idependently of one another, wreaking havoc to nearby Enemies: Damage 8, Cooldown 0.2, Range 6`);

  propsAsMap.description = propsAsMap.description.replace(
    `<b><color=orange><link=\"spell_info:SpellMainCannon>Plasma Blast</link></color></b>`, `Plasma Blast: Ruby shoots her main cannon on target location to deal damage to enemies in the area. Increase the cost of Plasma Blast by 1 mana and replace it in your hand: 180 damage, 90 damage on tower, 4.5 radius, delay 2 Sec`);


  propsAsMap.description = propsAsMap.description.replace(
  `<b><color=orange><link="spell_info:Airstrike>H3LL-F1R3</link></color></b>`, `H3LL-F1R3`);

  propsAsMap.description = propsAsMap.description.replace(
    "<b><color=orange><link=\"spell_info:ResolveAllPoisonDamage>Ring The Gong</link></color></b>",
    `Ring The Gong (All nearby Enemy Minions take all Poison damage immediately. This card stays in your hand until Akinlep's Gong of Pestilence dies,  then it is replaced with Akinlep's Gong of Pestilence and sent to the bottom of your deck. Range: 15. Delay: 0.5 Sec.)`
  );


  propsAsMap.description = propsAsMap.description.replace(
    "[actorskillinfo:OverloadMulti,[mec:",
    ``
  );
  propsAsMap.description = propsAsMap.description.replace(
    "([cv:ShieldFromOutsideAttacks.Variable])]]",
    ``
  );


  propsAsMap.description = propsAsMap.description.replace("ERROR_[actorskillinfo:Myriad,[mec:[r:Myriad]([cv:EarthElementalPebbleCard.Variable])]]", `Myriad`);
  propsAsMap.description = propsAsMap.description.replace("[v:PlayAllCopiesOfCard.COST_INCREASE_PER_COPY]", `1`);
  propsAsMap.description = propsAsMap.description.replace(/\[r\:EarthElementalPebbleCard\]/gi, `Sapphire Pebble`);


  propsAsMap.description = propsAsMap.description.replace("[cv:DroneBuzzerElite.Variable]", `50`);

  propsAsMap.description = propsAsMap.description.replace("[cv:AIMWalker.Variable] [r:Scraps]", `50 Tech`);


  propsAsMap.description = propsAsMap.description.replace("[r:Scraps]", `50`);

  propsAsMap.description = propsAsMap.description.replace("[cv:AIMWalker.Variable]", `40`);

  propsAsMap.description = propsAsMap.description.replace("[textinfo:[r:MarksmanshipBuffDescription],[mec:[r:MarksmanshipBuff]]]", `{\"Marksmanship\", \"TERM\",\"Marksmanship\"}`);

  propsAsMap.description = propsAsMap.description.replace("[f:This drone has the Automated Intelligent Murder system upgrade.]", ``);


  propsAsMap.description = propsAsMap.description.replace("[v:Illusion.DAMAGE]", `30`);
  propsAsMap.description = propsAsMap.description.replace(
    "[cv:SmallFireDragonIllusory.SummonAmounts*0]",
    `2`
  );

  propsAsMap.description = propsAsMap.description.replace("[cv:RageThrowers.SummonAmount]", `2`);

  propsAsMap.description = propsAsMap.description.replace("[cv:RageThrowers.SummonAmounts*0]", `1`);

  propsAsMap.description = propsAsMap.description.replace(
    "[cv:GroundMinionsAndSummonSkeletons.Variable]",
    `6`
  );

  propsAsMap.description = propsAsMap.description.replace(
    "GroundMinionsAndSummonSkeletons",
    `Unholy Ground`
  );

  propsAsMap.description = propsAsMap.description.replace("([cv:Hypnotize.Variable])", `(2)`);

  propsAsMap.description = propsAsMap.description.replace(
    "[cv:ShieldedCrossbowDudes.SummonAmounts*0]",
    `1`
  );

  propsAsMap.description = propsAsMap.description.replace(
    "[f:Still a group of weak ranged Minions. Still great friends.]",
    ``
  );

  propsAsMap.description = propsAsMap.description.replace(
    "[cv:PropellerHorde.SummonAmounts*0]",
    `2`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `[actorskillinfo:SingleShieldBuff,[mec:[r:SingleShieldBuff"}`,
    `Shield`
  );

  propsAsMap.description = propsAsMap.description.replace("[cv:WolfAmongSheep.SummonAmount]", `4`);

  propsAsMap.description = propsAsMap.description.replace(
    "[math:[v:DamageSelfOnAttack.SELF_DAMAGE_PERCENT]/[av:ZealotLeader.AttackCooldown]]",
    `6`
  );

  propsAsMap.description = propsAsMap.description.replace(
    "[cv:DynamicDuo.AdditionalUnitTriggerVariable]",
    `3`
  );

  propsAsMap.description = propsAsMap.description.replace(
    "ERROR_[actorskillinfo:ShieldOfLight,[mec:[r:ShieldOfLight]]][mec:Quest:]",
    ``
  );


  propsAsMap.description = propsAsMap.description.replace(
    "ERROR_ERROR_[actorskillinfo:Overload,[mec:[r:Overload] ([cv:ArcaneRing.Variable])]].[v:SpellCirclingProjectiles.PROJECTILES]",
    `[r:Overload] 8`
  );


  propsAsMap.description = propsAsMap.description.replace(
    "ERROR_[actorskillinfo:Overload,[mec:[r:Overload] ([cv:ArcaneBolt.Variable])]]",
    `Stuns`
  );



  propsAsMap.description = propsAsMap.description.replace(
    "[cv:QuestingMilitiaKnight.Variable]",
    `5`
  );

  propsAsMap.description = propsAsMap.description.replace("[mec:Reward:]", ``);

  propsAsMap.description = propsAsMap.description.replace(
    "[v:SummonLegionnairesIfQuestIsCompleted.SUMMON_AMOUNT]",
    `4`
  );

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
    `[v:SpellStunHighestHealthKillIfLowHealth.KILL_HEALTH_MAX]`,
    `400`
  );


  propsAsMap.description = propsAsMap.description.replace(
    `<b><color=orange> Skeleton</color></b>`,
    `Skeleton`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `<b><color=orange>Crystalline Sweep</color></b>`,
    `Crystalline Sweep`
  );


  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:ShiHouMonkey>Shi-Hou</link>`,
    `{"Shi-Hou", "${TYPE_CARD_REF}", "Windwalker Shi-Hou "}`
  );

  propsAsMap.description = propsAsMap.description.replace(
    `<link="actor_info:RangedMonkey>Mu-Hou</link>`,
    `{"Mu-Hou", "${TYPE_CARD_REF}", "Jade Flingers"}`
  );

/*
  propsAsMap.description = propsAsMap.description.replace(`<link="actor_skill:PlaySelf>Impatient</link>`,
    `{"Impatient", "${TYPE_TERM}", "Impatient"}`);
*/
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

const newManualCards = [
  {
    "catagory": "Standard",
    "name": "Stormtamer",
    "manacost": 4,
    "type": "Minion",
    "rarity": "Supreme",
    "imageName": "OwlCaster",
    "description": "Lifts enemy minions into the air with a cyclone and attacks it. The minion gains flying but cannot attack or move while in the Cyclone.",
    "isAOE": false,
    "ExcludeFromRandom": false,
    "Faction": "Highlander",
    "CardCount": 3,
    "count": 1,
    "health": "200",
    "attackspeed": 2500,
    "attackDelay": 500,
    "damage": 40,
    "range": 6000,
    "isRanged": true,
    "hitsFlying": true,
    "unitToSummon": "Stormtamer",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 5,
    "dps": 30,
    "iD": 999,
    "faction": "Stoutheart",
    "targets": "Ground & Air"
  },
  {
    "catagory": "Standard",
    "name": "Spire Stag",
    "manacost": 4,
    "type": "Minion",
    "rarity": "Common",
    "imageName": "StormSteed",
    "description": "When no Enemies are near, Spire Stag begins to gallop. While galloping, it deals extra damage and knocks enemies back.",
    "isAOE": false,
    "ExcludeFromRandom": false,
    "Faction": "CrystalElf",
    "CardCount": 3,
    "count": 1,
    "health": "400",
    "attackspeed": 1500,
    "attackDelay": 500,
    "damage": 30,
    "range": 6000,
    "isRanged": false,
    "hitsFlying": false,
    "unitToSummon": "StormSteed",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 5,
    "dps": 20,
    "iD": 998,
    "faction": "CrystalElf",
    "targets": "Ground"
  },
  {
    "catagory": "Standard",
    "name": "Resonating Construct",
    "manacost": 3,
    "type": "Minion",
    "rarity": "Rare",
    "imageName": "ResonatingConstruct",
    "description": "Mana Freeze (3). On death, this drops a Blast Crystal.",
    "isAOE": false,
    "ExcludeFromRandom": false,
    "Faction": "CrystalElf",
    "CardCount": 3,
    "count": 1,
    "health": "800",
    "attackspeed": 6000,
    "attackDelay": 5000,
    "damage": 120,
    "range": 6000,
    "isRanged": false,
    "hitsFlying": false,
    "unitToSummon": "ResonatingConstruct",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 4,
    "dps": 20,
    "iD": 997,
    "faction": "CrystalElf",
    "targets": "Ground"
  },
  {
    "catagory": "Standard",
    "name": "High Marshal Rystar",
    "manacost": 10,
    "type": "Minion",
    "rarity": "Legendary",
    "imageName": "EmpyreanCommander",
    "description": "Legion (3). The next 10 Legionnaires you would summon are promoted to Centurions.",
    "isAOE": true,
    "ExcludeFromRandom": true,
    "Faction": "Empyrean",
    "CardCount": 3,
    "count": 1,
    "health": "600",
    "attackspeed": 3000,
    "attackDelay": 1000,
    "damage": 200,
    "range": 6000,
    "isRanged": false,
    "hitsFlying": false,
    "unitToSummon": "EmpyreanCommander",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 4,
    "dps": 66.7,
    "iD": 996,
    "faction": "Empyrean",
    "targets": "Ground"
  },
  {
    "catagory": "Standard",
    "name": "Crossbow Club House",
    "manacost": 4,
    "type": "Building",
    "rarity": "Supreme",
    "imageName": "LookOutTower",
    "description": "Summons Crossbow Dudes when destroyed.",
    "isAOE": false,
    "ExcludeFromRandom": false,
    "Faction": "Empyrean",
    "CardCount": 3,
    "count": 1,
    "health": "600",
    "attackspeed": 700,
    "attackDelay": 300,
    "damage": 20,
    "range": 10000,
    "isRanged": true,
    "hitsFlying": true,
    "unitToSummon": "LookOutTower",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 0,
    "dps": 28.6,
    "iD": 995,
    "faction": "Empyrean",
    "targets": "Ground & Air"
  },
  {
    "catagory": "Standard",
    "name": "Nezara The Cold Countess",
    "manacost": 6,
    "type": "Minion",
    "rarity": "Legendary",
    "imageName": "IceVampire",
    "description": "Cold Blood Vampiric, True Damage, Ability - Frost Nova",
    "isAOE": false,
    "ExcludeFromRandom": false,
    "Faction": "Accursed",
    "CardCount": 3,
    "count": 1,
    "health": "450",
    "attackspeed": 1000,
    "attackDelay": 500,
    "damage": 20,
    "range": 10000,
    "isRanged": false,
    "hitsFlying": false,
    "unitToSummon": "IceVampire",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 5,
    "dps": 70,
    "iD": 994,
    "faction": "Accursed",
    "targets": "Ground"
  },
  {
    "catagory": "Standard",
    "name": "Frostfang Familiar",
    "manacost": 2,
    "type": "Flying Minion",
    "rarity": "Supreme",
    "imageName": "VampireFamiliar",
    "description": "Haunts a nearby friendly Minion. Haunted Minion gains Vampiric and casts Frost Nova. When haunted Minion dies, Frostfang Familiar reappears.\nStuns Masters for 5 seconds.",
    "isAOE": false,
    "ExcludeFromRandom": false,
    "Faction": "Empyrean",
    "CardCount": 3,
    "count": 1,
    "health": "50",
    "attackspeed": 2500,
    "attackDelay": 2500,
    "damage": 0,
    "range": 10000,
    "isRanged": false,
    "hitsFlying": true,
    "unitToSummon": "VampireFamiliar",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 5,
    "dps": 0,
    "iD": 993,
    "faction": "Accursed",
    "targets": "Ground & Air"
  },
  {
    "catagory": "Standard",
    "name": "Kamikazeppelin",
    "manacost": 6,
    "type": "Spell",
    "rarity": "Supreme",
    "imageName": "Kamikazeppelin",
    "description": "A Kamikazeppelin flies towards and crashes into targeted area dropping bombs along the way. Piloted.",
    "isAOE": true,
    "ExcludeFromRandom": false,
    "Faction": "Scrat",
    "CardCount": 3,
    "count": 0,
    "health": "50",
    "attackspeed": 0,
    "attackDelay": 0,
    "damage": 150,
    "range": 5000,
    "isRanged": false,
    "hitsFlying": false,
    "unitToSummon": "Kamikazeppelin",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 5,
    "dps": 0,
    "iD": 992,
    "faction": "Scrat",
    "targets": "Ground"
  },
  {
    "catagory": "Standard",
    "name": "Wartrack Dreadnaught",
    "manacost": 5,
    "type": "Minion",
    "rarity": "Legendary",
    "imageName": "ScratAt",
    "description": "Mythic, Piloted (1)  If played after gaining Perk 2: Costs +2 Mana. Health +200, Piloted (+2), gains an extra attack.  If played after gaining Perk 3: Costs +4 Mana. Health: +500, Piloted (+4), gains an extra attack and shoots Missile Scrats out of its back.",
    "isAOE": true,
    "ExcludeFromRandom": true,
    "Faction": "Scrat",
    "CardCount": 3,
    "count": 1,
    "health": "450",
    "attackspeed": 2000,
    "attackDelay": 1000,
    "damage": 50,
    "range": 8000,
    "isRanged": true,
    "hitsFlying": false,
    "unitToSummon": "ScratAt",
    //"UnitId": 258,
    "Weight": 1500,
    "speed": 5,
    "dps": 25,
    "iD": 991,
    "faction": "Scrat",
    "targets": "Ground"
  },
];



const normalizedGameData = cardDataFromGame
  .filter(({ iD }) => {
    const SKIP_CARDS = [
      379,// big tombstone
      18, // all in
      109, // cursed fireball
      307, // Searing Light
      281, // black hole adventure card
      // 126, // R3-KT
      127, // one punch blast
      126, // shadow dance
      332, // Drain life

      372, // city patrol
      370, // banner of last stand
    ];
    return !SKIP_CARDS.includes(parseInt(iD));
  })
  .map((cardData) => {
    return normalizeGameCardData(cardData);
  });

const normalizedGameDataWithManualData = [normalizedGameData, newManualCards].flat();

fs.writeFileSync(TARGET_FILE, JSON.stringify(normalizedGameDataWithManualData, null, 4));
// cardDataFromGame

errorList.forEach((err) => console.error(err));

console.log("count of cards from game including perk cards:" + cardDataFromGame.length);
