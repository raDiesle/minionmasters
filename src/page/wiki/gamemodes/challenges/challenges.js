import { MENU_LINKS_CONFIG } from "page/wiki/gamemodes/gamemodes";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import React from "react";

export function Challenges() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG.Challenges)}
      <div>It is considered to be kind of the tutorial for Minionmasters.</div>
      <img src="/img/basics/challenges.png" alt="challenges" />
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
