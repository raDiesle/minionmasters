import React from 'react';
import {
    AbilityUlStyle,
    MasterAbilityDescriptionStyle,
    MasterAbilityHeaderStyle,
    MasterAbilityImageRoundedStyle,
    MasterAbilityImageStyle,
    MasterAbilitySubHeader,
    MasterAbilityUnlocksHeaderStyle,
    MasterHeaderStyle
} from "../MasterModal";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconDamage from "./icon-damage.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";

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
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Diona_Perk1.jpg" alt="Diona Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Diona_Perk2.jpg" alt="Diona Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Diona_Perk3.jpg" alt="Diona Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <AbilityUlStyle>
                    <li>
                        20 damage every 1 sec
                    </li>
                    <li>
                        range 10
                    </li>
                    <li>
                        Lays a Bear Trap every 20 sec.
                    </li>
                </AbilityUlStyle>

                <MasterAbilityHeaderStyle>
                    Bear Trap
                </MasterAbilityHeaderStyle>
                <AbilityUlStyle>
                    <li>
                        Roots a unit in place for 4 seconds
                    </li>
                    <li>
                        Deals 50 Damage
                    </li>
                    <li>
                        Lasts 15 sec.
                    </li>
                </AbilityUlStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Art of the Hunt
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add a Trap card to Diona's deck.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    The card alternates between Crossbow Trap and Decoy Trap with each draw.
                </MasterAbilityDescriptionStyle>

                <MasterAbilitySubHeader>
                    Crossbow Trap
                </MasterAbilitySubHeader>
                <AbilityUlStyle>
                    <li>
                        Stealth. Fires bolts at nearby minions.
                    </li>
                    <li>
                        Damage per sec: 30
                    </li>
                    <li>
                        Health: 100
                    </li>
                    <li>
                        Lasts 15 sec
                    </li>
                    <li>
                        When used, this card becomes a Decoy Trap
                    </li>
                </AbilityUlStyle>
                <MasterAbilitySubHeader>
                    Decoy Trap
                </MasterAbilitySubHeader>
                <AbilityUlStyle>
                    <li>
                        Taunts nearby minions
                    </li>
                    <li>
                        Health: 300
                    </li>
                    <li>
                        Lasts 15 sec
                    </li>
                    <li>
                        When used, this card becomes a Crossbow Trap
                    </li>
                </AbilityUlStyle>

                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Fetch!
                </MasterAbilityHeaderStyle>

                <MasterAbilityDescriptionStyle>
                    Every 10 sec, Ruffles will run to a killed enemy Minion and dig up a prize.
                </MasterAbilityDescriptionStyle>
                Prizes:
                <AbilityUlStyle>
                    <li>
                        2 Mana
                    </li>
                    <li>
                        3 XP
                    </li>
                    <li>
                        250 Master Health
                    </li>
                    <MasterAbilityUnlocksHeaderStyle>
                        <FontAwesomeIcon icon={faUnlock}/> 60XP
                    </MasterAbilityUnlocksHeaderStyle>
                </AbilityUlStyle>

            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Thrill of the Hunt
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add another Trap card to Diona's deck.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
        </Tabs>


    </div>
}