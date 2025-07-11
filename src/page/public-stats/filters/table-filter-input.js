// import { css } from "@emotion/react";
import cssButton from "components/button.module.scss";
import css from "./table-filter-input.module.scss"
import React, { useEffect, useState } from 'react';
import { factionMapping, typeMapping, targetsMapping, RarityMappingConfig, attackTypesMapping } from "components/propMappings";
import Tooltip from "rc-tooltip";
import { FilterButton, BUTTON_STATES } from "./filterButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerkMasterIcon from "components/rarity/perk-master-icon";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import ReverseIcon from "components/reverse-icon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PopoverButton } from "./popover-button";
import { FilterOperators, FilterAttributes, FilterCategories } from "./advanced-filters-config";
import { Tag } from "./tag";


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
    const [newAdvancedFilter, setNewAdvancedFilter] = useState(
        {
            attribute: FilterAttributes.winrateOverall,
            operator: FilterOperators.GREATER_EQ,
            value: 0.5,
        });
    const [decimalInput, setDecimalInput] = useState((newAdvancedFilter.value * (newAdvancedFilter.attribute.factor)).toString());
    const [advancedFilterCategory, setAdvancedFilterCategory] = useState(newAdvancedFilter.attribute.category);

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
        
        setDecimalInput(newAdvancedFilter.value*(newAdvancedFilter.attribute.factor).toString());
    }, [initialized, reset, setFilters, newAdvancedFilter.value, newAdvancedFilter.attribute.factor, advancedFilterCategory])

    if(!initialized){
        return <div></div>
    }

    function getFilterTagString(filterOptions){
        // returns the text to be shown on Filter Tags
        const attribute = filterOptions.attribute;
        // console.log(attribute.label+attribute.isPercent)
        if(attribute.category === FilterCategories.KEYWORDS){
            return "Keyword: " + attribute.label;
        }
        if (attribute.category === FilterCategories.UNITS) {
            return "Unit: " + attribute.label;
        }
        return attribute.label + " " + filterOptions.operator + " " + (Math.round(filterOptions.value*attribute.factor*100)/100 + (attribute.isPercent ? " %" : ""))
        
    }

    const filterInputDefaultProps = {
        className: cssButton.ButtonGroupStyle,
        onChange: (e) => {setDecimalInput(e.target.value)},
        onFocus: (e) => e.target.select(),
        onBlur: () => {setNewAdvancedFilter({...newAdvancedFilter, value: parseFloat(decimalInput)})},
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
            
            {/* Advanced Filters */}
            <div className={cssButton.ButtonGroupStyle}>
                <PopoverButton className={cssButton.ButtonInGroupStyle} buttonContent={"Advanced Filters"} popoverStyle={{minWidth: "250px"}}>
                    <div style={{marginBottom: "8px", fontSize: "14px"}}>Add Filter:</div>
                    <div className={cssButton.ButtonGroupStyle}>
                        <select 
                            style={{marginBottom: "8px"}} className={cssButton.ButtonGroupStyle}
                            onChange={e => {
                                const newCategory = e.target.value;
                                setAdvancedFilterCategory(newCategory);

                                // Find first matching attribute in the new category
                                const attributesInCategory = Object.values(FilterAttributes).filter(attr => attr.category === newCategory);
                                const firstAttribute = attributesInCategory[0];

                                // Set new attribute and default value
                                setNewAdvancedFilter({
                                    ...newAdvancedFilter,
                                    attribute: firstAttribute,
                                    value: firstAttribute.defaultValue,
                                });
                            }}                        >
                            {
                                Object.values(FilterCategories).map((category, index) => {
                                    return (
                                        <option key={`category-${index}`}>
                                            {category}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className={cssButton.ButtonGroupStyle} style={{marginBottom: "8px"}}>
                        <select 
                            className={cssButton.ButtonGroupStyle}
                            value={newAdvancedFilter.attribute.key}
                            onChange={e => {
                                let newAttribute = FilterAttributes[e.target.value]
                                let newValue = newAdvancedFilter.value
                                if(newAttribute.category !== FilterCategories.MATCH_STATS ||
                                    newAttribute.getSubCategory(0) !== newAdvancedFilter.attribute.getSubCategory(0) ||
                                    isNaN(newAdvancedFilter.value)){
                                    newValue = newAttribute.defaultValue
                                }
                                setNewAdvancedFilter({...newAdvancedFilter, attribute : newAttribute, value: newValue});
                            }}
                        >
                        {   
                            Object.values(FilterAttributes).filter(attr => attr.category === advancedFilterCategory).map((attribute, index) =>
                                <option key={"attribute-option-"+index} value={attribute.key}>{attribute.label}</option>
                            )
                        }
                        </select>
                        {
                            [FilterCategories.MATCH_STATS, FilterCategories.CARD_STATS].includes(advancedFilterCategory) && (
                                <>
                                <button 
                                    className={cssButton.ButtonGroupStyle}
                                    style={{
                                        minWidth: 30
                                    }}
                                    onClick={() => 
                                        {
                                            const operators = Object.values(FilterOperators)
                                            const newIndex = (operators.indexOf(newAdvancedFilter.operator) + 1) % operators.length;
                                            setNewAdvancedFilter({...newAdvancedFilter, operator : operators[newIndex]});
                                        }
                                    }
                                >
                                    {newAdvancedFilter.operator}
                                </button>   
    
                                <input 
                                    {...filterInputDefaultProps}
                                    id="filter-value-input"
                                    className={cssButton.ButtonGroupStyle}
                                    value={decimalInput}
                                    style={{width: "45px", textAlign:"right", borderRight: "0px", paddingRight: "2px"}}
                                    onBlur={() => {setNewAdvancedFilter({...newAdvancedFilter, value: parseFloat(decimalInput) / newAdvancedFilter.attribute.factor})}}
                                    // onChange={e => setNewAdvancedFilter({...newAdvancedFilter, value : e.value})}>
                                    >
                                </input>
                                </>
                            )
                        }
                        {/* conditionally add a percent sign behind the input */}
                        {newAdvancedFilter.attribute.isPercent && (
                            <button
                                style={{borderLeft: "0px", paddingLeft: "2px"}}
                                onClick={()=> {
                                    let input = document.getElementById("filter-value-input");
                                    input.focus();
                                    input.select();
                                }}
                            >
                                %
                            </button>
                        )}
                        <button
                            onClick={() => 
                                {
                                    let newAdvancedFilters = [];
                                    if(filters.advanced) newAdvancedFilters.push(...filters.advanced);
                                    for(let i = 0; i <= newAdvancedFilters.length; i++){
                                        // console.log(i);
                                        if (i >= newAdvancedFilters.length) {
                                            newAdvancedFilters.push({...newAdvancedFilter})
                                            break;
                                        }
                                        let filter = newAdvancedFilters[i]
                                        if (newAdvancedFilter.attribute.key === filter.attribute.key && newAdvancedFilter.operator === filter.operator){
                                            filter.value = newAdvancedFilter.value
                                            break;
                                        }
                                    }
                                    setFilters({...filters, advanced: [...newAdvancedFilters]});
                                }
                                }
                        >
                            <FontAwesomeIcon icon = {faPlus}/>
                        </button>

                    </div>
                    <div>
                        <div style={{fontSize: "14px"}}>Active Filters:</div>
                        {(!filters.advanced || filters.advanced.length === 0) && <div style={{color: "#BBB"}}>None active</div>}
                        {filters.advanced && filters.advanced.map((options, index) => (
                                <div key={index}>
                                    <Tag 
                                        onRemove={() => {filters.advanced = filters.advanced.filter((_, i) => i !== index); setFilters({...filters, advanced: [...filters.advanced]})}}
                                    >
                                        {getFilterTagString(options)}
                                    </Tag>
                                </div>
                            )
                        )}
                    </div>

                </PopoverButton>

                {
                    (filters.advanced && filters.advanced.length !== 0) && filters.advanced.map((options, index) => (
                        <Tag key={index}
                            tagStyle={{margin: "-1px 1px", border: "1px solid black"}}
                            onRemove={() => {filters.advanced = filters.advanced.filter((_, i) => i !== index); setFilters({...filters, advanced: [...filters.advanced]})}}
                        >
                            {getFilterTagString(options)}
                        </Tag>
                        
                    )
                )}
            </div>

            <div className={cssButton.ButtonGroupStyle}>
                <PopoverButton
                    className={cssButton.ButtonInGroupStyle}
                    buttonContent={<><FontAwesomeIcon icon={faInfoCircle}/> <div style={{marginLeft: 3}}>Help</div></>}
                >
                    <div style={{margin: "0px 10px 10px 15px"}}>
                        <h2>Useful Information:</h2>
                        <li>
                            You can right click a filter button to select it exclusively.
                        </li>
                        <li>
                            You can choose different card stats in the second column!
                        </li>
                        {/* <br/> */}
                        <h4>Calculations:</h4>
                        <li>
                            The dominance score is calculated from a card's play- and winrate.<br/>
                            For <b>average</b> playrate and winrate, the score is 0. <br/>
                            It gets larger positive for <b>high</b> play- and winrates and negative for <b>low</b> play-/winrates.
                        </li>
                        <li>
                            The winrate average is weighted by the amount of matches played. <br/>
                            This way, cards with low playrate affect the result less and we should get a better <br/>
                            idea about the strength of the given selection of cards. 
                        </li>
                    </div>
                </PopoverButton>
            </div>

            
            {
                React.Children.map(children, (child, index) => (
                    <div className={cssButton.ButtonGroupStyle}>
                        {/* <div  className={cssButton.ButtonGroupStyle} key={index}>{child}</div> */}
                        {child}
                    </div>
                ))
            }
            

        </div>


        
    );
}

