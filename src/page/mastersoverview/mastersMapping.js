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
        icon: "Apep_Portrait"
    },
    "Diona": {
        content: <DionaContent/>,
        icon: "Avatar_Diona"
    },
    "King Puff": {
        content: <KingPuffContent/>,
        icon: "Puff_Icon"
    },
    "Milloween": {
        content: <MilloweenContent/>,
        icon: "Milloween_Icon"
    },
    "Mordar": {
        content: <MordarContent/>,
        icon: "Mordar_Icon"
    },
    "Morellia": {
        content: <MoreillaContent/>,
        icon: "LichQueen_Portrait"
    },
    "Ratbo": {
        content: <RatboContent/>,
        icon: "Ratbo_Icon"
    },
    "Ravanger": {
        content: <RavangerContent/>,
        icon: "Ravager_Icon"
    },
    "Settsu": {
        content: <SettsuContent/>,
        icon: "Settsu_Icon"
    },
    "Stormbringer": {
        content: <StormbringerContent/>,
        icon: "Storm_Icon"
    },
    "Volco": {
        content: <VolcoContent/>,
        icon: "Volco_Icon"
    }
};