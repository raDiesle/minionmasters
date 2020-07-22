import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function SettsuContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Settsu</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Settsu is a bad-ass ex-soldier that never plays by the rules.
      </div>
      <div className={css.MasterAbilityDescriptionStyle}>
        She can enter the Arena herself to annihilate enemies with superior
        firepower.
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <img
              className={css.MasterAbilityImageStyle}
              src={IconDamage}
              alt="basic attack"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Settsu_BlastEntry_78.webp"
              alt="Settsu Perk1"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Settsu_CombatReload_78.webp"
              alt="Settsu Perk2"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Settsu_HighPoweredLaser_78.webp"
              alt="Settsu Perk3"
            />
          </Tab>
        </TabList>
        <TabPanel>
          <h3 className={css.MasterHeaderStyle}>Basic Attack</h3>
          <div className={css.MasterAbilityDescriptionStyle}>
            Settsu fires their range 10 Pulse Rifle once per second for 40
            damage.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            After 5 shots they have to reload for 5 seconds.
          </div>
        </TabPanel>
        <TabPanel>
          <h3 className={css.MasterHeaderStyle}>Blast Entry</h3>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card Blast Entry to Settsu's deck.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Settsu enters the battlefield dealing 50 damage on impact and
            gaining a 300 health shield
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>
        <TabPanel>
          <h3 className={css.MasterHeaderStyle}>Combat Reload</h3>
          <div className={css.MasterAbilityDescriptionStyle}>
            When Settsu casts a Spell, they instantly reloads their gun
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 60XP
          </div>
        </TabPanel>
        <TabPanel>
          <h3 className={css.MasterHeaderStyle}>High Powered Laser</h3>
          <div className={css.MasterAbilityDescriptionStyle}>
            Settsu's first shot after a reload deals double damage, pierces
            enemies and Stuns them for 3 seconds
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
