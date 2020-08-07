import React from "react";
import ApepContent from "./MasterDetails/ApepContent";
import DionaContent from "./MasterDetails/DionaContent";
import KingPuffContent from "./MasterDetails/KingPuffContent";
import MilloweenContent from "./MasterDetails/MilloweenContent";
import MordarContent from "./MasterDetails/MordarContent";
import MorelliaContent from "page/mastersoverview/MasterDetails/MorelliaContent";
import RatboContent from "./MasterDetails/RatboContent";
import RavagerContent from "page/mastersoverview/MasterDetails/RavagerContent";
import SettsuContent from "./MasterDetails/SettsuContent";
import StormbringerContent from "./MasterDetails/StormbringerContent";
import VolcoContent from "./MasterDetails/VolcoContent";

export const mastersMapping = {
  Apep: {
    content: <ApepContent />,
    icon: "Apep_Portrait",
    iD: 6,
  },
  Diona: {
    content: <DionaContent />,
    icon: "Avatar_Diona",
    iD: 10,
  },
  "King Puff": {
    content: <KingPuffContent />,
    icon: "Puff_Icon",
    iD: 5,
  },
  Milloween: {
    content: <MilloweenContent />,
    icon: "Milloween_Icon",
    iD: 8,
  },
  Mordar: {
    content: <MordarContent />,
    icon: "Mordar_Icon",
    iD: 2,
  },
  Morellia: {
    content: <MorelliaContent />,
    icon: "LichQueen_Portrait",
    iD: 11,
  },
  Ratbo: {
    content: <RatboContent />,
    icon: "Ratbo_Icon",
    iD: 4,
  },
  ravager: {
    content: <RavagerContent />,
    icon: "Ravager_Icon",
    iD: 3,
  },
  Settsu: {
    content: <SettsuContent />,
    icon: "Settsu_Icon",
    iD: 7,
  },
  Stormbringer: {
    content: <StormbringerContent />,
    icon: "Storm_Icon",
    iD: 0,
  },
  Volco: {
    content: <VolcoContent />,
    icon: "Volco_Icon",
    iD: 1,
  },
};
