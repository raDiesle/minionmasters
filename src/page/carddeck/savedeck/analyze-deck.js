import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import AnalysisData from "./analysis-data";

export default function AnalyzeDeck({relevantCards, selectedHero}) {


    const maxNumberOfCards = 10;


    return (
        <div>
            {relevantCards.length < maxNumberOfCards &&
            <div>
                <FontAwesomeIcon icon={faExclamationTriangle} color="orange"/>
                The deck is incomplete. Select the {maxNumberOfCards - relevantCards.length} empty slots.
            </div>
            }
            {
                !selectedHero &&
                <div>
                    <FontAwesomeIcon icon={faExclamationTriangle} color="orange"/>
                    The deck is incomplete. Select hero for the deck.
                </div>
            }

            <AnalysisData cards={relevantCards}/>
        </div>
    );
}