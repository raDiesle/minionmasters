module.exports = { 
    parseAndSaveGameData, loadSingleParsedGameData, loadAllParsedGameData, 
    getText, makeArray, getUnitDps, getMax, getSum
}

const fs = require("fs");
const SOURCE_DIRECTORY = "batch_jobs/card_data/game_data/"
const GENERATED_TARGET_DIRECTORY = "batch_jobs/card_data/generated/";
const { max, sum, round } = require("lodash");
const { XMLParser } = require("fast-xml-parser");


function parseAndSaveGameData(parseTextDataCompletely = false){
    function parseXml(xml) {
        let parser = new XMLParser();
        try {
            // Parse XML string into an object
            const jsonObj = parser.parse(xml);
            return jsonObj;
        } catch (e) {
            console.error("Error parsing XML:", e.message);
            return Object(null);
        }
    }
    
    //parse xml to get json files:
    console.log("parsing file: Actors");
    let xmlString = fs.readFileSync(SOURCE_DIRECTORY+"Actors", {encoding: "utf-8"});
    const actorsJson = parseXml(xmlString).ActorsRoot.Actors;
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"Actors.json", JSON.stringify(actorsJson, null, 4));
    //map actors using "VisualPrefabPath" property as keys
    const OVERWRITE_ACTOR_KEYS = new Map([
        [40, "ReBoomer"],
        [45, "IllusoryCleaver"],
        [64, "Gax"],
        [160, "ThunderShrineClose"],
        [175, "SewerScrat"],
        [197, "InactiveCrystalConstruct"],
        [203, "SmallFireDragonIllusory"],
        [233, "FanaticSlave"],
        [268, "Lookout"],
        [275, "RobotNinja"],
        [283, "TheRevenant"],
        [276, "TombOfTheDeathless"],
        [277, "BigTombOfTheDeathless"],
        [282, "FerventWarrior"],
    ]);
    const KNOWN_DUPLICATE_ACTOR_IDS = [94, 98, 107, 114, 115, 134, 148, 161, 244];
    let actorsMap = new Map();
    let actorsIdMap = new Map();
    actorsJson.filter(actor => actor.VisualPrefabPath != undefined).forEach(actor => {
        let {VisualPrefabPath, ...props} = actor;
        let key = makeArray(VisualPrefabPath)[0].replace("Visual", "");
        if (OVERWRITE_ACTOR_KEYS.has(actor.Id)){
            key = OVERWRITE_ACTOR_KEYS.get(actor.Id);
        }
        if(!actorsMap.has(key)) actorsMap.set(key, props);
        else if(!KNOWN_DUPLICATE_ACTOR_IDS.includes(actor.Id)){
            console.log("WARNING! Unknown duplicate actor key: " + key + " - Actor Id: " + actor.Id);
        }
        let id = actor.Id;
        actorsIdMap.set(id, props);
    });
    //inherit values
    actorsMap.forEach(unit => {
        let inheritId = unit.InheritFromId;
        if(!inheritId) return;
        baseUnit = actorsIdMap.get(inheritId);
        for(let key of Object.keys(baseUnit)){
            if(!unit[key]){
                unit[key] = baseUnit[key];
            }
        }
    });
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"Actors.json", JSON.stringify(Object.fromEntries(actorsMap), null, 4));

    console.log("parsing file: Cards");
    xmlString = fs.readFileSync(SOURCE_DIRECTORY+"Cards", {encoding: "utf-8"});
    const cardsJson = parseXml(xmlString).CardRoot.Cards;
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"Cards.json", JSON.stringify(cardsJson, null, 4));
    // map cards using "Title" properties as keys
    let cardsMap = new Map();
    cardsJson.forEach(card => {
        let {Title, ...props} = card;
        if (Title && !cardsMap.has(Title)){
            props.ManaCost = props.Cost;
            if(props.MainUnitsToSummon){
                let MainUnitsArray = makeArray(props.MainUnitsToSummon)
                let i = 0;
                for(let unitType of new Set(MainUnitsArray)){
                    props["MainSummonAmounts*"+i] = MainUnitsArray.filter(unit => unit == unitType).length
                    i += 1;
                }
                props.MainSummonAmount = MainUnitsArray.length;
            }
            if(props.ExtraUnitsToSummon){
                let ExtraUnitsArray = makeArray(props.ExtraUnitsToSummon);
                let i = 0;
                for(let unitType of new Set(ExtraUnitsArray)){
                    props["ExtraSummonAmounts*"+i] = ExtraUnitsArray.filter(unit => unit == unitType).length
                    i += 1;
                }
                props.ExtraSummonAmount = ExtraUnitsArray.length;
            }
            cardsMap.set(Title, props);
        }
        else if (Title) console.log("WARNING! Duplicate card key: " + Title);
    });
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"Cards.json", JSON.stringify(Object.fromEntries(cardsMap), null, 4));

    console.log("parsing file: Spells");
    xmlString = fs.readFileSync(SOURCE_DIRECTORY+"Spells", {encoding: "utf-8"});
    const spellsJson = parseXml(xmlString).SpellsRoot.Spells;
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"Spells.json", JSON.stringify(spellsJson, null, 4));
    //map spells using "Identifier" property as keys
    let spellsMap = new Map();
    spellsJson.forEach(spell => {
        let {Identifier, ...props} = spell;
        spellsMap.set(Identifier, props);
    })
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"Spells.json", JSON.stringify(Object.fromEntries(spellsMap), null, 4));
    
    console.log("copying file: English_ToDownload");
    let englishString = fs.readFileSync(SOURCE_DIRECTORY+"English_ToDownload")
    let englishJson = JSON.parse(englishString).Entries;
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"English.json", JSON.stringify(englishJson, null, 4));
    //map info texts
    let textMap = new Map();
    englishJson.forEach(entry => {
        let {Id, Text} = entry;
        textMap.set(Id, Text);
    });
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"English.json", JSON.stringify(Object.fromEntries(textMap), null, 4));
    
    //parse class variables from .cs file
    console.log("parsing class variables...");
    let classesString = new String(fs.readFileSync(SOURCE_DIRECTORY+"dump.cs"))
    let variablesMap = new Map();
    //match classes by class name (ignore characters before ".")
    let matchedClasses = classesString.matchAll(/(?:public|internal) class (?:[^. ]*?\.)*([\w]+)[^{]+\{([^]+?)\n\}/gm);
    for (let classMatchArray of matchedClasses){
        let matchedVariables = classMatchArray[0].matchAll(/const int (\w+) = ([0-9]+?)\;/g)
        if (matchedVariables){
            props = new Object();
            for(let variableMatchArray of matchedVariables){
                props[variableMatchArray[1]] = variableMatchArray[2];
            }
            if (Object.values(props).length > 0) variablesMap.set(classMatchArray[1], props);
        }
    }
    let variablesString = JSON.stringify(Object.fromEntries(variablesMap), null, 4);
    fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"Variables.json", variablesString);

    //Now get the final description texts and save them
    if (parseTextDataCompletely) {
        const dataMaps = {
            actorsMap: actorsMap,
            cardsMap: cardsMap,
            spellsMap: spellsMap,
            textMap: textMap,
            variablesMap: variablesMap,
        }
        let parsedEnglishJson = new Map();
        englishJson.forEach(entry => {
            let {Id, Text} = entry;
            parsedEnglishJson.set(Id, getText(Id, dataMaps))
        })
        fs.writeFileSync(GENERATED_TARGET_DIRECTORY+"ParsedEnglish.json", JSON.stringify(Object.fromEntries(parsedEnglishJson), null, 4));
    }
}

