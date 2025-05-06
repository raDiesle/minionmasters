import { faDove } from "@fortawesome/free-solid-svg-icons/faDove";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faMagic } from "@fortawesome/free-solid-svg-icons/faMagic";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons/faShoePrints";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TYPES = {
  Minion: "Minion",
  "Flying Minion": "Flying Minion",
};

export const typeMapping = {
  "Flying Minion": <FontAwesomeIcon icon = {faDove}/>,
  Minion: <FontAwesomeIcon icon = {faShoePrints}/>,
  Spell: <FontAwesomeIcon icon = {faMagic}/>, // old from wiki
  // "DefensiveSpell": faMagic, information was normalized in batch job
  Building: <FontAwesomeIcon icon = {faHome}/>,
};
