import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";

export default function KingPuffContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>King Puff</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        King Puff is a trickster, he loves to confuse his opponents and keep bridge control just as
        he loves kingdom control.
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
            <div>Basic Attack</div>
          </div>
        </legend>
        A slow but powerful attack dealing 75 damage to a single unit every 2.5 sec, with a range of
        8.
      </fieldset>
      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("KingPuff_TrickSwap")}
              alt="KingPuff Perk1"
            />
            <div>Trick Swap</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20XP <FontAwesomeIcon icon={faUnlock} />
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card Trick Swap to King Puff's deck.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Swaps the location of ALL minions on both bridges and Stuns enemies for 4 sec.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("KingPuff_Inspire")}
              alt="KingPuff Perk2"
            />
            <div>King Buff</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        King Puff's 4 and 5 mana Minion Cards gain either Rage or Shield when played.
        <ul className={css.AbilityUlStyle}>
          <li>Rage: +50% Attack damage.</li>
          <li>Shield: Blocks all damage from the next damage source.</li>
        </ul>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("KingPuff_BridgeShield")}
              alt="KingPuff Perk3"
            />
            <div>Bridge Shield</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          King Puff marks the bottom bridge and is immune to damage when controlling the marked
          bridge.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>Trick Swap moves the mark.</div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping["King Puff"].iD} />
    </div>
  );
}
