import React, {useEffect} from "react";
import styled from "styled-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {rarityMapping} from "../../rarity/rarityMapping";
import {typeMapping} from "../../cardtype/typeMapping";
import {faSquare} from "@fortawesome/free-solid-svg-icons/faSquare";
import {ButtonFilterGroup, ButtonGroupStyle, ButtonInGroupStyle} from "./ButtonFilterGroup";
import MinusIcon from "./MinusIcon";
import PlusIcon from "./PlusIcon";
import {MANACOST} from "../../manacost/manacost";
import PerkHeroIcon from "../../rarity/PerkHeroIcon";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import {faSquareFull} from "@fortawesome/free-solid-svg-icons/faSquareFull";
import {targetsMapping} from "../../attack/targetsMapping";

import {factionMapping} from "../../faction/Factions";

const InputTextStyle = styled.input`
  color: #444;
  border: 1px solid #444;
  font-weight: bold;
  width: 100px;
`;

const InputLabelStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

function FilterByNameInput({nameValue, setFilters}) {
    return (
        <InputTextStyle
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
        />
    )
}

const FilterContainerStyle = styled.div`
        display: flex;   
        flex-wrap: wrap;  
        align-items: flex-end;   
       padding: 0 0 10px 0px;
        
        & > div {
            padding-right: 20px;
        }
    `;

export function Filters({filters, setFilters, setZoom, isShowNames, setIsShowNames}) {

    useEffect(() => {
        setIsShowNames(!!filters.name);
    }, [filters.name, setIsShowNames]);

    return <FilterContainerStyle>
        <div>
            <div>Name</div>
            <FilterByNameInput nameValue={filters.name} setFilters={setFilters}/>
        </div>
        <div>
            Faction
            <ButtonFilterGroup btnkey="faction" filters={filters.faction} setFilters={setFilters}>
                {Object.values(factionMapping).map((icon) => <div key={icon}>{icon}</div>)}
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
                            <FontAwesomeIcon icon={typeMapping[type]} size="xs"/>
                        </div>
                    )
                }
            </ButtonFilterGroup>
        </div>

        <div>
            Attack
            <ButtonFilterGroup btnkey="targets" filters={filters.targets} setFilters={setFilters}>
                {
                    Object.keys(targetsMapping).map(target =>
                        <div key={target}>
                            {targetsMapping[target]}
                        </div>
                    )
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

        <InputLabelStyle>
            Show Names
            <ButtonGroupStyle>
                <ButtonInGroupStyle onClick={() => setIsShowNames(prevShowNames => !prevShowNames)}>
                    <FontAwesomeIcon icon={isShowNames ? faCheckSquare : faSquareFull}/>
                </ButtonInGroupStyle>
            </ButtonGroupStyle>
        </InputLabelStyle>


    </FilterContainerStyle>
}