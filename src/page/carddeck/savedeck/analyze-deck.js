import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import React from "react";

export default function AnalyzeDeck({relevantCards, selectedHero}) {

    const avgMana = relevantCards.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue.manacost) / relevantCards.length;
    }, 0);
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

            <div>
                Average Mana : {avgMana}
            </div>
        </div>
    );
}