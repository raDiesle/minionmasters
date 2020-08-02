import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/main-screen";
import React from "react";

export default function Replays() {
  return (
    <div>
      <fieldset>
        {anchorLinkTarget(MENU_LINKS_CONFIG["Replays"])}
        In your profile, you can find the "Match Replay" section where you can find all the replays
        of the latest games you played. <br />
        If you want to share a replay press the button: "Local Replay Folder" and share the ".rp"
        file of the game you want to share.
        <br />
        To view shared replays, just drop the replay file in the same folder mentioned above, and
        restart the game.
      </fieldset>
    </div>
  );
}
