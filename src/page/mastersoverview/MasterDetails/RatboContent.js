import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function RatboContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Ratbo</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Ratbo is among the most famous Scrat leaders. Scrats will gladly follow him blindly and in
        great numbers - they have a Minigun insurance.
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Ratbo_Rats_78.webp"
              alt="Ratbo Perk1"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Ratbo_moreDakka_78.webp"
              alt="Ratbo Perk2"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Ratbo_RatsRats_78.webp"
              alt="Ratbo Perk3"
            />
          </Tab>
        </TabList>
        <TabPanel>
          <h3 className={css.MasterHeaderStyle}>Basic Attack</h3>
          <div className={css.MasterAbilityDescriptionStyle}>
            Fires a barrage of bullets a enemies from a range of 10, every 0.3 sec for 6 damage.
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Scrats!</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Summons a Scrat every time Ratbo plays a Minion card, or an "Armored" Scrat instead if
            the Minion card cost 5+ Mana.
          </div>

          <div className={css.MasterAbilitySubHeader}>Scrat</div>
          <ul className={css.AbilityUlStyle}>
            <li>Health: 15</li>
            <li>Damage per sec: 10</li>
          </ul>

          <div className={css.MasterAbilitySubHeader}>"Armored" Scrat</div>
          <ul className={css.AbilityUlStyle}>
            <li>Health: 60</li>
            <li>Damage per sec: 20</li>
          </ul>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>More Dakka!</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card More Dakka! to Ratbo's deck
          </div>
          <div className={css.MasterAbilitySubHeader}>More Dakka!</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Ratbo charges up for 1 sec then shoots the nearest enemy for 40 damage per friendly
            Minion on the field. Reduces damage to Master Towers.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 60XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Scrats! Scrats!</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Now summon 2 Scrat every time Ratbo plays a Minion card, or 2 "Armored" Scrat instead if
            the Minion card cost 5+ Mana.
          </div>
          <div className={css.MasterAbilitySubHeader}>Scrat</div>

          <ul className={css.AbilityUlStyle}>Health: 15 Damage per sec: 10</ul>

          <div className={css.MasterAbilitySubHeader}>"Armored" Scrat</div>
          <ul className={css.AbilityUlStyle}>
            <li>Health: 60</li>
            <li>Damage per sec: 20</li>
          </ul>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
