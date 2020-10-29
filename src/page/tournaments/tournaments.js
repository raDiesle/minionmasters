import { DecksForTournament } from "page/deck-manager/deck/decks/decks-for-tournament";
import { useDecks } from "page/deck-manager/deck/decks/use-decks";

import css from "page/tournaments/tournaments.module.scss";
import React from "react";

const PLATFORM = {
  PC: "PC",
  XBOX: "XBOX",
};

const TYPE = {
  "1v1": "1v1",
  "2v2": "2v2",
};

export function Tournaments() {
  const tournamentsConfig = [
    {
      publisher: "BadAsAFish80",
      name: "BadAsAFish80's MM 1v1 #13",
      number: "8",
      type: TYPE["1v1"],
      platform: PLATFORM.PC,
      endDate: new Date(2020, 7, 20),
    },
    {
      publisher: "BadAsAFish80",
      name: "BadAsAFish80's MM 2v2 #8",
      number: "8",
      type: TYPE["2v2"],
      platform: PLATFORM.PC,
      endDate: new Date(2020, 7, 27),
    },
    {
      publisher: "Team Mana Frenzy",
      name: "TEAM MANA FRENZY XBOX #11",
      number: "11",
      type: TYPE["1v1"],
      platform: PLATFORM.XBOX,
      endDate: new Date(2020, 8, 29),
    },
  ];

  const decks = useDecks();

  return (
    <div>
      <fieldset>
        <legend>Upcoming Tournaments</legend>
        <div className={css.upcomingTournaments}>
          Can all be found here:
          <h4>
            <a href="https://www.toornament.com/en_GB/tournaments/?_locale=en_GB&q%5Bdiscipline%5D=minion_masters&q%5Bplatform%5D=&q%5Bsearch%5D=&q%5Btype%5D=upcoming">
              www.toornament.com
            </a>
          </h4>
        </div>
      </fieldset>

      <fieldset>
        <legend>Past Tournaments</legend>
        Click on them to see stored decks & replays.
        <ul>
          {tournamentsConfig.map((config) => (
            <li key={"tournament" + config.name}>
              <DecksForTournament config={config} decks={decks} />
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}
