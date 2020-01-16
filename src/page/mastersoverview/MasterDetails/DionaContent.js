import React from 'react';
import {
    MasterAbilityDescriptionStyle,
    MasterAbilityHeaderStyle,
    MasterAbilityImageStyle,
    MasterHeaderStyle
} from "../MasterModal";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function DionaContent() {
    return <div>
        <MasterHeaderStyle>Diona</MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            The Witch Hunter Diona uses a variety of traps to deal with any threat. Her trusty sidekick Ruffles fetches
            useful items from the battlefield for his master.
            <div>
                <a href="https://www.youtube.com/watch?v=5zafVoWXB34">Get to know Diona and Ruffles as they venture into
                    the
                    Pinewood</a>
            </div>
        </MasterAbilityDescriptionStyle>

        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
            </TabList>
            <TabPanel>
                Basic Attack
                Rapidly fires bolts from her dual crossbows for 20 damage every 1 sec with a range of 10.
                Lays a Bear Trap every 20 sec.
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Bear Trap
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Roots a unit in place for 4 seconds
                    Deals 50 Damage
                    Lasts 15 sec.
                </MasterAbilityDescriptionStyle>
            </TabPanel>
        </Tabs>

        Art of the Hunt
        Add a Trap card to Diona's deck. The card alternates between Crossbow Trap and Decoy Trap with each draw.

        Crossbow Trap
        Stealth. Fires bolts at nearby minions.
        Damage per sec: 30
        Health: 100
        Lasts 15 sec
        When used, this card becomes a Decoy Trap

        Decoy Trap
        Taunts nearby minions
        Health: 300
        Lasts 15 sec
        When used, this card becomes a Crossbow Trap


        Fetch!

        Every 10 sec, Ruffles will run to a killed enemy Minion and dig up a prize.

        Prizes:
        - 2 Mana
        -3 XP
        - 250 Master Health

        (Unlocks at 60XP)


        Thrill of the Hunt
        Add another Trap card to Diona's deck.
        (Unlocks at 120 XP)
    </div>
}