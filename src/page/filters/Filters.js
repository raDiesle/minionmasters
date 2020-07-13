import {faCheckSquare} from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import {faSortAmountDown} from "@fortawesome/free-solid-svg-icons/faSortAmountDown";
import {faSortAmountUp} from "@fortawesome/free-solid-svg-icons/faSortAmountUp";
import {faSquare} from "@fortawesome/free-solid-svg-icons/faSquare";
import {faSquareFull} from "@fortawesome/free-solid-svg-icons/faSquareFull";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect} from "react";
import styled from "styled-components"
import {targetsMapping} from "../../attack/targetsMapping";
import {typeMapping} from "../../cardtype/typeMapping";

import {factionMapping} from "../../faction/Factions";
import {MANACOST} from "../../manacost/manacost";
import PerkHeroIcon from "../../rarity/PerkHeroIcon";

import {rarityMapping} from "../../rarity/rarityMapping";
import {ButtonFilterGroup, ButtonGroupStyle, ButtonInGroupStyle} from "./ButtonFilterGroup";

const InputTextStyle = styled.input`
  color: #fff;
  border: 1px solid #000;
  font-weight: bold;
  width: 100px;
  background-color: #444;
  
  &:hover{
    border-color: yellow;
    outline: none;
  }
  
  &:focus, &:active {
    background-color: #111;
  }
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

export function Filters({filters, setFilters, isShowNames, setIsShowNames, sortByMana, setSortByMana}) {

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
                {
                    Object.keys(factionMapping).map((faction) =>
                        <div className="tooltip">
                            <div key={factionMapping[faction]}>{factionMapping[faction]}</div>
                            <span className="tooltiptext">
                            {faction}
                        </span>
                        </div>)
                }
            </ButtonFilterGroup>
        </div>

        <div style={{paddingRight: 0}}>
            Manacost
            <ButtonFilterGroup btnkey="manacost" filters={filters.manacost} setFilters={setFilters}>
                {MANACOST.map((number) => <div key={number}>{number}</div>)}
            </ButtonFilterGroup>
        </div>

        <ButtonGroupStyle>
            <ButtonInGroupStyle
                isButtonActive={sortByMana === 'asc'}
                onClick={() => setSortByMana("asc")}
            >
                <div className="tooltip">
                    <FontAwesomeIcon icon={faSortAmountUp}/>
                    <span className="tooltiptext">
                    Sort Mana Ascending
                </span>
                </div>
            </ButtonInGroupStyle>
            <ButtonInGroupStyle
                isButtonActive={sortByMana === 'desc'}
                onClick={() => setSortByMana("desc")}
            >
                <div className="tooltip">
                    <FontAwesomeIcon icon={faSortAmountDown}/>
                    <span className="tooltiptext">
                        Sort Mana Ascending
                    </span>
                </div>
            </ButtonInGroupStyle>
        </ButtonGroupStyle>


        <div>
            Rarity
            <ButtonFilterGroup btnkey="rarity" filters={filters.rarity} setFilters={setFilters}>
                {
                    Object.keys(rarityMapping).map(rarity =>
                        <div className="tooltip">
                            <div key={rarity} style={{color: rarityMapping[rarity]}}>
                                {rarity !== 'Perk' ? <FontAwesomeIcon icon={faSquare} size={"xs"}/> : <PerkHeroIcon/>}
                                <span className="tooltiptext">
                                    {rarity}
                                </span>
                            </div>
                        </div>)
                }
            </ButtonFilterGroup>
        </div>

        <div>
            Type
            <ButtonFilterGroup btnkey="type" filters={filters.type} setFilters={setFilters}>
                {
                    Object.keys(typeMapping).map(type =>
                        <div className="tooltip">
                            <div key={type}>
                                <FontAwesomeIcon icon={typeMapping[type]} size="xs"/>
                            </div>
                            <span className="tooltiptext">{type}</span>
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
                        <div className="tooltip">
                            <div key={target}>
                                {targetsMapping[target]}
                            </div>
                            <span className="tooltiptext">{target}</span>
                        </div>
                    )
                }
            </ButtonFilterGroup>
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