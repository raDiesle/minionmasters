import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export default function VolcoContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Volco</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Volco is not scared of swarms, but he hates flying enemies he can't reach.
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
            <div>Basic Attack</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Deals 40 area Ground damage with his hammer every 2.5 sec.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>Has a range of 10.</div>
        <div className={css.MasterAbilityDescriptionStyle}>Hammer Time!</div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Volco_BurntheBridges")}
              alt="Volco Perk1"
            />
            <div>Burn the Bridges</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card Burn The Bridges to Volco's deck.
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>
          Both bridges get covered in flames, dealing 200 damage to ground enemies. Lasts 5 sec.
        </div>
        <div>Ember of Flame</div>
        <div className={css.MasterAbilityDescriptionStyle}>Pickup Radius: 1 Effect</div>
        <div className={css.MasterAbilityDescriptionStyle}>Radius: 8</div>
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
              src={imgPathFn("Volco_TempersFlaring2")}
              alt="Volco Perk1"
            />
            <div> Templers Flaring</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Summon an Ember of Flame. Every 15 seconds on a random bridge. When a friendly Melee
          Minion picks up the ember all nearby friendly Melee Minions gain Rage Rage +50% Attack
          damage
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
              src={imgPathFn("Volco_TempersFlaring2")}
              alt="Volco Perk3"
            />
            <div>Tempers Burning</div>
          </div>
        </legend>
        Ember of Flame now gives Berserker's Rage instead. Berserker's Rage:
        <div className={css.MasterAbilityDescriptionStyle}>+100% Attack damage.</div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Also self inflickt 10% of the damage
        </div>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Volco.iD} />
    </div>
  );
}
