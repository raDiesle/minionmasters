import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imgPathFn } from "components/helper";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import MasterTipsByCommunity from "page/deck-manager/build/masters/MasterDetails/master-tips-by-community";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";
import IconDamage from "page/deck-manager/build/masters/MasterDetails/icon-damage.png";

export default function RavagerContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Ravager</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Ravager is a fierce Master, able to quickly tear through close combat minions, but if they
        are ranged, he has a problem and that's where he needs Brutus!
      </div>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img className={css.MasterAbilityImageStyle} src={IconDamage} alt="basic attack" />
            <div>Basic Attack</div>
          </div>
        </legend>
        <div className={css.MasterAbilityDescriptionStyle}>Extremely fast claw attacks.</div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Deals 10 damage every 0.3 sec, but has very short range of 4.5.
        </div>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Ravager_BestBuds")}
              alt="Ravager Perk1"
            />
            <div>Best Buds</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          20XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Ravager summons their powerful ally Brutus, which is Mythic.
        </div>
        <div className={css.MasterAbilitySubHeader}>Brutus</div>
        <ul className={css.AbilityUlStyle}>
          <li>Health: 800</li>
          <li>damage per sec: 20</li>
          <li>Life gained per hit: 50</li>
        </ul>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <legend>
          <div className={css.MasterAbilityHeaderStyle}>
            {" "}
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src={imgPathFn("Ravager_Enrage")}
              alt="Ravager Perk2"
            />
            <div>Feeding Frenzy</div>
          </div>
        </legend>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          60XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Friendly Minions with less than 66% health gains Haste
        </div>
        <ul className={css.AbilityUlStyle}>
          <li>+33 Movement speed.</li>
          <li>+33% Attack speed.</li>
          <li>Removes Slow.</li>
        </ul>
      </fieldset>

      <fieldset className={css.abilityContainer}>
        <div className={css.MasterAbilityHeaderStyle}>
          <img
            className={css.MasterAbilityImageRoundedStyle}
            src={imgPathFn("Ravager_TerrorBrutus")}
            alt="Ravager Perk3"
          />
          <div>Terror Brutus!</div>
        </div>
        <div className={css.MasterAbilityUnlocksHeaderStyle}>
          120XP <FontAwesomeIcon icon={faUnlock} />
        </div>
        <div className={css.MasterAbilityDescriptionStyle}>
          Ravager summons their most powerful ally Terror Brutus, which is Mythic.
        </div>
        <ul className={css.AbilityUlStyle}>
          <li>Health: 2000</li>
          <li>Damage per sec: 20</li>
          <li>Life gained per hit: 50</li>
        </ul>
      </fieldset>

      <MasterTipsByCommunity masterKey={mastersMapping.Ravager.iD} />
    </div>
  );
}
