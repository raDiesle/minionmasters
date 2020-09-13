import { MENU_LINKS_CONFIG } from "page/wiki/main-screen/main-screen";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import React from "react";

export default function MastersWiki() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG.Masters)}
      There are currently nine Masters, each with their own unique sets of perks! View them all by
      clicking on your starting Master, the archer Stormbringer, in the center of the main menu. In
      addition, you can customize your loadout with Master skins and Arenas purchased in the shop
      unlocked at level 7!
    </div>
  );
}
