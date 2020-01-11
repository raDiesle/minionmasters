import React, {useState} from "react";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import {ImportFromUrl} from "./ImportFromUrl";
import {CardDeck} from "./CardDeck";
import ExportActions from "./ExportActions";
import styled from "styled-components";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";


const DeckOptionsStyle = styled.div`

`;

export default function CardDeckContainer({
                                              selectedCardEvent,
                                              setSelectedCardEvent,
                                              selectedHero,
                                              setSelectedHero,
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
                <ImportFromUrl setLastSelectedCards={setLastSelectedCards} setSelectedHero={setSelectedHero}/>

                <Tabs style={{paddingTop: "20px"}}>
                    <TabList>
                        <Tab>Configured Deck</Tab>
                        <Tab>Import</Tab>
                        <Tab>Export</Tab>
                    </TabList>
                    <TabPanel>
                        <CardDeck selectedCardEvent={selectedCardEvent}
                                  setSelectedCardEvent={setSelectedCardEvent}
                                  setLastSelectedCards={setLastSelectedCards}
                                  selectedHero={selectedHero}
                                  setSelectedHero={setSelectedHero}
                                  lastSelectedCards={lastSelectedCards}
                        />
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