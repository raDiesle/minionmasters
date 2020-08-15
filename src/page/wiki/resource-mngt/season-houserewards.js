import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/wiki/resource-mngt/resource-mgmt";
import React from "react";

export default function SeasonHouseRewards() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Season House Rewards"])}

      <div>
        You must place one of three masters to collect keys. During game plays, it randomly show up,
        if current game is a key game. If yes, you have to win to collect a key.
      </div>
      <div>
        Usually the contest has a series of keys to obtain, you'll get one randomly while playing a
        specific master or, while watching a streamer, everytime he gets a key you also get a key.
        The keys awarded by the twitch drops will be available on the next login.
        <br />
        Completing a section gives you the final reward, but getting all the keys is still worth it
        since you'll get shards from them, and even if 10 shards looks a small amount, when you get
        them all you will have many more (sometimes even 600!!!)
      </div>

      <fieldset>
        <legend>Example for a season house reward</legend>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src="img/basics/season_house_reward.png"
              alt="season house rewards"
              style={{ maxWidth: "200px", width: "100%", paddingRight: "10px" }}
            />
          </div>
          <img
            src="img/basics/tri_team_journey_example.png"
            alt="tri team journey example"
            style={{ maxWidth: "350px", width: "100%" }}
          />
        </div>
      </fieldset>
    </div>
  );
}
