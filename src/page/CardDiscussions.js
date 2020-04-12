import React, {useState} from "react";
import 'draft-js/dist/Draft.css';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

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
                <Tab>Mechanics</Tab>
                <Tab>Tips</Tab>
                <Tab>Bugs</Tab>
                <Tab>Opinion</Tab>
            </TabList>
            <TabPanel>
                <CardDiscussion card={card} discussionType="mechanics"/>
            </TabPanel>
            <TabPanel>
                <CardDiscussion card={card} discussionType="tips"/>
            </TabPanel>
            <TabPanel>
                <CardDiscussion card={card} discussionType="bugs"/>
            </TabPanel>
            <TabPanel>
                <CardDiscussion card={card} discussionType="opinion"/>
            </TabPanel>
        </Tabs>
    </div>
}