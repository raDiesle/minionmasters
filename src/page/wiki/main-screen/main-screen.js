import { useGaTrackView } from "footer/consent-cookie-banner";
import { Community } from "page/wiki/community/community";

import ChatCommands from "page/wiki/main-screen/chat-commands";
import DeckCardsWiki from "page/wiki/main-screen/deck-cards-wiki";
import { GraphicSettings } from "page/wiki/main-screen/graphic-settings";
import MastersWiki from "page/wiki/main-screen/masters-wiki";
import Replays from "page/wiki/main-screen/replays";
import YoutubeVideosMainScreen from "page/wiki/main-screen/youtube-videos-main-screen";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import cssStatic from "page/wiki/static-content.module.scss";
import React from "react";

export const MENU_LINKS_CONFIG = {
  Community: "Community",
  Overview: "Overview",
  Profile: "Profile",
  "Power Tower": "Power Tower",
  "Game Modes": "Game Modes",
  Masters: "Masters",
  "Deck & Cards": "Deck & Cards",
  "Chat Commands: Functional": "Chat Commands: Functional",
  "Chat Commands: Emoji": "Chat Commands: Emoji",
  Replays: "Replays",
  "Graphic Settings": "Graphic Settings",
  "Youtube Videos": "Youtube Videos",
};
export default function MainScreen() {
  useGaTrackView("/Basics/BasicsWiki");
  const MENU_ORDER = [
    MENU_LINKS_CONFIG.Community,
    MENU_LINKS_CONFIG.Overview,
    MENU_LINKS_CONFIG.Profile,
    MENU_LINKS_CONFIG["Power Tower"],
    MENU_LINKS_CONFIG.Masters,
    MENU_LINKS_CONFIG["Deck & Cards"],
    MENU_LINKS_CONFIG.Replays,
    MENU_LINKS_CONFIG["Chat Commands: Functional"],
    MENU_LINKS_CONFIG["Chat Commands: Emoji"],
    MENU_LINKS_CONFIG["Graphic Settings"],
    MENU_LINKS_CONFIG["Youtube Videos"],
  ];

  return (
    <div className={cssStatic.container}>
      <div>
        <ol>
          {MENU_ORDER.map((key) => (
            <li key={key}>
              <a href={`#${key}`}>{key}</a>
            </li>
          ))}
        </ol>
      </div>

      <Community />

      <img
        src="/img/basics/main_menu.jpg"
        alt="mm main menu"
        style={{ maxWidth: "600px", width: "100%" }}
      />

      <div>
        <div className="subSectionDesc">
          {anchorLinkTarget(MENU_LINKS_CONFIG["Profile"])}
          <fieldset>
            <legend>Quests</legend>
            Find the quests and the achievements. This part is VERY important, and you should check
            it every day to make sure what you have to do and, most important of all, to collect the
            rewards. The daily quests can be re-rolled once a day by clicking the round arrow on the
            right of it, and you should do that to find the "Win 10 games" quest, since it's the one
            that pay the greater amount of gold of all. Obviously if you get a quest for 1.600 gold
            is good too, so don't re-roll it or you'll risk to get a 1.000 gold one. div>
          </fieldset>
          <div>&nbsp;</div>
          <Replays />
          {anchorLinkTarget(MENU_LINKS_CONFIG["Power Tower"])}
          Power Tower The power tower is where you spin your tokens, and you should check this daily
          since you get a free token every day!
          <br />
          <fieldset>
            <legend>Contest Area</legend>
            The contest area is very important since it can provide you with some powerful reward.
            See Resource Management.
          </fieldset>
          <MastersWiki />
        </div>
      </div>

      <DeckCardsWiki />

      <ChatCommands />

      <GraphicSettings />
      <YoutubeVideosMainScreen />
    </div>
  );
}
