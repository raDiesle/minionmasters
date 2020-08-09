import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import MasterTipsByCommunity from "page/mastersoverview/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/mastersoverview/mastersMapping";
import React from "react";
import IconDamage from "./icon-damage.png";

export default function SettsuContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Settsu</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Settsu is a bad-ass ex-soldier that never plays by the rules.
      </div>
      <div className={css.MasterAbilityDescriptionStyle}>
        She can enter the Arena herself to annihilate enemies with superior firepower.
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
            Basic Attack
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20 XP <FontAwesomeIcon icon={faUnlock} />
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>
          Settsu fires their range 10 Pulse Rifle once per second for 40 damage.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          After 5 shots they have to reload for 5 seconds.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Settsu_BlastEntry_78.webp"
              alt="Settsu Perk1"
            />
            Blast Entry
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card Blast Entry to Settsu's deck.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Settsu enters the battlefield dealing 50 damage on impact and gaining a 300 health shield
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Settsu_CombatReload_78.webp"
              alt="Settsu Perk2"
            />
            <div>Combat Reload</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          When Settsu casts a Spell, they instantly reloads their gun
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Settsu_HighPoweredLaser_78.webp"
              alt="Settsu Perk3"
            />
            High Powered Laser
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Settsu's first shot after a reload deals double damage, pierces enemies and Stuns them for
          3 seconds
        </div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Settsu.iD} />
    </div>
  );
}
