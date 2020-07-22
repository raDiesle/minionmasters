import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import IconDamage from "./icon-damage.png";

export default function MoreillaContent() {
  return (
    <div>
      <h3 className={css.MasterHeaderStyle}>Moreilla</h3>
      <div className={css.MasterAbilityDescriptionStyle}>
        Morellia the Lich Queen, Ruler of the Cursed lands, Queen of Souls, and
        Dragon Binder. Wielding the Book of the Dead, she can call upon a host
        of powerful Death Magic to decimate her foes. However, the ancient soul
        trapped within the book is forever plotting its release.
        <div>
          <a href="https://www.youtube.com/watch?v=jCudoX8JRps&feature=youtu.be">
            Learn more about Morellia in the Audiobook "The Lich Queen" by
            clicking here.
          </a>
        </div>
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <img
              className={css.MasterAbilityImageStyle}
              src={IconDamage}
              alt="basic attack"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Diona_Perk1_78.webp"
              alt="Diona Perk1"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Diona_Perk2_78.webp"
              alt="Diona Perk2"
            />
          </Tab>
          <Tab>
            <img
              className={css.MasterAbilityImageRoundedStyle}
              src="generated/img/Diona_Perk3_78.webp"
              alt="Diona Perk3"
            />
          </Tab>
        </TabList>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Basic Attack</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Necrothic Touch: Channels a beam of necrotic energy for 6 damage
            every 0.3 seconds with 10 range.
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Book of the dead</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Adds a One-use Card; Book of the Dead, to the top of Morellia's deck
            every 30 seconds. Book of the Dead: Replace your hand with 4
            options:
          </div>
          <ul className={css.AbilityUlStyle}>
            <li>Skeletons: Summon 4 Skeletons.</li>
            <li>Spirit: Give a random friendly Minion Spirit.</li>
            <li>
              Drain Life: Drain 100 health from the closest enemy Minion,
              transfering it to Morellia
            </li>
            <li>
              Forbidden Knowledge: 2 of Morellia's 4+ mana spells costs 1 less
              until played. Does not stack.
            </li>
          </ul>

          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 20XP
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Unholy Bargain</div>
          <div className={css.MasterAbilityDescriptionStyle}>
            Morellia unlocks the deepest mysteries from the sentient Book of the
            Dead, empowering its effects:
          </div>
        </TabPanel>
        <TabPanel>
          <div className={css.MasterAbilityHeaderStyle}>Queen's Dragon</div>
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
          <div className={css.MasterAbilityUnlocksHeaderStyle}>
            <FontAwesomeIcon icon={faUnlock} /> 120XP
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
