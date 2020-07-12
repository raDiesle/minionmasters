import React from "react";
import ApepContent from "./MasterDetails/ApepContent";
import DionaContent from "./MasterDetails/DionaContent";
import KingPuffContent from "./MasterDetails/KingPuffContent";
import MilloweenContent from "./MasterDetails/MilloweenContent";
import MordarContent from "./MasterDetails/MordarContent";
import MoreillaContent from "./MasterDetails/MoreillaContent";
import RatboContent from "./MasterDetails/RatboContent";
import RavangerContent from "./MasterDetails/RavangerContent";
import SettsuContent from "./MasterDetails/SettsuContent";
import StormbringerContent from "./MasterDetails/StormbringerContent";
import VolcoContent from "./MasterDetails/VolcoContent";

export const mastersMapping = {
    "Apep": {
        content: <ApepContent/>,
        icon: "Apep_Portrait.jpg"
    },
    "Diona": {
        content: <DionaContent/>,
        icon: "Avatar_Diona.jpg"
    },
    "King Puff": {
        content: <KingPuffContent/>,
        icon: "Puff_Icon.png"
    },
    "Milloween": {
        content: <MilloweenContent/>,
        icon: "Milloween_Icon.png"
    },
    "Mordar": {
        content: <MordarContent/>,
        icon: "Mordar_Icon.png"
    },
    "Morellia": {
        content: <MoreillaContent/>,
        icon: "LichQueen_Portrait.jpg"
    },
    "Ratbo": {
        content: <RatboContent/>,
        icon: "Ratbo_Icon.png"
    },
    "Ravanger": {
        content: <RavangerContent/>,
        icon: "Ravager_Icon.png"
    },
    "Settsu": {
        content: <SettsuContent/>,
        icon: "Settsu_Icon.png"
    },
    "Stormbringer": {
        content: <StormbringerContent/>,
        icon: "Storm_Icon.png"
    },
    "Volco": {
        content: <VolcoContent/>,
        icon: "Volco_Icon.png"
    }
};