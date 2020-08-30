import { faDove } from "@fortawesome/free-solid-svg-icons/faDove";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faMagic } from "@fortawesome/free-solid-svg-icons/faMagic";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons/faShoePrints";

export const TYPES = {
  Minion: "Minion",
  "Flying Minion": "Flying Minion",
};

export const typeMapping = {
  "Flying Minion": faDove,
  Minion: faShoePrints,
  Spell: faMagic, // old from wiki
  // "DefensiveSpell": faMagic, information was normalized in batch job
  Building: faHome,
};
