import React from "react";
import BuildingTargetIcon from "attack/building-target-icon";
import GroundIcon from "./GroudIcon";
import GroundAirTargetIcon from "./GroundAirTargetIcon";

export const targetsMapping = {
  Ground: <GroundIcon />,
  "Ground & Air": <GroundAirTargetIcon />,
  Building: <BuildingTargetIcon />,
  // "Air":  <GroundAndAirIcon/> switched icons
};
