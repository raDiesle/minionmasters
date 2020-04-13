import React from "react";

import AnalyzeDeck from "./analyze-deck";
import SaveDeckToDb from "./save-deck-to-db";


export default function SaveDeckContainer({lastSelectedCards, selectedHero}) {


    const relevantCards = lastSelectedCards.filter(({card: {iD}}) => iD !== 0).map(({card}) => card);


    return <div>

        <AnalyzeDeck relevantCards={relevantCards} selectedHero={selectedHero}/>


        <SaveDeckToDb relevantCards={relevantCards} selectedHero={selectedHero}/>
    </div>
}