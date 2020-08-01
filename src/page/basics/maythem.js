import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/basics/static-content.module.scss";
import React from "react";

export default function Maythem() {
  return (
    <div className={css.container}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <div>
        <div className="subSectionDesc">
          Like for the draft, the mayhem mode cost 750 gold to play and rewards you based on how
          many victories you achieve. The main difference is that you have to build the deck BEFORE
          starting (once you started you can't change the deck anymore), and every mayhem has a
          different condition that makes it very fun to play, but often is also more complicated
          than normal. Also, the Mayhem mode is available only once a week for 3 days.
          <br />
          In any case, while the draft can only be played in solo, the mayhem can also be played
          with a friend making it more interesting, and the rewards are fixed and quite appetible if
          you can achieve 12 victories.
          <br />
          <fieldset>
            <legend>Rewards</legend>
            Check them on Resource Management page
          </fieldset>
          <br />
          <div className="bb_h1">
            <b>Types of Mayhems</b>
          </div>
          <br />
          Each mayhem has a different condition that makes the battle more complicated, here is the
          list of all the possible conditions:
          <br />
          <br />
          <img src="img/basics/maythem_killingfloor.jpg" alt="Killing Floor" />
          <br />
          <br />
          The lower bridge is always on fire, but experience points are generated at double speed
          (every 2 seconds).
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              In this mayhem the match will be played mostly on the bridge that is not on fire,
              while you need to use spawners or 1 mana minions to keep the bottom bridge under your
              control.
              <br />
            </li>
            <li>
              {" "}
              Scrat Tank, Divine Warrior and Tranquil Shi-Hou are able to cross the bridge without
              taking damage (or not too much for the Tranquil Shi-Hou). Use them to pressure your
              enemy into defend the bottom bridge and send minions to die in the fire.
            </li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_desertermaythem.jpg" alt="Killing Floor" />
          <br />
          <br />
          All minions are summoned with Turncoat.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              Plan carefully and avoid the use of big minions (uless you have a plan to counter
              them) because when they turn against you, they might be your doom.
            </li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_helpfulimps.jpg" alt="helpful imps" />
          <br />
          <br />
          Summoning a minion also summons a Blood Imp.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              The Heal Puff is a very good card to have since you are going to take some damage from
              all the imps that gets summoned automatically.
              <br />
            </li>
            <li>
              {" "}
              Using big minions is also a wise choice, since they will deal enough damage without
              forcing you to spam cards (which means less imps around). Also big minions cause huge
              overkill damage to the imps, and since imps reflect the damage they take to their
              master, it means you'll take down your opponent pretty fast...
              <br />
            </li>
            <li>
              {" "}
              Have a strong spell to clear big waves of imps (that will help in taking down your
              opponent).
            </li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_explositveminions.jpg" alt="explositve minions" />
          <br />
          <br />
          When a minion dies, it explodes causing 50 damage to the surrounding minions and buildings
          (INCLUDING FRIENDLY MINIONS!!!).
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              Try to get some value from siege units, since they'll go straight to the enemy tower
              and when they die, they will deal extra damage to it.
              <br />
            </li>
            <li> Use Taunt minions to prevent enemy minions from reaching your tower.</li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_twoforfree.jpg" alt="two for free" />
          <br />
          <br />
          Make two of the cheapest cards in the deck cost 0 mana when the match starts.
          <br />
          If there are multiple cards with the same mana cost, it will be picked randomly which one
          will get the discount.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              Having cards 4+ mana in the deck is a wise choice since 2 of them will be free to
              play.
              <br />
            </li>
            <li>
              {" "}
              Having 3 copies of the cheapest card, give you the chance to choose which card will be
              free to play (2 copies of that card will be free to play.
            </li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_summonings.jpg" alt="Summonings" />
          <br />
          <br />
          After using a spell, a random minion with the same mana cost will be summoned in front of
          your tower.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              Since you get free minions for every spell you play, having only spells in your deck
              is the best thing you can do!
            </li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_defense_of_the_masters.jpg" alt="defense of the master" />
          <br />
          <br />
          Every 30 seconds summons 2 Legionnaires, then another 2 after 1.5 seconds, then another 2
          after 1.5 seconds, then after 1.5 seconds summons 2 Crossbow Dudes and after 1.5 seconds 2
          more Crossbow Dudes. For a total of 6 Leggionaires and 4 Crossbow Dudes.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              Chain Lightning is your best friend for this mayhem, since it can clear up the entire
              pack of minions that is summoned every 30s.
            </li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_frenziedminions.jpg" alt="Frenzied Minions" />
          <br />
          <br />
          Every minion has Frenzy at all time.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              Since all minions have +50% attack and movement speed, you can use either a swarm
              tactic to melt your opponent with lots of small and incredibly fast minions, or you
              can choose to include some big minions for heavy damage at high speed.
              <br />
            </li>
            <li>
              {" "}
              Frenzy doesn't stack! so if you pick ravager, do it for Brutus, not for frenzy.
            </li>
          </ul>
          <br />
          <br />
          <b>Third for Free</b>
          <br />
          <br />
          If you use 2 minion cards within 5 seconds, summons a random minion with the average cost
          between the 2 cards you used (rounded down).
          <br />
          Using more than 2 cards within 5 seconds triggers the effect ONLY ONCE.
          <br />
          <br />
          <br />
          <img src="img/basics/maythem_fluctuations.jpg" alt="Fluctuations" />
          <br />
          <br />
          When you get a card in hand, there is a 20% chance that changes its basic mana cost from
          +2 and -2. The change is permanent through the game and it can stack multiple times.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              This mayhem is all about luck, so pick a deck that works for you and hope for the
              best.
              <br />
            </li>
            <li>
              {" "}
              Cards cannot cost more than 10 mana, so if you pick a 10 mana card it will either stay
              at 10 mana or get cheaper!
            </li>
          </ul>
          <br />
          <br />
          <img src="img/basics/maythem_defensesurge.jpg" alt="Defense Surge" />
          <br />
          <br />
          Every 30 seconds summons 2 Crystal Sentry and after 1.5 seconds summons 2 Crystal
          Arcanists.
          <br />
          <br />
          <b>Tips</b>:<br />
          <ul className="bb_ul">
            <li>
              {" "}
              The free minion pack every 30 seconds is going to be very annoying if you don't stop
              them quickly, so try to use either Magma Storm or an Incubus to deal with the threat.
              <br />
            </li>
            <li>
              {" "}
              Remember that a Crystal minion attacks at double speed if you have 6 or more mana. Use
              it at your advantage to melt your enemy.
              <br />
            </li>
            <li>
              {" "}
              Try to protect the free minions from spells with a Bannerman, so they can help with
              your push towards your opponent.
            </li>
          </ul>
          <br />
        </div>
      </div>
    </div>
  );
}
