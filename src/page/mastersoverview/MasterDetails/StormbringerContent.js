import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/mastersoverview/master-modal.module.scss";
import MasterTipsByCommunity from "page/mastersoverview/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/mastersoverview/mastersMapping";
import React from "react";
import IconDamage from "./icon-damage.png";

export default function StormbringerContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Stormbringer</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Stormbringer excels at everything that has to do with range!
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />{" "}
            Basic Attack
          </div>
        </legend>

        <div className={css.MasterAbilityDescriptionStyle}>
          Fire bolts of lightning every 4 sec for 35 damage. Has a long range of 20.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Stormbringer_Sniper")}
              alt="Stormbringer Perk1"
            />
            Long Shot
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Stormbringer gains global attack range.
        </div>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Stormbringer_Aerodynamics")}
              alt="Stormbringer Perk2"
            />
            Aerodynamics
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          All friendly ranged Units gain Marksmanship when summoned
        </div>

        <div className={css.MasterAbilitySubHeader}>Marksmanship</div>
        <ul className={css.AbilityUlStyle}>
          <li>+2 Range</li>
        </ul>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Stormbringer_LightningReflexes")}
              alt="Stormbringer Perk3"
            />
            Lightning Reflexes
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Stormbringer gains double attack speedl.
        </div>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Stormbringer.iD} />
    </div>
  );
}
