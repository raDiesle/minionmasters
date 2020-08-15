import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/wiki/resource-mngt/resource-mgmt";
import React from "react";

export default function MaythemResources() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Maythem Rewards"])}
      <fieldset>
        <legend>Rewards</legend>
        The rewards for the mayhem are fixed, except for the cards that changes every time.
        <br />
        Here is the list:
        <br />
        <ul className="bb_ul">
          <li>
            {" "}
            <b>2 Wins</b>: 21k Battle Pass Glory
            <br />
          </li>
          <li>
            {" "}
            <b>4 Wins</b>: 1 Power Token
            <br />
          </li>
          <li>
            {" "}
            <b>6 Wins</b>: 55 Rubies
            <br />
          </li>
          <li>
            {" "}
            <b>8 Wins</b>: 1500 Gold
            <br />
          </li>
          <li>
            {" "}
            <b>10 Wins</b>: 2 x Supreme Card
            <br />
          </li>
          <li>
            {" "}
            <b>12 Wins</b>: 1 x Legendary Card
          </li>
        </ul>
        <br />
        In addition to all that, you get extra Battle Pass Glory (the season XP), based on how many
        victories you achieve (with 12 wins you get about 95k). While the rewards above are a one
        time only (per mayhem) deal
      </fieldset>
    </div>
  );
}
