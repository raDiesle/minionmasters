// import { css } from "@emotion/react";
import cssButton from "components/button.module.scss";
import css from "./table-filter-input.module.scss"
import React, { useEffect, useState } from 'react';
import { factionMapping, typeMapping, targetsMapping, RarityMappingConfig, attackTypesMapping } from "components/propMappings";
import Tooltip from "rc-tooltip";
import { FilterButton, BUTTON_STATES } from "./filter-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerkMasterIcon from "components/rarity/perk-master-icon";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import ReverseIcon from "components/reverse-icon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { AdvancedFilterModal } from "./advanced-filter-modal";
import {PopoverButton} from "./popover-button";
import { FilterOperators, FilterAttributes } from "./advanced-filters-config";

// import * as classnames from "classnames";


export function TableFilterInput({
    filters,
    setFilters,
    searchHint = "",
    
    children = <></>,
}){ 

    //initialize values
    const [initialized, setInitialized] = useState(false);
    const [reset, setReset] = useState(false)
    const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
    // const [isAdvancedFiltersModalOpen, setIsAdvancedFiltersModalOpen] = useState(false);

    useEffect(() => {
        if (!initialized || reset){
            setInitialized(true);
            setReset(false);
            //#region filter props
            const text = "";
            const faction = Object.fromEntries(Object.keys(factionMapping).map(faction => [faction, false]));
            const mana = Object.fromEntries(Array(10).keys().map((cost) => [cost+1, false]));
            const type = Object.fromEntries(Object.keys(typeMapping).map((type) => [type, false]));
            const attackType = Object.fromEntries(Object.keys(attackTypesMapping).filter(type => type !=="Ability").map((attackType) => [attackType, false]));
            const attackTargets = Object.fromEntries(Object.keys(targetsMapping).map((target) => [target, false]));
            const isAoe = 0;
            const rarity = Object.fromEntries(Object.keys(RarityMappingConfig).filter(rarity => rarity !=="Perk").map(rarity => [rarity, false]))
            const count = {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                "5 +": false,
            }
            //#endregion filter values
            setFilters({
                text,
                faction,
                mana,
                type,
                attackType,
                attackTargets,
                isAoe,
                rarity,
                count,
            });
        }
    }, [initialized, reset, setFilters])

    if(!initialized){
        return <div></div>
    }
    
    function handleButtonClick(filterCategory, key){
        return (event) => {
            if (event.type === 'click') {
                // Left-click behavior
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [filterCategory]: {
                        ...prevFilters[filterCategory],
                        [key]: !prevFilters[filterCategory][key],
                    }
                }));
            } else if (event.type === 'contextmenu') {
                // Right-click behavior: select only the clicked filter
                setFilters(prevFilters => {
                    const categoryAllUnselected = Object.fromEntries(Object.entries(prevFilters[filterCategory]).map(([key, _]) => [key, false]));
                    return {
                        ...prevFilters,
                        [filterCategory]: {
                            ...categoryAllUnselected,
                            [key]: true,
                        }
                    }
                });
            };
        }
    };

    return (
        <div className={css.FilterContainerStyle}>
            <div>
                <div>Search</div>
                <div className={cssButton.ButtonGroupStyle} >
                    <input
                        className={css.InputTextStyle}
                        type="text"
                        value={filters.text}
                        style={{width: 112}}
                        placeholder={searchHint}
                        onChange={(event) => {
                            const newText = event.target.value;
                            setFilters((prevFilters) => ({
                                ...prevFilters,
                                text: newText,
                            }));
                            event.persist();
                        }}
                    />
                </div>
            </div>
            <div>
                <div>Faction</div>
                <div className={cssButton.ButtonGroupStyle}>
                    {   
                        Object.keys(filters.faction).map((faction, index) => 
                            <FilterButton 
                                key={index}
                                className = {filters.faction[faction] ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                                content = {factionMapping[faction]}
                                tooltip = {faction}
                                handleClick={handleButtonClick("faction", faction)}
                            />
                        )
                    }
                </div>
            </div>

            <div>
                <div>Mana</div>
                <div className={cssButton.ButtonGroupStyle}>
                    {
                        Object.keys(filters.mana).map((mana, index) => 
                            <FilterButton 
                                key={index}
                                className = {filters.mana[mana] ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                                content = {mana}
                                handleClick={handleButtonClick("mana", mana)}
                            />
                        )
                    }
                </div>
            </div>

            <div>
                <div>Type</div>
                <div className={cssButton.ButtonGroupStyle}>
                    {
                        Object.keys(filters.type).map((type, index) => 
                            <FilterButton 
                                key={index}
                                className = {filters.type[type] ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                                content = {typeMapping[type]}
                                tooltip = {type}
                                handleClick={handleButtonClick("type", type)}
                            />
                        )
                    }
                </div>
            </div>

            <div>
                <div>Count</div>
                <div className={cssButton.ButtonGroupStyle}>
                    {
                        Object.keys(filters.count).map((count, index) => 
                            <FilterButton 
                                key={index}
                                className = {filters.count[count] ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                                content = {count}
                                handleClick={handleButtonClick("count", count)}
                            />
                        )
                    }
                </div>
            </div>

            <div style={{ paddingRight: "5px" }}>
                <div>Attack</div>
                <div className={cssButton.ButtonGroupStyle}>
                    {
                        Object.keys(filters.attackType).map((attackType, index) => 
                            <FilterButton 
                                key={index}
                                className = {filters.attackType[attackType] ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                                content = {attackTypesMapping[attackType]}
                                tooltip = {attackType}
                                handleClick={handleButtonClick("attackType", attackType)}
                            />
                        )
                    }
                </div>
            </div>

            <div className={cssButton.ButtonGroupStyle}>
                <FilterButton 
                    className = {[BUTTON_STATES.INACTIVE, BUTTON_STATES.INCLUDE, BUTTON_STATES.EXCLUDE][filters.isAoe]}
                    content = {"AOE"}
                    handleClick = {(event) => {
                        setFilters(
                            (prevFilters) => ({
                                ...prevFilters, 
                                isAoe: (prevFilters.isAoe + 1)%3
                            }
                        ))}
                    }
                />
            </div>

            <div>
                <div>Targets</div>
                <div className={cssButton.ButtonGroupStyle}>
                    {
                        Object.keys(filters.attackTargets).map((attackTargets, index) => 
                            <FilterButton 
                                key={index}
                                className = {filters.attackTargets[attackTargets] ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                                content = {targetsMapping[attackTargets]}
                                tooltip = {attackTargets}
                                handleClick={handleButtonClick("attackTargets", attackTargets)}
                            />
                        )
                    }
                </div>
            </div>

            <div>
                <div>Rarity</div>
                <div className={cssButton.ButtonGroupStyle}>
                    {
                        Object.keys(filters.rarity).map((rarity, index) => 
                            <FilterButton 
                                key={index}
                                className = {filters.rarity[rarity] ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                                content = {            
                                    <div key={rarity} style={{ color: RarityMappingConfig[rarity] }}>
                                        {rarity !== "Perk" ? (
                                        <FontAwesomeIcon icon={faSquare} size={"sm"} />
                                        ) : (
                                        <PerkMasterIcon />
                                        )}
                                    </div>
                                }
                                tooltip = {rarity}
                                handleClick={handleButtonClick("rarity", rarity)}
                            />
                        )
                    }
                </div>
            </div>

            {/* <div className={cssButton.ButtonGroupStyle}>
                <Tooltip overlay={<span>{"Advanced Filters"}</span>} placement ="bottomLeft"> 
                    <button
                        className = {filters.inverted ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                        onClick={() => setIsAdvancedFilterOpen(true)}
                        >   
                        {<div> <FontAwesomeIcon icon={faPlus}/> </div>}
                    </button>
                </Tooltip> 
            </div> */}

            <div className={cssButton.ButtonGroupStyle}>
                <FilterButton
                    className = {filters.inverted ? BUTTON_STATES.ACTIVE : BUTTON_STATES.INACTIVE}
                    handleClick ={() => setFilters((prevFilters) => ({
                        ...prevFilters,
                        inverted: !prevFilters.inverted
                    }))}
                    content={<div><ReverseIcon/> Invert </div>}
                    >   
                </FilterButton>
            </div>

            <div className={cssButton.ButtonGroupStyle}>
                <button
                    className={cssButton.ButtonInGroupStyle}
                    onClick={() => {
                        setReset(true);
                    }}
                >
                    <FontAwesomeIcon icon={faTrashAlt} /> &nbsp;Reset
                </button>
            </div>

            <div className={cssButton.ButtonGroupStyle}>
                <PopoverButton className={cssButton.ButtonInGroupStyle} buttonContent={"Advanced Filters"}>
                    <div style={{marginBottom: "8px"}}>Select Filter Options: </div>
                    <div className={cssButton.ButtonGroupStyle}>

                        <select>
                        {
                            Object.values(FilterAttributes).map((attribute) => 
                                <option>{attribute}</option>
                            )
                        }
                        </select>
                        <select>
                        {
                            Object.values(FilterOperators).map((operator) => 
                                <option>{operator}</option>
                            )
                        }
                        </select>
                        <input style={{width: "50px",}} ></input>
                        <button>
                            <FontAwesomeIcon icon = {faPlus}/>
                        </button>
                    </div>
                </PopoverButton>
            </div>

            <div>
                {
                    React.Children.map(children, (child, index) => (
                        <div  className={cssButton.ButtonGroupStyle} key={index}>{child}</div>
                    ))
                }
            </div>

        </div>


        
    );
}