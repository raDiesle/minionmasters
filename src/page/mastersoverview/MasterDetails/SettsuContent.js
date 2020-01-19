import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {
    MasterAbilityDescriptionStyle,
    MasterAbilityImageRoundedStyle,
    MasterAbilityImageStyle,
    MasterAbilityUnlocksHeaderStyle,
    MasterHeaderStyle
} from "../MasterModal";
import IconDamage from "./icon-damage.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";

export default function SettsuContent() {
    return <div>
        <MasterHeaderStyle>
            Settsu
        </MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            Settsu is a bad-ass ex-soldier that never plays by the rules.
        </MasterAbilityDescriptionStyle>
        <MasterAbilityDescriptionStyle>
            She can enter the Arena herself to annihilate
            enemies with superior firepower.
        </MasterAbilityDescriptionStyle>

        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Settsu_BlastEntry.jpg" alt="Settsu Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Settsu_CombatReload.jpg" alt="Settsu Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Settsu_HighPoweredLaser.jpg" alt="Settsu Perk3"/>
                </Tab>

            </TabList>
            <TabPanel>
                <MasterHeaderStyle>
                    Basic Attack
                </MasterHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Settsu fires their range 10 Pulse Rifle once per second for 40 damage.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    After 5 shots they have to
                    reload for 5 seconds.
                </MasterAbilityDescriptionStyle>

            </TabPanel>
            <TabPanel>

                <MasterHeaderStyle>
                    Blast Entry
                </MasterHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add the card Blast Entry to Settsu's deck.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>

                    Settsu enters the battlefield dealing 50 damage on impact and gaining a 300 health shield
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>

                <MasterHeaderStyle>
                    Combat Reload
                </MasterHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    When Settsu casts a Spell, they instantly reloads their gun
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterHeaderStyle>
                    High Powered Laser
                </MasterHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Settsu's first shot after a reload deals double damage, pierces enemies and Stuns them for 3 seconds
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
        </Tabs>
    </div>
}