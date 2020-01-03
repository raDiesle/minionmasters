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
import {ButtonFilterGroup, ButtonGroupStyle, ButtonInGroupStyle} from "./ButtonFilterGroup";
import MinusIcon from "./MinusIcon";
import PlusIcon from "./PlusIcon";
import {MANACOST} from "../../manacost/manacost";
import PerkHeroIcon from "../../rarity/PerkHeroIcon";


function FilterByNameInput({nameValue, setFilters}) {

    return (
        <input
            type="text"
            value={nameValue}
            onChange={(event) => {
                event.persist();
                setFilters((prevFilters) => {
                    const newFilters = {...prevFilters};
                    newFilters.name = event.target.value;
                    return newFilters;
                });
            }}
        />)
}

export function Filters({filters, setFilters, setZoom}) {
    const FilterContainerStyle = styled.div`
        display: flex;   
        flex-wrap: wrap;  
        align-items: flex-end;   
        padding: 0 10px 10px 10px;
        
        & > div {
            padding-right: 20px;
        }
    `;

    return <FilterContainerStyle>

        <div>
            <div>Name</div>
            <FilterByNameInput nameValue={filters.name} setFilters={setFilters}/>
        </div>
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
            Manacost
            <ButtonFilterGroup btnkey="manacost" filters={filters.manacost} setFilters={setFilters}>
                {MANACOST.map((number) => <div key={number}>{number}</div>)}
            </ButtonFilterGroup>
        </div>

        <div>
            Rare
            <ButtonFilterGroup btnkey="rarity" filters={filters.rarity} setFilters={setFilters}>
                {
                    Object.keys(rarityMapping).map(rarity =>
                        <div key={rarity} style={{color: rarityMapping[rarity]}}>
                            {rarity !== 'Perk' ? <FontAwesomeIcon icon={faSquare} size={"xs"}/> : <PerkHeroIcon/>}
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

        <div>
            Size
            <ButtonGroupStyle>
                <ButtonInGroupStyle
                    onClick={() => setZoom((prevZoom) => prevZoom - 1)}><MinusIcon/></ButtonInGroupStyle>
                <ButtonInGroupStyle onClick={() => setZoom(5)}>
                    <div>normal</div>
                </ButtonInGroupStyle>
                <ButtonInGroupStyle onClick={() => setZoom((prevZoom) => prevZoom + 1)}><PlusIcon/></ButtonInGroupStyle>
            </ButtonGroupStyle>
        </div>
    </FilterContainerStyle>
}