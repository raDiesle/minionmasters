import React from "react";
import { RedditIcon } from "components/community/reddit-icon";
import { SteamIcon } from "components/community/steam-icon";
import { YoutubeIcon } from "components/community/youtube-icon";
import css from "page/card-details-modal.module.scss";
import {
  ButtonGroupStyle,
  ButtonInGroupStyle,
} from "page/deck-manager/build/filters/ButtonFilterGroup";

export default function CommunityLinks({ name }) {
  return (
    <div className={css.buttonsLayout}>
      <h3>Continue exploring</h3>
      <ButtonGroupStyle>
        <ButtonInGroupStyle>
          <a
            href={`https://www.reddit.com/r/MinionMasters/search?q=${name}&restrict_sr=1`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RedditIcon>Reddits for {name}</RedditIcon>
          </a>
        </ButtonInGroupStyle>
      </ButtonGroupStyle>
      <ButtonGroupStyle style={{ paddingTop: "5px" }}>
        <ButtonInGroupStyle>
          <a
            href={`https://steamcommunity.com/app/489520/discussions/search/?q=${name}&include_deleted=0`}
            target="_blank"
            rel="noopener noreferrer"
            className={css.steamIcon}
          >
            <SteamIcon>Steam discussions for {name}</SteamIcon>
          </a>
        </ButtonInGroupStyle>
      </ButtonGroupStyle>

      <ButtonGroupStyle style={{ paddingTop: "5px" }}>
        <ButtonInGroupStyle>
          <a
            href={`https://www.youtube.com/results?search_query=minionmasters+${name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon>Youtube videos for {name}</YoutubeIcon>
          </a>
        </ButtonInGroupStyle>
      </ButtonGroupStyle>
    </div>
  );
}
