import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { anchorLinkTarget } from "components/helper";
import { useGaTrackView } from "consent-banner";

import ChatCommands from "page/basics/chat-commands";
import GameModes from "page/basics/game-modes";
import Replays from "page/basics/replays";
import React from "react";
import cssStatic from "./static-content.module.scss";

export const MENU_LINKS_CONFIG = {
  Overview: "Overview",
  Profile: "Profile",
  "Power Tower": "Power Tower",
  "Game Modes": "Game Modes",
  "Chat Commands: Functional": "Chat Commands: Functional",
  "Chat Commands: Emoji": "Chat Commands: Emoji",
  Replays: "Replays",
};
export default function MainScreen() {
  useGaTrackView("/Basics/MainScreen");
  const MENU_ORDER = [
    MENU_LINKS_CONFIG.Overview,
    MENU_LINKS_CONFIG.Profile,
    MENU_LINKS_CONFIG.Replays,
    MENU_LINKS_CONFIG["Power Tower"],
    MENU_LINKS_CONFIG["Game Modes"],
    MENU_LINKS_CONFIG["Chat Commands: Functional"],
    MENU_LINKS_CONFIG["Chat Commands: Emoji"],
  ];

  return (
    <div className={cssStatic.container}>
      <div>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <div>
        <ol>
          {MENU_ORDER.map((key) => (
            <li key={key}>
              <a href={`#${key}`}>{key}</a>
            </li>
          ))}
        </ol>
      </div>

      <img
        src="img/basics/main_menu.jpg"
        alt="mm main menu"
        style={{ maxWidth: "600px", width: "100%" }}
      />

      <GameModes />

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
        </div>
      </div>

      <ChatCommands />
    </div>
  );
}
