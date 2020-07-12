import React, {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import CardDetailsGoodBadAgainst from "./CardDetailsGoodBadAgainst";

import CardDiscussion from "./discussion/CardDiscussion";


export default function CardDiscussions({card}) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    return <div>
        <Tabs style={{paddingTop: "20px"}} selectedIndex={selectedTabIndex}
              onSelect={tabIndex => {
                  setSelectedTabIndex(tabIndex);
              }}
        >
            <TabList>
                <Tab>Tips</Tab>
                <Tab>Cards Against</Tab>
                <Tab>Opinions</Tab>
            </TabList>
            <TabPanel>
                <CardDiscussion card={card} discussionType="mechanics"/>
            </TabPanel>
            <TabPanel>
                <CardDetailsGoodBadAgainst card={card}/>
            </TabPanel>
            <TabPanel>
                <CardDiscussion card={card} discussionType="opinion"/>
            </TabPanel>
        </Tabs>
    </div>
}