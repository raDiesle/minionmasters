import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import ListOfDecks from "./carddeck/ListOfDecks/ListOfDecks";
import BuildDeckContainer from "./BuildDeckContainer";
import DiscussOnCards from "./discussion/discuss-on-cards";


export function Page() {

    // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
    return <div style={{padding: "5px"}}>
        <Tabs style={{paddingTop: "20px"}}>
            <TabList>
                <Tab>Cards</Tab>
                <Tab>Build deck</Tab>
                <Tab>List of Decks</Tab>
            </TabList>
            <TabPanel>
                <DiscussOnCards/>
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