import { anchorLinkTarget } from "page/wiki/menu-helper";
import { MENU_LINKS_CONFIG } from "page/wiki/rewards/rewards";
import React from "react";

export default function SeasonRewards() {
  return (
    <div className="subSection detailBox" id={2894047}>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Glory"])}
      <fieldset>
        <legend>Explained in short</legend>
        Glory does not make cards stronger stats-wise, but grants a bronze, silver, and gold frame
        to the card at given thresholds and speeds up the Battle Pass progress.
        <div>See also section about Season Battle Pass.</div>
      </fieldset>
      The glory is indicated by the number in the big star near your deck. Leveling up cards doesn't
      give you any advantage in game, but increase the card glory, and the total glory is exactly
      how many points you get when you win a battle as progress through the season.
      <br />
      During the season you earn gold stars (up to 4 at tier 54), and each gold star will turn a
      card with the lowest glory to 400 (400 is the max glory that a card can have). Duplicate cards
      count as 0 glory so be careful!
      <br />
      The maximum amount of glory you can have on a deck (given that you have all the season bonus),
      is 4,600 points (4,550 during mini seasons).
      <br />
      Each day you also get 3 battle chests which will count as 10 times your deck glory each, and
      when you earn all 3 (by winning 3 times), all that glory will be added to your total progress,
      which means that you will gain several tiers (up to 3 with max glory). So if you don't have
      much time to play, 3 victories at day with an high glory deck is the way to go!
      <br />
      {anchorLinkTarget(MENU_LINKS_CONFIG["Season Battle Pass Rewards"])}
      <div className="subSectionDesc">
        The other objective of this game is to progress in the current season. Why? because the
        battle pass provides you with a lot of currency, skins, cards and tokens for the new cards!
        <br />
        To do that, you just need to increase the glory of your deck. See section above.
        <u>NOTE: </u>The last day of the battle pass, you can complete 3 battle chests and get 3 new
        one for the new season as soon as it starts, so don't keep 2 and think you can make the
        third when the season starts because you will just lose them...
        <br />
        <br />
        Buying the battle pass for the season is always good since the rewards are really great (if
        you can afford it). If you buy the battle pass you'll receive all the rewards for the tiers
        already reached and all the future one till the end of the season (you obviously have to
        re-buy the battle pass the next season).
        <br />
        <br />
        Buying tiers for rubies is NOT worth it, since you have enough time to complete the season
        even with 1 month left (the seasons usually starts with 65 days), and the rewards beyond
        tier 100 are not really good, so don't feel the need to hurry!
        <br />
        <br />
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
            <b>Common</b>: 800 shards for bronze, 1.2k shards for silver, 2k shards for gold = 4k
            shards total (80 copies of the card).
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
            <b>Legendary</b>: 4k shards for bronze, 6k shards for silver, 10k shards for gold = 20k
            shards total (10 copies of the card).
          </li>
        </ul>
        If you need a way to calculate how many shards you need for your cards, you can copy this
        spreadsheed in your excel/google drive and fill the "Current Glory" column, the rest will
        update itself.{" "}
        <a
          className="bb_link"
          href="https://steamcommunity.com/linkfilter/?url=https://docs.google.com/spreadsheets/d/1JknSRREm-_drFz8GGFYSfD0XTDt9kjtz2XSeW4ILesY/edit#gid=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Here is the link
        </a>
        <span className="bb_link_host">[docs.google.com]</span> <div style={{ clear: "both" }} />
      </div>
    </div>
  );
}
