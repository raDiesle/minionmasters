import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons/faThumbsDown";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { RedditIcon } from "components/community/reddit-icon";
import css from "page/deck-manager/deck/decks/reddit/reddit-embed.module.scss";
import React, { useEffect, useState } from "react";

export function RedditEmbed({ redditLink }) {
  const [redditData, setRedditData] = useState({});
  useEffect(() => {
    const REDDIT_JSON_SUFFIX = ".json?jsonp=&limit=1";

    axios
      .get(redditLink + REDDIT_JSON_SUFFIX)
      .then((response) => {
        const [
          {
            kind,
            data: {
              children: [
                {
                  data: { downs, ups, score, visited, num_comments, view_count = 0 },
                },
              ],
            },
          },
        ] = response.data;

        setRedditData({
          score,
          view_count,
          visited,
          ups,
          downs,
          num_comments,
        });
      })
      .catch(function (error) {
        // handle error
        console.error(error);
      });
  }, []);

  return (
    <div>
      <a href={redditLink} target="_blank" rel="noopener noreferrer" className={css.redditLink}>
        <span>
          <RedditIcon /> Discuss deck on Reddit:
        </span>
        <span>
          <FontAwesomeIcon icon={faThumbsUp} color="green" />
          {redditData.ups}
        </span>
        <span>
          <FontAwesomeIcon icon={faThumbsDown} color="red" />
          {redditData.downs}
        </span>
        <span>
          <FontAwesomeIcon icon={faComment} color="white" />
          {redditData.num_comments}
        </span>
      </a>
    </div>
  );
}
