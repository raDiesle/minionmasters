// import { faHatWizard } from "@fortawesome/free-solid-svg-icons/faHatWizard";
import { faYinYang } from "@fortawesome/free-solid-svg-icons/faYinYang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccursedIcon from "components/faction/accursed-icon";
import CrystalElfIcon from "components/faction/crystal-elf-icon";
import EmpyrianIcon from "components/faction/empyrian-icon";
import OutlanderIcon from "components/faction/outlader-icon";
import ScratIcon from "components/faction/scrat-icon";
import SlitherIcon from "components/faction/slither-icon";
import StoutheartIcon from "components/faction/stoutheart-icon";
import VoidborneIcon from "components/faction/voidborne-icon";
import React from "react";

export const factionMapping = {
  Voidborne: <VoidborneIcon />,
  Accursed: <AccursedIcon />,
  Scrat: <ScratIcon />,
  CrystalElf: <CrystalElfIcon />,
  // Puff: <FontAwesomeIcon icon={faHatWizard} size={"xs"} />,
  ZenChi: <FontAwesomeIcon icon={faYinYang} size={"xs"} />,
  Slither: <SlitherIcon />,
  Outlander: <OutlanderIcon />,
  Empyrean: <EmpyrianIcon />,
  Stoutheart: <StoutheartIcon />,
};
