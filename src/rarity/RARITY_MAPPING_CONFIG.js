import React from "react";

const RARITY_MAPPING_CONFIG = {
  Perk: "rgba(255, 255, 255, 0.6)",
  Common: "rgba(0, 153, 0, 0.6)",
  Rare: "rgba(51, 153, 255, 0.6)",
  Supreme: "rgba(153, 51, 255, 0.6)",
  Legendary: "rgba(220, 186, 1, 0.6)",
};

const RARITY_KEYS = {
  Perk: "Perk",
};

const RARITY_REFERENCE = Object.keys(RARITY_MAPPING_CONFIG).reduce(
  (accumulator, key) => ({
    ...accumulator,
    [key]: <span style={{ color: RARITY_MAPPING_CONFIG[key] }}>{key}</span>,
  }),
  {}
);

export { RARITY_MAPPING_CONFIG, RARITY_KEYS, RARITY_REFERENCE };
