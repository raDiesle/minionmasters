import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function StormbringerContent() {
    return <div>
        <h3 className={css.MasterHeaderStyle}>
            Stormbringer
        </h3>
        <div className={css.MasterAbilityDescriptionStyle}>
            Stormbringer excels at everything that has to do with range!
        </div>


        <Tabs>
            <TabList>
                <Tab>
                    <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack"/>
                </Tab>
                <Tab>
                    <img className={css.MasterAbilityImageRoundedStyle} src="generated/img/Stormbringer_Sniper_78.webp"
                         alt="Stormbringer Perk1"/>
                </Tab>
                <Tab>
                    <img className={css.MasterAbilityImageRoundedStyle}
                         src="generated/img/Stormbringer_Aerodynamics_78.webp"
                         alt="Stormbringer Perk2"/>
                </Tab>
                <Tab>
                    <img className={css.MasterAbilityImageRoundedStyle}
                         src="generated/img/Stormbringer_LightningReflexes_78.webp"
                         alt="Stormbringer Perk3"/>
                </Tab>
            </TabList>
            <TabPanel>
                <div className={css.MasterAbilityHeaderStyle}>
                    Basic Attack
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Fire bolts of lightning every 4 sec for 35 damage. Has a long range of 20.
                </div>

            </TabPanel>
            <TabPanel>
                <div className={css.MasterAbilityHeaderStyle}>
                    Long Shot
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Stormbringer gains global attack range.
                </div>
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                    <FontAwesomeIcon icon={faUnlock}/> 20XP
                </div>

            </TabPanel>
            <TabPanel>
                <div className={css.MasterAbilityHeaderStyle}>
                    Aerodynamics
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    All friendly ranged Units gain Marksmanship when summoned
                </div>

                <div className={css.MasterAbilitySubHeader}>
                    Marksmanship
                </div>
                <ul className={css.AbilityUlStyle}>
                    <li>
                        +2 Range
                    </li>
                </ul>

                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                    <FontAwesomeIcon icon={faUnlock}/> 60XP
                </div>

            </TabPanel>
            <TabPanel>
                <div className={css.MasterAbilityHeaderStyle}>
                    Lightning Reflexes
                </div>
                <div className={css.MasterAbilityDescriptionStyle}>
                    Stormbringer gains double attack speedl.
                </div>
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                    <FontAwesomeIcon icon={faUnlock}/> 120XP
                </div>
            </TabPanel>
        </Tabs>


    </div>
}