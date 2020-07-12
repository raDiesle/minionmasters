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

export default function MiloweenContent() {
    return <div>
        <MasterHeaderStyle>Milloween</MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            Milloween is a master of the arcane, using spells to power her golems and attacks.
        </MasterAbilityDescriptionStyle>

        <Tabs>
            <TabList>
                <Tab>
                    <MasterAbilityImageStyle src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Arcane_Golem.jpg" alt="Miloween Perk1"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Arcane_Missiles.jpg" alt="Miloween Perk2"/>
                </Tab>
                <Tab>
                    <MasterAbilityImageRoundedStyle src="generated/img/Tome_of_Lore.jpg" alt="Miloween Perk3"/>
                </Tab>
            </TabList>

            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Fires 3 arcane sparks at nearby enemies every 2 seconds for 8 damage each.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    For each Spell in hand, Milloween
                    fires an additional spark.
                </MasterAbilityDescriptionStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Arcane Golem
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add a One-use Card Arcane Golem to the top of Milloween's deck every 30 seconds.
                </MasterAbilityDescriptionStyle>

                <AbilityUlStyle>
                    <li>
                        Health: 300
                    </li>
                    <li>
                        Damage: 40 (Dps: 33.77)
                    </li>
                    <li>
                        Range 8
                    </li>
                </AbilityUlStyle>

                <MasterAbilityDescriptionStyle>
                    Mystical ranged unit fueled by magic. When its Master casts a spell, it gains +40 health and +6
                    damage
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Arcane Missiles
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add the card Arcane Missiles to Milloween's deck.
                </MasterAbilityDescriptionStyle>

                <MasterAbilityDescriptionStyle>
                    Fires 5 arcane missiles in the selected direction. Each missile hits the first enemy in the way and
                    deals 30
                    damage.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Xianian Construct
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    The minimum level of Arcane Golem is now 5.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
        </Tabs>
    </div>
}