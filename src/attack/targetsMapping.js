import AirIcon from "./AirIcon";
import GroundIcon from "./GroudIcon";
import GroundAndAirIcon from "./GroundAndAirIcon";
import React from "react";

export const targetsMapping = {
    "Ground": <GroundIcon/>,
    "Ground & Air": <GroundAndAirIcon/>,
    "Air": <AirIcon/>
};