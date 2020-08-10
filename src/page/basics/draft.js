import { useGaTrackView } from "consent-banner";
import React from "react";
import cssStatic from "./static-content.module.scss";

export default function Draft() {
  useGaTrackView("/Basics/Draft");
  return (
    <div className={cssStatic.container}>
      <div>
        Draft is more complicated and more subject to luck. In this mode you get to pick a random
        master and to build a random deck with limited choices, so don't rush and think before you
        pick a card or you might end up regretting it.
        <fieldset>
          <legend>Costs</legend>
          <div>750 gold or 55 rubies to enter</div>
        </fieldset>
        <fieldset>
          <legend>Rewards</legend>
          See Resource Management page
        </fieldset>
        <h3>How to build Draft deck</h3>
        <fieldset>
          <legend>Good</legend>
          <ul>
            <li>
              Prioritize ranged units over melee (if they are of similar strength). If you don't
              have ranged you will lose against air units.
            </li>
            <li>
              Air units a good cards since draft players may not have spells or the proper minions
              to counter them.
            </li>
            <li>
              Take max 2 strong attack spells (Like Fireball, Magma Storm, Chain Lightning, etc..).
            </li>
            <li>
              Future Present/Past, are always good choices. <br />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Bad</legend>
          <ul>
            <li>
              Ignore utility spells like Black Hole, Healing Fireball, etc.. because those are
              rarely of any use if you can't plan the deck.
            </li>
            <li>
              Do not take Trobadour or Living Statue, or any other mana expensive card that works
              only against buildings because you won't be able to use them properly without being
              able to plan your deck.
            </li>
          </ul>
        </fieldset>
        <h3>Masters</h3>
        <fieldset>
          <legend>Good</legend>
          In general, any master who does not depend on combos of specific cards such as:
          <h4>Apep</h4> is good master since the 2 extra cards allows you to better manage the mana,
          and the totem allows you to prevent some critical damage to your tower.
          <h4>Ravager</h4> is a good choice, but be prepare to make your big push with Brutus.
          <h4>Diona</h4> works well if you can use the traps properly, if you don't have experience
          with her go for another master. Diona is probably the best defensive hero if used
          properly.
          <h4>Settsu</h4> is a really good master for draft.
        </fieldset>
        <fieldset>
          <legend>Decent Master choice</legend> <h4>King Puff</h4> is a decent choice, just remember
          to get a solid tank and 4-5 mana spells to use him properly.
          <br /> <h4>Stormbringer</h4> is another decent choice, but be sure to have enough ranged
          units to use his Aereodynamics perk.
        </fieldset>
        <fieldset>
          <legend>Bad</legend>
          <h4>Ratbo, Volco, Mordar and Milloween</h4> are masters that requires some deck planing
          and you can't use them effectively without knowing what cards you are going to use. If you
          have no other choice, make sure you know how to use them properly or you're just going to
          waste money.
        </fieldset>
        <br />
      </div>
    </div>
  );
}
