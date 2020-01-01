import React from "react";
import styled from "styled-components"
import AccursedIcon from "../../faction/AccursedIcon";
import CrystalElfIcon from "../../faction/CrystalElfIcon";
import EmpyrianIcon from "../../faction/EmpyrianIcon";
import OutlanderIcon from "../../faction/OutladerIcon";
import ScratIcon from "../../faction/ScratIcon";
import SlitherIcon from "../../faction/SlitherIcon";
import VoidBorneIcon from "../../faction/VoidborneIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {rarityMapping} from "../../rarity/rarityMapping";
import {typeMapping} from "../../cardtype/typeMapping";
import {faSquare} from "@fortawesome/free-solid-svg-icons/faSquare";
import {ButtonFilterGroup} from "./ButtonFilterGroup";
import MinusIcon from "./MinusIcon";
import PlusIcon from "./PlusIcon";
import {MANACOST} from "../../manacost/manacost";

export function Filters({filters, setFilters}) {

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
            <ButtonFilterGroup btnkey="faction" filters={filters.faction} setFilters={setFilters}>
                <AccursedIcon/>
                <CrystalElfIcon/>
                <EmpyrianIcon/>
                <OutlanderIcon/>
                <ScratIcon/>
                <SlitherIcon/>
                <VoidBorneIcon/>
            </ButtonFilterGroup>
        </div>

        <div>
            Size
            <ButtonFilterGroup btnkey="size" filters={filters.size} setFilters={setFilters}>
                <MinusIcon btnkey="zoomOut"/>
                <div btnkey="reset">normal</div>
                <PlusIcon btnkey="zoomIn"/>
            </ButtonFilterGroup>
        </div>

        <div>
            Manacost
            <ButtonFilterGroup btnkey="manacost" filters={filters.manacost} setFilters={setFilters}>
                {MANACOST.map((number) => <div key={number}>{number}</div>)}
            </ButtonFilterGroup>
        </div>

        <div>
            Rare
            <ButtonFilterGroup btnkey="rare" filters={filters.rare} setFilters={setFilters}>
                {
                    Object.keys(rarityMapping).map(rarity =>
                        <div key={rarity} style={{color: rarityMapping[rarity]}}>
                            <FontAwesomeIcon icon={faSquare} size={"xs"}/>
                        </div>)
                }
            </ButtonFilterGroup>
        </div>

        <div>
            Type
            <ButtonFilterGroup btnkey="type" filters={filters.type} setFilters={setFilters}>
                {
                    Object.keys(typeMapping).map(type =>
                        <div key={type}>
                            <FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/>
                        </div>)
                }
            </ButtonFilterGroup>
        </div>

    </FilterContainerStyle>
}