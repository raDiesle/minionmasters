import * as classnames from "classnames";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import css from "page/wiki/rewards/achievements.module.scss";
import { MENU_LINKS_CONFIG } from "page/wiki/rewards/rewards";

import cssStatic from "page/wiki/static-content.module.scss";
import React from "react";

export default function Achievements() {
  const achievementsConfig = [
    {
      name: "Apprentice Collection",
      picture: "897565762_preview_e41068.png",
      description: "Acquire a collection of 25 cards",
    },
    {
      name: "Challenge accepted!",
      picture: "897565762_preview_Challenge%20accepted!.png",
      description: "Complete 5 solo challenges",
    },
    {
      name: "Challenge completed!",
      picture: "897565762_preview_Challenge%20completed!.png",
      description: "Complete 10 solo challenges",
    },
    {
      name: "Close one",
      picture: "897565762_preview_Close%20one.png",
      description: "Win a Ranked Battle with less than 100 Health left",
    },
    {
      name: "Common Crafter",
      picture: "897565762_preview_Common%20Crafter.png",
      description: "Craft a Common card",
    },
    {
      name: "Daily Annihilator",
      picture: "897565762_preview_Daily%20Annihilator.png",
      description: "Complete 25 Daily Quests",
    },
    {
      name: "Daily Conquorer",
      picture: "897565762_preview_Daily%20Conquorer.png",
      description: "Complete 10 Daily Quests",
    },
    {
      name: "Daily Master",
      picture: "897565762_preview_Daily%20Master.png",
      description: "Complete 100 Daily Quests",
    },
    {
      name: "Daily Obliterator",
      picture: "897565762_preview_Daily%20Obliterator.png",
      description: "Complete 50 Daily Quests",
    },
    {
      name: "Daily Winner",
      picture: "897565762_preview_Daily%20Winner.png",
      description: "Complete 3 Daily Quests",
    },
    {
      name: "Deck Maker",
      picture: "897565762_preview_Deck%20Maker.png",
      description: "Create 3 decks",
    },
    {
      name: "Defeat them all",
      picture: "897565762_preview_Defeat%20them%20all.png",
      description: "Win against 8 different Masters",
    },
    {
      name: "Friend Challenger",
      picture: "897565762_preview_Friend%20Challenger.png",
      description: "Play a friendly challenge with 3 different friends.",
    },
    {
      name: "Know it all",
      picture: "897565762_preview_Know%20it%20all.png",
      description: "Win a Ranked battle with 8 different Masters",
    },
    {
      name: "Legendary Crafter",
      picture: "897565762_preview_Legendary%20Crafter.png",
      description: "Craft a Legendary card",
    },
    {
      name: "Legendary!",
      picture: "897565762_preview_Supreme!.png",
      description: "Complete 15 Achievements",
    },
    {
      name: "Masster Collection",
      picture: "897565762_preview_Novice%20Collection.png",
      description: "Acquire a collection of 100 cards",
    },
    {
      name: "Novice Collection",
      picture: "897565762_preview_Apprentice%20Collection.png",
      description: "Acquire a collection of 50 cards",
    },
    {
      name: "Power Gatherer",
      picture: "897565762_preview_Power%20Gatherer.png",
      description: "Use 25 Power Tokens",
    },
    {
      name: "Power Manager",
      picture: "897565762_preview_Power%20Manager.png",
      description: "Use 100 Power Tokens",
    },
    {
      name: "Power Master",
      picture: "897565762_preview_Power%20Master.png",
      description: "Use 250 Power Tokens",
    },
    {
      name: "Ranked Annihilator",
      picture: "897565762_preview_Ranked%20Annihilator.png",
      description: "Win 50 Ranked Battles",
    },
    {
      name: "Ranked Conquorer",
      picture: "897565762_preview_Ranked%20Conquorer.png",
      description: "Win 10 Ranked Battles",
    },
    {
      name: "Ranked Master",
      picture: "897565762_preview_Ranked%20Master.png",
      description: "Win 500 Ranked Battles",
    },
    {
      name: "Ranked Obliterator",
      picture: "897565762_preview_Ranked%20Obliterator.png",
      description: "Win 100 Ranked Battles",
    },
    {
      name: "Ranked Winner",
      picture: "897565762_preview_Ranked%20Winner.png",
      description: "Win 3 Ranked Battles",
    },
    {
      name: "Rare Crafter",
      picture: "897565762_preview_Rare%20Crafter.png",
      description: "Craft a Rare card",
    },
    {
      name: "Resource Gatherer",
      picture: "897565762_preview_Resource%20Gatherer.png",
      description: "Use 20 Resource Tokens",
    },
    {
      name: "Resource Manager",
      picture: "897565762_preview_Resource%20Manager.png",
      description: "Use 50 Resource Tokens",
    },
    {
      name: "Resource Master",
      picture: "897565762_preview_Resource%20Master.png",
      description: "Use 100 Resource Tokens",
    },
    {
      name: "Tactics Study",
      picture: "897565762_preview_Tactics%20Study.png",
      description: "Watch a replay",
    },
    {
      name: "The Bronze League",
      picture: "897565762_preview_The%20Bronze%20League.png",
      description: "Reach the Bronze League",
    },
    {
      name: "The Silver League",
      picture: "897565762_preview_The%20Silver%20League.png",
      description: "Reach the Silver League",
    },
    {
      name: "The Stone League",
      picture: "897565762_preview_The%20Stone%20League.png",
      description: "Reach the Stone League",
    },
  ];

  return (
    <div className={cssStatic.container}>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Achievements"])}
      <fieldset>
        <legend>Rewards</legend>

        <div className={cssStatic.table}>
          <div className={cssStatic.tableRow}>
            {["Picture", "Achievement", "Description"].map((header) => (
              <div className={classnames(cssStatic.tableCell, cssStatic.tableHeader)}>{header}</div>
            ))}
          </div>
          {achievementsConfig.map(({ name, picture, description }) => (
            <div className={cssStatic.tableRow}>
              <div className={cssStatic.tableCell}>
                <img src={`/img/basics/achievements/${picture}`} alt={name} className={css.image} />
              </div>
              <div className={classnames(css.nameCell, cssStatic.tableCell)}>{name}</div>
              <div className={cssStatic.tableCell}>{description}</div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
