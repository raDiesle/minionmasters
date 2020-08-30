import { MENU_LINKS_CONFIG } from "page/wiki/main-screen/main-screen";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import React from "react";

export function GraphicSettings() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Graphic Settings"])}
      <h4>Explanation about graphic settings</h4>
      Are described{" "}
      <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1976610631">here</a>.
      <h4>Minimum requirements</h4>
      OS: Windows 7, Windows 8, Windows 10 Processor: Intel Core i3, 2.4 Ghz or equivalent Memory: 4
      GB RAM Graphics: Nvidia Geforce GT 240 or equivalent, minimum 512 MB of VRAM DirectX: Version
      10 Network: Broadband Internet connection Storage: 6 GB available space
    </div>
  );
}
