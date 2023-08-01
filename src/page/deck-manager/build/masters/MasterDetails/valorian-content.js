import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export function ValorianContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Valorian</h3>
      <h4>Page is outdated. Want to help on this website? Contact me at Discord: radies_chen</h4>
      <div className={css.MasterAbilityDescriptionStyle}>
        Valorian is devoted to the light. He wields it to heal his allies and invoke rightous fury
        on his enemies. Hint: Works well with groups of midrange health Minions such as Legionaires, and use Searing Light to pick off weak enemies.
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
            <div>Basic Attack</div>
          </div>
        </legend>
        Valorian uses his heirloom blade for a slow but powerful attack.
        <div className={css.MasterAbilityDescriptionStyle}>Damage: 40 ( 20DPS)</div>
        <div className={css.MasterAbilityDescriptionStyle}>Cooldown: 2 seconds</div>
        <div className={css.MasterAbilityDescriptionStyle}>Range: 10</div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("ValorianPersk1_small")}
              alt="Valorian Perk1"
            />
            <div>Holy Light</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Valorian heals up to 5 injured friendly Minions for 13 health. Cooldown: 5 seconds
          (Unlocks at 20 XP)
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
              src={imgPathFn("ValorianPersk2_small")}
              alt="Valorian Perk2"
            />
            <div>Searing Light</div>
          </div>
        </legend>

        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card Searing Light to Valorian's deck. Searing Light Valorian does 5 attacks in an
          area, each attack targeting a random enemy Minion.
        </div>

        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("ValorianPersk3_small")}
              alt="Valorian Perk3"
            />
            <div>Divine Light</div>
          </div>
        </legend>
        Double Valorian's Damage as well as Healing from Holy Light
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Valorian.iD} />
    </div>
  );
}
