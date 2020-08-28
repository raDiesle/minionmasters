import cssButton from "components/button.module.scss";
import { RedditIcon } from "components/community/reddit-icon";
import { SteamIcon } from "components/community/steam-icon";
import cssSteamIcon from "components/community/steam-icon.module.scss";
import { YoutubeIcon } from "components/community/youtube-icon";
import React from "react";

export default function CommunityLinks({ name }) {
  return (
    <div className={cssButton.buttonsLayout}>
      <h3>Continue exploring</h3>
      <div className={cssButton.ButtonGroupStyle}>
        <button className={cssButton.ButtonInGroupStyle}>
          <a
            href={`https://www.reddit.com/r/MinionMasters/search?q=${name}&restrict_sr=1`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RedditIcon>Reddits for {name}</RedditIcon>
          </a>
        </button>
      </div>
      <div className={cssButton.ButtonGroupStyle} style={{ paddingTop: "5px" }}>
        <button className={cssButton.ButtonInGroupStyle}>
          <a
            href={`https://steamcommunity.com/app/489520/discussions/search/?q=${name}&include_deleted=0`}
            target="_blank"
            rel="noopener noreferrer"
            className={cssSteamIcon.steamIcon}
          >
            <SteamIcon>Steam discussions for {name}</SteamIcon>
          </a>
        </button>
      </div>

      <div className={cssButton.ButtonGroupStyle} style={{ paddingTop: "5px" }}>
        <button className={cssButton.ButtonInGroupStyle}>
          <a
            href={`https://www.youtube.com/results?search_query=minionmasters+${name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon>Youtube videos for {name}</YoutubeIcon>
          </a>
        </button>
      </div>
    </div>
  );
}
