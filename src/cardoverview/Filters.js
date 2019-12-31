import React, {useState} from "react";
import styled from "styled-components"
import AccursedIcon from "../faction/AccursedIcon";
import CrystalElfIcon from "../faction/CrystalElfIcon";
import EmpyrianIcon from "../faction/EmpyrianIcon";
import OutlanderIcon from "../faction/OutladerIcon";
import ScratIcon from "../faction/ScratIcon";
import SlitherIcon from "../faction/SlitherIcon";
import VoidBorneIcon from "../faction/VoidborneIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {faMinusSquare} from "@fortawesome/free-solid-svg-icons/faMinusSquare";
import {rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {faSquare} from "@fortawesome/free-solid-svg-icons/faSquare";
import {ButtonGroup} from "./filters/ButtonGroup";

export function Filters() {

    const [factionModel, setFactionModel] = useState([]);
    const [sizeModel, setSizeModel] = useState([]);
    const [manacost, setManacost] = useState([]);
    const [rare, setRare] = useState([]);
    const [type, setType] = useState([]);

    const FilterContainerStyle = styled.div`
        display: flex;   
        flex-wrap: wrap;     
        padding: 0 10px 10px 10px;
        
        & > div {
            padding-right: 20px;
        }
    `;


    return <FilterContainerStyle>
        <div>
            Faction
            <ButtonGroup model={factionModel} setModel={setFactionModel}>
                <AccursedIcon btnKey="Accursed"/>
                <CrystalElfIcon btnKey="Crystal Elf"/>
                <EmpyrianIcon btnKey="Empyrian"/>
                <OutlanderIcon btnKey="Outlander"/>
                <ScratIcon btnKey="Scrat"/>
                <SlitherIcon btnKey="Slither"/>
                <VoidBorneIcon btnKey="Voidborne"/>
            </ButtonGroup>
        </div>

        <div>
            Size
            <ButtonGroup model={sizeModel} setModel={setSizeModel}>
                <FontAwesomeIcon btnKey="zoomOut" icon={faMinusSquare}/>
                <div btnKey="reset">normal</div>
                <FontAwesomeIcon btnKey="zoomIn" icon={faPlusSquare}/>
            </ButtonGroup>
        </div>

        <div>
            Manacost
            <ButtonGroup model={manacost} setModel={setManacost}>
                {[...Array(11).keys()].map((number) => <div btnKey={number} key={number}>{number}</div>)}
            </ButtonGroup>
        </div>

        <div>
            Rare
            <ButtonGroup model={rare} setModel={setRare}>
                {
                    Object.keys(rarityMapping).map(rarity =>
                        <div key={rarity} btnKey={rarity} style={{color: rarityMapping[rarity]}}>
                            <FontAwesomeIcon icon={faSquare} size={"xs"}/>
                        </div>)
                }
            </ButtonGroup>
        </div>

        <div>
            Type
            <ButtonGroup model={type} setModel={setType}>
                {
                    Object.keys(typeMapping).map(type => <div key={type} btnKey={type}>
                        <FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/></div>)
                }
            </ButtonGroup>
        </div>

    </FilterContainerStyle>
}