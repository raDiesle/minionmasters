import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

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
          Fires a barrage of bullets at enemies from his minigun, but it takes 2 seconds to charge it to full speed.
<ul>
  <li>
    Damage: 5 ( 16.67 DPS)
  </li>
  <li>
    Cooldown: 0.3 seconds
  </li>
  <li>
    Range: 10
  </li>
</ul>



        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Ratbo_Rats")}
              alt="Ratbo Perk1"
            />
            <div>Scrats!</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Summons a Scrat every time Ratbo plays a Minion card, or an "Barrel" Scrat instead if the
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
              src={imgPathFn("Ratbo_moreDakka")}
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
              src={imgPathFn("Ratbo_RatsRats")}
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
