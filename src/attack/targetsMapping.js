import { faMagic } from "@fortawesome/free-solid-svg-icons/faMagic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BuildingTargetIcon from "attack/building-target-icon";
import React from "react";
import GroundIcon from "./GroudIcon";
import GroundAirTargetIcon from "./GroundAirTargetIcon";

export const targetsMapping = {
  Ground: <GroundIcon />,
  "Ground & Air": <GroundAirTargetIcon />,
  Building: <BuildingTargetIcon />,
  "Is Spell": <FontAwesomeIcon icon={faMagic} />,
  // "Air":  <GroundAndAirIcon/> switched icons
};
