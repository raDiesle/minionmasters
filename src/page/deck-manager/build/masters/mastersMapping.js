import ApepContent from "page/deck-manager/build/masters/MasterDetails/ApepContent";
import DionaContent from "page/deck-manager/build/masters/MasterDetails/DionaContent";
import KingPuffContent from "page/deck-manager/build/masters/MasterDetails/KingPuffContent";
import MilloweenContent from "page/deck-manager/build/masters/MasterDetails/MilloweenContent";
import MordarContent from "page/deck-manager/build/masters/MasterDetails/MordarContent";
import MorelliaContent from "page/deck-manager/build/masters/MasterDetails/MorelliaContent";
import RatboContent from "page/deck-manager/build/masters/MasterDetails/RatboContent";
import RavagerContent from "page/deck-manager/build/masters/MasterDetails/RavagerContent";
import SettsuContent from "page/deck-manager/build/masters/MasterDetails/SettsuContent";
import StormbringerContent from "page/deck-manager/build/masters/MasterDetails/StormbringerContent";
import VolcoContent from "page/deck-manager/build/masters/MasterDetails/VolcoContent";
import React from "react";

// TODO change to use master id all over instead of name
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
  Ravager: {
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
