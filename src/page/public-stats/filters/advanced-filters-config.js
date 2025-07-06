import { getCardCount } from "../stats-functions";
import cardData from "generated/jobCardProps.json";

const cardCount = getCardCount();

export const FilterOperators = {
    GREATER_EQ: ">=",
    LESS_EQ: "<=",
    // EQUAL: "=",
}

// export const FilterAttributes = {
//     PLAYRATE_1V1: "Playrate 1v1",
//     PLAYRATE_2V2: "Playrate 2v2",
//     PLAYRATE_OVERALL: "Playrate Overall",

//     WINRATE_1V1: "Winrate 1v1",
//     WINRATE_2V2: "Winrate 2v2",
//     WINRATE_OVERALL: "Winrate Overall",

//     DOMINANCE_SCORE_1V1: "Dominance 1v1",
//     DOMINANCE_SCORE_2V2: "Dominance 2v2",
//     DOMINANCE_SCORE_OVERALL: "Dominance Overall",
// }


export const FilterCategories = {
    MATCH_STATS: "Match Stats",
    CARD_STATS: "Card Stats",
    KEYWORDS: "Keywords",
    UNITS: "Units"
}



class FilterAttribute{
    constructor(label, defaultValue = undefined, category = "", isPercent = false, factor = 1, key = undefined){
        // the key should be the key used for the corresponding property in jobCardProps.json
        // the key will be set 
        this.label = label;
        this.defaultValue = defaultValue;
        this.category = category;
        this.key = key;
        this.isPercent = isPercent;
        this.factor = isPercent ? 100 : factor;
    }

    getSubCategory(labelPosition = 0){
        return this.label.split(" ")[labelPosition]
    }
}


export const FilterAttributes = {
    playrate1v1: new FilterAttribute("Playrate 1v1", (10/cardCount).toFixed(4)*1.0, FilterCategories.MATCH_STATS, true),
    playrate2v2: new FilterAttribute("Playrate 2v2", (10/cardCount).toFixed(4)*1, FilterCategories.MATCH_STATS, true),
    playrateOverall: new FilterAttribute("Playrate Overall", (10/cardCount).toFixed(4)*1, FilterCategories.MATCH_STATS, true),

    winrate1v1: new FilterAttribute("Winrate 1v1", 0.5, FilterCategories.MATCH_STATS, true),
    winrate2v2: new FilterAttribute("Winrate 2v2", 0.5, FilterCategories.MATCH_STATS, true),
    winrateOverall: new FilterAttribute("Winrate Overall", 0.5, FilterCategories.MATCH_STATS, true),

    dominanceScore1v1: new FilterAttribute("Dominance 1v1", 0, FilterCategories.MATCH_STATS),
    dominanceScore2v2: new FilterAttribute("Dominance 2v2", 0, FilterCategories.MATCH_STATS),
    dominanceScoreOverall: new FilterAttribute("Dominance Overall", 0, FilterCategories.MATCH_STATS),

    // Card stats
    lifeTime: new FilterAttribute("Life Time", 30, FilterCategories.CARD_STATS),
    damage: new FilterAttribute("Damage", 50, FilterCategories.CARD_STATS),
    dps: new FilterAttribute("DPS", 25, FilterCategories.CARD_STATS),
    totalDps: new FilterAttribute("Total DPS", 50, FilterCategories.CARD_STATS),
    attackspeed: new FilterAttribute("Attack Speed", 1500, FilterCategories.CARD_STATS, false, 0.001), 
    health: new FilterAttribute("Health", 100, FilterCategories.CARD_STATS),
    totalHealth: new FilterAttribute("Total Health", 100, FilterCategories.CARD_STATS),
    range: new FilterAttribute("Range", 6000, FilterCategories.CARD_STATS, false, 0.001), 
    speed: new FilterAttribute("Speed", 5, FilterCategories.CARD_STATS),
    Weight: new FilterAttribute("Weight", 1000, FilterCategories.CARD_STATS),
    // Spell stats
    radius: new FilterAttribute("Spell Radius", 4000, FilterCategories.CARD_STATS, false, 0.001), 
    towerDamage: new FilterAttribute("Tower Damage", 50, FilterCategories.CARD_STATS),
    delay: new FilterAttribute("Cast Delay", 1000, FilterCategories.CARD_STATS, false, 0.001),
}

// add keywords and units
const keywordsUnique = new Set();
const reusedKeywords = new Set();

const unitsUnique = new Set();
const reusedUnits = new Set();
cardData.forEach(card => {
    let keywords = card.keywords
    let units = card.unitNames
    if(keywords) for (const kw of keywords){
        if (keywordsUnique.has(kw)) reusedKeywords.add(kw);
        keywordsUnique.add(kw);
    }
    if(units) for (const unit of units){
        if (unitsUnique.has(unit)) reusedUnits.add(unit);
        unitsUnique.add(unit);
    }
});
// console.log(reusedKeywords);
([...reusedKeywords].sort()).forEach(keyword => {
    FilterAttributes[keyword] = new FilterAttribute(keyword, undefined, FilterCategories.KEYWORDS)
});
([...reusedUnits].sort()).forEach(unit => {
    FilterAttributes[unit] = new FilterAttribute(unit, undefined, FilterCategories.UNITS)
});


// console.log(FilterAttributes);

// keys are needed to store a reference to the FilterAttribute Object in html elements
Object.entries(FilterAttributes).forEach(([property, attr]) => {
    attr.key = property
})