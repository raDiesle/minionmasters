import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import BuildDeckContainer from "./BuildDeckContainer";

import ListOfDecks from "./carddeck/ListOfDecks/ListOfDecks";
import DiscussOnCards from "./discussion/discuss-on-cards";
import Masters from "./mastersoverview/Masters";


export function Page() {

    // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
    return <div style={{padding: "5px"}}>

    <Tabs style={{paddingTop: "20px"}}>
            <TabList>
                <Tab>Cards Info</Tab>
                <Tab>Masters Info</Tab>
                <Tab>Deck Manager</Tab>
                <Tab>Decks</Tab>
            </TabList>
            <TabPanel>
                <DiscussOnCards/>
            </TabPanel>
            <TabPanel>
                <Masters actionRegistrationComponent={(selectedHeroKey) =>
                    <></>
                }
                />
            </TabPanel>
            <TabPanel>
                <BuildDeckContainer/>
            </TabPanel>
            <TabPanel>
                <ListOfDecks/>
            </TabPanel>

        </Tabs>


    </div>;
}