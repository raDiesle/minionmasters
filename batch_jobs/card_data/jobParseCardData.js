
const fs = require("fs");
const {
    parseAndSaveGameData, loadSingleParsedGameData, loadAllParsedGameData, mapToArray,
    getText, makeArray, getUnitDps, getMax, getSum,
} = require("./cardDataFunctions");
const { forEach, max, sum, round } = require("lodash");

const DATA_TARGET_DIRECTORY = "batch_jobs/";
const parseTextDataCompletely = true;

parseAndSaveGameData(parseTextDataCompletely);
const dataMaps = loadAllParsedGameData();
const {
    actorsMap,
    cardsMap,
    spellsMap,
    textMap,
} = dataMaps;

let cardData = [];
cardsMap.forEach((cardProps, cardTitle) => {
    //only select cards from standard category (no ability/disabled cards)
    const card = {Title: cardTitle, ...cardProps}
    if (!card.Category || card.Category == "Standard" || card.Category == "AbilityCard"){
        cardData.push(getCardData(card));
    }
});

fs.writeFileSync(DATA_TARGET_DIRECTORY+"CardData.json", JSON.stringify(cardData, null, 4));

function getCardData(card){
    let object = new Object();
    object.iD = card.CardIndex;
    object.catagory = card.Category ? card.Category : "Standard";
    object.title = card.Title;
    object.name = getText(card.Title, dataMaps);
    object.description = getText(card.Description, dataMaps);
    object.manacost = card.Cost;
    object.CardCount = "?";
    object.type = card.Type;
    object.rarity = makeArray(card.Rarity)[0];
    object.faction = card.Faction;
    object.imageName = makeArray(card.ImageName)[0];
    object.isAOE = makeArray(card.FilterTag).includes("AoEFilterTag");
    object.ExcludeFromRandom = card.ExcludeFromRandom ? card.ExcludeFromRandom : false;
    let unitNames = makeArray(card.MainUnitsToSummon)
    if(unitNames[0] && unitNames.every(name => actorsMap.has(name))){
        //Minion/Building stats
        let units = unitNames.map(unitName => actorsMap.get(unitName));
        object.count = units.length;
        object.flying = units.some(unit => unit.Flying == true);
        object.stationary = units.some(unit => unit.Stationary == true);
        object.lifeTime = object.stationary ? units[0].LifeTime : undefined;
        object.cantAttack = units.every(unit => unit.CantAttack) ? true : undefined;
        object.hitsFlying = units.some(unit => unit.HitsFlying == true);
        object.attackOnlyStationary = units.some(unit => unit.AttackOnlyStationary == true);
        object.isRanged = units.some(unit => unit.IsRanged == true);
        object.isMelee = units.some(unit => (unit.isRanged == false && unit.BaseAttackDontDamage == undefined) || unit.IsMelee);
        object.isSpecial = units.some(unit => (unit.BaseAttackDontDamage != undefined && !(unit.IsRanged || unit.IsMelee || unit.CantAttack)));
        object.damage = object.cantAttack ? 0 : units[0].Damage;
        object.dps = getUnitDps(units[0]);
        object.totalDps = getSum(units, unit => getUnitDps(unit));
        object.attackspeed = units[0].AttackCooldown;
        object.attackDelay = units[0].AttackDelay;
        object.health = units[0].MaxHealth;
        object.totalHealth = getSum(units, unit => unit.MaxHealth);
        object.range = units[0].Range;
        object.speed = units[0].Speed;
        object.Weight = units[0].Radius;

    }
    else if(card.SpellIdentifier){
        //Spell stats
        let spell = spellsMap.get(card.SpellIdentifier);
        object.count = 0;
        object.radius = spell.Radius;
        object.damage = spell.Damage;
        object.towerDamage = spell.TowerDamage ? spell.TowerDamage : spell.Damage;
        object.delay = spell.Delay;
        object.duration = spell.Duration;
        object.travelSpeed = spell.TravelSpeed;

    }
    else console.log("Error classifying card. ID: " + object.iD + " " + unitNames[0])
    return object;
}

