import { useGaTrackView } from "footer/consent-banner";
import { MENU_LINKS_CONFIG } from "page/wiki/gamemodes/gamemodes";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import cssStatic from "page/wiki/static-content.module.scss";

import React from "react";

export default function Adventures() {
  useGaTrackView("/Basics/Adventures");

  return (
    <div className={cssStatic.container}>
      {anchorLinkTarget(MENU_LINKS_CONFIG.Adventures)}

      <div>
        The mode you can play one time. Once you suceed them, you cannot repeat them and they will
        not be resetted. It is played against AI.
      </div>

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
        <img src="/img/basics/adventures.png" alt="adventures" style={{ maxWidth: "300px" }} />
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
              src="/img/basics/adventures_chapter2_costs.png"
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
    </div>
  );
}
