import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function KingPuffContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>King Puff</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        King Puff is a trickster, he loves to confuse his opponents and keep bridge control just as
        he loves kingdom control.
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/KingPuff_TrickSwap_78.webp"
              alt="KingPuff Perk1"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/KingPuff_Inspire_78.webp"
              alt="KingPuff Perk2"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/KingPuff_BridgeShield_78.webp"
              alt="KingPuff Perk3"
            />
          </Tab>
        </TabList>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Basic Attack</div>A slow but powerful attack
          dealing 75 damage to a single unit every 2.5 sec, with a range of 8.
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Trick Swap</div>

          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card Trick Swap to King Puff's deck.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Swaps the location of ALL minions on both bridges and Stuns enemies for 4 sec.
          </div>

          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>

        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>King Buff</div>
          King Puff's 4 and 5 mana Minion Cards gain either Rage or Shield when played.
          <ul className={css.AbilityUlStyle}>
            <li>Rage: +50% Attack damage.</li>
            <li>Shield: Blocks all damage from the next damage source.</li>
          </ul>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 60XP
          </div>
        </TabPanel>

        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Bridge Shield</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            King Puff marks the bottom bridge and is immune to damage when controlling the marked
            bridge.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>Trick Swap moves the mark.</div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
