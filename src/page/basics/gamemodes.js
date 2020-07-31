import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import css from "page/basics/static-content.module.scss";

export default function Gamemodes() {
  return (
    <div className={css.container}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <div className="guide subSections">
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2894043}>
          <div className="subSectionTitle">The Game Purpose - Introduction </div>
          <div className="subSectionDesc">
            To begin let me just give you a couple of info on what's the goal of the game and what
            you should expect.
            <br />
            <br />
            In this game, the main goal is raising your rank in one (or more) modes. So first of
            all, you need to determine what type of game mode you like most.
            <br />
            <br />
            There are 3 main game modes:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                Battle (1vs1): this is basically a duel, and the chance of raising the rank depends
                totally on your skills.
                <br />
                <br />
              </li>
              <li>
                {" "}
                Premade Team Battle (2vs2 with a friend): this is a team battle with one of your
                friend as teammate, so climbing the ranks in this mode requires that you and your
                friend work together to build a winning strategy, while is harder than the 1vs1, is
                surely more satisfiying.
                <br />
                <br />
              </li>
              <li>
                {" "}
                Team Battle (2vs2): this is a team battle with a <b>RANDOM</b> teammate, which means
                that your chance of raising the rank depends on your skill and on your luck of
                getting a good teammate who knows what to do and with a deck compatible with your
                own. This is by far the hardest mode and it requires more time and skill (yes, luck
                is also a skill!) to climb the ranks.
              </li>
            </ul>
            <br />
            <b>NOTE:</b> the team battle mode is not available until level 7!{" "}
            <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2894044}>
          <div className="subSectionTitle">The Game Purpose - Ranks </div>
          <div className="subSectionDesc">
            The ranks are:
            <br />
            Wood &gt; Stone &gt; Bronze &gt; Silver &gt; Gold &gt; Platinum &gt; Diamond &gt; Master
            &gt; Grand Master
            <br />
            <br />
            Everytime you win you gain points to get to the next rank, losing however decrease your
            points and eventually your rank (once you reach Grand Master, you won't be demoted
            anymore). Winning more times on a row, also grants bonus points!
            <br />
            <br />
            Raising your rank provides you with increasing rewards, but beware! Ranks reset at the
            end of every month and the reset rewards you based on how high you got.
            <br />
            <br />
            Very often people ask what's a good rank, the answer is: before platinum is just a
            warm-up, from platinum you start to play seriously, so don't get too cocky if at the
            beginning you never lose... <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2894045}>
          <div className="subSectionTitle">The Game Purpose - Draft </div>
          <div className="subSectionDesc">
            To play draft you have to pay 750 gold (or 55 rubies), and while more complicated and
            more subject to luck, this mode rewards you based on the amount of victories you
            achieve. In this mode you get to pick a random master and to build a random deck with
            limited choices, so don't rush and think before you pick a card or you might end up
            regretting it.
            <br />
            This mode always rewards you with 1 or more cards, if you achieve 8 or more victories
            there is also a good chance that the card you get is legendary. BUT remember that you
            can lose only 3 times, after that you have to start all over again!
            <br />
            In order to gain enough gold to cover the fee, you need to win 8+ times so make sure you
            have a high understanding of the game before you waste all your money with this mode...
            <br />
            <br />
            <div className="bb_h1">
              <b>Little Guide</b>
            </div>
            <br />
            After experimenting and getting some pointers from Thoughtcast, here is a little guide
            on how to build a functional draft deck:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                Do not take buildings:
                <br />
                <ol>
                  <li>
                    {" "}
                    Zap Shrine can be very useful against Rammers and Cleavers.
                    <br />
                  </li>
                  <li>
                    {" "}
                    Wall can be a decent defensive option.
                    <br />
                  </li>
                  <li>
                    {" "}
                    Consider only attack building if the other cards are bad.
                    <br />
                  </li>
                  <li>
                    {" "}
                    Do not take spawners (except Crossbow Guild).
                    <br />
                  </li>
                  <li>
                    {" "}
                    Bridge Shrine is also a viable building (especially if you are using Diona),
                    since it will speed up your way to Mana Frenzy.
                  </li>
                </ol>
              </li>
              <li>
                {" "}
                Prioritize ranged units over melee (if they are of similar strength). If you don't
                have ranged you will lose against air units.
                <br />
              </li>
              <li>
                {" "}
                Take at least 1 card that cost 6+ mana if you have the chance. If you are using
                Mordar as master, you can afford more. This cards are hard to take down and you're
                opponent may struggle against them. The Dragons Pack is a very good card since many
                players playing draft may not have spells or the proper minions to counter them.
                <br />
              </li>
              <li>
                {" "}
                Take max 2 strong attack spells (Like Fireball, Magma Storm, Chain Lightning,
                etc..). Ignore utility spells like Black Hole, Healing Fireball, etc.. because those
                are rarely of any use if you can't plan the deck. <br />
                Future Present/Past, are always good choices. <br />
                Shock Rock and Gambler's Ball can be taken if you use Settsu (to trigger the Combat
                Reload).
                <br />
              </li>
              <li>
                {" "}
                Any card below 3 mana is only good to take the bridges or to stop a cleaver, so
                don't take too many of those. Crossbow Dudes is bad anti-air so it enters in this
                category.
                <br />
                If you have one of this cards at start, make sure to use them to capture the bridge,
                because your opponent may not have anything like that and this will give you a big
                XP advantage early on.
                <br />
              </li>
              <li>
                {" "}
                Make sure you always have a big tank with a lot of HP, even if it's just Tranquil
                Shi-Hou.
                <br />
              </li>
              <li>
                {" "}
                Do not take Trobadour or Living Statue, or any other mana expensive card that works
                only against buildings because you won't be able to use them properly without being
                able to plan your deck.
              </li>
            </ul>
            <br />
            <b>Masters</b>:<br />
            <ul className="bb_ul">
              <li>
                {" "}
                <b>Mordar</b> is probably the best master for draft
                <br />
              </li>
              <li>
                {" "}
                <b>Settsu</b> is a really good master for draft.
                <br />
              </li>
              <li>
                {" "}
                <b>Apep</b> is another good master since the 2 extra cards allows you to better
                manage the mana, and the totem allows you to prevent some critical damage to your
                tower.
                <br />
              </li>
              <li>
                {" "}
                <b>Ravager</b> is a good choice, but be prepare to make your big push with Brutus.
                <br />
              </li>
              <li>
                {" "}
                <b>Diona</b> works well if you can use the traps properly, if you don't have
                experience with her go for another master. Diona is probably the best defensive hero
                if used properly.
                <br />
              </li>
              <li>
                {" "}
                <b>King Puff</b> is a decent choice, just remember to get a solid tank and 4-5 mana
                spells to use him properly.
                <br />
              </li>
              <li>
                {" "}
                <b>Stormbringer</b> is another decent choice, but be sure to have enough ranged
                units to use his Aereodynamics perk.
                <br />
              </li>
              <li>
                {" "}
                <b>Ratbo, Volco and Milloween</b> are masters that requires some deck planing and
                you can't use them effectively without knowing what cards you are going to use. If
                you have no other choice, make sure you know how to use them properly or you're just
                going to waste money.
              </li>
            </ul>
            <br />
            <div className="bb_h1">
              <b>Rewards</b>
            </div>
            <br />
            The draft rewards are based on the amount of victories that you achieve (up to 12), here
            is a list of what you will get:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                <b>0 Wins</b>: ~50 Gold, 1 Common Chest
                <br />
              </li>
              <li>
                {" "}
                <b>1 Wins</b>: ~75 Gold, 1 Resource Chest, 1 Common Chest
                <br />
              </li>
              <li>
                {" "}
                <b>2 Wins</b>: ~100 Gold, 1 Resource Chest, 1 Common Chest
                <br />
              </li>
              <li>
                {" "}
                <b>3 Wins</b>: ~150 Gold, 1 Resource Chest, 1 Common Chest
                <br />
              </li>
              <li>
                {" "}
                <b>4 Wins</b>: ~250 Gold, 1 Resource Chest, 1 Common Chest
                <br />
              </li>
              <li>
                {" "}
                <b>5 Wins</b>: ~300 Gold, 1 Resource Chest, 1 Common Chest
                <br />
              </li>
              <li>
                {" "}
                <b>6 Wins</b>: ~400 Gold, 1 Resource Chest, 1 Rare Chest
                <br />
              </li>
              <li>
                {" "}
                <b>7 Wins</b>: ~760 Gold, 1 Resource Chest, 1 Rare Chest
                <br />
              </li>
              <li>
                {" "}
                <b>8 Wins</b>: ~775 Gold, 1 Resource Chest, 1 Rare Chest
                <br />
              </li>
              <li>
                {" "}
                <b>9 Wins</b>: ~800 Gold, 2 Resource Chest, 1 Rare Chest
                <br />
              </li>
              <li>
                {" "}
                <b>10 Wins</b>: ~825 Gold, 2 Resource Chest, 1 Supreme Chest
                <br />
              </li>
              <li>
                {" "}
                <b>11 Wins</b>: ~850 Gold, 2 Resource Chest, 1 Supreme Chest
                <br />
              </li>
              <li>
                {" "}
                <b>12 Wins</b>: ~875 Gold, 2 Resource Chest, 1 Legendary Chest
              </li>
            </ul>
            <br />
            Here is the list of what a chest can contain:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                <b>Resource</b>: 70 - 130 Gold OR Shards 7 - 13
                <br />
              </li>
              <li>
                {" "}
                <b>Common</b>: 1 Common Card
                <br />
              </li>
              <li>
                {" "}
                <b>Rare</b>: 1 Rare Card
                <br />
              </li>
              <li>
                {" "}
                <b>Supreme</b>: 2 Power Tokens OR 1000 - 1500 Gold OR 1 Supreme Card
                <br />
              </li>
              <li>
                {" "}
                <b>Legendary</b>: 3 Power Tokens OR 1600 - 2000 Gold OR 1 Legendary Card
              </li>
            </ul>{" "}
            <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2974486}>
          <div className="subSectionTitle">The Game Purpose - Mayhem </div>
          <div className="subSectionDesc">
            Like for the draft, the mayhem mode cost 750 gold to play and rewards you based on how
            many victories you achieve. The main difference is that you have to build the deck
            BEFORE starting (once you started you can't change the deck anymore), and every mayhem
            has a different condition that makes it very fun to play, but often is also more
            complicated than normal. Also, the Mayhem mode is available only once a week for 3 days.
            <br />
            In any case, while the draft can only be played in solo, the mayhem can also be played
            with a friend making it more interesting, and the rewards are fixed and quite appetible
            if you can achieve 12 victories.
            <br />
            <br />
            <div className="bb_h1">
              <b>Types of Mayhems</b>
            </div>
            <br />
            Each mayhem has a different condition that makes the battle more complicated, here is
            the list of all the possible conditions:
            <br />
            <br />
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483349788645/D7E8E807CA39CF2105A4F95CC427BFF1A0960EC6/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483349788645%2FD7E8E807CA39CF2105A4F95CC427BFF1A0960EC6%2F"
            >
              {/* img placeholder */}
            </a>
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
                while you need to use spawners or 1 mana minions to keep the bottom bridge under
                your control.
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
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350130037/ECA5810A553B17974CF0054A5B67A48E46062803/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350130037%2FECA5810A553B17974CF0054A5B67A48E46062803%2F"
            >
              {/* img placeholder */}
            </a>
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
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350132186/375CF555D21C820F190201231014BFF55AE94E12/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350132186%2F375CF555D21C820F190201231014BFF55AE94E12%2F"
            >
              {/* img placeholder */}
            </a>
            <br />
            <br />
            Summoning a minion also summons a Blood Imp.
            <br />
            <br />
            <b>Tips</b>:<br />
            <ul className="bb_ul">
              <li>
                {" "}
                The Heal Puff is a very good card to have since you are going to take some damage
                from all the imps that gets summoned automatically.
                <br />
              </li>
              <li>
                {" "}
                Using big minions is also a wise choice, since they will deal enough damage without
                forcing you to spam cards (which means less imps around). Also big minions cause
                huge overkill damage to the imps, and since imps reflect the damage they take to
                their master, it means you'll take down your opponent pretty fast...
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
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350136130/AC7C42A3B8367580EBB6499F0C90A6CA42778624/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350136130%2FAC7C42A3B8367580EBB6499F0C90A6CA42778624%2F"
            >
              {/* img placeholder */}
            </a>
            <br />
            <br />
            When a minion dies, it explodes causing 50 damage to the surrounding minions and
            buildings (INCLUDING FRIENDLY MINIONS!!!).
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
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350143057/9CE839D45CF2664853C24DC7327D4BB14E1D0BEC/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350143057%2F9CE839D45CF2664853C24DC7327D4BB14E1D0BEC%2F"
            >
              {/* img placeholder */}
            </a>
            <br />
            <br />
            Make two of the cheapest cards in the deck cost 0 mana when the match starts.
            <br />
            If there are multiple cards with the same mana cost, it will be picked randomly which
            one will get the discount.
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
                Having 3 copies of the cheapest card, give you the chance to choose which card will
                be free to play (2 copies of that card will be free to play.
              </li>
            </ul>
            <br />
            <br />
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350151003/55376C964066BF976E7B68972EAE4B917DD20C7C/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350151003%2F55376C964066BF976E7B68972EAE4B917DD20C7C%2F"
            >
              {/* img placeholder */}
            </a>
            <br />
            <br />
            After using a spell, a random minion with the same mana cost will be summoned in front
            of your tower.
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
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350155679/DBF8D813BD69725123041462EF832970694EA4C2/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350155679%2FDBF8D813BD69725123041462EF832970694EA4C2%2F"
            >
              {/* img placeholder */}
            </a>
            <br />
            <br />
            Every 30 seconds summons 2 Legionnaires, then another 2 after 1.5 seconds, then another
            2 after 1.5 seconds, then after 1.5 seconds summons 2 Crossbow Dudes and after 1.5
            seconds 2 more Crossbow Dudes. For a total of 6 Leggionaires and 4 Crossbow Dudes.
            <br />
            <br />
            <b>Tips</b>:<br />
            <ul className="bb_ul">
              <li>
                {" "}
                Chain Lightning is your best friend for this mayhem, since it can clear up the
                entire pack of minions that is summoned every 30s.
              </li>
            </ul>
            <br />
            <br />
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350165446/0723FC2946954793935FC75FC8C2001D7B69BF5C/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350165446%2F0723FC2946954793935FC75FC8C2001D7B69BF5C%2F"
            >
              {/* img placeholder */}
            </a>
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
            If you use 2 minion cards within 5 seconds, summons a random minion with the average
            cost between the 2 cards you used (rounded down).
            <br />
            Using more than 2 cards within 5 seconds triggers the effect ONLY ONCE.
            <br />
            <br />
            <br />
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350174000/5C1C733A381A5A27482166D87D56DC7CD9116EC5/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350174000%2F5C1C733A381A5A27482166D87D56DC7CD9116EC5%2F"
            >
              {/* img placeholder */}
            </a>
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
                Cards cannot cost more than 10 mana, so if you pick a 10 mana card it will either
                stay at 10 mana or get cheaper!
              </li>
            </ul>
            <br />
            <br />
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/995765483350182834/D513025ADDEAF3C738ABF0536DA30349A442814E/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F995765483350182834%2FD513025ADDEAF3C738ABF0536DA30349A442814E%2F"
            >
              {/* img placeholder */}
            </a>
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
                them quickly, so try to use either Magma Storm or an Incubus to deal with the
                threat.
                <br />
              </li>
              <li>
                {" "}
                Remember that a Crystal minion attacks at double speed if you have 6 or more mana.
                Use it at your advantage to melt your enemy.
                <br />
              </li>
              <li>
                {" "}
                Try to protect the free minions from spells with a Bannerman, so they can help with
                your push towards your opponent.
              </li>
            </ul>
            <br />
            <div className="bb_h1">
              <b>Rewards</b>
            </div>
            <br />
            The rewards for the mayhem are fixed, except for the cards that changes every time.
            <br />
            Here is the list:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                <b>2 Wins</b>: 21k Battle Pass Glory
                <br />
              </li>
              <li>
                {" "}
                <b>4 Wins</b>: 1 Power Token
                <br />
              </li>
              <li>
                {" "}
                <b>6 Wins</b>: 55 Rubies
                <br />
              </li>
              <li>
                {" "}
                <b>8 Wins</b>: 1500 Gold
                <br />
              </li>
              <li>
                {" "}
                <b>10 Wins</b>: 2 x Supreme Card
                <br />
              </li>
              <li>
                {" "}
                <b>12 Wins</b>: 1 x Legendary Card
              </li>
            </ul>
            <br />
            In addition to all that, you get extra Battle Pass Glory (the season XP), based on how
            many victories you achieve (with 12 wins you get about 95k). While the rewards above are
            a one time only (per mayhem) deal, the Battle Pass Glory can be acquired everytime (even
            after you finish the mayhem). <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2894046}>
          <div className="subSectionTitle">The Game Purpose - Expeditions </div>
          <div className="subSectionDesc">
            The expeditions are a secondary game mode available once a week for 3 days, where you
            have to win multiple battles with special conditions to earn points. Those points will
            give you extra mana and experience while facing the bosses. Defeat all the 3 bosses to
            get a reward.
            <br />
            <br />
            While the rewards looks cheap, the expedition is always worth doing, since you'll do
            what you usually do and you get an extra reward for it!{" "}
            <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2894047}>
          <div className="subSectionTitle">The Game Purpose - Season (Battle Pass) </div>
          <div className="subSectionDesc">
            The other objective of this game is to progress in the current season. Why? because the
            battle pass provides you with a lot of currency, skins, cards and tokens for the new
            cards!
            <br />
            To do that, you just need to increase the glory of your deck (the glory is indicated by
            the number in the big star near your deck). Leveling up cards doesn't give you any
            advantage in game, but increase the card glory, and the total glory is exactly how many
            points you get when you win a battle as progress through the season.
            <br />
            During the season you earn gold stars (up to 4 at tier 54), and each gold star will turn
            a card with the lowest glory to 400 (400 is the max glory that a card can have).
            Duplicate cards count as 0 glory so be careful!
            <br />
            The maximum amount of glory you can have on a deck (given that you have all the season
            bonus), is 4,600 points (4,550 during mini seasons).
            <br />
            Each day you also get 3 battle chests which will count as 10 times your deck glory each,
            and when you earn all 3 (by winning 3 times), all that glory will be added to your total
            progress, which means that you will gain several tiers (up to 3 with max glory). So if
            you don't have much time to play, 3 victories at day with an high glory deck is the way
            to go!
            <br />
            <u>NOTE: </u>The last day of the battle pass, you can complete 3 battle chests and get 3
            new one for the new season as soon as it starts, so don't keep 2 and think you can make
            the third when the season starts because you will just lose them...
            <br />
            <br />
            Buying the battle pass for the season is always good since the rewards are really great
            (if you can afford it). If you buy the battle pass you'll receive all the rewards for
            the tiers already reached and all the future one till the end of the season (you
            obviously have to re-buy the battle pass the next season).
            <br />
            <br />
            Buying tiers for rubies is NOT worth it, since you have enough time to complete the
            season even with 1 month left (the seasons usually starts with 65 days), and the rewards
            beyond tier 100 are not really good, so don't feel the need to hurry!
            <br />
            <br />
            The curent season (Bones and Bravery) from level 1 to level 100 (with battle pass)
            provides:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                19k Gold
                <br />
              </li>
              <li>
                {" "}
                500 Shards
                <br />
              </li>
              <li>
                {" "}
                450 Rubies
                <br />
              </li>
              <li>
                {" "}
                9m Account Experience
                <br />
              </li>
              <li>
                {" "}
                71 Season tokens
                <br />
              </li>
              <li>
                {" "}
                2 Skins
                <br />
              </li>
              <li>
                {" "}
                6 Avatars
                <br />
              </li>
              <li>
                {" "}
                4 Emotes
                <br />
              </li>
              <li>
                {" "}
                Cards: 3 x Haunting Hugger, 5 x Wolf Among Sheep, 3 x Spirit Vessel, 5 x Crystal
                Construct, 3 x Armored Escort, 5 x Spirit Infusion, 10 x Crystal Archers, 10 x Ghost
                Turret, 4 x Spiritmancer
              </li>
            </ul>
            <br />
            After level 100 you get the same rewards every 8 levels as follows:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                150 Gold (only with Battle Pass)
                <br />
              </li>
              <li>
                {" "}
                150 Gold (only with Battle Pass)
                <br />
              </li>
              <li>
                {" "}
                150 Gold (only with Battle Pass)
                <br />
              </li>
              <li>
                {" "}
                500k Account Experience (1M with Battle Pass)
                <br />
              </li>
              <li>
                {" "}
                150 Gold (only with Battle Pass)
                <br />
              </li>
              <li>
                {" "}
                150 Gold (only with Battle Pass)
                <br />
              </li>
              <li>
                {" "}
                150 Gold (only with Battle Pass)
                <br />
              </li>
              <li> 1 Season Token (+150 Gold with Battle pass)</li>
            </ul>
            <br />
            Here is the cost of upgrading the cards from 0 to 400 glory:
            <br />
            <ul className="bb_ul">
              <li>
                {" "}
                <b>Common</b>: 800 shards for bronze, 1.2k shards for silver, 2k shards for gold =
                4k shards total (80 copies of the card).
                <br />
              </li>
              <li>
                {" "}
                <b>Rare</b>: 1k shards for bronze, 1.5k shards for silver, 2.5k shards for gold = 5k
                shards total (40 copies of the card).
                <br />
              </li>
              <li>
                {" "}
                <b>Supreme</b>: 2k shards for bronze, 3k shards for silver, 5k shards for gold = 10k
                shards total (20 copies of the card).
                <br />
              </li>
              <li>
                {" "}
                <b>Legendary</b>: 4k shards for bronze, 6k shards for silver, 10k shards for gold =
                20k shards total (10 copies of the card).
              </li>
            </ul>
            If you need a way to calculate how many shards you need for your cards, you can copy
            this spreadsheed in your excel/google drive and fill the "Current Glory" column, the
            rest will update itself.{" "}
            <a
              className="bb_link"
              href="https://steamcommunity.com/linkfilter/?url=https://docs.google.com/spreadsheets/d/1JknSRREm-_drFz8GGFYSfD0XTDt9kjtz2XSeW4ILesY/edit#gid=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here is the link
            </a>
            <span className="bb_link_host">[docs.google.com]</span>{" "}
            <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2954636}>
          <div className="subSectionTitle">The Game Purpose - Guild Pass </div>
          <div className="subSectionDesc">
            The guild pass is basically a community driven season, where you and you're guild
            contribute every cycle to increase the glory and gain tiers.
            <br />
            <br />
            The guild pass lasts 30 days and it's made by 3 days cycle (10 cycles total). Every 3
            days every guild member can contribuite (you need to enable the conquest mode in the
            guild screen), by winning games to increase the total guild glory. Each member can have
            up to 6 victories in conquest mode each cycle, and they can lose up to 3 times. Once you
            win 6 times or lose 3, you cannot contribute anymore until the next cycle.
            <br />
            <br />
            Every guild has a set of "Conquest Cards" available (the number increase while the guild
            progress in the guild pass), and those cards provides bonus glory to the conquest
            battles and as bonus, those cards are available for every guild member (even if they
            don't have those cards in their collection). The bonus glory from the conquest cards{" "}
            <u>
              <b>DOES NOT</b>
            </u>{" "}
            apply to wild cards (so you get the bonus only for the first copy of the card, not the
            second one).
            <br />
            <br />
            <div className="bb_h1">
              <b>How to contribute</b>
            </div>
            <br />
            In order to contribute in the guild pass, you need to use a deck with a high amount of
            glory, and possibly to use the conquest cards. Each conquest card in your deck provides
            extra 400 glory for the guild pass.
            <br />
            <b>
              <u>NOTE:</u>
            </b>{" "}
            every guild has a different set of conquest cards.
            <br />
            <br />
            To contribute, just enable the conquest mode from the guild screen, then you can play in
            any mode (excluding draft, mayhem and expeditions) and your victories will count towards
            the guild pass. If your conquest mode is active, the guild emblem will be visible near
            the usual "Battle" button to start a game.
            <br />
            <br />
            The total glory you'll receive after each victory is: <br />
            <b>
              ( &lt;Conquest Card Glory&gt; + &lt;Your Deck Glory&gt; + &lt;Season Bonus Glory&gt; )
              x &lt;Rank Multiplier&gt;{" "}
            </b>
            <br />
            <br />
            The ranks mutipliers are the following:
            <br />
            <br />
            <a
              href="https://steamuserimages-a.akamaihd.net/ugc/825757418682375470/83A2B14014DC9DACA47EE93542D5CE7DEE05C5D8/"
              className="modalContentLink"
              data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F825757418682375470%2F83A2B14014DC9DACA47EE93542D5CE7DEE05C5D8%2F"
            >
              {/* img placeholder */}
            </a>
            The multiplier for the formula above is ( xx% / 100 ) + 1. Example for GM is 3.5.
            <br />
            <br />
            Your total contribution for the cycle is visible in the guild screen, and the guild
            roster shows your total contribution for the season.
            <br />
            <br />
            All the glory earned by the <b>TOP 20 GUILD MEMBERS</b> will be added to the guild pass
            at the end of every cycle, all the rest won't count at all.
            <br />
            <br />
            <u>
              <b>NOTE:</b>
            </u>{" "}
            remember that once you have lost 3 times there is no way to try again (is not like
            drafts or mayhem where you can buy a new ticket and try again), so if you are having a
            lose streak, remember to pause the conquest and to resume at better times.
            <br />
            <br />
            <u>
              <b>NOTE 2:</b>
            </u>{" "}
            if you start the conquest in one guild, and then join another guild, you won't be able
            to give any contribution until the next cycle.
            <br />
            <br />
            <u>
              <b>NOTE 3:</b>
            </u>{" "}
            don't try to complete your conquest at the last minute! In fact if the cycle changes
            while you are playing, the points will be count for the next cycle and the previous
            contribution will be lost.
            <br />
            <br />
            <u>
              <b>NOTE 4:</b>
            </u>{" "}
            when you are in conquest, you will never be put against your own guild members.
            <br />
            <br />
            <div className="bb_h1">
              <b>Rewards</b>
            </div>
            <br />
            The guild pass provides rewards for all the guild members, in addition to extra conquest
            cards, each member also earn skins, avatars, a frame border for your avatar and cards
            pack (like 5 or more copies of a single card) of an increasing rarity, up to 3
            legendaries at tier 20.
            <br />
            <br />
            <u>
              <b>NOTE:</b>
            </u>{" "}
            New guild members won't be able to collect previous cycles rewards, only the rewards
            obtained from the cycle he became part of the guild onwards.
            <br />
            <br />
            In addition to all that,{" "}
            <b>
              <u>the number one guild</u>
            </b>{" "}
            also receive additional 5 legendaries for all its members at the end of the season.
            <br />
            <br />
            Is pointless to say that all this rewards are a great incentive for anyone to be part of
            a guild, and to work together in order to reach the top tier before the end of the
            season.
            <br />
            <br />
            Here is the list of rewards:
            <br />
            <ol>
              <li>
                {" "}
                5 x Conquest Card slot
                <br />
              </li>
              <li>
                {" "}
                1 x Conquest Card slot
                <br />
              </li>
              <li>
                {" "}
                10 x Common Card
                <br />
              </li>
              <li>
                {" "}
                1 x Conquest Card slot
                <br />
              </li>
              <li>
                {" "}
                5 x Rare Card
                <br />
              </li>
              <li>
                {" "}
                500k Account XP
                <br />
              </li>
              <li>
                {" "}
                1 x Conquest Card slot
                <br />
              </li>
              <li>
                {" "}
                15 x Common Card
                <br />
              </li>
              <li>
                {" "}
                +50 Season bonus Glory
                <br />
              </li>
              <li>
                {" "}
                Settsu Avatar
                <br />
              </li>
              <li>
                {" "}
                750k Account XP
                <br />
              </li>
              <li>
                {" "}
                1 x Conquest Card slot
                <br />
              </li>
              <li>
                {" "}
                7 x Supreme Card
                <br />
              </li>
              <li>
                {" "}
                1 x Conquest Card slot
                <br />
              </li>
              <li>
                {" "}
                Pink Settsu Skin
                <br />
              </li>
              <li>
                {" "}
                750k Account XP
                <br />
              </li>
              <li>
                {" "}
                10 x Rare Card
                <br />
              </li>
              <li>
                {" "}
                20 x Common Card
                <br />
              </li>
              <li>
                {" "}
                Guild Frame
                <br />
              </li>
              <li> 3 x Legendary Card</li>
            </ol>
            <br />
            After tier 20 the rewards repeats as follow:
            <br />
            <ol>
              <li>
                {" "}
                3 x Common Card
                <br />
              </li>
              <li>
                {" "}
                500 x Gold
                <br />
              </li>
              <li>
                {" "}
                3 x Common Card
                <br />
              </li>
              <li>
                {" "}
                250k Account XP
                <br />
              </li>
              <li> 1 x Power Token</li>
            </ol>
            <br />
            <div className="bb_h1">
              <b>Glory Table</b>
            </div>
            <br />
            Here is the amount of glory required for each tier:
            <br />
            <br />
            <div className="bb_table">
              {" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_th">
                  <b>Tier</b>
                </div>{" "}
                <div className="bb_table_th">
                  <b>Mini Season Glory</b>
                </div>{" "}
                <div className="bb_table_th">
                  <b>Normal Season Glory</b>
                </div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">1</div> <div className="bb_table_td">---</div>{" "}
                <div className="bb_table_td">---</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">2</div> <div className="bb_table_td">145k</div>{" "}
                <div className="bb_table_td">150k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">3</div> <div className="bb_table_td">155k</div>{" "}
                <div className="bb_table_td">160k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">4</div> <div className="bb_table_td">165k</div>{" "}
                <div className="bb_table_td">180k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">5</div> <div className="bb_table_td">175k</div>{" "}
                <div className="bb_table_td">190k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">6</div> <div className="bb_table_td">185k</div>{" "}
                <div className="bb_table_td">200k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">7</div> <div className="bb_table_td">195k</div>{" "}
                <div className="bb_table_td">210k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">8</div> <div className="bb_table_td">205k</div>{" "}
                <div className="bb_table_td">220k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">9</div> <div className="bb_table_td">215k</div>{" "}
                <div className="bb_table_td">235k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">10</div> <div className="bb_table_td">230k</div>{" "}
                <div className="bb_table_td">245k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">11</div> <div className="bb_table_td">240k</div>{" "}
                <div className="bb_table_td">260k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">12</div> <div className="bb_table_td">255k</div>{" "}
                <div className="bb_table_td">275k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">13</div> <div className="bb_table_td">265k</div>{" "}
                <div className="bb_table_td">290k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">14</div> <div className="bb_table_td">280k</div>{" "}
                <div className="bb_table_td">305k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">15</div> <div className="bb_table_td">300k</div>{" "}
                <div className="bb_table_td">325k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">16</div> <div className="bb_table_td">315k</div>{" "}
                <div className="bb_table_td">340k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">17</div> <div className="bb_table_td">330k</div>{" "}
                <div className="bb_table_td">360k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">18</div> <div className="bb_table_td">350k</div>{" "}
                <div className="bb_table_td">380k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">19</div> <div className="bb_table_td">370k</div>{" "}
                <div className="bb_table_td">400k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">20</div> <div className="bb_table_td">390k</div>{" "}
                <div className="bb_table_td">420k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">21</div> <div className="bb_table_td">410k</div>{" "}
                <div className="bb_table_td">445k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">22</div> <div className="bb_table_td">435k</div>{" "}
                <div className="bb_table_td">470k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">23</div> <div className="bb_table_td">455k</div>{" "}
                <div className="bb_table_td">495k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">24</div> <div className="bb_table_td">480k</div>{" "}
                <div className="bb_table_td">520k</div>{" "}
              </div>{" "}
              <div className="bb_table_tr">
                {" "}
                <div className="bb_table_td">25+</div> <div className="bb_table_td">605k</div>{" "}
                <div className="bb_table_td">655k</div>{" "}
              </div>
            </div>{" "}
            <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />

        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={3032442}>
          <div className="subSectionTitle">
            - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
          </div>
          <div className="subSectionDesc">
            <div style={{ clear: "both" }} />
          </div>
        </div>
        <div style={{ clear: "both" }} />
      </div>
    </div>
  );
}
