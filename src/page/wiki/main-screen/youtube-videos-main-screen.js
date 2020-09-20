import { MENU_LINKS_CONFIG } from "page/wiki/main-screen/main-screen";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import React from "react";

export default function YoutubeVideosMainScreen() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Youtube Videos"])}

<div style={{paddingBottom: "20px"}}>
      <iframe
        title="Introduction"
        src="https://www.youtube.com/embed/Hq2jFas0TRI"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: "600px", maxWidth: "100%", height: "337.5px" }}
      ></iframe>
</div>
      <iframe
        title="Introduction"
        src="https://www.youtube.com/embed/nayJo5ku8wc"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: "600px", maxWidth: "100%", height: "337.5px" }}
      ></iframe>
    </div>
  );
}
