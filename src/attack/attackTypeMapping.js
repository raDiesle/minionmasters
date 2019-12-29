import AirIcon from "./AirIcon";
import GroundIcon from "./GroudIcon";
import GroundAndAirIcon from "./GroundAndAirIcon";
import React from "react";

export const attackTypeMapping = {
    "Air": <AirIcon/>,
    "Ground": <GroundIcon/>,
    "Ground & Air": <GroundAndAirIcon/>
};