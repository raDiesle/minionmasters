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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";

export default function StormbringerContent() {
    return <div>
        <MasterHeaderStyle>
            Stormbringer
        </MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            Stormbringer excels at everything that has to do with range!
        </MasterAbilityDescriptionStyle>


        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Stormbringer_Sniper.png"
                                                    alt="Stormbringer Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Stormbringer_Aerodynamics.png"
                                                    alt="Stormbringer Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Stormbringer_LightningReflexes.png"
                                                    alt="Stormbringer Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Fire bolts of lightning every 4 sec for 35 damage. Has a long range of 20.
                </MasterAbilityDescriptionStyle>

            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Long Shot
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Stormbringer gains global attack range.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>

            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Aerodynamics
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    All friendly ranged Units gain Marksmanship when summoned
                </MasterAbilityDescriptionStyle>

                <MasterAbilitySubHeader>
                    Marksmanship
                </MasterAbilitySubHeader>
                <AbilityUlStyle>
                    <li>
                        +2 Range
                    </li>
                </AbilityUlStyle>

                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>

            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Lightning Reflexes
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Stormbringer gains double attack speedl.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
        </Tabs>


    </div>
}