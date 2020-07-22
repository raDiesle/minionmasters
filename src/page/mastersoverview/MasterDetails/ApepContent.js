import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import Tooltip from "rc-tooltip/es";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import IconDamage from "./icon-damage.png";

export default function ApepContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Apep</h3>

      <div className={css.MasterAbilityDescriptionStyle}>
        Apep, the mighty Slither God gifts you with random Minions and spits
        powerful acid at all minions that dare approach. His worshippers power
        the Shield Totem that makes him immune to damage.
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
            <Tooltip
              placement="topRight"
              overlay={
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                  <FontAwesomeIcon icon={faUnlock} /> 20XP
                </div>
              }
            >
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src="generated/img/Apep_Gift_78.webp"
                alt="apep gift"
              />
            </Tooltip>
          </Tab>
          <Tab>
            <Tooltip
              placement="topRight"
              overlay={
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                  <FontAwesomeIcon icon={faUnlock} /> 60XP
                </div>
              }
            >
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src="generated/img/Apep_ShieldTotem_78.webp"
                alt="apep shieldtotem"
              />
            </Tooltip>
          </Tab>
          <Tab>
            <Tooltip
              placement="topRight"
              overlay={
                <div className={css.MasterAbilityUnlocksHeaderStyle}>
                  <FontAwesomeIcon icon={faUnlock} /> 120XP
                </div>
              }
            >
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src="generated/img/Apep_GreaterGift_78.webp"
                alt="apep greatergift"
              />
            </Tooltip>
          </Tab>
        </TabList>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Basic Attack</div>
          <ul className={css.AbilityUlStyle}>
            <li>30 damage every 2.5 sec.</li>
            <li>Range: 10</li>
            <li>
              For each card that costs 5 or more in his hand, Apep gains +35%
              attack speed.
            </li>
          </ul>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>
            Gift of the Serpent
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Put a random 2 mana Minion or Building card in Apep's deck and
            reduce its mana cost by 2.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Shield Totem</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card Shield Totem to Apep's deck. Summon a Shield Totem that
            makes the Master Tower immune to damage as long as it is alive.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 60XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>
            Greater Gift of the Serpent God
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Put a random 4 mana Minion or Building card in APep's deck and
            reduce its mana cost by 4.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
