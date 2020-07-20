import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function RavangerContent() {
    return <div>
        <h3 className={css.MasterHeaderStyle}>
            Ravanger
        </h3>
        <div className={css.MasterAbilityDescriptionStyle}>
            Ravanger is a fierce Master, able to quickly tear through close combat minions, but if they are ranged, he
            has a
            problem and that's where he needs Brutus!
        </div>

        <Tabs>
            <TabList>
                <Tab>
                    <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <img className={css.MasterAbilityImageRoundedStyle} src="generated/img/Ravager_BestBuds_78.webp"
                         alt="Ravager Perk1"/>
                </Tab>
                <Tab>
                    <img className={css.MasterAbilityImageRoundedStyle} src="generated/img/Ravager_Enrage_78.webp"
                         alt="Ravager Perk2"/>
                </Tab>
                <Tab>
                    <img className={css.MasterAbilityImageRoundedStyle} src="generated/img/Ravager_TerrorBrutus_78.webp"
                         alt="Ravager Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <div className={css.MasterAbilityHeaderStyle}>
                    Basic Attack
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Extremely fast claw attacks.
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Deals 10 damage every 0.3 sec, but has very short range of 4.5.
                </div>
            </TabPanel>
            <TabPanel>

                <div className={css.MasterAbilityHeaderStyle}>
                    Best Buds
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Ravager summons their powerful ally Brutus.
                </div>
                <div className={css.MasterAbilitySubHeader}>
                    Brutus
                </div>
                <ul className={css.AbilityUlStyle}>
                    <li>
                        Health: 800
                    </li>
                    <li>
                        damage per sec: 20

                    </li>
                    <li>
                        Life gained per hit: 50

                    </li>
                </ul>
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </div>
            </TabPanel>
            <TabPanel>
                <div className={css.MasterAbilityHeaderStyle}>
                    Feeding Frenzy
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Friendly Minions with less than 50% health gains Haste
                </div>
                <ul className={css.AbilityUlStyle}>
                    <li>
                        +50 Movement speed.


                    </li>
                    <li>
                        +50% Attack speed.
                    </li>
                    <li>
                        Removes Slow.
                    </li>
                </ul>
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </div>
            </TabPanel>
            <TabPanel>
                <div className={css.MasterAbilityHeaderStyle}>
                    Terror Brutus!
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Ravager summons their most powerful ally Terror Brutus
                </div>
                <ul className={css.AbilityUlStyle}>
                    <li>
                        Health: 2000
                    </li>
                    <li>
                        Damage per sec: 20

                    </li>
                    <li>
                        Life gained per hit: 50

                    </li>
                </ul>
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </div>
            </TabPanel>
        </Tabs>

    </div>
}