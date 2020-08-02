import AdventureRewards from "page/basics/resources/adventure-rewards";
import ChallengesRewards from "page/basics/resources/challenges-rewards";
import DraftRewards from "page/basics/resources/draft-rewards";
import Freebies from "page/basics/resources/freebies";
import GuildRewards from "page/basics/resources/guild-rewards";
import HowToShardsAndGold from "page/basics/resources/howto-shards-and-gold";
import LevelupRewards from "page/basics/resources/levelup-rewards";
import MaythemResources from "page/basics/resources/maythem-resources";
import Quests from "page/basics/resources/quests";
import RankRewards from "page/basics/resources/rank-rewards";
import Resources from "page/basics/resources/resources";
import SeasonHouseRewards from "page/basics/resources/season-houserewards";
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
  "Season House Rewards": "Season House Rewards",
  "Guild Rewards": "Guild Rewards",
  "Maythem Rewards": "Maythem Rewards",
  "Draft Rewards": "Draft Rewards",
  "Challenges Rewards": "Challenges Rewards",
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
    MENU_LINKS_CONFIG["Season House Rewards"],
    MENU_LINKS_CONFIG["Guild Rewards"],
    MENU_LINKS_CONFIG["Maythem Rewards"],
    MENU_LINKS_CONFIG["Draft Rewards"],
    MENU_LINKS_CONFIG["Challenges Rewards"],
  ];
  return (
    <div className={css.container}>
      <ul>
        {MENU_ORDER.map((item, index) => (
          <li key={"menu_" + index}>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      <Resources />
      <Tokens />
      <Shop />
      <Quests />
      <SpendRealMoney />
      <HowToShardsAndGold />
      <Freebies />
      <LevelupRewards />
      <RankRewards />
      <SeasonRewards />
      <SeasonHouseRewards />
      <GuildRewards />
      <MaythemResources />
      <AdventureRewards />
      <ChallengesRewards />
      <DraftRewards />
    </div>
  );
}
