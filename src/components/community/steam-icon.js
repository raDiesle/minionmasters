import React from "react";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import css from "components/community/steam-icon.module.scss";

export function SteamIcon({ children }) {
  return (
    <div className={css.steamIcon} color="#fd7e14">
      <span className={classNames("fa-layers fa-fw")}>
        <FontAwesomeIcon icon={faSquare} size="lg" />
        <FontAwesomeIcon icon={faSteam} size="lg" mask={["far", "circle"]} />{" "}
      </span>
      <span> {children}</span>
    </div>
  );
}
