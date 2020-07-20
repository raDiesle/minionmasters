import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function VolcoContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Volco</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Volco is not scared of swarms, but he hates flying enemies he can't
        reach.
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
              src="generated/img/Volco_Fireball_78.webp"
              alt="Volco Perk1"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Volco_BurntheBridges_78.webp"
              alt="Volco Perk2"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Volco_TempersFlaring2_78.webp"
              alt="Volco Perk3"
            />
          </Tab>
        </TabList>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Basic Attack</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Deals 40 area Ground damage with his hammer every 2.5 sec.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Has a range of 10.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>Hammer Time!</div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Afterburner</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            When Volco hols the Marked bridge and plays a card, they fire a
            firebolt at the enemy Master dealing 60 Damage.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>

        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Burn the Bridges</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card Burn The Bridges to Volco's deck.
          </div>

          <div className={css.MasterAbilityDescriptionStyle}>
            Both bridges get covered in flames, dealing 40 damage per sec to
            unfortunate ground enemies. Lasts 5 sec.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 60XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Tempers Flaring</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            All friendly melee Units have Rage
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            +50% Attack damage.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
