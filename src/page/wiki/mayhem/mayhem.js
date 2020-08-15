import { anchorLinkTarget } from "components/helper";
import { GoldImg } from "page/wiki/thegame-icons";
import { useGaTrackView } from "footer/consent-banner";
import css from "page/wiki/static-content.module.scss";
import React from "react";

export default function Mayhem() {
  useGaTrackView("/Basics/Mayhem");
  const MENU_LINKS_CONFIG = {
    "Killing Floor": "Killing Floor",
    "Desert Maythem": "Desert Maythem",
    "Helpful Imps!": "Helpful Imps!",
    "Explosive Minions": "Explosive Minions",
    "Two for free": "Two for free",
    Summonings: "Summonings",
    "Defense of the Masters": "Defense of the Masters",
    "Frenzied Minions": "Frenzied Minions",
    Fluctuations: "Fluctuations",
    "Defense Surge": "Defense Surge",
  };

  const MENU_ORDER = [
    MENU_LINKS_CONFIG["Killing Floor"],
    MENU_LINKS_CONFIG["Desert Maythem"],
    MENU_LINKS_CONFIG["Helpful Imps!"],
    MENU_LINKS_CONFIG["Explosive Minions"],
    MENU_LINKS_CONFIG["Two for free"],
    MENU_LINKS_CONFIG.Summonings,
    MENU_LINKS_CONFIG["Defense of the Masters"],
    MENU_LINKS_CONFIG["Frenzied Minions"],
    MENU_LINKS_CONFIG.Fluctuations,
    MENU_LINKS_CONFIG["Defense Surge"],
  ];

  return (
    <div className={css.container}>
      <ul>
        {MENU_ORDER.map((key) => (
          <li key={key}>
            <a href={`#${key}`}>{key}</a>
          </li>
        ))}
      </ul>

      <div>
        <div>
          <fieldset>
            <legend>Basics</legend>

            <ul>
              <li>Enter the mayhem mode cost 750 {GoldImg()}.</li>
              <li>Max victories: 12</li>
              <li>Max allowed losses: 3</li>
              <li>You have to build deck before starting and cannot change after.</li>
              <li>
                every mayhem has a different condition that makes it very fun to play, but often is
                also more complicated than normal.
              </li>
              <li>Available only once a week and for 3 days.</li>
              <li>Can be also played with friend</li>
            </ul>
          </fieldset>
          <fieldset>
            <legend>Rewards</legend>
            Check them on Resource Management page
          </fieldset>
          {anchorLinkTarget(MENU_LINKS_CONFIG["Killing Floor"])}
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
          {anchorLinkTarget(MENU_LINKS_CONFIG["Desert Maythem"])}
          <img src="img/basics/maythem_desertermaythem.jpg" alt="Desert Maythem" />
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
          {anchorLinkTarget(MENU_LINKS_CONFIG["Helpful Imps!"])}
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
          {anchorLinkTarget(MENU_LINKS_CONFIG["Explosive Minions"])}
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
          {anchorLinkTarget(MENU_LINKS_CONFIG["Two for free"])}
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
          {anchorLinkTarget(MENU_LINKS_CONFIG.Summonings)}
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
          {anchorLinkTarget(MENU_LINKS_CONFIG["Defense of the Masters"])}
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
          {anchorLinkTarget(MENU_LINKS_CONFIG["Frenzied Minions"])}
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
              Since all minions have +33% attack and movement speed, you can use either a swarm
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
          {anchorLinkTarget(MENU_LINKS_CONFIG.Fluctuations)}
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
          {anchorLinkTarget(MENU_LINKS_CONFIG["Defense Surge"])}
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
        </div>
      </div>
    </div>
  );
}
