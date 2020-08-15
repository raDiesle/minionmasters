import React from "react";

const OPACITY = 0.9;

const RARITY_MAPPING_CONFIG = {
  Perk: `rgba(255, 255, 255, ${OPACITY})`,
  Common: `rgba(0, 153, 0, ${OPACITY})`,
  Rare: `rgba(51, 153, 255, ${OPACITY})`,
  Supreme: `rgba(153, 51, 255, ${OPACITY})`,
  Legendary: `rgba(220, 186, 1, ${OPACITY})`,
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
