import { useGaTrackView } from "footer/consent-banner";
import Achievements from "page/wiki/resource-mngt/achievements";
import AdventureRewards from "page/wiki/resource-mngt/adventure-rewards";
import ChallengesRewards from "page/wiki/resource-mngt/challenges-rewards";
import DraftRewards from "page/wiki/resource-mngt/draft-rewards";
import Freebies from "page/wiki/resource-mngt/freebies";
import GuildRewards from "page/wiki/resource-mngt/guild-rewards";
import HowToShardsAndGold from "page/wiki/resource-mngt/howto-shards-and-gold";
import LevelupRewards from "page/wiki/resource-mngt/levelup-rewards";
import MaythemResources from "page/wiki/resource-mngt/maythem-resources";
import Quests from "page/wiki/resource-mngt/quests";
import RankRewards from "page/wiki/resource-mngt/rank-rewards";
import ResourceVideos from "page/wiki/resource-mngt/resource-videos";
import Resources from "page/wiki/resource-mngt/resources";
import SeasonHouseRewards from "page/wiki/resource-mngt/season-houserewards";
import SeasonRewards from "page/wiki/resource-mngt/season-rewards";
import Shop from "page/wiki/resource-mngt/shop";
import SpendRealMoney from "page/wiki/resource-mngt/spendrealmoney";
import Tokens from "page/wiki/resource-mngt/tokens";
import css from "page/wiki/static-content.module.scss";

import React from "react";

export const MENU_LINKS_CONFIG = {
  "Youtube Videos": "Youtube Videos",
  Resources: "Resource Types",
  Tokens: "Tokens",
  Shop: "Shop",
  Achievements: "Achievements",
  Quests: "Quests",
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
  useGaTrackView("/Basics/ResourceMngmt");
  const MENU_ORDER = [
    MENU_LINKS_CONFIG.Resources,
    MENU_LINKS_CONFIG["Tokens"],
    MENU_LINKS_CONFIG.Shop,
    MENU_LINKS_CONFIG.Achievements,
    MENU_LINKS_CONFIG.Quests,
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
    MENU_LINKS_CONFIG["Youtube Videos"],
  ];
  return (
    <div className={css.container}>
      <ol>
        {MENU_ORDER.map((item, index) => (
          <li key={"menu_" + index}>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ol>

      <Resources />
      <Tokens />
      <Shop />
      <Achievements />
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
      <ResourceVideos />
    </div>
  );
}
