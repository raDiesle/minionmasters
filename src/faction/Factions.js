import React from "react";
import VoidborneIcon from "./VoidborneIcon";
import AccursedIcon from "./AccursedIcon";
import ScratIcon from "./ScratIcon";
import CrystalElfIcon from "./CrystalElfIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHatWizard} from "@fortawesome/free-solid-svg-icons/faHatWizard";
import {faYinYang} from "@fortawesome/free-solid-svg-icons/faYinYang";
import SlitherIcon from "./SlitherIcon";
import OutlanderIcon from "./OutladerIcon";
import EmpyrianIcon from "./EmpyrianIcon";
import StoutheartIcon from "./StoutheartIcon";


export const factionMapping = {
    Voidborne: <VoidborneIcon/>,
    Accursed: <AccursedIcon/>,
    Scrat: <ScratIcon/>,
    "Crystal Elf": <CrystalElfIcon/>,
    "Puff": <FontAwesomeIcon icon={faHatWizard} size={"xs"}/>,
    "Zen-Chi": <FontAwesomeIcon icon={faYinYang} size={"xs"}/>,
    "Slither": <SlitherIcon/>,
    "Outlander": <OutlanderIcon/>,
    "Empyrean": <EmpyrianIcon/>,
    "Stoutheart": <StoutheartIcon/>
};