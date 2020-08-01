import { anchorLinkTarget } from "components/helper";
import { GoldImg } from "components/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

export default function SpendRealMoney() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["How to spend real money"])}
      Best is in the following order:
      <ol>
        <li>
          {" "}
          <b>Premium Upgrade</b>
          <div>this is a must have if you want to get the most from the game. It provides:</div>
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              +50% {GoldImg()} for every victory forever. Does not stack with the level up gold
              bonus.
              <br />
            </li>
            <li>
              {" "}
              +20% XP for every victory forever
              <br />
            </li>
            <li>
              {" "}
              2,500 x Rubies
              <br />
            </li>
            <li>
              {" "}
              500 x Shards
              <br />
            </li>
            <li>
              {" "}
              5 x Power Tokens
              <br />
            </li>
            <li>
              {" "}
              6 Extra Deck Slots (very precious since you can only find the shop offer rarely)
            </li>
          </ul>
          <br />
        </li>
        <li>
          <b>All Masters Upgrade</b>
          <div>
            {" "}
            this upgrade unlocks all the current and future masters, so it's VERY good. It also
            provides you with a REFUND for all the masters you already have! Buy all masters with
            shards first so you can get a lot of rubies.
          </div>
        </li>
        <li>
          {" "}
          <b>Voidborne Onslaught</b>
          <div>this is a cards pack that can be very useful when you have few cards.</div>
        </li>
        <li>
          {" "}
          <b>Accursed Army Pack</b>
          <div>this is a cards pack that can be very useful when you have few cards.</div>
        </li>
        <li>
          {" "}
          <b>Rubies</b>
          <div>
            {" "}
            if you already have all the upgrades, you can buy rubies to be used wisely in the shop
            offers. If you buy cards (or upgrade them), with 20k Rubies you'll be able to buy around
            50k Shards value of cards.
            <br />
            If you plan to upgrade all cards to 400 spending real money, don't do it, because it
            will requires around 2.500€ worth of rubies and at least a couple of months to get all
            the shop offers.
            <br />
            The shop offers that provides the most values are:
          </div>
          <ul className="bb_ul">
            <li>
              {" "}
              3+ Legendary Card (NOT RANDOM) + 750+ Shards + Power Tokens. Legendaries are VERY
              expensive to upgrade with shards, and this offers (usually around 2800 Rubies), are
              the best way to upgrade them to 400 glory. In fact 10 copies of a legendary are all
              that you need.
              <br />
            </li>
            <li>
              {" "}
              5+ Supreme Card (NOT RANDOM) + Other Cards OR Shards + Power Tokens. Supreme cards are
              the second most expensive cards to upgrade, so this kind of offers are usually good.
              <br />
            </li>
            <li>
              {" "}
              Skins, Avatars, Emoji, Arenas: this are nice to have, but they should be your last
              priority.
            </li>
          </ul>
          <br />
          <u>DON'T spend Rubies on random cards!</u> Usually those are HIGHLY overpriced and never
          worth the cost. The same goes for single legendary cards or 2-3 copies of a supreme card.
          <br />
          <br />
          <u>DON'T spend Rubies on Power Tokens, because you'll never get their value back!</u>
          <br />
          <br />
          <u>DON'T spend Rubies on Battle Pass Tiers or Season Tokens!</u> Battle pass tiers are
          easy to get, you can buy them with gold if you are at the last day of the season and
          really desperate to get to 100, but it's usually a waste. Season Tokens are overpriced
          power tokens, so NEVER buy them! You can get the same cards with normal Power Tokens when
          the season ends at 1/3 of the price.
        </li>
      </ol>
    </div>
  );
}
