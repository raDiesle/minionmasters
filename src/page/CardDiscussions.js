import React, {useEffect, useState} from "react";
import 'draft-js/dist/Draft.css';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {auth} from "../firestore";
import WikiEditor from "./wikiEditor/WikiEditor";


function listenUserAuth(setCurrentUsername) {
    return auth.onAuthStateChanged((user) => {
        setCurrentUsername(auth.currentUser?.displayName);
    });
}

export default function CardDiscussions() {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [currentUsername, setCurrentUsername] = useState("");


    useEffect(() => {
        const listen = listenUserAuth(setCurrentUsername);
        return () => listen()
    }, []);

    return <div>
        <Tabs style={{paddingTop: "20px"}} selectedIndex={selectedTabIndex}
              onSelect={tabIndex => setSelectedTabIndex(tabIndex)}>
            <TabList>
                <Tab>Mechanics</Tab>
                <Tab>Tips</Tab>
                <Tab>Bugs</Tab>
                <Tab>Opinion</Tab>
            </TabList>
            <TabPanel>
                <div>Posted by {currentUsername}</div>
                <div>Version: 1.9</div>

                <WikiEditor iD={54}/>

            </TabPanel>
            <TabPanel>

            </TabPanel>
            <TabPanel>

            </TabPanel>
            <TabPanel>

            </TabPanel>
        </Tabs>
    </div>
}