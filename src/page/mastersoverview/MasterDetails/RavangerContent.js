import React from "react";
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

export default function RavangerContent() {
    return <div>
        <MasterHeaderStyle>
            Ravanger
        </MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            Ravanger is a fierce Master, able to quickly tear through close combat minions, but if they are ranged, he
            has a
            problem and that's where he needs Brutus!
        </MasterAbilityDescriptionStyle>

        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Ravager_BestBuds.png" alt="Ravager Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Ravager_Enrage.png" alt="Ravager Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Ravager_TerrorBrutus.png" alt="Ravager Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Extremely fast claw attacks.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    Deals 10 damage every 0.3 sec, but has very short range of 4.5.
                </MasterAbilityDescriptionStyle>
            </TabPanel>
            <TabPanel>

                <MasterAbilityHeaderStyle>
                    Best Buds
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Ravager summons their powerful ally Brutus.
                </MasterAbilityDescriptionStyle>
                <MasterAbilitySubHeader>
                    Brutus
                </MasterAbilitySubHeader>
                <AbilityUlStyle>
                    <li>
                        Health: 800
                    </li>
                    <li>
                        damage per sec: 20

                    </li>
                    <li>
                        Life gained per hit: 50

                    </li>
                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Feeding Frenzy
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Friendly Minions with less than 50% health gains Haste
                </MasterAbilityDescriptionStyle>
                <AbilityUlStyle>
                    <li>
                        +50 Movement speed.


                    </li>
                    <li>
                        +50% Attack speed.
                    </li>
                    <li>
                        Removes Slow.
                    </li>
                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Terror Brutus!
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Ravager summons their most powerful ally Terror Brutus
                </MasterAbilityDescriptionStyle>
                <AbilityUlStyle>
                    <li>
                        Health: 2000
                    </li>
                    <li>
                        Damage per sec: 20

                    </li>
                    <li>
                        Life gained per hit: 50

                    </li>
                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
        </Tabs>

    </div>
}