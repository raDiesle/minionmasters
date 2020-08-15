import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";

export default function MordarContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Mordar</h3>

      <div className={css.MasterAbilityDescriptionStyle}>
        Mordar uses his tombstones to raise the dead and his staff to slowly kill all attacking
        minions.
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
          Deals 10 damage to all enemies on his side of the arena.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          They attack faster and faster ( from every 4 sec to 1 sec).
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Mordar_Tombstone")}
              alt="Mordar Perk1"
            />
            Tombstone
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20 XP <FontAwesomeIcon icon={faUnlock} />
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card Tombstone to Mordar's deck.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          A tombstone with 400 health that activates after 10 seconds and resurrecting the next
          friendly minion that dies.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Mordar_Tombstone02")}
              alt="Mordar Perk2"
            />
            <div>Another Tombstone</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add another Tombstone card to Mordar's deck.
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>
          A tombstone with 400 health that activates after 10 seconds and resurrecting the next
          friendly minion that dies.
        </div>
      </fieldset>
      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Tombstonemaster")}
              alt="Mordar Perk3"
            />
            <div>Vengeful Dead</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          All minions raised by a Tombstone gain Haste
        </div>
        <ul className={css.AbilityUlStyle}>
          <li>+33% Movement speed.</li>
          <li>+33% Attack speed.</li>
          <li>Removes Slow.</li>
        </ul>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Mordar.iD} />
    </div>
  );
}
