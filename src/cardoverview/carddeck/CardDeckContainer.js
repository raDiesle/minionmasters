import CarddeckPlaceholder from "../carddeckplaceholder/CarddeckPlaceholder";
import {CardDeckPrefillFromUrl} from "./CardDeckPrefillFromUrl";
import React, {useState} from "react";
import {CardDeck} from "./CardDeck";
import CardDeckShare from "./CardDeckShare";


export default function CardDeckContainer({
                                              selectedCardEvent,
                                              setSelectedCardEvent,
                                              showDeck,
                                              setShowDeck
                                          }) {

    let Slots = [...Array(10).keys()];
    const [lastSelectedCards, setLastSelectedCards] = useState(Slots.map(slot => {
        return {
            eventId: 0,
            card: {
                pageId: 0
            }
        }
    }));


    if (showDeck === false) {
        return (<CarddeckPlaceholder setShowDeck={setShowDeck} setSelectedCardEvent={setSelectedCardEvent}
                                     setLastSelectedCards={setLastSelectedCards}/>)
    } else {
        return (
            <div>
                <CardDeck selectedCardEvent={selectedCardEvent}
                          setSelectedCardEvent={setSelectedCardEvent}
                          setLastSelectedCards={setLastSelectedCards}
                          lastSelectedCards={lastSelectedCards}
                />
                <CardDeckPrefillFromUrl setLastSelectedCards={setLastSelectedCards}
                />

                <CardDeckShare lastSelectedCards={lastSelectedCards}/>
            </div>
        )
    }
}