function loadSingleParsedGameData(fileName){
    let dataString = fs.readFileSync(GENERATED_TARGET_DIRECTORY+fileName);
    const dataJson = JSON.parse(dataString);
    const dataMap = jsonToMap(dataJson);
    return dataMap
}

function loadAllParsedGameData(){
    // load parsed json files:
    const actorsMap = loadSingleParsedGameData("Actors.json");
    const cardsMap = loadSingleParsedGameData("Cards.json");
    const spellsMap = loadSingleParsedGameData("Spells.json");
    const textMap = loadSingleParsedGameData("English.json");
    const variablesMap = loadSingleParsedGameData("Variables.json");

    return {
        actorsMap: actorsMap,
        cardsMap: cardsMap,
        spellsMap: spellsMap,
        textMap: textMap,
        variablesMap: variablesMap,
    }
}

function getText(iD, dataMaps){
    const {textMap, ...variableMaps} = dataMaps;
    text = textMap.get(iD);
    if (text){
        text = insertReferences(text, textMap);
        text = insertVariables(text, variableMaps);
        text = evaluateMath(text);
        return text;
    }
    console.log("Text info not found. Key: " + iD)
    return iD;
}
    
function insertReferences(rawText, textMap){
    if(!rawText) return undefined;
    let text = rawText.replaceAll(
        /\[r:([^\[]+?)\]/gm,
        (match, group1) => insertReferences(textMap.get(group1), textMap)
    );
    return text
}

function insertVariables(rawText, variableMaps){
    const {actorsMap, cardsMap, spellsMap, variablesMap} = variableMaps;
    let text = rawText.replaceAll(
        /\[av:([ \w]+?)\.([ \w]+?)\]/gm,
        (match, actor, variable) => {
            try {
                value = actorsMap.get(actor)[variable];
            } catch {
                console.log("WARNING! No entry in actors map found for key: " + actor);
            }
            if (variable == "Range" || variable == "AttackCooldown"){
                value = parseInt(value)/1000;
            }
            if (value == undefined) console.log("WARNING! Undefined variable (av) of actor " + actor + ": " + variable);
            return value;
        }
    );
    //fix missing "s" for cv references (looking at you Propeller Horde...)
    text = text.replaceAll(
        /(\[cv:[ \w]+?\.[ \w\*]+?Amount)\*/gm,
        (match, group1) => {
            return group1 + "s*"
        }
    );
    text = text.replaceAll(
        /\[cv:([ \w]+?)\.([ \w\*]+?)\]/gm,
        (match, card, variable) => {
            try {
                value = cardsMap.get(card)[variable];
            } catch {
                console.log("WARNING! No entry in cards map found for key: " + card);
            }
            if (value == undefined) console.log("WARNING! Undefined variable (cv) of card " + card + ": " + variable);
            return value;
        }
    );
    text = text.replaceAll(
        /\[sv:([ \w]+?)\.([ \w\*]+?)\]/gm,
        (match, spell, variable) => {
            try {
                value = spellsMap.get(spell)[variable];
            } catch {
                console.log("WARNING! No entry in spells map found for key: " + spell);
            }
            if (value == undefined) console.log("WARNING! Undefined variable (sv) of spell " + spell + ": " + variable);
            if (variable === "Duration") value /= 1000;
            return value;
        }
    );
    text = text.replaceAll(
        /\[dps:([ \w]+?)]/gm,
        (match, actorName) => {
            try {
                value = getUnitDps(actorsMap.get(actorName));
            } catch {
                console.log("WARNING! No entry in actors map found for key: " + actorName);
            }
            if (value == undefined) console.log("WARNING! Undefined dps value for actor " + actorName);
            return value;
        }
    );
    text = text.replaceAll(
        /\[v:([ \w]+?)\.([ \w]+?)\]/gm,
        (match, className, variable) => {
            if (!variablesMap.has(className)) {
                console.log("WARNING! Undefined class: " + className);
                return undefined
            }
            value = (variablesMap.get(className))[variable];
            if (value == undefined) console.log("WARNING! Undefined variable value " + variable + " of class: " + className);
            return value;
        }
    );
    return text;
}

function evaluateMath(rawText){
    // console.log("raw: "+rawText)
    let text = rawText.replaceAll(
        /\[math:([^\[]+?)\]/gm,
        (match, mathExpression) => {
            let value;
            try {
                value = eval(mathExpression);
            }
            catch {
                console.log("WARNING! Could not evaluate math expression " + mathExpression);
                value = mathExpression;
            }
            return round(value, 2);
        }
    );
    let rest = text.match(/\[math:[^\[]+?\]/gm);
    if (rest) return evaluateMath(text);  
    return text
}

function getUnitDps(unit){
    if(unit.Damage == 0) return 0
    return round(1000*unit.Damage/unit.AttackCooldown, 2)
}

function makeArray(value){
    if (Array.isArray(value)){
        return value
    }
    return Array(value)
}

function getMax(array, func){
    return max(array.map(element => func(element)));
}

function getSum(array, func){
    return round(sum(array.map(element => func(element))), 2);
}

//creates a map from an array of objects, using the keyProp property as key values
function jsonToMap(jsonData){
    let mapData = new Map();
    for (key of Object.keys(jsonData)){
        let valuesObj = jsonData[key];
        mapData.set(key, valuesObj);
    }
    return mapData
}