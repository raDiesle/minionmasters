import React from "react";
import {
    AbilityUlStyle,
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

export default function MoreillaContent() {
    return <div>
        <MasterHeaderStyle>
            Moreilla
        </MasterHeaderStyle>
        <MasterAbilityDescriptionStyle>
            Morellia the Lich Queen, Ruler of the Cursed lands, Queen of Souls, and Dragon Binder. Wielding the Book of
            the
            Dead, she can call upon a host of powerful Death Magic to decimate her foes. However, the ancient soul
            trapped
            within the book is forever plotting its release.


            <div>
                <a href="https://www.youtube.com/watch?v=jCudoX8JRps&feature=youtu.be">
                    Learn more about Morellia in the Audiobook "The Lich Queen" by clicking here.
                </a>
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
                <MasterAbilityHeaderStyle>
                    Basic Attack
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Necrothic Touch: Channels a beam of necrotic energy for 6 damage every 0.3 seconds with 10 range.
                </MasterAbilityDescriptionStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Book of the dead
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Adds a One-use Card; Book of the Dead, to the top of Morellia's deck every 30 seconds.

                    Book of the Dead:
                    Replace your hand with 4 options:
                </MasterAbilityDescriptionStyle>
                <AbilityUlStyle>
                    <li>
                        Skeletons: Summon 4 Skeletons.
                    </li>
                    <li>
                        Spirit: Give a random friendly Minion Spirit.
                    </li>
                    <li>
                        Drain Life: Drain 100 health from the closest enemy Minion, transfering it to Morellia
                    </li>
                    <li>
                        Forbidden Knowledge: 2 of Morellia's 4+ mana spells costs 1 less until played. Does not stack.
                    </li>
                </AbilityUlStyle>


                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </MasterAbilityUnlocksHeaderStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Unholy Bargain
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Morellia unlocks the deepest mysteries from the sentient Book of the Dead, empowering its effects:
                </MasterAbilityDescriptionStyle>
            </TabPanel>
            <TabPanel>
                <MasterAbilityHeaderStyle>
                    Queen's Dragon
                </MasterAbilityHeaderStyle>
                <MasterAbilityDescriptionStyle>
                    Add the One-use Card:
                    Queen's Dragon, to Morellia's deck.
                </MasterAbilityDescriptionStyle>
                <MasterAbilityDescriptionStyle>
                    Queen's Dragon
                    Summons Nyrvir the Fallen
                </MasterAbilityDescriptionStyle>
                <AbilityUlStyle>
                    <li>
                        Max Health: 2000.

                    </li>
                    <li>
                        Damage: 320 (Dps: 40).

                    </li>
                </AbilityUlStyle>
                <MasterAbilityUnlocksHeaderStyle>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </MasterAbilityUnlocksHeaderStyle>

            </TabPanel>
        </Tabs>

    </div>
}