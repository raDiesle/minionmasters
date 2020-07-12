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
    MasterAbilitySubHeader,
    MasterAbilityUnlocksHeaderStyle,
    MasterHeaderStyle
} from "../MasterModal";
import IconDamage from "./icon-damage.png";

export default function RatboContent() {
    return <div>
        <MasterHeaderStyle>
            Ratbo
        </MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            Ratbo is among the most famous Scrat leaders. Scrats will gladly follow him blindly and in great numbers -
            they
            have a Minigun insurance.
        </MasterAbilityDescriptionStyle>


        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Ratbo_Rats.png" alt="Ratbo Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Ratbo_moreDakka.png" alt="Ratbo Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Ratbo_RatsRats.png" alt="Ratbo Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <MasterHeaderStyle>
                    Basic Attack
                </MasterHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Fires a barrage of bullets a enemies from a range of 10, every 0.3 sec for 6 damage.
                </MasterAbilityDescriptionStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Scrats!
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Summons a Scrat every time Ratbo plays a Minion card, or an "Armored" Scrat instead if the Minion
                    card cost 5+
                    Mana.
                </MasterAbilityDescriptionStyle>

                <MasterAbilitySubHeader>
                    Scrat
                </MasterAbilitySubHeader>
                <AbilityUlStyle>
                    <li>
                        Health: 15
                    </li>
                    <li>
                        Damage per sec: 10
                    </li>
                </AbilityUlStyle>

                <MasterAbilitySubHeader>
                    "Armored" Scrat
                </MasterAbilitySubHeader>
                <AbilityUlStyle>
                    <li>
                        Health: 60
                    </li>
                    <li>
                        Damage per sec: 20

                    </li>
                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    More Dakka!
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add the card More Dakka! to Ratbo's deck
                </MasterAbilityDescriptionStyle>
                <MasterAbilitySubHeader>
                    More Dakka!
                </MasterAbilitySubHeader>
                <MasterAbilityDescriptionStyle>
                    Ratbo charges up for 1 sec then shoots the nearest enemy for 40 damage per friendly Minion on the
                    field. Reduces
                    damage to Master Towers.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Scrats! Scrats!
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Now summon 2 Scrat every time Ratbo plays a Minion card, or 2 "Armored" Scrat instead if the Minion
                    card cost 5+
                    Mana.
                </MasterAbilityDescriptionStyle>
                <MasterAbilitySubHeader>
                    Scrat
                </MasterAbilitySubHeader>

                <AbilityUlStyle>
                    Health: 15 Damage per sec: 10
                </AbilityUlStyle>

                <MasterAbilitySubHeader>
                    "Armored" Scrat
                </MasterAbilitySubHeader>
                <AbilityUlStyle>
                    <li>
                        Health: 60
                    </li>
                    <li>
                        Damage per sec: 20
                    </li>

                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>

        </Tabs>
    </div>
}