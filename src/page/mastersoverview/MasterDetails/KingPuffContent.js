import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {
    AbilityUlStyle,
    MasterAbilityDescriptionStyle,
    MasterAbilityHeaderStyle,
    MasterAbilityImageRoundedStyle,
    MasterAbilityImageStyle,
    MasterAbilityUnlocksHeaderStyle,
    MasterHeaderStyle
} from "../MasterModal";
import IconDamage from "./icon-damage.png";

export default function KingPuffContent() {
    return <div>
        <MasterHeaderStyle>Diona</MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            King Puff is a trickster, he loves to confuse his opponents and keep bridge control just as he loves kingdom
            control.
        </MasterAbilityDescriptionStyle>

        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/KingPuff_TrickSwap.png" alt="KingPuff Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/KingPuff_Inspire.jpg" alt="KingPuff Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/KingPuff_BridgeShield.png" alt="KingPuff Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                A slow but powerful attack dealing 75 damage to a single unit every 2.5 sec, with a range of 8.
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Trick Swap
                </MasterAbilityHeaderStyle>

                <MasterAbilityDescriptionStyle>
                    Add the card Trick Swap to King Puff's deck.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    Swaps the location of ALL minions on both bridges and Stuns enemies for 4 sec.
                </MasterAbilityDescriptionStyle>

                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>

            <TabPanel>
                <MasterAbilityHeaderStyle>
                    King Buff
                </MasterAbilityHeaderStyle>

                King Puff's 4 and 5 mana Minion Cards gain either Rage or Shield when played.
                <AbilityUlStyle>
                    <li>
                        Rage: +50% Attack damage.
                    </li>
                    <li>
                        Shield: Blocks all damage from the next damage source.
                    </li>
                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>

            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Bridge Shield
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    King Puff marks the bottom bridge and is immune to damage when controlling the marked bridge.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    Trick Swap moves the mark.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
        </Tabs>
    </div>
}