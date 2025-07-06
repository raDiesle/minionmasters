import { getCellColorPlayrate, getCellColorWinrate, getCardCount, calculateAverage, round } from "./stats-functions";

const cardCount = getCardCount();
const averagePlayRate = 10/cardCount;

const AttributeCategories = {
    MATCH_STATS: "matchStats",
}

class TableAttribute{
    constructor(title, category = ""){
        this.title = title;
        this.key = undefined;
        this.category = category;
    }

    getCellColor(value){
        return getCellColorWinrate();
    }

    getFooterColor(value, footerType){
        console.log("BASE COLOR")
        return this.getCellColor(value)
    }

    getValue(card){
        let sourceObject = card;
        if (this.category != ""){
            sourceObject = card[this.category];
        }
        return sourceObject[this.key];
    }

    formatValue(value){
        return isNaN(value) ? value : round(value,1);
    }

    formatFooterValue(value){
        return this.formatValue(value)
    }

    getFormattedValue(card){
        return this.formatValue(this.getValue(card));
    }

    getAverage(cardSelection){
        const values = cardSelection.map(card => this.getValue(card));
        return calculateAverage(values)
    }

    initialize(fullCardList){
        return
    }
}
class NameAttribute extends TableAttribute{
    constructor(title){
        super(title);
    }

    getAverage(cardSelection){
        return "(Weighted) Average"
    }
}

class PlayrateAttribute extends TableAttribute{
    constructor(title) {
        super(title, AttributeCategories.MATCH_STATS)
    }

    getCellColor(value){
        const deviation = value/averagePlayRate;
        return getCellColorPlayrate(deviation, 1)
    }

    getFooterColor(value){
        const deviation = value/averagePlayRate;
        return getCellColorPlayrate(deviation, 1.5)
    }

    formatValue(value){
        return round(value*100,1).toFixed(1) +" %"
    }

    formatFooterValue(value){
        return round(value * 100, 2).toFixed(2) + " %"
    }
}

class WinrateAttribute extends TableAttribute{
    constructor(title, weightKey){
        super(title, AttributeCategories.MATCH_STATS)
        this.weightKey = weightKey;
    }

    getCellColor(value){
        return getCellColorWinrate(value, 1);
    }

    formatValue(value){
        return round(value*100, 0) +" %"
    }

    formatFooterValue(value){
        return round(value*100, 1).toFixed(1) + " %"
    }

    getFooterColor(value){
        return getCellColorWinrate(round(value, 3), 1.5);
    }

    getWeight(card){
        console.log(card[this.category])
        return card[this.category][this.weightKey]
    }

    getAverage(cardSelection){
        const values = cardSelection.map(card => this.getValue(card))
        const weights = cardSelection.map(card => this.getWeight(card))
        return calculateAverage(values, weights)
    }
}

class MatchesAttribute extends TableAttribute{
    constructor(title){
        super(title, AttributeCategories.MATCH_STATS)
        this.averageMatchCount = 1
    }

    getCellColor(value){
        const deviation = value/this.averageMatchCount;
        return getCellColorPlayrate(deviation, 1);
    }

    getFooterColor(value){
        const deviation = value/this.averageMatchCount;
        return getCellColorPlayrate(deviation, 1.5);
    }

    initialize(fullCardList){
        const matchCounts = fullCardList.map(card => this.getValue(card))
        this.averageMatchCount = calculateAverage(matchCounts);
    }
}

class DominanceAttribute extends TableAttribute{
    constructor(title){
        super(title, AttributeCategories.MATCH_STATS)
    }

    formatValue(value){
        return round(value, 2).toFixed(2)
    }
}

class StatAttribute extends TableAttribute{
    constructor(title, defaultZeroValue = 0, defaultUndefinedValue = " - "){
        super(title);
        this.defaultUndefinedValue = defaultUndefinedValue;
        this.defaultZeroValue = defaultZeroValue;
    }

    formatValue(value){
        //specifically for Wartrack Dreadnaught, which has two speed values
        if (Array.isArray(value)) value = value[0];
        if (value === 0) value =  this.defaultZeroValue;
        else if(!value) value = this.defaultUndefinedValue
        return super.formatValue(value)
    }
}

const MatchStatsAttributes = {
    playrate1v1: new PlayrateAttribute("Playrate 1v1"),
    playrate2v2: new PlayrateAttribute("Playrate 2v2"),
    playrateOverall: new PlayrateAttribute("Playrate Overall"),

    games1v1: new MatchesAttribute("Matches 1v1"),
    games2v2: new MatchesAttribute("Matches 2v2"),
    gamesOverall: new MatchesAttribute("Matches Overall"),

    winrate1v1: new WinrateAttribute("Winrate 1v1", "games1v1"),
    winrate2v2: new WinrateAttribute("Winrate 2v2", "games2v2"),
    winrateOverall: new WinrateAttribute("Winrate Overall", "gamesOverall"),

    dominanceScore1v1: new DominanceAttribute("Dominance 1v1"),
    dominanceScore2v2: new DominanceAttribute("Dominance 2v2"),
    dominanceScoreOverall: new DominanceAttribute("Dominance Overall"),
}

// Object.values(MatchStatsAttributes).forEach(attr => attr.category = "matchStats")

export const CardTableAttributes = {
    ...MatchStatsAttributes,
    name: new NameAttribute("Card Name"),
    iD: new StatAttribute("Card ID"),
    speed: new StatAttribute("Move Speed"),
    health: new StatAttribute("Health", " - "),
    dps: new StatAttribute("DPS", " - "),
    totalDps: new StatAttribute("Total DPS", " - ")
}

CardTableAttributes.iD.getAverage = () => " - "

Object.entries(CardTableAttributes).forEach(([property, attr]) => {
    attr.key = property
})
