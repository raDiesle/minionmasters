import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export default function DionaContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Diona</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        The Witch Hunter Diona uses a variety of traps to deal with any threat. Her trusty sidekick
        Ruffles fetches useful items from the battlefield for his master.
        <div>
          <a href="https://www.youtube.com/watch?v=5zafVoWXB34">
            Get to know Diona and Ruffles as they venture into the Pinewood
          </a>
        </div>
      </div>

      <fieldset className={css.abilityContainer}>
        <legend className={css.MasterAbilityHeaderStyle}>
          <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
          Basic Attack
        </legend>
        <ul className={css.AbilityUlStyle}>
          <li>20 damage every 1 sec</li>
          <li>range 10</li>
          <li>Lays a Bear Trap every 20 sec.</li>
        </ul>

        <div className={css.MasterAbilityHeaderStyle}>Bear Trap</div>
        <ul className={css.AbilityUlStyle}>
          <li>Roots a unit in place for 4 seconds</li>
          <li>Deals 50 Damage</li>
          <li>Lasts 15 sec.</li>
        </ul>
      </fieldset>
      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Diona_Perk1")}
              alt="Diona Perk1"
            />
            Art of the Hunt
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20 XP <FontAwesomeIcon icon={faUnlock} />
        </div>

        <div className={css.MasterAbilityDescriptionStyle}>Add a Trap card to Diona's deck.</div>
        <div className={css.MasterAbilityDescriptionStyle}>
          The card alternates between Crossbow Trap and Decoy Trap with each draw.
        </div>

        <div className={css.MasterAbilitySubHeader}>Crossbow Trap</div>
        <ul className={css.AbilityUlStyle}>
          <li>Stealth. Fires bolts at nearby minions.</li>
          <li>Damage per sec: 30</li>
          <li>Health: 100</li>
          <li>Lasts 15 sec</li>
          <li>When used, this card becomes a Decoy Trap</li>
        </ul>
        <div className={css.MasterAbilitySubHeader}>Decoy Trap</div>
        <ul className={css.AbilityUlStyle}>
          <li>Taunts nearby minions</li>
          <li>Health: 300</li>
          <li>Lasts 15 sec</li>
          <li>When used, this card becomes a Crossbow Trap</li>
        </ul>
      </fieldset>
      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Diona_Perk2")}
              alt="Diona Perk2"
            />
            Fetch!
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60 XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Every 10 sec, Ruffles will run to a killed enemy Minion and dig up a prize.
        </div>
        Prizes:
        <ul className={css.AbilityUlStyle}>
          <li>2 Mana</li>
          <li>3 XP</li>
          <li>250 Master Health</li>
        </ul>
      </fieldset>
      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Diona_Perk3_78")}
              alt="Diona Perk3"
            />
            <div>Thrill of the Hunt</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          <FontAwesomeIcon icon={faUnlock} /> 120XP
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Add another Trap card to Diona's deck.
        </div>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Diona.iD} />
    </div>
  );
}
