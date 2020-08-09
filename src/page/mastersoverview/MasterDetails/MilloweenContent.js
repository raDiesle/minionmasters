import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import MasterTipsByCommunity from "page/mastersoverview/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/mastersoverview/mastersMapping";
import React from "react";
import IconDamage from "./icon-damage.png";

export default function MiloweenContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Milloween</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Milloween is a master of the arcane, using spells to power her golems and attacks.
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />

            <div>Basic Attack</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>
          Fires 3 arcane sparks at nearby enemies every 2 seconds for 8 damage each.
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          For each Spell in hand, Milloween fires an additional spark.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Arcane_Golem_78.webp"
              alt="Miloween Perk1"
            />
            Arcane Golem
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add a One-use Card Arcane Golem to the top of Milloween's deck every 30 seconds.
        </div>

        <ul className={css.AbilityUlStyle}>
          <li>Health: 250</li>
          <li>Damage: 30</li>
          <li>Range 8</li>
        </ul>

        <div className={css.MasterAbilityDescriptionStyle}>
          Mystical ranged unit fueled by magic. When its Master casts a spell, it gains +30 health
          and +5 damage
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Arcane_Missiles_78.webp"
              alt="Miloween Perk2"
            />
            <div>Arcane Missiles</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add the card Arcane Missiles to Milloween's deck.
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>
          Fires 5 arcane missiles in the selected direction. Each missile hits the first enemy in
          the way and deals 30 damage.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Tome_of_Lore_78.webp"
              alt="Miloween Perk3"
            />
            <div>Xianian Construct</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          The minimum level of Arcane Golem is now 5.
        </div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Milloween.iD} />
    </div>
  );
}
