import React from "react";
import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Freebies from "page/basics/resources/freebies";
import HowToShardsAndGold from "page/basics/resources/howto-shards-and-gold";
import LevelupRewards from "page/basics/resources/levelup-rewards";
import RankRewards from "page/basics/resources/rank-rewards";
import Resources from "page/basics/resources/resources";
import Shop from "page/basics/resources/shop";
import SpendRealMoney from "page/basics/resources/spendrealmoney";
import Tokens from "page/basics/resources/tokens";
import css from "page/basics/static-content.module.scss";

export const MENU_LINKS_CONFIG = {
  Resources: "Resources",
  Tokens: "Tokens",
  Shop: "Shop",
  "How to spend real money": "How to spend real money",
  "How to spend shards/gold": "How to spend shards/gold",
  Freebies: "Freebies",
  "Level up Rewards": "Level up Rewards",
  "Rank Rewards": "Rank Rewards",
};

export default function ResourceMngmt() {
  const MENU_ORDER = [
    MENU_LINKS_CONFIG.Resources,
    MENU_LINKS_CONFIG["Tokens"],
    MENU_LINKS_CONFIG.Shop,
    MENU_LINKS_CONFIG["How to spend real money"],
    MENU_LINKS_CONFIG["How to spend shards/gold"],
    MENU_LINKS_CONFIG["Level up Rewards"],
    MENU_LINKS_CONFIG["Rank Rewards"],
  ];
  return (
    <div className={css.container}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FontAwesomeIcon
            icon={faTools}
            size="2x"
            color="yellow"
            style={{ paddingRight: "10px" }}
          />
          {"  "} Page under construction
        </div>
      </div>
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

      <div>
        <div className="subSection detailBox" id={2837228}>
          <div className="subSectionTitle">The Game Purpose - Optimize the Rewards </div>
          <div className="subSectionDesc">
            So if you want to gain the most from the game, you'll need to reach at least tier 100 in
            the season and possibly reach Grand Master rank in all the game modes each month. This
            way you'll earn the highest amount of rewards possible and with that you'll have rubies
            to spare for the next season (possibly even spare rubies for good shop offers!).
            <br />
            <br />
            Also check the shop daily offers, because very often there is free stuff or great deals!{" "}
            <div style={{ clear: "both" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
