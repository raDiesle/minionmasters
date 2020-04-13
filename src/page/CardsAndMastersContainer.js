import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import FiltersWithCards from "./FiltersWithCards";
import CardActionAddCardToDeck from "./CardActionAddCardToDeck";
import {toast} from "react-toastify";
import InfoDetailsCardOverlay from "./InfoDetailsCardOverlay";
import Masters from "./mastersoverview/Masters";
import React, {useState} from "react";

export default function CardsAndMastersContainer({setSelectedCardEvent}) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);


    return (
        <Tabs style={{paddingTop: "20px"}} selectedIndex={selectedTabIndex}
              onSelect={tabIndex => setSelectedTabIndex(tabIndex)}>
            <TabList>
                <Tab>Cards</Tab>
                <Tab>Masters</Tab>
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
                                toast("Card added to Deck");
                            }}
                            card={card}
                        />
                        <InfoDetailsCardOverlay card={card}/>
                    </>
                }/>
            </TabPanel>
            <TabPanel>
                <Masters setSelectedHero={setSelectedHero}/>
            </TabPanel>
        </Tabs>
    )
}