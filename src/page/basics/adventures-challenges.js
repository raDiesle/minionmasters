import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { anchorLinkTarget } from "components/helper";

import React from "react";
import cssStatic from "./static-content.module.scss";

export default function AdventuresChallenges() {
  const MENU_LINKS_CONFIG = {
    Adventures: "Adventures",
    Challenges: "Challenges",
  };

  const MENU_LINKS_ORDER = [MENU_LINKS_CONFIG.Adventures, MENU_LINKS_CONFIG.Challenges];

  return (
    <div className={cssStatic.container}>
      <div>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <div>
        <ul>
          {MENU_LINKS_ORDER.map((key) => (
            <li key={key}>
              {" "}
              <a href={`#${key}`}>{key}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        These two modes are one time plays. Once you suceed them, you cannot repeat them and they
        will not be resetted.
      </div>
      <div> Played against AI.</div>

      {anchorLinkTarget(MENU_LINKS_CONFIG.Adventures)}

      <div>
        After every game, you can select new cards or special effects, which are nowhere else in
        game available.
      </div>
      <div>
        The AI Single Player games are totally different from other games, where special effects and
        masters are part of the game.
      </div>
      <fieldset>
        <legend>Recommendations</legend>
        <ul>
          <li>Only take aggressive, no defensive cards so you can finish fast.</li>
          <li>Attack only one side of bridge and ignore the other to end fast.</li>
        </ul>
      </fieldset>

      <div style={{ paddingTop: "20px" }}>
        <img src="img/basics/adventures.png" alt="adventures" style={{ maxWidth: "300px" }} />
      </div>

      <fieldset>
        <legend>Costs</legend>
        <ul>
          <li>
            <b>Jadespark</b> is completely free
          </li>
          <li>
            <b>Jungle fever</b> first chapter is free.
          </li>
          <li>
            <div>Costs for chapter 2 and follow</div>
            <img
              src="img/basics/adventures_chapter2_costs.png"
              style={{ maxWidth: "300px" }}
              alt="adventures chapter 2 costs"
            />
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>Rewards</legend>
        <div>
          See page for &nbsp;
          <b>Resource Management</b>
        </div>
      </fieldset>

      {anchorLinkTarget(MENU_LINKS_CONFIG.Challenges)}
      <div>Play it once to get some rewards.</div>
      <img src="img/basics/challenges.png" alt="challenges" />
    </div>
  );
}
