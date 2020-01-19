import React from "react";
import {
    MasterAbilityDescriptionStyle,
    MasterAbilityHeaderStyle,
    MasterAbilityImageRoundedStyle,
    MasterAbilityImageStyle,
    MasterAbilityUnlocksHeaderStyle,
    MasterHeaderStyle
} from "../MasterModal";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconDamage from "./icon-damage.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";

export default function VolcoContent() {
    return <div>

        <MasterHeaderStyle>
            Volco
        </MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            Volco is not scared of swarms, but he hates flying enemies he can't reach.
        </MasterAbilityDescriptionStyle>


        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Volco_Fireball.png"
                                                    alt="Volco Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Volco_BurntheBridges.png"
                                                    alt="Volco Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Volco_TempersFlaring2.png"
                                                    alt="Volco Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Deals 40 area Ground damage with his hammer every 2.5 sec.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    Has a range of 10.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    Hammer Time!
                </MasterAbilityDescriptionStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Afterburner
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    When Volco hols the Marked bridge and plays a card, they fire a firebolt at the enemy Master
                    dealing 60 Damage.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>


            </TabPanel>

            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Burn the Bridges
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add the card Burn The Bridges to Volco's deck.
                </MasterAbilityDescriptionStyle>

                <MasterAbilityDescriptionStyle>
                    Both bridges get covered in flames, dealing 40 damage per sec to unfortunate ground enemies.
                    Lasts 5 sec.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>

            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Tempers Flaring
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    All friendly melee Units have Rage
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    +50% Attack damage.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>

            </TabPanel>

        </Tabs>
    </div>
}