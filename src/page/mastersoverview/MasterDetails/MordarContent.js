import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function MordarContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Mordar</h3>

      <div className={css.MasterAbilityDescriptionStyle}>
        Mordar uses his tombstones to raise the dead and his staff to slowly kill all attacking
        minions.
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Mordar_Tombstone_78.webp"
              alt="Mordar Perk1"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Mordar_Tombstone02_78.webp"
              alt="Mordar Perk2"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Tombstonemaster_78.webp"
              alt="Mordar Perk3"
            />
          </Tab>
        </TabList>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Basic Attack</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Deals 10 damage to all enemies on his side of the arena.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            They attack faster and faster ( from every 4 sec to 1 sec).
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Tombstone</div>

          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card Tombstone to Mordar's deck.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            A tombstone with 400 health that activates after 10 seconds and resurrecting the next
            friendly minion that dies.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Another Tombstone</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add another Tombstone card to Mordar's deck.
          </div>

          <div className={css.MasterAbilityDescriptionStyle}>
            A tombstone with 400 health that activates after 10 seconds and resurrecting the next
            friendly minion that dies.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 60XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Vengeful Dead</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            All minions raised by a Tombstone gain Haste
          </div>
          <ul className={css.AbilityUlStyle}>
            <li>50% Movement speed.</li>
            <li>+50% Attack speed.</li>
            <li>Removes Slow.</li>
          </ul>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
