import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/wiki/resource-mngt/resource-mgmt";
import React from "react";

export default function DraftRewards() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Draft Rewards"])}
      The draft rewards are based on the amount of victories that you achieve (up to 12), here is a
      list of what you will get:
      <fieldset>
        <legend>Draft Rewards</legend>
        <div>
          rewards are based on the amount of victories you achieve. You can lose only 3 times, after
          that you have to start all over again!
        </div>
        <h4>Minimum required wins</h4>
        In order to gain enough gold to cover the fee, you need to win 8+ times so make sure you
        have a high understanding of the game before you waste all your money with this mode...
        <ul>
          <li>
            {" "}
            <b>0 Wins</b>: ~50 Gold, 1 Common Chest
            <br />
          </li>
          <li>
            {" "}
            <b>1 Wins</b>: ~75 Gold, 1 Resource Chest, 1 Common Chest
            <br />
          </li>
          <li>
            {" "}
            <b>2 Wins</b>: ~100 Gold, 1 Resource Chest, 1 Common Chest
            <br />
          </li>
          <li>
            {" "}
            <b>3 Wins</b>: ~150 Gold, 1 Resource Chest, 1 Common Chest
            <br />
          </li>
          <li>
            {" "}
            <b>4 Wins</b>: ~250 Gold, 1 Resource Chest, 1 Common Chest
            <br />
          </li>
          <li>
            {" "}
            <b>5 Wins</b>: ~300 Gold, 1 Resource Chest, 1 Common Chest
            <br />
          </li>
          <li>
            {" "}
            <b>6 Wins</b>: ~400 Gold, 1 Resource Chest, 1 Rare Chest
            <br />
          </li>
          <li>
            {" "}
            <b>7 Wins</b>: ~760 Gold, 1 Resource Chest, 1 Rare Chest
            <br />
          </li>
          <li>
            {" "}
            <b>8 Wins</b>: ~775 Gold, 1 Resource Chest, 1 Rare Chest
            <br />
          </li>
          <li>
            {" "}
            <b>9 Wins</b>: ~800 Gold, 2 Resource Chest, 1 Rare Chest
            <br />
          </li>
          <li>
            {" "}
            <b>10 Wins</b>: ~825 Gold, 2 Resource Chest, 1 Supreme Chest
            <br />
          </li>
          <li>
            {" "}
            <b>11 Wins</b>: ~850 Gold, 2 Resource Chest, 1 Supreme Chest
            <br />
          </li>
          <li>
            {" "}
            <b>12 Wins</b>: ~875 Gold, 2 Resource Chest, 1 Legendary Chest
          </li>
        </ul>
      </fieldset>
      Here is the list of what a chest can contain:
      <fieldset>
        <legend>Draft Chest Rewards</legend>
        <ul>
          <li>
            <b>Resource</b>: 70 - 130 Gold OR Shards 7 - 13
          </li>
          <li>
            {" "}
            <b>Common</b>: 1 Common Card
            <br />
          </li>
          <li>
            {" "}
            <b>Rare</b>: 1 Rare Card
            <br />
          </li>
          <li>
            {" "}
            <b>Supreme</b>: 2 Power Tokens OR 1000 - 1500 Gold OR 1 Supreme Card
            <br />
          </li>
          <li>
            {" "}
            <b>Legendary</b>: 3 Power Tokens OR 1600 - 2000 Gold OR 1 Legendary Card
          </li>
        </ul>
      </fieldset>
    </div>
  );
}
