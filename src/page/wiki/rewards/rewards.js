import { useGaTrackView } from "footer/consent-cookie-banner";
import { Menu } from "page/wiki/menu-helper";
import Achievements from "page/wiki/rewards/achievements";
import AdventureRewards from "page/wiki/rewards/adventure-rewards";
import ChallengesRewards from "page/wiki/rewards/challenges-rewards";
import DraftRewards from "page/wiki/rewards/draft-rewards";
import Freebies from "page/wiki/rewards/freebies";
import GuildRewards from "page/wiki/rewards/guild-rewards";
import HowToShardsAndGold from "page/wiki/rewards/howto-shards-and-gold";
import LevelupRewards from "page/wiki/rewards/levelup-rewards";
import MaythemResources from "page/wiki/rewards/maythem-resources";
import Quests from "page/wiki/rewards/quests";
import RankRewards from "page/wiki/rewards/rank-rewards";
import ResourceVideos from "page/wiki/rewards/resource-videos";
import ResourcesTypes from "page/wiki/rewards/resources-types";
import SeasonHouseRewards from "page/wiki/rewards/season-houserewards";
import SeasonRewards from "page/wiki/rewards/season-rewards";
import Shop from "page/wiki/rewards/shop";
import SpendRealMoney from "page/wiki/rewards/spendrealmoney";
import Tokens from "page/wiki/rewards/tokens";
import css from "page/wiki/static-content.module.scss";
import React from "react";

export const MENU_LINKS_CONFIG = {
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
  Glory: "Glory",
  "Season Battle Pass Rewards": "Season Battle Pass Rewards",
  "Season House Rewards": "Season House Rewards",
  "Guild Rewards": "Guild Rewards",
  "Maythem Rewards": "Maythem Rewards",
  "Draft Rewards": "Draft Rewards",
  "Challenges Rewards": "Challenges Rewards",
  "Youtube Videos": "Youtube Videos",
};

export default function ResourceMngmt() {
  useGaTrackView("/Basics/Rewards");
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
    MENU_LINKS_CONFIG.Glory,
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
      <Menu menuitems={MENU_ORDER} />
      <ResourcesTypes />
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
