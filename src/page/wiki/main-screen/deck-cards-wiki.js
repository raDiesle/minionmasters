import { MENU_LINKS_CONFIG } from "page/wiki/main-screen/main-screen";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import React from "react";

export default function DeckCardsWiki() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Deck & Cards"])}
      <div>To find out more about a card's stats and abilities:</div>
      <div>
        Right clicking on the card will bring up a page with a description and detailed stats. Note
        that you can also look at your opponent's deck after a match or navigate to the recruiting
        menu and right click to see what the cards do, even if you don't own them!
      </div>
      <div>
        How do I edit my deck & craft new cards with my Shards?
        <div>
          Click on your deck at the top of the screen to edit it. To enter the crafting menu, click
          on the blue 'Recruiting' button.
        </div>
      </div>
    </div>
  );
}
