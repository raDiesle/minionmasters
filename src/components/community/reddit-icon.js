import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import css from "components/community/reddit-icon.module.scss";
import React from "react";

export function RedditIcon({ children }) {
  return (
    <div className={css.redditIcon}>
      <span className={classNames("fa-layers fa-fw")}>
        <FontAwesomeIcon icon={faSquare} />
        <FontAwesomeIcon icon={faReddit} color="#fd7e14" size="lg" mask={["far", "circle"]} />{" "}
      </span>
      <span> {children}</span>
    </div>
  );
}
