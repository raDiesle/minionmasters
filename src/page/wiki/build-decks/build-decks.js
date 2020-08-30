import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGaTrackView } from "footer/consent-cookie-banner";
import { anchorLinkTarget, Menu } from "page/wiki/menu-helper";

import cssStatic from "page/wiki/static-content.module.scss";
import React from "react";

export const MENU_LINKS_CONFIG = {
  "Youtube Videos": "Youtube Videos",
  Basics: "Basics",
  "Basic Rules": "Basic Rules",
  "Masters Easy": "Masters Easy",
  "Masters Medium": "Masters Medium",
  "Masters Hard": "Masters Hard",
  "Masters Very Hard": "Masters Very Hard",
  Strategies: "Strategies",
  "Testing & Gameplay": "Testing & Gameplay",
  Combos: "Combos",
};

export function BuildDecks() {
  useGaTrackView("/Basics/BuilddeckGuide");

  const MENU_ORDER = [
    MENU_LINKS_CONFIG.Basics,
    MENU_LINKS_CONFIG["Basic Rules"],
    MENU_LINKS_CONFIG["Masters Easy"],
    MENU_LINKS_CONFIG["Masters Medium"],
    MENU_LINKS_CONFIG["Masters Hard"],
    MENU_LINKS_CONFIG["Masters Very Hard"],
    MENU_LINKS_CONFIG.Strategies,
    MENU_LINKS_CONFIG["Testing & Gameplay"],
    MENU_LINKS_CONFIG["Youtube Videos"],
  ];

  return (
    <div className={cssStatic.container}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <Menu menuitems={MENU_ORDER} />

      <div className="subSection detailBox" id={2894054}>
        {anchorLinkTarget(MENU_LINKS_CONFIG.Basics)}
        <div className="subSectionDesc">
          First of all, there are few things that you need to keep in mind:
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              You can't use the same deck that you use in 1 vs 1 for team battle.
              <br />
              <br />
            </li>
            <li>
              {" "}
              You can't expect to always win. Like in life, sooner or later you'll find someone
              smarter or luckier than you. Just remember that losing is part of the game, the most
              important thing is that you must win more times than you lose (so your rank will
              grow), otherwise it means that your deck doesn't work.
              <br />
              <br />
              Also remember that when you step into a new rank, your deck might not work as well as
              before, so don't be afraid to improve it!
              <br />
              <br />
            </li>
            <li>
              {" "}
              Always check the patch notes! It might seems a waste of time, but it's very important
              to know what's changed, especially because sometime cards change their cost and you
              might end up with a broken deck.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Don't be fooled by the card rarities, a legendary card is not better than a common
              one, is just harder to get. The only thing that counts is how a card works and how you
              use a card.
            </li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2837346}>
        {anchorLinkTarget(MENU_LINKS_CONFIG["Basic Rules"])}

        <div className="subSectionDesc">
          That said, there is no website or golden deck that makes you win like crazy. If you want
          to progress in this game you need to work on your strategies and to learn from your
          mistakes.
          <br />
          <br />
          There are few rules I can give you to increase your chances of success and avoid some
          rookies mistakes:
          <br />
          <ol>
            <li>
              {" "}
              Have a plan!
              <br />
              While it seems obvious, for many people is not. When you are building a deck you need
              to have a plan of attack, from the simplest: "let's spawn minions until the enemy
              can't handle them anymore", to more complicate strategies based on 1 or more specific
              cards.
              <br />
              The important thing is: DO NOT make a deck with random cards and hope for the best,
              because you'll end up losing over and over again, also don't copy decks that you find
              around if you don't know the strategy behind it.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Don't panic!
              <br />
              Sometimes things may get out of hand and everything may look bad like you are going to
              lose. In this case don't panic, think what you can do, and do it! It may not look like
              a winning move at the time, but sometimes if you prevent even just 50 damage at the
              right moment you may get a chance to turn the table in your favor and even win!
              <br />
              <br />
            </li>
            <li>
              {" "}
              Use your own side of the battlefield:
              <br />
              Throwing your minions at the base of the bridge is the worst thing you can do, because
              you'll make those minions an easy target, easy to kill. Use your side of the
              battlefield to build your push, and your defense so you can cut your opponent's
              minions from behind and stop them more easily.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Mana cost:
              <br />
              The average mana cost is a VERY important factor of your deck. I know that big fat
              minions deal huge amount of damage, but what's the point if you lose before you can
              drop them?
              <br />
              The golden rule here is to keep the mana cost around 3.5, you can get to 3.8, 4 top,
              but beyond that your deck is just trash (there are few exception here, but unless you
              are a VERY experienced player, stick with this rule).
              <br />
              <br />
              Why is so important to keep the mana cost low?
              <br />
              While there are many strategies around, we can take them all and categorize them in 2
              groups:
              <br />
              Big minions push or swarming.
              <br />
              We'll see the details about those strategies later, but the point is that if your
              opponent is swarming you, you need to spawn your minions fast enough to stop those
              hordes (and if you have only big cards you can't), also if your opponent is throwing
              at you some big minions, you need to be able to have backups to take him down before
              it reaches your tower.
              <br />
              <br />
              So in general you should have something very small (to capture bridges), something
              small, something medium and maybe something big to kill the enemy tower.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Field Pressure:
              <br />
              They key to win is to keep your opponent under pressure, so that he has to use all his
              mana to defend. Basically if you manage to keep your opponent busy defending all the
              time, even if you are not damaging his tower, you're going to win because you're going
              to reach mana frenzy before him and at that point he will not be able to stop you
              anymore.
              <br />
              <br />
              Sometimes using a big scary minion can increase the pressure over your opponent,
              because he could panic and waste more mana that is required to kill it, giving you an
              opening for a strong push.
              <br />
              <br />
              Just remember: defense always comes first, pushing comes later.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Spells:
              <br />
              While spells are good and all, too many of those will make you lose. The max amount of
              spells to use is 2-3 (4 top if you are using Milloween), beyond that you will become
              too vulnerable to be able to win.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Counters:
              <br />
              Countering the most common minions is necessary no matter what!
              <br />
              <br />
              The most important thing about countering is the mana ratio of what you use to counter
              vs what you are countering. For example if you use a Fireball (4 mana) to counter Stun
              Lancers + Annihilator (9 mana total), you gained 5 mana over your opponent, while if
              you use Fireball (4 mana) to counter a Scrat Pack (1 mana), you lose 3 mana over your
              opponent.
              <br />
              As long as your mana ratio is 0 or positive, you are ok, but if you start to lose mana
              while countering, there is a high change that you are going to lose the game.
              <br />
              <br />
              So you must always be prepare to stop the following minions (or risk losing):
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Rammers, brutes, colossus and co.: this minions are VERY common and quite
                  distruptive, so try to stop them with minions like stun lancers or a simple wall.
                  The divine warrior is also very good to soak their damage in case of emergency
                  (excluding the rammers).
                  <br />
                  <br />
                </li>
                <li>
                  {" "}
                  Minion packs: if your opponent is trying to swarm you, you must be ready with at
                  least 1 minion that cause AOE damage (like the fire imp), or at least a spell like
                  daggerfall.
                  <br />
                  <br />
                </li>
                <li>
                  {" "}
                  Ranged and Flying minions: everyone has a flying minion, and you need to have
                  something to take them down, or they can deal serious damage to your tower.
                  Anti-aircraft units (ranged in general) are required especially for masters like
                  Volco since he can't attack flying units on his own.
                  <br />
                  <br />
                  You should also have at least 1 flying unit since it will give you a good
                  advantage against many minions that can only attack on the ground (like the
                  colossus).
                  <br />
                  <br />
                  Also certain spells like daggerfall or chain lightning are very effective against
                  ranged units (like plasma marines) and certain flying units (like bats and
                  buzzers).
                </li>
              </ul>
              <br />
            </li>
            <li>
              {" "}
              Tanks:
              <br />
              While the concept is obvious, I'd like to remind you that having at least 2 tanks in a
              deck is vital.
              <br />
              You should always have a strong tank (like divine warrior or even the colossus) to
              stop the strong enemy pushes and soak damage while your minions clear the field and a
              medium tank to support your pushes toward the enemy tower.
              <br />
              <br />
              Is always a good idea to place a tank in front of your ranged units to protect them
              and allow them to deal damage safely (since most ranged units have very few hp).
              <br />
              <br />
            </li>
            <li>
              {" "}
              Supports and healers:
              <br />
              While in this game is not required for you to have support units, for some strategies
              is necessary.
              <br />
              For example if you plan to use a sniper, always take the bannerman to protect it from
              spell damages or it will be destroyed in 1 shot.
              <br />
              If you use big minions like colossus or blue golem, is always a good tactic to put a
              priestess to keep them healthy behind them.
              <br />
              If you have an harbinger is always wise to pair him with a healing shrine or a
              priestess.
              <br />
              <br />
              The healing ball and the healing puff are also very useful if you learn to use them
              wisely.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Mana flow:
              <br />
              The amount of mana you regenerate will grow over time, but you can increase it by
              using mana puffs and by reaching mana frenzy before your opponent.
              <br />
              <br />
              This table shows how much mana you get at which minute of the game:
              <br />
              <br />
              <div className="bb_table">
                {" "}
                <div className="bb_table_tr">
                  {" "}
                  <div className="bb_table_th">Time</div>{" "}
                  <div className="bb_table_th">Mana Per Minute</div>{" "}
                  <div className="bb_table_th">Seconds to generate 1 mana</div>{" "}
                </div>{" "}
                <div className="bb_table_tr">
                  {" "}
                  <div className="bb_table_td">0:00 - 0:59</div>{" "}
                  <div className="bb_table_td">20</div> <div className="bb_table_td">3.0</div>{" "}
                </div>{" "}
                <div className="bb_table_tr">
                  {" "}
                  <div className="bb_table_td">1:00 - 1:59</div>{" "}
                  <div className="bb_table_td">24</div> <div className="bb_table_td">2.5</div>{" "}
                </div>{" "}
                <div className="bb_table_tr">
                  {" "}
                  <div className="bb_table_td">2:00 - 2:59</div>{" "}
                  <div className="bb_table_td">28</div> <div className="bb_table_td">2.1</div>{" "}
                </div>{" "}
                <div className="bb_table_tr">
                  {" "}
                  <div className="bb_table_td">3:00 - 3:59</div>{" "}
                  <div className="bb_table_td">32</div> <div className="bb_table_td">1.9</div>{" "}
                </div>{" "}
                <div className="bb_table_tr">
                  {" "}
                  <div className="bb_table_td">4:00 - 4:59</div>{" "}
                  <div className="bb_table_td">36</div> <div className="bb_table_td">1.7</div>{" "}
                </div>{" "}
                <div className="bb_table_tr">
                  {" "}
                  <div className="bb_table_td">
                    5:00+
                  </div> <div className="bb_table_td">40</div>{" "}
                  <div className="bb_table_td">1.5</div>{" "}
                </div>
              </div>
              <br />
              Remember that in order to get to mana frenzy quickly, you need to keep the bridges
              under your control or your opponent will beat you to it!
              <br />
              <br />
              Also, don't forget to kill your opponent's mana puff as soon as possible or he's going
              to swarm you very fast!
              <br />
              <br />
            </li>
            <li>
              {" "}
              Team support:
              <br />
              If your teammate plays an expensive minion, try to support it how you can so it won't
              be wasted!
              <br />
              In order to win in a team battle, the cooperation is the key, so help each other and
              the victory will be yours.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Team Golden Rule:
              <br />
              Try to give to your teammate the time to see what do you want to do by showing the
              preview of the unit and where you want to put it, so that he can support you. If you
              don't do that, the game will end badly, because you will end up playing the same card
              at the same time wasting it.
            </li>
          </ol>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={3032443}>
        <div className="subSectionTitle">
          - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
        </div>
        <div className="subSectionDesc">
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2837414}>
        {anchorLinkTarget(MENU_LINKS_CONFIG["Masters Easy"])}

        <div className="subSectionDesc">
          This is the list of masters that can be used by new players and requires no special skills
          to be played:
          <br />
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              <div className="bb_h1">
                <b>Stormbringer (EASY)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836447/C6B4F7939305ED80390DAF4A309D3CA00D9F0EED/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836447%2FC6B4F7939305ED80390DAF4A309D3CA00D9F0EED%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Long Shot</u>: Stormbringer can shot everywhere in the map.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Aereodynamics</u>: all the ranged units you summon gains +2 range
                  (Marksmanship)
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Lightning Reflexes</u>: Stormbringer attack speed is doubled
                </li>
              </ul>
              <br />
              <b>Basic Attack</b>: Deal 35 damage every 4 seconds to the closest unit (or the enemy
              tower if there are no minions to attack from perk 1).
              <br />
              <br />
              <b>Tactics</b>:<br />
              This is the first master you get, and has a great sinergy with ranged minions since it
              increase the maximum range of all the ranged units you play. <br />
              Try to use this to your advantage by either swarming your enemy with small ranged
              minions or by playing strong ranged units that can breach the enemy tower from a safe
              distance.
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Stormbringer in team with another Stormbringer can keep your opponent under pressure,
              since your opponent will be forced to constantly maintain a tank to soak the damage or
              take 70 damage every 4 seconds (2 seconds if you reach perk 3).
              <br />
              Aereodynamics is also shared with your teammate, so Stormbringer can also be paired
              with any other master as long as your teammate has ranged units that can use
              Marksmanship.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Easy to use, no special skills required.
                  <br />
                </li>
                <li>
                  {" "}
                  Good long range damage.
                  <br />
                </li>
                <li> Boost range on ranged units for the entire team.</li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li> Too slow to defend the tower by himself.</li>
              </ul>
              <br />
            </li>
            <li>
              {" "}
              <div className="bb_h1">
                <b>Ravager (EASY)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836438/2560FBBC9B1AE20FF3248C8D25583F460640035C/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836438%2F2560FBBC9B1AE20FF3248C8D25583F460640035C%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Best Buds</u>: Automatically summon Brutus (only once when you gain the perk),
                  a powerful minion that heals himself on hit!
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Feeding Frenzy</u>: all your minions gain Frenzy (+33% attack and movement
                  speed) when they have less than 50% hp.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Terror Brutus!</u>: Automatically summon Terror Brutus (only once when you gain
                  the perk), a powerful minion that heals himself on hit and with a HUGE hp pool!
                </li>
              </ul>
              <br />
              <u>NOTE</u>: Brutus is considered a Slither minion.
              <br />
              <br />
              <b>Basic Attack</b>: Deal 10 damage every 0.3 seconds to all the enemy minions in
              melee range with the tower (flying minions included).
              <br />
              <br />
              <b>Tactics</b>:<br />
              Ravager is quite a simple master to use. The core feature of ravager are 2: the free
              big minion that spawns at level 1 and 3, and the fact that all your minions will goes
              to frenzy when below 50% hp (which means +33% movement and attack speed).
              <br />
              There are several possible strategies involving the ravager capabilities, from using
              the free minions to lead a big deadly push, to using medium minions like the succubus
              (or even the colossus) empowered by enrage to cause huge damage thanks to the frenzy
              bonus. Just remember that NOT all the minions are affected by frenzy.
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Ravager can be paired in team with another Ravager to create a very strong attack
              force with 2 Brutus, but you'll need to be careful because your tower won't have any
              defense against ranged units (unless you spawn some minions to do it).
              <br />
              Feeding Frenzy is shared with your teammate, so you can plan a strategy to get the
              most out of it.
              <br />
              If you are paired with Volco or Mordar, your tower defense will be really weak, so
              make sure to bring strong minions to defend.
              <br />
              Mordar's tombstones can resurrect Brutus, and at perk 3 it will be even stronger when
              resurrected (since it will also gain frenzy without losing 50% hp).
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Easy to use, no special skills required.
                  <br />
                </li>
                <li>
                  {" "}
                  Grants 2 free strong tanks at perk 1 and 3.
                  <br />
                </li>
                <li> Frenzy for every unit below 50% hp.</li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Incapable of defending himself against ranged units.
                  <br />
                </li>
                <li>
                  {" "}
                  Most of the strategies relies on the free tanks and failing to use them properly
                  result in a game loss.
                </li>
              </ul>
            </li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2941648}>
        {anchorLinkTarget(MENU_LINKS_CONFIG["Masters Medium"])}
        <div className="subSectionDesc">
          This is the list of masters that requires some skill to be used propely making them of
          "MEDIUM" difficulty to play:
          <br />
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              <div className="bb_h1">
                <b>SETTSU (MEDIUM)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836486/79341EFFE2F17177603429A4518184CE26FC5143/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836486%2F79341EFFE2F17177603429A4518184CE26FC5143%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Blast Entry</u>: adds a card that allows you to send Settsu in the battlefield.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Combat Reload</u>: everytime you play a spell card, Settsu instantly reloads
                  the gun.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>High Powered Laser</u>: after reloading, Settsu shoots a piercing round that
                  deals double damage and stuns all the enemies in the line for 3 seconds.
                </li>
              </ul>
              <br />
              <b>Basic Attack</b>: Deal 40 damage every seconds at a range of half the size of your
              side of the battlefield. After 5 shots, she will pause for 5 seconds to reload.
              <br />
              <br />
              <b>Tactics</b>:<br />
              Settsu is a master that requires some skill and tactics to be mastered. The core
              feature is the ability to go into the field causing 50 damage in the landing zone and
              then either use her as tank to lead a push, or to surgically strike an enemy (like the
              Harbinger) or the enemy tower itself.
              <br />
              The ability to use a spell to instant recharge her rifle and to stun the enemies (with
              perk 3), is probably the hardest thing to master while using Settsu.
              <br />
              Plan your deck accordigly making sure you have at least 1 fast spell to use for fast
              reloading her gun while she's on the battlefield, and enough minions to keep your
              opponent busy.
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Settsu can synergize well with any master since she's a master that works
              indipendently with a good deck, and can really save the day if your teammate is not
              really strong.
              <br />
              Settsu can take advantage of the Aereodynamics perk from Stormbringer and Feeding
              Frenzy from Ravager, both giving you a solid advantage while using Blast Entry.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Extremely versatile master.
                  <br />
                </li>
                <li>
                  {" "}
                  Used properly allows a strong defense (especially with the free stun with perk 3).
                  <br />
                </li>
                <li> Can enter the field and fight wherever you want.</li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Moving the master in the field at the wrong moment leaves the tower defenseless.
                  <br />
                </li>
                <li>
                  {" "}
                  Requires a proper timing when using spells to recharge the rifle.
                  <br />
                </li>
                <li> Long recharge time before perk 2.</li>
              </ul>
            </li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2941647}>
        {anchorLinkTarget(MENU_LINKS_CONFIG["Masters Hard"])}
        <div className="subSectionDesc">
          This is the list of masters that requires some advanced skills to be used, making them
          "HARD" to play:
          <br />
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              <div className="bb_h1">
                <b>Apep (HARD)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645843944/1C2EAFBA9465236EB69994CD66A9C3998A540B80/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645843944%2F1C2EAFBA9465236EB69994CD66A9C3998A540B80%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Gift of the Serpent God</u>: adds to your deck a 2 mana card that you can play
                  for free.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Shield Totem</u>: adds to your deck the totem building card. This card is free
                  and while the totem is active you're tower becomes immune to damage (except Blood
                  Imps).
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Greater Gift of the Serpent God</u>: adds to your deck a 4 mana card that you
                  can play for free.
                </li>
              </ul>
              <br />
              <b>Basic Attack</b>: Deal 30 damage every 2.5 seconds at a range of half the size of
              your side of the battlefield. For each card of 5+ mana you have in hand the attack
              speed increases by 35%.
              <br />
              <br />
              <b>Tactics</b>:<br />
              This master requires 2 main skills:
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Knowing when to play the totem to protect your tower.
                  <br />
                </li>
                <li> Knowing how to use the free cards to make your deck more mana efficient.</li>
              </ul>
              <br />
              The totem should always be used to soak major damage or when your tower is overrun so
              that you could Magma Storm the area safely.
              <br />
              <br />
              The free cards however, should always be used while you need to regenerate mana for
              something good, so you can regenerate mana and keep applying pressure in the
              battlefield at the same time.
              <br />
              <br />A common tactic is to have 2 Future Present cards in hand, so at the beginning
              of the game (when the mana regenerate slowly), Apep shoots fast against anything that
              comes against you. The Future Present cards can be used safely at late game (when the
              mana regenerates faster), so you can get some powerful minion at discounted mana cost
              to finish your enemy.
              <br />
              <u>NOTE</u>: trying to use Future Present at the beginning of a game is almost always
              a suicide move, so DON'T do it (unless things are going insanely well).
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Apep works well with any master, but having another Apep or King Puff as teammate ,
              can provide extra shielding for the tower making your team really hard to beat when
              you reach perk 3.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Decent self-defense with the right cards in hand.
                  <br />
                </li>
                <li>
                  {" "}
                  The Shield Totem provides invulnerability on demand.
                  <br />
                </li>
                <li> The free cards allow a great mana management.</li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Requires an advanced skill in mana management in order to be used properly.
                  <br />
                </li>
                <li>
                  {" "}
                  Misplacing th Shield Totem or using it at the wrong time cause more harm than
                  good.
                  <br />
                </li>
                <li> The free cards completely rely on luck.</li>
              </ul>
              <br />
            </li>
            <li>
              {" "}
              <div className="bb_h1">
                <b>Diona (HARD)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836370/FA7E65E325C69F651FC87D7983C9E994065F8176/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836370%2FFA7E65E325C69F651FC87D7983C9E994065F8176%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Art of the Hunt</u>: adds a random trap card in your deck (Decoy or Crossbow
                  Trap).
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Fetch!</u>: every 10 seconds, your dog runs to a dead enemy minion to fetch a
                  prize (2 mana, 3XP or 250 hp for your tower).
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Thrill of the Hunt</u>: adds another random trap card in your deck (Decoy or
                  Crossbow Trap).
                </li>
              </ul>
              <br />
              <u>NOTE</u>: all the traps are considered Empyrian buildings.
              <br />
              <br />
              <b>Basic Attack</b>: Deal 20 damage every second at a range of half the size of your
              side of the battlefield. Also place a bear trap in your side of the battlefield (in a
              random place), that cause 50 damage and roots the first minion that walks over it for
              4 seconds.
              <br />
              <br />
              <b>Tactics</b>:<br />
              Diona is a master well suited for both support and attack decks. The basic toolkit of
              this master provides several traps (2 of which can be placed anywhere in the map),
              that helps to taunt and root the enemies, while if you protect the dog when it goes to
              fetch the potions, it will provide you with extra mana and free healing.
              <br />
              This master sinergize well with a support deck team oriented (with guardian +
              priestess for example), but it also has a nice aggressive sinergy with big minions,
              since you can use the taunt trap to allow them to reach the enemy tower unchallenged.
              <br />
              The main difficulty is in the timing and placement of the traps which takes some
              practice to master. If you fail to place a trap means that you will lose it almost
              instantly, so be careful!
              <br />
              <br />
              <u>NOTE</u>: you can use the traps to capture bridges (just spawn a trap on an empty
              bridge).
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Diona is very versatile so she works well with any master, however, having another
              Diona as teammate will double the traps giving your team more defense and bridge
              control.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Good self-defense.
                  <br />
                </li>
                <li>
                  {" "}
                  Free bear traps capable of stopping even the stronger minions.
                  <br />
                </li>
                <li>
                  {" "}
                  Cheap traps allows to taunt or damage anything or anyone on demand.
                  <br />
                </li>
                <li>
                  {" "}
                  Can capture bridges with the traps.
                  <br />
                </li>
                <li> Free mana or healing if the dog manage to get the potion home.</li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Using the traps requires a certain skill and practice.
                  <br />
                </li>
                <li>
                  {" "}
                  The dog is vulnerable to anything and when the enemies dies on your opponent side
                  of the battlefield, it will never return home (especially if Mordar is one of your
                  opponents).
                </li>
              </ul>
              <br />
            </li>
            <li>
              {" "}
              <div className="bb_h1">
                <b>King Puff (HARD)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836385/F55E796A98248FC19856F3B53152AF58E4A1807C/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836385%2FF55E796A98248FC19856F3B53152AF58E4A1807C%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Trick Swap</u>: swaps the location of ALL minions on both bridges, and stun the
                  enemy minions for 4 seconds.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>King Buff</u>: all 4 and 5 mana cards in your deck gains either Shield or Rage
                  (the effect randomizes everytime you have the card in hand).
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Bridge Shield</u>: while you control the marked bridge (the one marked with the
                  crown), you're tower is immune to damage. Using Trick Swap also changes the marker
                  location.
                </li>
              </ul>
              <br />
              <b>Basic Attack</b>: Deal 75 damage every 2.5 seconds at a range of less than half
              size of your side of the battlefield.
              <br />
              <br />
              <b>Tactics</b>:<br />
              King Puff is a peculiar master to play. The core feature is that all the minions of 4
              and 5 mana will get randomly either rage or a shield, and you can swap the minions
              between brideges (stunning the enemy ones in the process). Also at level 3, as long as
              you keep control of the bridge with the crown symbol, your tower will be completely
              invulnerable.
              <br />A good strategy for this master, is to have some key minions of 4 and 5 mana (DO
              NOT put only 4-5 mana minions!!!), use this empowered minions to strike deadly damage
              to your opponent tower, while you use a solid tank with other small minions to keep
              control of the marked bridge to ensure your invulnerability.
              <br />
              <br />
              <u>NOTE:</u> Knowing how to use efficiently Trick Swap makes the difference between
              winning and losing.
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Since King Puff decks tent to be slow, it requires a teammate capable of helping you
              defend for a couple of minutes until the mana regeneration is a bit faster. The Bridge
              Shield mark is shared with your teammate, making it easier to manage it.
              <br />
              King Buff is NOT shared with your teammate, so if he's not using another King Puff he
              won't get any advantage from it.
              <br />
              If you team up with Apep your team becomes really strong, since the Shield Totem can
              be used to protect your tower from damage while you try to get the Bridge Shield back.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Free Rage/Shield on perk 2.
                  <br />
                </li>
                <li>
                  {" "}
                  Can switch bridges and stun the opponents for free.
                  <br />
                </li>
                <li>
                  {" "}
                  As long as you control the crown bridge you're tower is invulnerable (from perk
                  3).
                </li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  While he can deal a great amount of damage, he's attack speed is quite slow and
                  unreliable to defend on his own.
                  <br />
                </li>
                <li>
                  {" "}
                  Requires many 4-5 mana cards, forcing you to have a slow deck.
                  <br />
                </li>
                <li>
                  {" "}
                  Trick Swap requires a certain skill to be used at the proper time.
                  <br />
                </li>
                <li> The main strength of this master is available from perk 2.</li>
              </ul>
            </li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2956037}>
        {/* HARD PT 2 */}
        <div className="subSectionDesc">
          <ul className="bb_ul">
            <li>
              {" "}
              <div className="bb_h1">
                <b>Mordar (HARD)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836411/E541EB494C9F8EFEC4C319813FB6FE349EB8768F/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836411%2FE541EB494C9F8EFEC4C319813FB6FE349EB8768F%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Tombstone</u>: adds a free Tombstone card to your deck. A Tombstone after 10
                  seconds of charging, resurrects the first friendly minion that dies.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Another Tombstone</u>: adds another free Tombstone card to your deck.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Vengeful Dead</u>: every minion resurrected by a Tombstone, gains Frenzy (+33%
                  attack and movement speed).
                </li>
              </ul>
              <br />
              <u>NOTE</u>: the Tombstones are considered Accursed buildings.
              <br />
              <br />
              <b>Basic Attack</b>: Deal 10 damage to every enemy in your side of the battlefield
              every 4 seconds, each time it deals damage it gets faster and faster (up to once per
              second). The attack speed resets if Mordar stops attacking.
              <br />
              <br />
              <b>Tactics</b>:<br />
              Mordar is a master that requires some planning. The core feature of Mordar are the
              tombstones, that after 10s from the placement, will resurrect the first minion that
              dies.
              <br />
              This feature gives you several possible strategies, from the most raw like using the
              tombstones to soak the enemies damage (like the walls), to more complex ones like
              having big minion (like a colossus or a harbinger) to push, die, come back to life up
              until your opponent is swarmed by huge minions that cannot be stopped.
              <br />
              It's basically all about the timing from when you place the tombstone to when the
              minon dies, and to make sure the right minion get resurrected.
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Mordar can be used in team with another Mordar to double the amount of tombstones and
              become really oppressive for your opponent if he can't destroy them.
              <br />
              Mordar can also work with any other master except Ratbo (never pair Mordar and Ratbo
              unless you want to waste all tombstones on scrats), as long as they can provide a good
              tower defense (since Mordar damage is very low).
              <br />
              Tombstones are shared with your opponent, so if your teammate minion dies before
              yours, that is the one which is going to be resurrected. If you are in team with
              Ratbo, your tombstones will be quite useless since they will be wasted on scrats.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li> Can resurrect minions and empower them with Frenzy (at perk 3).</li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Using the tombstones requires a certain level of skill and practice.
                  <br />
                </li>
                <li>
                  {" "}
                  The basic attacks deal a really low damage and it's completely incapable of
                  defending the tower against medium-strong units.
                </li>
              </ul>
              <br />
            </li>
            <li>
              {" "}
              <div className="bb_h1">
                <b>Ratbo (HARD)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836423/A8D48862713D0089CE2DDAD29B3C12A753EDD1E0/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836423%2FA8D48862713D0089CE2DDAD29B3C12A753EDD1E0%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Scrats!</u>: summon a scrat everytime you play a MINION card.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>More Dakka!</u>: shoots at the nearest enemy causing 40 damage per friendly
                  minion in the field.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Scrats! Scrats!</u>: summon a second scrat everytime you play a MINION card.
                </li>
              </ul>
              <br />
              <b>Basic Attack</b>: Deal 5 damage every 0.3 seconds at a range of half the size of
              your side of the battlefield.
              <br />
              <br />
              <b>Tactics</b>:<br />
              This master requires some experience in swarming in order to use it properly. In fact
              the core feature of ratbo is the ability of spawn scrats everytime you play a minion
              card, and his second perk ability deal damage based on how many minions you have alive
              in that moment.
              <br />
              The best (and probably only) strategy to use ratbo properly, is to use small and
              medium cards to swarm your opponent, and to use the "More Dakka!" ability when you
              have alot of minions around to deal devastating damage to big enemy minions (or the
              opponent tower).
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Ratbo can work well with another Ratbo, since that will double the amount of scrats
              around making More Dakka! even more effective. Any other master (except Mordar) can
              also work with Ratbo, better if they have hordes in their deck to boost your More
              Dakka! damage when needed.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Good self-defense.
                  <br />
                </li>
                <li>
                  {" "}
                  Get 1-2 free scrat everytime you use a card.
                  <br />
                </li>
                <li>
                  {" "}
                  More Dakka! can potentially deal a HUGE amount of damage and potentially instantly
                  destroy the enemy tower.
                </li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  More Dakka! is extremely hard to be used properly, and it will take lot of
                  practice before you can actually manage to hit what you want.
                  <br />
                </li>
                <li>
                  {" "}
                  You need to learn when to spam units and when to stop or risk to lose them all.
                </li>
              </ul>
              <br />
            </li>
            <li>
              {" "}
              <div className="bb_h1">
                <b>Volco (HARD)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836502/94379A3A4AAD66CF7328183EFA0F6440F17B7AC5/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836502%2F94379A3A4AAD66CF7328183EFA0F6440F17B7AC5%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Afterburner</u>: while you control the marked bridge (marked with a hammer),
                  every card you play makes Volco shoots a fireball to the enemy tower causing 60
                  damage.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Burn the Bridges</u>: adds a free spell to your deck that allows you to set the
                  bridges on fire damaging all the enemy minions that are walking over it. The fire
                  causes 40 damage per second.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Tempers Flaring</u>: every friendly MELEE minion gains rage.
                </li>
              </ul>
              <br />
              <b>Basic Attack</b>: Deal 40 area damage every 2.5 seconds, at a range of half the
              size of your side of the battlefield.
              <br />
              <u>NOTE</u>: Volco can damage only GROUND minions, so keep some minion ready to deal
              with air units.
              <br />
              <br />
              <b>Tactics</b>:<br />
              This is a tricky one to master. The core strength of Volco is the first perk that
              allows you to deal 60 damage to the enemy tower everytime you play a card, as long as
              you keep control of the bridge marked with the hammer.
              <br />
              This means that the best tactics is to have a lot of small cards that you can spam in
              order to deal damage to the enemy tower very fast, but also you need to have a solid
              strategy to maintain the control of the marked bridge all the time (by using a solid
              tank like the colossus for example).
              <br />
              <br />
              Another solid tactic is to plan a way to survive until you reach the third perk and
              then cause massive damage with melee units (since all melee units gets free rage).
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Volco can work well with another Volco since the Afterburner mark is shared (allowing
              your team to deal a lot of damage by simply playing a card), but it's also very
              dangerous if you don't have a solid air defense to protect the tower.
              <br />
              Tempers Flaring is shared with your teammate, so if you are teamed up with someone
              that has a lot of melee units is very good. Ravager Brutus is also affected by Tempers
              Flaring, and paired with Feeding Frenzy, it can make your units VERY strong (as long
              as you can reach perk 3 safely).
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Can damage the enemy tower passively.
                  <br />
                </li>
                <li>
                  {" "}
                  Can set the bridges on fire and kill most of the units that are crossing it.
                  <br />
                </li>
                <li> Free rage for every melee unit at perk 3.</li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Completely defenseless against air units.
                  <br />
                </li>
                <li>
                  {" "}
                  It requires a certain skill to control the marked bridge and damage your opponent.
                  <br />
                </li>
                <li> Setting the bridges on fire requires a good timing and strategy.</li>
              </ul>
            </li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={3071787}>
        {/* Hard part 3 */}
        <div className="subSectionDesc">
          <ul className="bb_ul">
            <li>
              {" "}
              <div className="bb_h1">
                <b>MIlloween (VERY HARD)</b>
              </div>
              <br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/994638228645836397/1F47B4D381EA51D4993DF9D9D473F4D5DA4E7210/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F994638228645836397%2F1F47B4D381EA51D4993DF9D9D473F4D5DA4E7210%2F"
              >
                {/* img placeholder */}
              </a>
              <b>PERKS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  <u>Arcane Golem</u>: adds the Arcane Golem card to your deck. The golem gains 40
                  hp and 6 extra damage each spell you cast (up to 10).
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Arcane Missiles</u>: adds the Arcane Missiles spell to your deck that damages
                  the first enemy in the line of fire causing 30 damage per missile (a total of 5
                  missiles are fired). If the first enemy dies the missiles continues to the next
                  enemy in line.
                  <br />
                </li>
                <li>
                  {" "}
                  <u>Xanian Construct</u>: your Arcane Golem start with 5 stacks.
                </li>
              </ul>
              <br />
              <b>Basic Attack</b>: Fire 3 arcane sparks every 2 seconds at a range of half the size
              of your side of the battlefield. Each spark cause 8 damage and each spell you have in
              hand, it gains an additional spark.
              <br />
              <br />
              <b>Tactics</b>:<br />
              This is probably the hardest master to play. The core ability is the arcane golem, a
              minion that cost 3 mana and increase hp and damage for every spell you cast (up to 10
              stacks).
              <br />
              The entire strategy of Milloween rotate around the arcane golem, so at level 3 when
              your golem has 5 stacks from the moment it spawns, you'll start to deal massive damage
              if you protect it long enough. So in short, you need to build a deck to empower and
              protect the arcane golem, and make sure you can level up fast enough to get to level 3
              and ensure your victory.
              <br />
              Milloween works well with fast decks with few spells (even just 1) and a solid tank to
              protect the arcane golem.
              <br />
              <br />
              Something to remember is that Arcane Missiles can kill Xiao Long (even when enraged).
              <br />
              <br />
              <b>Team Synergies</b>:<br />
              Milloween is a slow paced master that requires a teammate capable of defending at
              least until perk 1 when you get the Arcane Golem.
              <br />
              Unfortunately only YOUR spells count for the golem empowering and if a Mordar's
              tombstone resurrects it, your teammate will have to build up stacks on the resurrected
              Arcane Golem instead of you.
              <br />
              Using double Milloween can be really strong late game, but it's extremely hard to
              survive at start, so if you plan to do this, also plan for a strong defense stragety
              to resist long enough until you get to perk 3.
              <br />
              <br />
              <b>PRO:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Strong self-defense.
                  <br />
                </li>
                <li>
                  {" "}
                  Arcane Golem is probably the strongest ranged unit in game, and only Milloween can
                  use it.
                </li>
              </ul>
              <br />
              <b>CONS:</b>
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  It gains the most damage at perk 3 and requires a high level of strategy to get
                  there alive.
                  <br />
                </li>
                <li>
                  {" "}
                  It requires to use spells often, making her extremely vulnerable to Xiao Long.
                  <br />
                </li>
                <li>
                  {" "}
                  Timing the spells and the minions is a skill required to be able to use her
                  properly.
                </li>
              </ul>
            </li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={3032444}>
        <div className="subSectionTitle">
          - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
        </div>
        <div className="subSectionDesc">
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2837435}>
        {anchorLinkTarget(MENU_LINKS_CONFIG["Strategies"])}

        <div className="subSectionDesc">
          The first thing to keep in mind when you create a deck is what core strategy you want to
          use. The core strategies are mainly divided in 3 groups:
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              <b>Control</b>:<br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/825757737340879007/9D57709AA4B03C538040F1C8F6CAF9347DDA7BB5/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F825757737340879007%2F9D57709AA4B03C538040F1C8F6CAF9347DDA7BB5%2F"
              >
                {/* img placeholder */}
              </a>
              A control deck is designed to maintain the control of the bridges and to counter
              anything that comes in your way. This kind of decks are usually effective in 2v2 since
              you can defend while you're teammate attacks the enemy.
              <br />
              If you plan to use a control deck, remember that you can only win late game (in mana
              frenzy most of the times).
              <br />
              <br />
              This strategy works well with Apep, since the free cards give the chance to better
              manage the mana and rotate you're cards more easily.
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Swarming</b>:<br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/825757737340878915/08AECD0C9118F30DDD12F6EE69F82F445B1704A4/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F825757737340878915%2F08AECD0C9118F30DDD12F6EE69F82F445B1704A4%2F"
              >
                {/* img placeholder */}
              </a>
              The swarming strategies are mainly designed to spawn so many minions that your
              opponent won't be able to stop you.
              <br />
              This strategies are not very effective on early game, but they become lethal if you
              manage to reach mana frenzy!
              <br />
              <br />
              This kind of strategy is fairly common with masters like Ratbo or Volco, since they
              synergize very well with cards that can be spammed.
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Big minions</b>:<br />
              <a
                href="https://steamuserimages-a.akamaihd.net/ugc/825757737340877748/7EBEAB63F3C360C6214AEF6EFC26A92B05766A1B/"
                className="modalContentLink"
                data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F825757737340877748%2F7EBEAB63F3C360C6214AEF6EFC26A92B05766A1B%2F"
              >
                {/* img placeholder */}
              </a>
              This strategy requires you to escort one big fat minion to the enemy tower to cause
              massive damage. Since the big fat minions have huge amount of hp, some tactics can
              involve using them as distraction while you deal the real damage with smaller minions.
              <br />
              <br />
              This strategy is very good with Mordar since he can resurrect the fallen big minions
              with the tombstones.
            </li>
          </ul>
          <br />
          Having your core strategy in mind, now you need to do as follow:
          <br />
          <ol>
            <li>
              {" "}
              Pick 1-3 cards that will be the core of your deck. Those cards will determine HOW you
              are going to win. For example, you like the Colossus, so you want to use him to
              destroy your enemy.
              <br />
              <br />
              You can choose to use meta cards (knowing that those are highly countered), or you can
              make an "out of the box" choice that will give you the chance to take your opponent by
              surprise.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Now that you know what you want to win, choose a secondary win condition (in case your
              opponent is countering your main one).
              <br />
              The best way is to make sure that both winning conditions can support each other.
              <br />
              Using the previous example of the Colossus, your secondary winning strategy might be
              using a Harbinger. So if you're opponent has good ways to counter the Colossus, there
              is a good chance is not able to stop your Harbinger. Both winning conditions can be
              used together becoming even more effective.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Once you have the win condition set, you are left with fillers cards. Do you have
              enough anti-air that your deck won't suffer if enemy has slightly more air units? Do
              you have anti swarm so you don't have to summon 3 units to deal with legionnaires? Do
              you have a way to stop a big minion? Do you have enough bridge control? <br />
              Your best bet is to fill those spots with cards that excel at those roles or fill
              multiple at once. But also consider enemy's response to every one of your filler. If
              you take a dragon as your only way to kill big units, try to have a tank unit to
              prevent it from dying from ranged support. Keep putting the fillers and covering their
              own gaps as much as you can.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Now when it comes to changing a deck to survive in a meta, you try to do the similar.
              Detect a card that is just not worth it, such as you never get a good value out of, is
              maybe too situational, or simply doesn't cooperate with the rest of your deck because
              you use its combo cards to answer different things. Or maybe you just found a card
              that keeps the same purpose as the one you are removing, but performs better against
              the meta you are fighting against. Take it out, put a card you find more suitable, run
              a check to make sure you didn't expose yourself to some common weakness, and give it a
              try.
              <br />
              <br />
            </li>
            <li>
              {" "}
              Always make sure the average mana cost of your deck is around 3.5-4, a higher value
              will make you highly vulnerable to aggressive decks that focus on a strong push at
              start.
            </li>
          </ol>
          <br />
          <u>
            <b>NOTE:</b>
          </u>{" "}
          The harder you try to counter a specific decks, the more vulnerable you are to something
          off-meta, so always try to pick counters that aren't just here to counter that 1 thing,
          but can also serve a general purpose against other decks.
          <br />
          <br />
          <br />
          <div className="bb_h1">{anchorLinkTarget(MENU_LINKS_CONFIG["Testing & Gameplay"])}</div>
          <br />
          The test of the deck is the most important part of all, watch how your cards play out,
          learn your weakness and how your opponent is exploiting them, and change your deck trying
          to remove your weakness.
          <br />
          <br />
          If your deck involve the use of building like the bridge shrine or the crossbow guild,
          you'll need to protect them by placing it very close to your tower (on the left or right
          corner of your tower). By doing so they won't be attacked by minions and they can only be
          destroyed by spells (or if they decay with time). The same strategy can be used to
          position ranged units while your tower is under siege so they can shoot without being
          targeted by other minions (but they still can be targeted by spells and others AOE
          effects).
          <br />
          <br />
          Keep in mind that you can't build a perfect deck, in fact every deck is vulnerable to
          something, just make sure that you can survive with that vulnerability and when you reach
          a 60-70% winning rate, you can consider your deck a very good one.
          <br />
          <br />
          In premade team, you can plan with your friend a way to cover each other vulnerabilities,
          the real problem comes with random teammates where if you get someone with an incompatible
          deck or that doesn't know what to do you end up losing, so it will be harder to determine
          if your deck is good or not, but at the end of the day, as long as your rank is growing,
          you can be sure you're on the right path.
          <br />
          <br />
          The final tip I can give you is to always keep your eyes open and be ready to improve your
          deck over and over again. Also by watching twitch streamers you can learn a lot of
          interesting combo that you might like, so do not be afraid to test new decks. And
          remember, as I said above: out there, there always will be someone smarter or luckier than
          you, the important thing is to learn from your mistakes and improve :){" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2840747}>
        {anchorLinkTarget(MENU_LINKS_CONFIG.Combos)}

        <div className="subSectionDesc">
          As we talked about strategies, I feel it's good to also list some of the combo you can
          find around. I'll try to keep this section updated, if you see one missing just let me
          know and I'll add it.
          <br />
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              <b>Siege Pack (EASY)</b>
              <br />
              <br />
              <u>Requirements</u>: Rammer + Scrat Launcher
              <br />
              <br />
              <u>Execution</u>: this is an easy and VERY annoying combo. When you're enemy is not
              expecting it, summon the rammer and place the scrat launcher at the same time. By
              doing so he has to choose if stop the rammer or use ranged to destroy the scrat
              launcher. In the meantime you can summon something to defend the scrat launcher
              (making your opponent losing more time), until you have won. This combo works best
              AFTER your opponent has used lots of mana so he can't counter it until it's too late.
              <br />
              The scrat launcher can be put even further away if you are using Stormbringer.
              <br />
              <br />
              <u>Counters</u>: This combo is hard to counter since requires you to have something to
              stop the rammer (stun lancers, thorns, snake druid, etc...) AND a ranged (or any
              siege) minion to stop the scrat launcher. In any case you'll end up losing a lot of
              tower integrity...
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Conversion Blast (EASY)</b>
              <br />
              <br />
              <u>Requirements</u>: Hypnotize + Combustion
              <br />
              <br />
              <u>Execution</u>: this combo is quite easy to execute, just hypnotize the enemy
              minions and use combustion to blow them up.
              <br />
              This combo is great to get rid of the dangerous minions your opponent might summon, bu
              also to turn all his defenses into plain damage against his tower.
              <br />
              <br />
              <u>Counters</u>: Black Hole is the best (and probably the only) effective counter.
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Thorn Rooted (EASY)</b>
              <br />
              <br />
              <u>Requirements</u>: Grasping Thorns + Snake Druid
              <br />
              <br />
              <u>Execution</u>: place the grasping thorns where you want to trap your enemy, then
              let the snake druid root it on the thorns. This combo works very well with big minions
              like living statue, blue golem, etc..., it won't work against colossus if you send
              some melee minions to attack him since he will destroy the thorns in 1 shot.
              <br />
              <br />
              <u>Counters</u>: daggerfall or a fireball can easily take down both the druid and the
              thorns.
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Combustion Swarming (EASY)</b>:<br />
              <br />
              <u>Requirements</u>: Combustion + any horde minion (like Scrat Horde or Propelled
              Horde, the more minions there are the better) + (OPTIONAL) Netherstep
              <br />
              <br />
              <u>Execution</u>: this combo is (in theory) very simple to execute, just summon your
              horde then activate combustion on them and look the enemies blow up!
              <br />
              This combo is quite effective against tanks, Cleavers, and anything with lots of HP
              (except the enemy tower).
              <br />
              Use Netherstep to skip targets if needed.
              <br />
              <br />
              <u>Counters</u>: to counter this combo there are 2 methods. The first one is to use an
              AOE spell to destroy the entire horde that is about to explode, just do it at the
              right time!
              <br />
              The second one is to use Black Hole to suck every combusted minion, so the combustion
              will fail.
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Armored Ranged (MEDIUM)</b>
              <br />
              <br />
              <u>Requirements</u>: Armored Escort + any ranged unit + Bannerman
              <br />
              <br />
              <u>Execution</u>: This combo is easy to execute, but requires some finesse if you want
              to avoid wasting a tons of mana for nothing. First of all remember that this combo
              requires at least 13 mana to be executed, so use it wisely to make big pushes.
              <br />
              To use this combo cast Armored Escort during idle moments, when you want to start your
              push, pile up enough mana to summon the ranged unit AND the bannerman immediately
              after. If possible try to prepare a tank to put in front of this bunch so they will
              last longer.
              <br />
              Stormbringer gains great advantage from this combo since all this ranged minions will
              be able to shoot from a further distance.
              <br />
              <br />
              <u>Counters</u>: To counter this combo you need to deal AOE as much as possible. Also
              make sure to have a solid tank (like Divine Warrior) to keep all this minions still
              while you damage them.
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Call To Arms (MEDIUM)</b>
              <br />
              <br />
              <u>Requirements</u>: Call To Arms + Wall + any other building cards
              <br />
              <br />
              <u>Execution</u>: To execute this combo you need to have several buildings in your
              deck (especially multiple walls). Place as many building as you can around, then cast
              Call To Arms and see all of them becoming warriors!
              <br />
              If you plan this right, you can have an horde of warriors which (if properly
              supported) can cover your push with some other strong minion.
              <br />
              Mordar can also resurrect the fallen warriors with the tombstones and have a longer
              push towards the enemy tower!
              <br />
              <br />
              <u>Counters</u>: countering this combo can be hard, since you might not be able to
              destroy all the buildings in time, so you need to stop the warriors horde with as much
              AOE as you can, without forgetting about the big minion behind them.
              <br />
              <br />
            </li>
            <li>
              {" "}
              <b>Monkey Business (MEDIUM)</b>
              <br />
              <br />
              <u>Requirements</u>: Battle Shi-Hou + Mana Puff Madness
              <br />
              <br />
              <u>Execution</u>: This combo is tricky, but effective. To execute this, you need to
              make sure your battle shi-hou reach the enemy tower, then activate the mana puff
              madness. At this point the battle shi-hou will fight at maximum speed (the attack
              speed increase greatly with 5+ enemies around, and the mana puff madness spawns 4 +
              tower = 5), and literally melt the enemy tower.
              <br />
              <br />
              <u>Counters</u>: This combo can be easily prevented by anything that stuns the battle
              shi-hou, or by preventing the battle shi-hou to reach the tower.
            </li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>

      {anchorLinkTarget(MENU_LINKS_CONFIG["Youtube Videos"])}

      <div className={cssStatic.youtubeContent}>
        <iframe
          title="Build deck"
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/ArjvkktCens"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className={cssStatic.youtubeContent}>
        <iframe
          title="Build deck"
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/Kjah7T5qSD8?showinfo=0&autohide=1&fs=1&hd=1&modestbranding=1&rel=0&showsearch=0&wmode=direct"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1440565383">
          Enhanced description provided to the video from Edelweis
        </a>
      </div>
    </div>
  );
}
