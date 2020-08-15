import AdventuresChallenges from "page/wiki/adventures-challenges/adventures-challenges";
import Draft from "page/wiki/gamemodes/draft/draft";
import Mayhem from "page/wiki/gamemodes/mayhem/mayhem";
import MainGameModes from "page/wiki/mainscreen/main-game-modes";
import React from "react";

export function GameModes() {
  // MENU_LINKS_CONFIG["Game Modes"],
  return (
    <div>
      <ol>
        <li>Overview</li>
        <li>Draft</li>
        <li>Mayhem</li>
        <li>Adventure & Challenges</li>
      </ol>

      <MainGameModes />
      <Draft />
      <Mayhem />
      <AdventuresChallenges />
    </div>
  );
}
