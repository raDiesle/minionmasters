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

export default function MordarContent() {
    return <div>
        <MasterHeaderStyle>
            Mordar
        </MasterHeaderStyle>

        <MasterAbilityDescriptionStyle>
            Mordar uses his tombstones to raise the dead and his staff to slowly kill all attacking minions.
        </MasterAbilityDescriptionStyle>

        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Mordar_Tombstone.png" alt="Mordar Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Mordar_Tombstone02.png" alt="Mordar Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Tombstonemaster.jpg" alt="Mordar Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Deals 10 damage to all enemies on his side of the arena.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    They attack faster and faster ( from every 4 sec to 1 sec).
                </MasterAbilityDescriptionStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Tombstone
                </MasterAbilityHeaderStyle>

                <MasterAbilityDescriptionStyle>
                    Add the card Tombstone to Mordar's deck.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    A tombstone with 400 health that activates after 10 seconds and resurrecting the next friendly
                    minion that dies.

                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Another Tombstone
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add another Tombstone card to Mordar's deck.
                </MasterAbilityDescriptionStyle>

                <MasterAbilityDescriptionStyle>
                    A tombstone with 400 health that activates after 10 seconds and resurrecting the next friendly
                    minion that dies.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>

            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Vengeful Dead
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    All minions raised by a Tombstone gain Haste
                </MasterAbilityDescriptionStyle>
                <AbilityUlStyle>
                    <li>
                        50% Movement speed.
                    </li>
                    <li>
                        +50% Attack speed.
                    </li>
                    <li>
                        Removes Slow.
                    </li>
                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>

        </Tabs>


    </div>
}