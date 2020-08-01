import Freebies from "page/basics/resources/freebies";
import HowToShardsAndGold from "page/basics/resources/howto-shards-and-gold";
import LevelupRewards from "page/basics/resources/levelup-rewards";
import MaythemResources from "page/basics/resources/maythem";
import RankRewards from "page/basics/resources/rank-rewards";
import Resources from "page/basics/resources/resources";
import SeasonRewards from "page/basics/resources/season-rewards";
import Shop from "page/basics/resources/shop";
import SpendRealMoney from "page/basics/resources/spendrealmoney";
import Tokens from "page/basics/resources/tokens";
import css from "page/basics/static-content.module.scss";
import React from "react";

export const MENU_LINKS_CONFIG = {
  Resources: "Resource Types",
  Tokens: "Tokens",
  Shop: "Shop",
  "How to spend real money": "How to spend real money",
  "How to spend shards and gold": "How to spend shards and gold",
  Freebies: "Freebies",
  "Level up Rewards": "Level up Rewards",
  "Rank Rewards": "Rank Rewards",
  "Season Battle Pass Rewards": "Season Battle Pass Rewards",
  "Maythem Rewards": "Maythem Rewards",
};

export default function ResourceMngmt() {
  const MENU_ORDER = [
    MENU_LINKS_CONFIG.Resources,
    MENU_LINKS_CONFIG["Tokens"],
    MENU_LINKS_CONFIG.Shop,
    MENU_LINKS_CONFIG["How to spend real money"],
    MENU_LINKS_CONFIG["How to spend shards and gold"],
    MENU_LINKS_CONFIG["Freebies"],
    MENU_LINKS_CONFIG["Level up Rewards"],
    MENU_LINKS_CONFIG["Rank Rewards"],
    MENU_LINKS_CONFIG["Season Battle Pass Rewards"],
    MENU_LINKS_CONFIG["Maythem Rewards"],
  ];
  return (
    <div className={css.container}>
      <div className={css.container}>
        <ul>
          {MENU_ORDER.map((item, index) => (
            <li key={"menu_" + index}>
              <a href={`#${item}`}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
      <Resources />
      <Tokens />

      <Shop />

      <SpendRealMoney />

      <HowToShardsAndGold />

      <Freebies />

      <LevelupRewards />
      <RankRewards />
      <SeasonRewards />
      <MaythemResources />
    </div>
  );
}
