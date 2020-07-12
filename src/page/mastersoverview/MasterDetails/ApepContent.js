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
} from '../MasterModal';
import IconDamage from "./icon-damage.png";

export default function ApepContent() {

    return <div>
        <MasterHeaderStyle>Apep</MasterHeaderStyle>

        <MasterAbilityDescriptionStyle>
            Apep, the mighty Slither God gifts you with random Minions and spits powerful acid at all minions that dare
            approach. His worshippers power the Shield Totem that makes him immune to damage.
        </MasterAbilityDescriptionStyle>

        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Apep_Gift.jpg" alt="apep gift"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Apep_ShieldTotem.jpg" alt="apep shieldtotem"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Apep_GreaterGift.jpg" alt="apep greatergift"/>
                </Tab>
            </TabList>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                <AbilityUlStyle>
                    <li>
                        30 damage every 2.5 sec.
                    </li>
                    <li>
                        Range: 10
                    </li>
                    <li>
                        For each card that costs 5 or more in his hand, Apep gains +35% attack speed.
                    </li>
                </AbilityUlStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Gift of the Serpent
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Put a random 2 mana Minion or Building card in Apep's deck and reduce its mana cost by 2.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>

            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Shield Totem
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add the card Shield Totem to Apep's deck.
                    Summon a Shield Totem that makes the Master Tower immune to damage as long as it is alive.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Greater Gift of the Serpent God
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Put a random 4 mana Minion or Building card in APep's deck and reduce its mana cost by 4.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
        </Tabs>


    </div>
}