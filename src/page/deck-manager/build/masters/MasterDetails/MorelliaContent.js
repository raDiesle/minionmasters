import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";

export default function MorelliaContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Morellia</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Morellia the Lich Queen, Ruler of the Cursed lands, Queen of Souls, and Dragon Binder.
        Wielding the Book of the Dead, she can call upon a host of powerful Death Magic to decimate
        her foes. However, the ancient soul trapped within the book is forever plotting its release.
        <div>
          <a href="https://www.youtube.com/watch?v=jCudoX8JRps&feature=youtu.be">
            Learn more about Morellia in the Audiobook "The Lich Queen" by clicking here.
          </a>
        </div>
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
            <div>Basic Attack</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Necrothic Touch: Channels a beam of necrotic energy for 6 damage every 0.3 seconds with 10
          range.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("LichQueen_Perk1")}
              alt="Morellia Perk1"
            />
            Book of the dead
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Adds a One-use Card; Book of the Dead, to the top of Morellia's deck every 30 seconds.
          Book of the Dead: Replace your hand with 4 options:
        </div>
        <ul className={css.AbilityUlStyle}>
          <li>Skeletons: Summon 4 Skeletons.</li>
          <li>Spirit: Give a random friendly Minion Spirit.</li>
          <li>
            Drain Life: Drain 100 health from the closest enemy Minion, transfering it to Morellia
          </li>
          <li>
            Forbidden Knowledge: 2 of Morellia's 4+ mana spells costs 1 less until played. Does not
            stack.
          </li>
        </ul>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("LichQueen_Perk2")}
              alt="Morellia Perk2"
            />
            <div>Unholy Bargain</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Morellia unlocks the deepest mysteries from the sentient Book of the Dead, empowering its
          effects:
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("LichQueen_Perk3")}
              alt="Morellia Perk3"
            />
            <div>Queen's Dragon</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add the One-use Card: Queen's Dragon, to Morellia's deck.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Queen's Dragon Summons Nyrvir the Fallen
        </div>
        <ul className={css.AbilityUlStyle}>
          <li>Max Health: 2000.</li>
          <li>Damage: 320 (Dps: 40).</li>
        </ul>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Morellia.iD} />
    </div>
  );
}
