export const MAYHEM = "Mayhem";

export const GAME_TYPES = [
  {
    key: "Ladder",
    subitems: [],
  },
  {
    key: "Tournament",
    subitems: [],
  },
  {
    key: MAYHEM,
    subitems: [
      { key: "Killing Floor", description: "" },
      { key: "Desert Maythem", description: "" },
      { key: "Helpful Imps!", description: "" },
      { key: "Explosive Minions", description: "" },
      { key: "Two for free", description: "" },
      { key: "Summonings", description: "" },
      { key: "Defense of the Masters", description: "" },
      { key: "Frezied Minions", description: "" },
      { key: "Fluctuations", description: "" },
      { key: "Defense Surge", description: "" },
    ],
  },
];

export const SOLO = "Solo";
export const TEAM = "Team";
export const BOTH = "Both";
export const PLAYER_GAME_TYPE = [
  {
    key: SOLO,
  },
  {
    key: TEAM,
  },
  {
    key: BOTH,
  },
];
// @deprecated
export const PLAY_STYLES = [
  { key: "Aggressive", description: "" },
  { key: "Defensive", description: "" },
  { key: "Combo dependant", description: "" },
  { key: "Fun", description: "" },
];
