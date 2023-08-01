import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";

import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export default function ApepContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Apep</h3>

      <h4>Page is outdated. Want to help on this website? Contact me at Discord: radies_chen</h4>
      <div className={css.MasterAbilityDescriptionStyle}>
        Apep, the mighty Slither God gifts you with random Minions and spits powerful acid at all
        minions that dare approach. His worshippers power the Shield Totem that makes him immune to
        damage.
      </div>

      <div>
        <fieldset className={css.abilityContainer}>
          <legend className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />{" "}
            Basic Attack
          </legend>
          <ul className={css.AbilityUlStyle}>
            <li>30 damage (12 DPS)</li>
            <li>Cooldown 2.5 seconds</li>
            <li>Range: 10</li>
            <li>For each card that costs 5 or more in his hand, Apep gains +35% attack speed.</li>
          </ul>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("Apep_Gift")}
                alt="apep gift"
              />
              <div> Gift of the Serpent</div>
            </div>
          </legend>

          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            20 XP <FontAwesomeIcon icon={faUnlock} />
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Put a random 2 mana Minion or Building card in Apep's deck and reduce its mana cost by
            2.
          </div>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("Apep_ShieldTotem")}
                alt="apep shieldtotem"
              />
              <div>Shield Totem</div>
            </div>
          </legend>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            60 XP <FontAwesomeIcon icon={faUnlock} />
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Summon a Shield Totem that makes the Master Tower immune to damage. Health: 250. Duration: 7 seconds.
          </div>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("Apep_GreaterGift")}
                alt="apep greatergift"
              />
              Greater Gift of the Serpent God
            </div>
          </legend>
          <div className={css.MasterAbilityDescriptionStyle}>
            Put a random 4 mana Minion or Building card in APep's deck and reduce its mana cost by
            4.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            120XP <FontAwesomeIcon icon={faUnlock} />
          </div>
        </fieldset>

        <MasterTipsByCommunity masterKey={mastersMapping.Apep.iD} />
      </div>
    </div>
  );
}
