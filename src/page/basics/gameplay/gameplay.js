import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cssStatic from "page/basics/static-content.module.scss";
import React from "react";

export default function Gameplay() {
  return (
    <div className={cssStatic.container}>
      <div>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>
      <iframe
        src="https://www.youtube.com/embed/-1kOHvJX_wM"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: "600px", maxWidth: "100%", height: "337.5px" }}
      ></iframe>
    </div>
  );
}
