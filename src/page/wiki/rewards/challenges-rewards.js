import { anchorLinkTarget } from "page/wiki/menu-helper";
import { MENU_LINKS_CONFIG } from "page/wiki/rewards/rewards";
import { TokenImg } from "page/wiki/thegame-icons";
import React from "react";

export default function ChallengesRewards() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Challenges Rewards"])}
      <fieldset>
        <legend>Rewards</legend>
        <div>6 {TokenImg()}</div>
      </fieldset>
    </div>
  );
}
