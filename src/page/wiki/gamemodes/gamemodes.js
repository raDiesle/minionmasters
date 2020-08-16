import Adventures from "page/wiki/gamemodes/adventures/adventures";
import { Challenges } from "page/wiki/gamemodes/challenges/challenges";
import Draft from "page/wiki/gamemodes/draft/draft";
import Mayhem from "page/wiki/gamemodes/mayhem/mayhem";
import MainGameModes from "page/wiki/main-screen/main-game-modes";
import { Menu } from "page/wiki/menu-helper";
import React from "react";

export const MENU_LINKS_CONFIG = {
  Overview: "Overview",
  Draft: "Draft",
  Mayhem: "Mayhem",
  Adventure: "Adventure",
  Challenges: "Challenges",
};

const MENU_ORDER = [
  MENU_LINKS_CONFIG.Overview,
  MENU_LINKS_CONFIG.Draft,
  MENU_LINKS_CONFIG.Mayhem,
  MENU_LINKS_CONFIG.Adventure,
  MENU_LINKS_CONFIG.Challenges,
];

export function GameModes() {
  // MENU_LINKS_CONFIG["Game Modes"],
  return (
    <div>
      <Menu menuitems={MENU_ORDER} />

      <MainGameModes />
      <Draft />
      <Mayhem />
      <Adventures />
      <Challenges />
    </div>
  );
}
