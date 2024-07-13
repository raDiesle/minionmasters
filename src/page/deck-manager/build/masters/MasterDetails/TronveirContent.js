import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";

import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export default function TronveirContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Tronveir</h3>
      <h4>Page is outdated. Want to help on this website? Contact me at Discord: radies_chen</h4>

      <div className={css.MasterAbilityDescriptionStyle}>
        Tronveir is a Master of the Runewyrd, an ancient magic unoque to the Stoutheart. 
        Runeshapers carve Runes into stone, imbuing it with the power of wind, frost and their ancestral legends.
      </div>

      <div>
        <fieldset className={css.abilityContainer}>
          <legend className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />{" "}
            Basic Attack
          </legend>
          <ul className={css.AbilityUlStyle}>
            Tronveir hurls a stone that knocks enemies back.<br/><br/>
            Damage:     150 (25 DPS)<br/>
            Cooldown:   6 seconds<br/>
            Range:      10
          </ul>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("RuneshaperPerk1")}
                alt="Tronveir Perk1"/>
                Rune Carving
            </div>

          </legend>

          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            20 XP <FontAwesomeIcon icon={faUnlock} />
          </div>
          <div>
            Add a one-use Runestone card to the top of your deck every 30 seconds. It gets a new Runic Carving every time it's played.<br/>
            <ul className={css.AbilityUlStyle}>
                <li>Rune of Wind: +6 Range and deals 200 damage.</li>
                <li>Rune of Frost: Gets Taunt and a 300 Health Shield that inflicts Frozen on nearby enemy ground Minions when depleted.</li>
                <li>Rune of Ancestry: Summons 2 Ancestor Minions. (DPS: 22.5, Health: 100)</li>
                <br/>Cost: 2 Mana, Range: 6 - 36, Health: 150, Duration: 15 secs.
            </ul>
            
          </div>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("RuneshaperPerk2")}
                alt="Tronveir Perk2"
              />
              <div>Runic Empowerment</div>
            </div>
          </legend>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            60 XP <FontAwesomeIcon icon={faUnlock} />
          </div>
          <div className={css.MasterAbilityDescriptionStyle}>
            When you play a Runestone, the next Ground Minion card you play gets a Runic Power of the same type.
            <ul className={css.AbilityUlStyle}>
                <li>Rune of Wind: The next attack deals +50 of damage in an area.</li>
                <li>Rune of Frost: Gets Taunt and a shield equal to its health. Max 200. It inflicts frozen on nearby ground minions when depleted.</li>
                <li>Rune of Ancestry: Summon 2 Ancestor Minions.</li>
            </ul>
          </div>
        </fieldset>

        <fieldset className={css.abilityContainer}>
          <legend>
            <div className={css.MasterAbilityHeaderStyle}>
              <img
                className={css.MasterAbilityImageRoundedStyle}
                src={imgPathFn("RuneshaperPerk3")}
                alt="Tronveir Perk3"
              />
              Runic Mastery
            </div>
          </legend>
          <div className={css.MasterAbilityDescriptionStyle}>
            Reduce Rune Carving Cooldown by 5 seconds. The next time you would get a Runestone, gain a Wyrdstone instead.<br/>
            Wyrdstone: Toss a Wyrdstone, endowed with all three Rune Carvings. Gives the next Minion you play all three Runic Empowerments.
          </div>
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            120XP <FontAwesomeIcon icon={faUnlock} />
          </div>
        </fieldset>

        <MasterTipsByCommunity masterKey={mastersMapping.Tronveir.iD} />
      </div>
    </div>
  );
}
