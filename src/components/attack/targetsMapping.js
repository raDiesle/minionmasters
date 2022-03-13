import { faMagic } from "@fortawesome/free-solid-svg-icons/faMagic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BuildingTargetIcon from "components/attack/building-target-icon";
import GroundIcon from "components/attack/GroudIcon";
import GroundAirTargetIcon from "components/attack/GroundAirTargetIcon";
import React from "react";

export const TARGET_IS_SPELL =   "Is Spell";


export const targetsMapping = {
  Ground: <GroundIcon />,
  "Ground & Air": <GroundAirTargetIcon />,
  Building: <BuildingTargetIcon />,
  // "Air":  <GroundAndAirIcon/> switched icons
  [TARGET_IS_SPELL]: <FontAwesomeIcon icon={faMagic} />,
  undefined : null
};
