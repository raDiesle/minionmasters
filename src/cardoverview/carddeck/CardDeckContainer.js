import CarddeckImporter from "../carddeckplaceholder/CarddeckImporter";
import {CardDeckPrefillFromUrl} from "./CardDeckPrefillFromUrl";
import React, {useState} from "react";
import {CardDeck} from "./CardDeck";
import CardDeckShare from "./CardDeckShare";
import styled from "styled-components";


const DeckOptionsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 40px;
    padding-bottom: 10px;
    & > * {
    padding-right:40px;
    }
`;

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


        return (
            <div>
                <DeckOptionsStyle>
                    <CarddeckImporter setShowDeck={setShowDeck} setSelectedCardEvent={setSelectedCardEvent}
                                      setLastSelectedCards={setLastSelectedCards}/>
                    <CardDeckShare lastSelectedCards={lastSelectedCards}/>
                </DeckOptionsStyle>
                <CardDeck selectedCardEvent={selectedCardEvent}
                          setSelectedCardEvent={setSelectedCardEvent}
                          setLastSelectedCards={setLastSelectedCards}
                          lastSelectedCards={lastSelectedCards}
                />
                <CardDeckPrefillFromUrl setLastSelectedCards={setLastSelectedCards}
                />


            </div>
        )
}