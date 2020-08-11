import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/mastersoverview/master-modal.module.scss";
import MasterTipsByCommunity from "page/mastersoverview/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/mastersoverview/mastersMapping";
import React from "react";
import IconDamage from "./icon-damage.png";

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
              src={imgPathFn("Volco_Fireball")}
              alt="Volco Perk1"
            />
            <div>Afterburner</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          When Volco hols the Marked bridge and plays a card, they fire a firebolt at the enemy
          Master dealing 60 Damage.
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
              src={imgPathFn("Volco_BurntheBridges")}
              alt="Volco Perk2"
            />
            <div>Burn the Bridges</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card Burn The Bridges to Volco's deck.
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>
          Both bridges get covered in flames, dealing 40 damage per sec to unfortunate ground
          enemies. Lasts 5 sec.
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
            <div>Tempers Flaring</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>All friendly melee Units have Rage</div>
        <div className={css.MasterAbilityDescriptionStyle}>+50% Attack damage.</div>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Volco.iD} />
    </div>
  );
}
