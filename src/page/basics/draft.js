import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Draft() {
  return (
    <div className="subSection detailBox" id={2894045}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>
      <div className="subSectionTitle"> Draft </div>
      <div className="subSectionDesc">
        To play draft you have to pay 750 gold (or 55 rubies), and while more complicated and more
        subject to luck, this mode rewards you based on the amount of victories you achieve. In this
        mode you get to pick a random master and to build a random deck with limited choices, so
        don't rush and think before you pick a card or you might end up regretting it.
        <br />
        This mode always rewards you with 1 or more cards, if you achieve 8 or more victories there
        is also a good chance that the card you get is legendary. BUT remember that you can lose
        only 3 times, after that you have to start all over again!
        <br />
        In order to gain enough gold to cover the fee, you need to win 8+ times so make sure you
        have a high understanding of the game before you waste all your money with this mode...
        <br />
        <br />
        <div className="bb_h1">
          <b>Little Guide</b>
        </div>
        <br />
        After experimenting and getting some pointers from Thoughtcast, here is a little guide on
        how to build a functional draft deck:
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
                Bridge Shrine is also a viable building (especially if you are using Diona), since
                it will speed up your way to Mana Frenzy.
              </li>
            </ol>
          </li>
          <li>
            {" "}
            Prioritize ranged units over melee (if they are of similar strength). If you don't have
            ranged you will lose against air units.
            <br />
          </li>
          <li>
            {" "}
            Take at least 1 card that cost 6+ mana if you have the chance. If you are using Mordar
            as master, you can afford more. This cards are hard to take down and you're opponent may
            struggle against them. The Dragons Pack is a very good card since many players playing
            draft may not have spells or the proper minions to counter them.
            <br />
          </li>
          <li>
            {" "}
            Take max 2 strong attack spells (Like Fireball, Magma Storm, Chain Lightning, etc..).
            Ignore utility spells like Black Hole, Healing Fireball, etc.. because those are rarely
            of any use if you can't plan the deck. <br />
            Future Present/Past, are always good choices. <br />
            Shock Rock and Gambler's Ball can be taken if you use Settsu (to trigger the Combat
            Reload).
            <br />
          </li>
          <li>
            {" "}
            Any card below 3 mana is only good to take the bridges or to stop a cleaver, so don't
            take too many of those. Crossbow Dudes is bad anti-air so it enters in this category.
            <br />
            If you have one of this cards at start, make sure to use them to capture the bridge,
            because your opponent may not have anything like that and this will give you a big XP
            advantage early on.
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
            Do not take Trobadour or Living Statue, or any other mana expensive card that works only
            against buildings because you won't be able to use them properly without being able to
            plan your deck.
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
            <b>Apep</b> is another good master since the 2 extra cards allows you to better manage
            the mana, and the totem allows you to prevent some critical damage to your tower.
            <br />
          </li>
          <li>
            {" "}
            <b>Ravager</b> is a good choice, but be prepare to make your big push with Brutus.
            <br />
          </li>
          <li>
            {" "}
            <b>Diona</b> works well if you can use the traps properly, if you don't have experience
            with her go for another master. Diona is probably the best defensive hero if used
            properly.
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
            <b>Stormbringer</b> is another decent choice, but be sure to have enough ranged units to
            use his Aereodynamics perk.
            <br />
          </li>
          <li>
            {" "}
            <b>Ratbo, Volco and Milloween</b> are masters that requires some deck planing and you
            can't use them effectively without knowing what cards you are going to use. If you have
            no other choice, make sure you know how to use them properly or you're just going to
            waste money.
          </li>
        </ul>
        <br />
        <div className="bb_h1">
          <b>Rewards</b>
        </div>
        <br />
        The draft rewards are based on the amount of victories that you achieve (up to 12), here is
        a list of what you will get:
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
  );
}
