import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/main-screen";

import React from "react";

export default function GameModes() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Game Modes"])}
      <div className="subSectionDesc">
        There are 3 main game modes:
        <br />
        <ul className="bb_ul">
          <li>
            {" "}
            Battle (1vs1): this is basically a duel, and the chance of raising the rank depends
            totally on your skills.
            <br />
            <br />
          </li>
          <li>
            {" "}
            Premade Team Battle (2vs2 with a friend): this is a team battle with one of your friend
            as teammate, so climbing the ranks in this mode requires that you and your friend work
            together to build a winning strategy, while is harder than the 1vs1, is surely more
            satisfiying.
            <br />
            <br />
          </li>
          <li>
            {" "}
            Team Battle (2vs2): this is a team battle with a <b>RANDOM</b> teammate, which means
            that your chance of raising the rank depends on your skill and on your luck of getting a
            good teammate who knows what to do and with a deck compatible with your own. This is by
            far the hardest mode and it requires more time and skill (yes, luck is also a skill!) to
            climb the ranks.
          </li>
        </ul>
        <br />
        <b>NOTE:</b> the team battle mode is not available until level 7!{" "}
        <div style={{ clear: "both" }} />
      </div>
    </div>
  );
}
