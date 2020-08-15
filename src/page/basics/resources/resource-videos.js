import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

export default function ResourceVideos() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Youtube Videos"])}
      <div>In case you prefer watching videos:</div>
      <iframe
        src="https://www.youtube.com/embed/PHFTWeidJoA"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: "600px", maxWidth: "100%", height: "337.5px" }}
      ></iframe>
    </div>
  );
}
