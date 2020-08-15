import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

export function YoutubeIcon({ children }) {
  return (
    <div>
      <span className={classNames("fa-layers fa-fw")}>
        <FontAwesomeIcon icon={faSquare} />
        <FontAwesomeIcon icon={faYoutube} size="lg" mask={["far", "circle"]} color="#FF0000" />{" "}
      </span>
      <span style={{ paddingLeft: "2px" }}>
        {"  "}
        {children}
      </span>
    </div>
  );
}
