import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export default function SettsuContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Settsu</h3>
      <h4>Page is outdated. Want to help on this website? Contact me at Discord: radies_chen</h4>
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
              src={imgPathFn("Settsu_BlastEntry")}
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
              src={imgPathFn("Settsu_CombatReload")}
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
              src={imgPathFn("Settsu_HighPoweredLaser")}
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
