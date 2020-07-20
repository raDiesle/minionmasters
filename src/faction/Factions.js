import {faHatWizard} from "@fortawesome/free-solid-svg-icons/faHatWizard";
import {faYinYang} from "@fortawesome/free-solid-svg-icons/faYinYang";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import AccursedIcon from "./AccursedIcon";
import CrystalElfIcon from "./CrystalElfIcon";
import EmpyrianIcon from "./EmpyrianIcon";
import OutlanderIcon from "./OutladerIcon";
import ScratIcon from "./ScratIcon";
import SlitherIcon from "./SlitherIcon";
import StoutheartIcon from "./StoutheartIcon";
import VoidborneIcon from "./VoidborneIcon";

export const factionMapping = {
  Voidborne: <VoidborneIcon />,
  Accursed: <AccursedIcon />,
  Scrat: <ScratIcon />,
  CrystalElf: <CrystalElfIcon />,
  Puff: <FontAwesomeIcon icon={faHatWizard} size={"xs"} />,
  ZenChi: <FontAwesomeIcon icon={faYinYang} size={"xs"} />,
  Slither: <SlitherIcon />,
  Outlander: <OutlanderIcon />,
  Empyrean: <EmpyrianIcon />,
  Highlander: <StoutheartIcon />,
};
