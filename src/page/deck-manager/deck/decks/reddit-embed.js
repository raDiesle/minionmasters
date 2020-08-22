import React, { useEffect } from "react";
import axios from "axios";
import {
  MINION_MASTERS_CHANNEL_TITLE,
  MINIONMASTERS_CHANNEL,
} from "components/community/reddit-icon";
import css from "page/deck-manager/deck/decks/reddit/reddit-embed.module.scss";

export function RedditEmbed({ redditLink }) {
  useEffect(() => {
    /*
    axios
      .get("https://www.reddit.com/user/radies_chen/comments/iemq3t/flying_only_deck/.json?jsonp=")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
*/
    const identifierForDataRedditEmbed = "redditEmbed";
    const tag = "script";

    const isEmbedScriptAlreadyIncluded = document.querySelector(
      `${tag}.${identifierForDataRedditEmbed}`
    );
    if (isEmbedScriptAlreadyIncluded) {
      return;
    }

    const script = document.createElement(tag);
    script.src = "//embed.redditmedia.com/widgets/platform.js";
    script.async = true;
    script.setAttribute("class", identifierForDataRedditEmbed);
    document.body.appendChild(script);
  }, []);

  // https://www.reddit.com/r/food/comments/60jxzo/homemade_breakfast_sugar_cookies/.json?limit=10

  // data-card-width="200px"
  return (
    <div className={css.redditBlockquote}>
      <blockquote
        className="reddit-card"
        data-card-created="1513892582"
        data-card-theme="dark"
        data-card-align="left"
      >
        <style className="embedly-css">
          {".reddit-title { font-size: 16px !important; color: white !important}"}
        </style>
        <a href={redditLink}>My game</a> from
        <a href={MINIONMASTERS_CHANNEL}>{MINION_MASTERS_CHANNEL_TITLE}</a>
      </blockquote>
    </div>
  );
}
