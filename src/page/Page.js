import DeckContainer from "page/carddeck/DeckContainer";
import qs from "qs";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import ListOfDecks from "./carddeck/ListOfDecks/ListOfDecks";
import DiscussOnCards from "./discussion/discuss-on-cards";
import Masters from "./mastersoverview/Masters";


export function Page() {

    const isUrlImport = typeof qs.parse(window.location.search, {ignoreQueryPrefix: true}).hero !== 'undefined';

    // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
    return <div style={{padding: "5px"}}>

        <Tabs style={{paddingTop: "20px"}} defaultIndex={isUrlImport ? 2 : 0}>
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
                <Masters/>
            </TabPanel>
            <TabPanel>
                <DeckContainer/>
            </TabPanel>
            <TabPanel>
                <ListOfDecks/>
            </TabPanel>
        </Tabs>
    </div>;
}