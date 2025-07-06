import React, { useEffect, useState } from 'react';
import { ReactTable } from '../elo/react-table';
import { fetchGoogleSheetData } from './fetch-google-sheet-data';
import { API_KEY, SHEET_ID } from "./public-stats-config";
import { getCellColorWinrate, getCellColorPlayrate, calculateAverage, calculateSum, calculateDominanceScore, getCardCount } from './stats-functions';
import cardData from "generated/jobCardProps.json";
import { TableFilterInput } from './filters/table-filter-input';
// import Tooltip from 'rc-tooltip';
import css from "./card-stats-table.module.scss"
import cssButton from "components/button.module.scss";
import { FilterAttributes, FilterCategories, FilterOperators } from './filters/advanced-filters-config';
import { CardTableAttributes } from './card-stats-config';
import { PopoverButton } from './filters/popover-button';
import ReverseIcon from 'components/reverse-icon';


export function CardStatsTable({showPlayrates = false})
{
    let [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // could add an option to hide/show footer rows, but average should be the most relevant
    const [visibleFooters, setVisibleFooters] = useState({
        average: true,
        median: false,
        effective: false
    });

    const attributeChoices = {
        CARD_ID: CardTableAttributes.iD,
        DOMINANCE_SCORE_1V1: CardTableAttributes.dominanceScore1v1,
        DOMINANCE_SCORE_2V2: CardTableAttributes.dominanceScore2v2,
        DOMINANCE_SCORE_OVERALL: CardTableAttributes.dominanceScoreOverall,
        MOVE_SPEED: CardTableAttributes.speed,
        HEALTH: CardTableAttributes.health,
        DPS: CardTableAttributes.dps,
        TOTAL_DPS: CardTableAttributes.totalDps,
    };


    const [selectedBonusAttribute, setSelectedBonusAttribute] = useState(attributeChoices.DOMINANCE_SCORE_OVERALL);

    function selectAttributeDropdown(){
        return(
            <>
                <div style={{marginBottom: "8px", fontSize: "14px"}}>Select Column Attribute:</div>
                <div className={cssButton.ButtonGroupStyle}>
                {
                    Object.entries(attributeChoices).map(([key, attribute]) => (
                        <button 
                            className={attribute === selectedBonusAttribute ? cssButton.isButtonActive : cssButton.ButtonInGroupStyle} 
                            key={key} 
                            value={attribute.key} 
                            onClick={(event) => {setSelectedBonusAttribute(CardTableAttributes[attribute.key]) }}
                            >
                                {attribute.title}
                        </button>
                    ))
                }
                </div>
            </>
        )
    }

    function selectAttributePopover(){
        return(
            <span style={{display: "inline"}}>

                {selectedBonusAttribute.title}
                {" "}
                <br/>
                <PopoverButton
                    buttonContent={<><ReverseIcon/> <span style={{fontSize: "12px", fontWeight: "normal"}}>select...</span></>}
                    className={cssButton.ButtonInlineStyle}
                    buttonStyle={{ minHeight: "0px" }}
                >
                    {selectAttributeDropdown()}
                </PopoverButton>

            </span>
        )
    }    

    useEffect(() => {
        const fetchData = async () => {
            const range = 'Cards';  //sheet tab name
            try {
                const data = await fetchGoogleSheetData(SHEET_ID, API_KEY, range);
                setData(data);
            } catch (error) {
                console.error('Network or Fetch Error:', error);
                setError(`Network error: ${error.message}`);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (data.length === 0) {
        return <p>No data found.</p>;
    }

    try {
        // data = data.map(([id, name, ...rest]) => [name, id, ...rest])
        
        const indexes = {
            cardName: 0,
            games1v1: 1,
            winrate1v1: 2,
            games2v2: 3,
            winrate2v2: 4,
            gamesOverall: 5,
            winrateOverall: 6,
        };

        const displayIndexes = {
            cardName: 0,
            cardID : 1,
            games1v1: 2,
            winrate1v1: 3,
            games2v2: 4,
            winrate2v2: 5,
            gamesOverall: 6,
            winrateOverall: 7,
            //new attributes
            playrate1v1: 8,
            playrate2v2: 9,
            playrateOverall: 10,
            dominanceScore1v1: 11,
            dominanceScore2v2: 12,
            dominanceScoreOverall: 13,
        }

        let preparedData = data.slice(1).map(row => 
            row.map(entry => {
                return isNaN(entry) ? entry : parseFloat(entry);
            })
        );
        // console.log(preparedData)

        //calculate total number of matches in 1v1 / 2v2 (needed for playrates)
        const totalMatches1v1 = calculateSum(preparedData.map(row => row[indexes.games1v1]))/10;
        const totalMatches2v2 = calculateSum(preparedData.map(row => row[indexes.games2v2]))/10;
        const totalMatchesOverall = calculateSum(preparedData.map(row => row[indexes.gamesOverall]))/10;
        if (totalMatchesOverall !== totalMatches1v1 + totalMatches2v2) console.log("Error in total match counts!");

        let totalMatches = {}
        totalMatches[indexes.games1v1] = totalMatches1v1;
        totalMatches[indexes.games2v2] = totalMatches2v2;
        totalMatches[indexes.gamesOverall] = totalMatchesOverall;
        
        const numberOfCards = data.length - 1
        const averagePlayRate = 10/numberOfCards
        
        const cardMap = new Map(cardData.map(card => {
            let {iD, ...props} = card;
            return [iD, {iD, ...props}];
        }))

        let nameToID = new Map(cardData.map(card => {
            let {name, iD, ...props} = card;
            return [name.replaceAll('"', ''), iD];
        }))

        let cardList = preparedData.map(row => {
            const parsedRow = row.map(entry => {
                let entryString = String(entry)
                if (!isNaN(entry)) return parseFloat(entry);
                else{
                    if(entryString.endsWith("%")) return parseFloat(entry)/100
                    else return entry
                }
            });
            const cardName = parsedRow[indexes.cardName];
        
            const cardID = nameToID.get(cardName);
            if (cardID === undefined){
                console.error(`No ID mapping for card name '${cardName}' was found.`)
            }

            let cardProps = cardMap.get(cardID)
            let matchStats = {};

            matchStats.games1v1 = parsedRow[indexes.games1v1];
            matchStats.winrate1v1 = parsedRow[indexes.winrate1v1];
            matchStats.games2v2 = parsedRow[indexes.games2v2];
            matchStats.winrate2v2 = parsedRow[indexes.winrate2v2];
            matchStats.gamesOverall = parsedRow[indexes.gamesOverall];
            matchStats.winrateOverall = parsedRow[indexes.winrateOverall];
            matchStats.playrate1v1 = matchStats.games1v1 / totalMatches1v1;
            matchStats.playrate2v2 = matchStats.games2v2 / totalMatches2v2;
            matchStats.playrateOverall = matchStats.gamesOverall / totalMatchesOverall;
        
            matchStats.dominanceScore1v1 = calculateDominanceScore(matchStats.games1v1, totalMatches1v1, matchStats.winrate1v1, numberOfCards);
            matchStats.dominanceScore2v2 = calculateDominanceScore(matchStats.games2v2, totalMatches2v2, matchStats.winrate2v2, numberOfCards);
            matchStats.dominanceScoreOverall = calculateDominanceScore(matchStats.gamesOverall, totalMatchesOverall, matchStats.winrateOverall, numberOfCards);

            cardProps.matchStats = matchStats

            cardMap.set(cardID, cardProps);

            return cardProps;
        });

        // console.log(cardMap)

        const filteredCardList = cardList.filter(card => {
            //implement filter functionality here
            if (Object.keys(filters).length === 0) return true
            // console.log(cardID);
            let include = true;

            include = checkFilters(filters.faction, card.faction) && 
                checkFilters(filters.mana, card.manacost) &&
                checkFilters(filters.type, card.type) &&
                checkFilters(filters.count, card.count, (count) => count >= 5 ? "5 +" : count) &&
                checkFilters(filters.attackType, card.attackType) &&
                checkFilters(filters.attackTargets, card.targets) &&
                checkFilters(filters.rarity, card.rarity) &&
                checkIncludeFilter(filters.isAoe, card.isAOE) &&
                (filters.text === "" || card.name.toLowerCase().includes(filters.text.toLowerCase())) &&
                checkAdvancedFilters(filters.advanced, card);
            include = filters.inverted ? !include : include;
            return include
        });
        
        // checks if the card is included by the given filters. 
        // propFunction translates the card property value to the filter string if necessary
        function checkFilters(filtersObject, cardProp, propFunction = x => x){
            const entries = Object.entries(filtersObject);
            return entries.every(([prop, isActive]) => !isActive) ? 
                true :
                entries.filter(([prop, isActive]) => isActive).map(([prop, isActive]) => prop).includes(""+propFunction(cardProp));
        }

        function checkAdvancedFilters(filters, card){
            // console.log(filters)
            if (!filters || filters.length === 0) return true;
            return filters.every(options => {
                let {attribute, operator, value} = options;
                value = parseFloat(value);
                const compare = (a, b) => {
                    switch(operator){
                        case FilterOperators.GREATER_EQ:
                            return a >= b;
                        case FilterOperators.LESS_EQ:
                            return a <= b;
                        default:
                            return false
                    }
                }
                if (attribute.key in FilterAttributes)
                    switch(attribute.category){
                        case FilterCategories.MATCH_STATS:
                            return compare(card.matchStats[attribute.key], value);
                        case FilterCategories.CARD_STATS:
                            return compare(card[attribute.key], value);
                        case FilterCategories.KEYWORDS:
                            return (card.keywords && card.keywords.includes(attribute.key));
                        case FilterCategories.UNITS:
                            return (card.unitNames && card.unitNames.includes(attribute.key));
                        default:
                            console.error(`Unknown advanced filter category: ${attribute.category}`)
                }
                else                     
                {
                    console.error(`Attribute ${attribute.key} not found for advanced filtering!`);
                    return false;
                }
            });
        }

        function checkIncludeFilter(filterValue, cardProp){
            switch (filterValue){
                case 0:
                    return true;
                case 1:
                    return cardProp;
                case 2:
                    return !cardProp;
                default:
                    return true;
            }
        }

        // let extraRow = new Array(Object.keys(displayIndexes).length).fill(0);
        // extraRow[displayIndexes.games1v1] = round(calculateEffectiveCardNumber(preparedData, displayIndexes.games1v1), 1);
        // extraRow[displayIndexes.games2v2] = round(calculateEffectiveCardNumber(preparedData, displayIndexes.games2v2), 1);
        // extraRow[displayIndexes.gamesOverall] = round(calculateEffectiveCardNumber(preparedData, displayIndexes.gamesOverall), 1);

        const Attributes = CardTableAttributes;
        const displayedAttributes = [
            Attributes.name, 
            selectedBonusAttribute,
            showPlayrates? Attributes.playrate1v1 : Attributes.games1v1, 
            Attributes.winrate1v1,
            showPlayrates? Attributes.playrate2v2 : Attributes.games2v2,
            Attributes.winrate2v2,
            showPlayrates? Attributes.playrateOverall : Attributes.gamesOverall,
            Attributes.winrateOverall
        ]

        displayedAttributes.forEach(attribute => attribute.initialize(cardList));

        const dataRows = filteredCardList.map(card => {
            let rowValues = displayedAttributes.map(attribute => {
                return {
                    value: attribute.getValue(card),
                    formattedValue: attribute.getFormattedValue(card),
                }
            })
            return rowValues
        })

        const averageRow = displayedAttributes.map(attribute => attribute.getAverage(filteredCardList));


        const footerRows = [];
        if (visibleFooters.average) footerRows.push(averageRow);
        // if (visibleFooters.median) footerRowValues.push(["Median", medianRow]);
        // if (visibleFooters.effective) footerRowValues.push(["Effective # of Cards", extraRow]);

        const columns = displayedAttributes.map((attribute, n) => 
        {

            return {
                id: `col-${n}`,
                accessor: (row, i) => row[n].formattedValue,
                Header: n === displayIndexes.cardID ? selectAttributePopover : attribute.title,
                Footer: footerRows.map(row => attribute.formatFooterValue(row[n])),//footerRow[n],//(averageRow[n]*100).toFixed(2) +" %",
                // Footer: footerRow[n],
                width: n === displayIndexes.cardName ? 225 : 120,
                align: n === displayIndexes.cardName ? "left" : "right",
                getFooterColor: (rowIndex) => attribute.getFooterColor(footerRows[rowIndex][n]),
                footerAlign: n === displayIndexes.cardName ? "left" : "right",
                getCellProps: (cell) => {
                    // console.log(cell.column)
                    const value = cell.row.original[n].value
                    return {
                        style: {
                            backgroundColor: attribute.getCellColor(value)
                            // color: color,
                            // fontWeight: "bold"
                        },
                    };
                },

            }
        });

        const additionalElements = []

        return (
            <>
                <TableFilterInput
                filters = {filters}
                setFilters = {setFilters}
                searchHint={`${filteredCardList.length} records...`}
                >
                    {additionalElements}
                </TableFilterInput>
                <ReactTable
                columns={columns}
                data={dataRows}
                showGlobalFilter={false}
                sortBy={[{ id: "col-7", desc: true }]}
                minTableHeight={450}
                />
            </>
        )
    }
    catch (error) {
        console.error(error);
        return <p style={{ color: 'yellow' }}> Failed to load data correctly. </p>;
    }
};