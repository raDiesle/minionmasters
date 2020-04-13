import React, {useState} from "react";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import {ImportFromUrl} from "./ImportFromUrl";
import {CardDeck} from "./CardDeck";
import ExportActions from "./ExportActions";
import styled from "styled-components";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import SaveDeckContainer from "./savedeck/save-deck-container";
import FiltersWithCards from "../FiltersWithCards";
import CardActionAddCardToDeck from "../CardActionAddCardToDeck";
import {toast} from "react-toastify";
import InfoDetailsCardOverlay from "../InfoDetailsCardOverlay";


const DeckOptionsStyle = styled.div`

`;

export default function CardDeckContainer({
                                              selectedCardEvent,
                                              setSelectedCardEvent,
                                              selectedHero,
                                              setSelectedHero,
                                              setShowDeck,
                                              setSelectedTabIndex
                                          }) {

    let Slots = [...Array(10).keys()];
    const [lastSelectedCards, setLastSelectedCards] = useState(Slots.map(slot => {
        return {
            eventId: 0,
            card: {
                iD: 0
            }
        }
    }));


    return (
        <div>
            <ImportFromUrl setLastSelectedCards={setLastSelectedCards} setSelectedHero={setSelectedHero}/>

            <CardDeck selectedCardEvent={selectedCardEvent}
                      setSelectedCardEvent={setSelectedCardEvent}
                      setLastSelectedCards={setLastSelectedCards}
                      selectedHero={selectedHero}
                      setSelectedHero={setSelectedHero}
                      lastSelectedCards={lastSelectedCards}
                      setSelectedTabIndex={setSelectedTabIndex}
            />

            <Tabs style={{paddingTop: "20px"}}>
                <TabList>
                    <Tab>Select cards</Tab>
                    <Tab>Analyze & Save</Tab>
                    <Tab>Import</Tab>
                    <Tab>Export</Tab>
                </TabList>
                <TabPanel>
                    <FiltersWithCards cardActionWrapper={(card) =>
                        <>
                            <CardActionAddCardToDeck
                                onClick={() => {
                                    setSelectedCardEvent({
                                        eventId: Math.random(),
                                        card: {
                                            pageId: card.pageId
                                        }
                                    });
                                    toast("Card added to Deck");
                                }}
                                card={card}
                            />
                            <InfoDetailsCardOverlay card={card}/>
                        </>
                    }/>
                </TabPanel>
                <TabPanel>
                    <SaveDeckContainer lastSelectedCards={lastSelectedCards} selectedHero={selectedHero}/>
                </TabPanel>

                <TabPanel>
                    <DeckOptionsStyle>
                        <ImportFromGame setShowDeck={setShowDeck}
                                        setSelectedCardEvent={setSelectedCardEvent}
                                        setLastSelectedCards={setLastSelectedCards}
                                        setSelectedHero={setSelectedHero}
                        />

                    </DeckOptionsStyle>
                </TabPanel>
                <TabPanel>
                    <ExportActions lastSelectedCards={lastSelectedCards} selectedHero={selectedHero}/>
                </TabPanel>
            </Tabs>
        </div>
    )
}