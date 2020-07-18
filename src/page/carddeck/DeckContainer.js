import React, {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import styled from "styled-components";
import CardActionAddCardToDeck from "../CardActionAddCardToDeck";
import FiltersWithCards from "../FiltersWithCards";
import InfoDetailsCardOverlay from "../InfoDetailsCardOverlay";

import AddMasterToDeck from "../mastersoverview/AddMasterToDeck";
import Masters from "../mastersoverview/Masters";
import {CardDeck} from "./CardDeck";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import ExportActions from "./ExportActions";
import {ImportFromUrl} from "./ImportFromUrl";
import AnalyzeAndSaveDeckContainer from "./savedeck/save-deck-container";

export const IDENTIFIER_FOR_EMPTY_SLOT = 999999;

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

    const Slots = [...Array(10).keys()];
    const [lastSelectedCards, setLastSelectedCards] = useState(Slots.map(slot => {
        return {
            eventId: 0,
            card: {
                iD: IDENTIFIER_FOR_EMPTY_SLOT
            },
            count: 0
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
                    <Tab>Select master</Tab>
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
                                            iD: card.iD
                                        }
                                    });
                                }}
                                card={card}
                            />
                            <InfoDetailsCardOverlay card={card}/>
                        </>
                    }/>
                </TabPanel>
                <TabPanel>
                    <Masters actionRegistrationComponent={(selectedHeroKey) =>
                        <AddMasterToDeck setSelectedHero={setSelectedHero}
                                         masterKey={selectedHeroKey}
                        />
                    }
                    />
                </TabPanel>
                <TabPanel>
                    <AnalyzeAndSaveDeckContainer lastSelectedCards={lastSelectedCards} selectedHero={selectedHero}/>
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