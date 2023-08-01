import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export default function KingPuffContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>King Puff</h3>
      <h4>Page is outdated. Want to help on this website? Contact me at Discord: radies_chen</h4>
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
        A slow but powerful attack.
        <ul>
          <li>Damage: 75 ( 30 DPS)</li>
          <li>Cooldown: 2.5 seconds</li>
          <li>Range: 8</li>
        </ul>

        The King`s Birthday: Celebrate the king`s birthday every 40 seconds. Reduced the cooldown by half the cost of every 4-6 mana card you play.
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
          Add a one-use copy of Trick Swap to King Puff`s deck every time the king`s birthday is celebrated ( YOu can only have one Trick Swap at any time).

          Trick Swap
          Swaps the location of ALL Minions on both bridges and Stuns enemies for 4 seconds.

          Stuns
          Stunned units are unable to move or attack.
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
            <div>Royal Gifts</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>


        When the king`s birthday is celebrated a Rage Puff and a Shield Puff appears in your arena.

        Rage Puff: If picked up by a friendly minion give it and up to 4  nearby friendly Minions Rage.

        Shield Puff: If picked up by a friendly minion give it and up to 4 nearby friendly Minions Shield.
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
            <div>Send Forth the Horde!</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>


          Summon a Kingt Puff for each friendly Minion affected by Trick Swap ( Max 5).

          Knight Puff:
          Health: 50
          Range: 8
          Damage: 50(25 dps)

          Using their magical weapons these majestic puffs will do anything in their power to defend the king`s honor
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>Trick Swap moves the mark.</div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping["King Puff"].iD} />
    </div>
  );
}
