import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import MasterTipsByCommunity from "page/mastersoverview/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/mastersoverview/mastersMapping";
import React from "react";
import IconDamage from "./icon-damage.png";

export default function RatboContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Ratbo</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Ratbo is among the most famous Scrat leaders. Scrats will gladly follow him blindly and in
        great numbers - they have a Minigun insurance.
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
            <div>Basic Attack</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Fires a barrage of bullets a enemies from a range of 10, every 0.3 sec for 6 damage.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Ratbo_Rats_78.webp"
              alt="Ratbo Perk1"
            />
            <div>Scrats!</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Summons a Scrat every time Ratbo plays a Minion card, or an "Armored" Scrat instead if the
          Minion card cost 5+ Mana.
        </div>

        <div className={css.MasterAbilitySubHeader}>Scrat</div>
        <ul className={css.AbilityUlStyle}>
          <li>Health: 15</li>
          <li>Damage per sec: 10</li>
        </ul>

        <div className={css.MasterAbilitySubHeader}>"Armored" Scrat</div>
        <ul className={css.AbilityUlStyle}>
          <li>Health: 60</li>
          <li>Damage per sec: 20</li>
        </ul>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Ratbo_moreDakka_78.webp"
              alt="Ratbo Perk2"
            />
            <div>More Dakka!</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card More Dakka! to Ratbo's deck
        </div>
        <div className={css.MasterAbilitySubHeader}>More Dakka!</div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Ratbo charges up for 1 sec then shoots the nearest enemy for 40 damage per friendly Minion
          on the field. Reduces damage to Master Towers.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Ratbo_RatsRats_78.webp"
              alt="Ratbo Perk3"
            />
            <div>Scrats! Scrats!</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Now summon 2 Scrat every time Ratbo plays a Minion card, or 2 "Armored" Scrat instead if
          the Minion card cost 5+ Mana.
        </div>
        <div className={css.MasterAbilitySubHeader}>Scrat</div>

        <ul className={css.AbilityUlStyle}>Health: 15 Damage per sec: 10</ul>

        <div className={css.MasterAbilitySubHeader}>"Armored" Scrat</div>
        <ul className={css.AbilityUlStyle}>
          <li>Health: 60</li>
          <li>Damage per sec: 20</li>
        </ul>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Ratbo.iD} />
    </div>
  );
}
