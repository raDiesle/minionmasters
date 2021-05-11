import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";

import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export default function R3KtContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>R3-KT</h3>

      <div className={css.MasterAbilityDescriptionStyle}>
        Wielding dual 38-PR Autoblasters R3-KT poses a threat to any foe standing in it's way. Using the secrets of the shadows it will enter the battlefield joined by illusions to take matters into it's own hands.
      </div>

      <div>
        <fieldset className={css.abilityContainer}>
          <legend className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />{" "}
            Basic Attack
          </legend>
          <ul className={css.AbilityUlStyle}>
            R3-KT shoots at targets within a range of 8, dealing 20 damage every 1 seconds.

            For every card with a mana cost of 4 or more in your deck R3-KT gains +5% Attack Speed.
          </ul>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("Shadow_Dance")}
                alt="Shadow Dance"
              /></div>
              <div>Shadow Dance</div>
          </legend>

          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            20 XP <FontAwesomeIcon icon={faUnlock} />
          </div>
          <div>
            Add 2 Shadow Dance cards to R3-KT's deck.
            R3-KT enters the field with a 150 shield, accompanied by a Shadow Clone.

            Shadow Clones have little health and reduced damage - it explodes when killed for 50 damage.
          </div>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("Shadow_Dance")}
                alt="Shadow Dance"
              />
              <div>Shadow Dance</div>
            </div>
          </legend>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            60 XP <FontAwesomeIcon icon={faUnlock} />
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>

            Add an additional Shadow Dance card to R3-KT's deck.
          </div>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("OnePunchBlast")}
                alt="One Punch blast"
              />
              One Punch Blast
            </div>
          </legend>
          <div className={css.MasterAbilityDescriptionStyle}>
            Add the card One Punch Blast to R3-KT's deck.

            R3-KT deals 250 damage to a target within a range of 8.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            120XP <FontAwesomeIcon icon={faUnlock} />
          </div>
        </fieldset>

        <MasterTipsByCommunity masterKey={mastersMapping.R3KT.iD} />
      </div>
    </div>
  );
}
