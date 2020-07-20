import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function MiloweenContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Milloween</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Milloween is a master of the arcane, using spells to power her golems
        and attacks.
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
              src="generated/img/Arcane_Golem_78.webp"
              alt="Miloween Perk1"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Arcane_Missiles_78.webp"
              alt="Miloween Perk2"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Tome_of_Lore_78.webp"
              alt="Miloween Perk3"
            />
          </Tab>
        </TabList>

        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Basic Attack</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Fires 3 arcane sparks at nearby enemies every 2 seconds for 8 damage
            each.
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            For each Spell in hand, Milloween fires an additional spark.
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Arcane Golem</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add a One-use Card Arcane Golem to the top of Milloween's deck every
            30 seconds.
          </div>

          <ul className={css.AbilityUlStyle}>
            <li>Health: 300</li>
            <li>Damage: 40 (Dps: 33.77)</li>
            <li>Range 8</li>
          </ul>

          <div className={css.MasterAbilityDescriptionStyle}>
            Mystical ranged unit fueled by magic. When its Master casts a spell,
            it gains +40 health and +6 damage
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Arcane Missiles</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card Arcane Missiles to Milloween's deck.
          </div>

          <div className={css.MasterAbilityDescriptionStyle}>
            Fires 5 arcane missiles in the selected direction. Each missile hits
            the first enemy in the way and deals 30 damage.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 60XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Xianian Construct</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            The minimum level of Arcane Golem is now 5.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
