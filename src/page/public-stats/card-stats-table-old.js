import React, { useEffect, useState } from 'react';
import { ReactTable } from '../elo/react-table';
import { fetchGoogleSheetData } from './fetch-google-sheet-data';
import { API_KEY, SHEET_ID } from "./public-stats-config";
import { getCellColorWinrate, getCellColorPlayrate, calculateAverage, calculateSum, calculateDominanceScore } from './stats-functions';
import cardData from "generated/jobCardProps.json";
import { TableFilterInput } from './filters/table-filter-input';
// import Tooltip from 'rc-tooltip';
import css from "./card-stats-table.module.scss"
import cssButton from "components/button.module.scss";
import { FilterAttributes, FilterCategories, FilterOperators } from './filters/advanced-filters-config';
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
        CARD_ID: "card ID",
        DOMINANCE_SCORE_1V1: "Dominance Score 1v1",
        DOMINANCE_SCORE_2V2: "Dominance Score 2v2",
        DOMINANCE_SCORE_OVERALL: "Dominance Score Overall",
        MOVE_SPEED: "Move Speed",
        HEALTH: "Health",
        TOTAL_DPS: "Total Dps",
    };


    const [selectedBonusAttribute, setSelectedBonusAttribute] = useState(attributeChoices.CARD_ID);

    function selectAttributeDropdown(){
        return(
            <>
                <div style={{marginBottom: "8px", fontSize: "14px"}}>Select Column Attribute:</div>
                <div className={cssButton.ButtonGroupStyle}>
                {
                    Object.entries(attributeChoices).map(([key, value]) => (
                        <button 
                            className={value === selectedBonusAttribute ? cssButton.isButtonActive : cssButton.ButtonInGroupStyle} 
                            key={key} 
                            value={value} 
                            onClick={(event) => setSelectedBonusAttribute(event.target.value)}
                            >
                                {value}
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

                {selectedBonusAttribute}
                {" "}
                <PopoverButton
                    buttonContent={<ReverseIcon/>}
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
        };


        let preparedData = data.slice(0,-1).map(row => 
            row.map(entry => {
                return isNaN(entry) ? entry : parseFloat(entry);
            })
        );

        //calculate total number of matches in 1v1 / 2v2 (needed for playrates)
        const totalMatches1v1 = calculateSum(preparedData, indexes.games1v1)/10;
        const totalMatches2v2 = calculateSum(preparedData, indexes.games2v2)/10;
        const totalMatchesOverall = calculateSum(preparedData, indexes.gamesOverall)/10;
        if (totalMatchesOverall !== totalMatches1v1 + totalMatches2v2) console.log("Error in total match counts!");

        let totalMatches = {}
        totalMatches[indexes.games1v1] = totalMatches1v1;
        totalMatches[indexes.games2v2] = totalMatches2v2;
        totalMatches[indexes.gamesOverall] = totalMatchesOverall;
        
        const numberOfCards = data.length - 1
        const averagePlayRate = 10/numberOfCards
        
        const cardMap = new Map(cardData.map(card => {
            let {iD, ...props} = card;
            return [iD, props]
        }))

        let cardStatsMap = new Map();

        preparedData = preparedData.map(row => {
            const parsedRow = row.map(entry => isNaN(entry) ? entry : parseFloat(entry));
            console.log(parsedRow)
            const cardID = parsedRow[indexes.cardID]
            let cardProps = cardMap.get(cardID)
            let matchStats = {};

            const games1v1 = parsedRow[indexes.games1v1];
            const winrate1v1 = parsedRow[indexes.winrate1v1];
            const games2v2 = parsedRow[indexes.games2v2];
            const winrate2v2 = parsedRow[indexes.winrate2v2];
            const gamesOverall = parsedRow[indexes.gamesOverall];
            const winrateOverall = parsedRow[indexes.winrateOverall];
        
            const playrate1v1 = games1v1 / totalMatches1v1;
            const playrate2v2 = games2v2 / totalMatches2v2;
            const playrateOverall = gamesOverall / totalMatchesOverall;
        
            const dominanceScore1v1 = calculateDominanceScore(games1v1, totalMatches1v1, winrate1v1, numberOfCards);
            const dominanceScore2v2 = calculateDominanceScore(games2v2, totalMatches2v2, winrate2v2, numberOfCards);
            const dominanceScoreOverall = calculateDominanceScore(gamesOverall, totalMatchesOverall, winrateOverall, numberOfCards);

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

            cardStatsMap.set(cardID, cardProps);

            return [
                parsedRow[indexes.cardName],
                parsedRow[indexes.cardID],
                games1v1,
                winrate1v1,
                games2v2,
                winrate2v2,
                gamesOverall,
                winrateOverall,
                playrate1v1,
                playrate2v2,
                playrateOverall,
                dominanceScore1v1,
                dominanceScore2v2,
                dominanceScoreOverall,
            ];
        });

        // console.log(cardStatsMap.get(0));
        // preparedData = preparedData.map(row => {
        //     let prop = -1;
        //     let id = parseInt(row[indexes.cardID])
        //     if (cardMap.has(id)) {
        //         prop = cardMap.get(id).name;
        //         // prop = id;
        //     }
        //     return [prop , ...row.slice(1)] 
        // });

        const filteredData = preparedData.filter(row => {
            //implement filter functionality here
            if (Object.keys(filters).length === 0) return true
            let id = parseInt(row[indexes.cardID])
            let include = true;
            if (cardMap.has(id)) {
                let card = cardMap.get(id);
                include = checkFilters(filters.faction, card.faction) && 
                    checkFilters(filters.mana, card.manacost) &&
                    checkFilters(filters.type, card.type) &&
                    checkFilters(filters.count, card.count, (count) => count >= 5 ? "5 +" : count) &&
                    checkFilters(filters.attackType, card.attackType) &&
                    checkFilters(filters.attackTargets, card.targets) &&
                    checkFilters(filters.rarity, card.rarity) &&
                    checkIncludeFilter(filters.isAoe, card.isAOE) &&
                    (filters.text === "" || card.name.toLowerCase().includes(filters.text.toLowerCase())) &&
                    checkAdvancedFilters(filters.advanced, id, row);
                include = filters.inverted ? !include : include;
                return include
            }
            console.log("Card ID " + id + " not found.")
            return true
        });
        
        // checks if the card is included by the given filters. 
        // propFunction translates the card property value to the filter string if necessary
        function checkFilters(filtersObject, cardProp, propFunction = x => x){
            const entries = Object.entries(filtersObject);
            return entries.every(([prop, isActive]) => !isActive) ? 
                true :
                entries.filter(([prop, isActive]) => isActive).map(([prop, isActive]) => prop).includes(""+propFunction(cardProp));
        }

        function checkAdvancedFilters(filters, cardID, row){
            // console.log(filters)
            const card = cardStatsMap.get(cardID)
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
        
        const filteredCount = filteredData.length;

        let medianRow = new Array(Object.keys(indexes).length).fill(0);

        if (filteredCount > 0) {
            let sortedData = filteredData.map(x => x)   //copy the Array, to not change the order of filteredData when sorting
            medianRow = Object.values(indexes).map(index => {
                sortedData = sortedData.sort((rowA, rowB) => rowA[index] - rowB[index]);
                const length = sortedData.length
                
                return (sortedData[Math.floor(length/2)][index] + sortedData[Math.floor((length-1)/2)][index])/2;
            })      
        }

        let averageRow = new Array(Object.keys(indexes).length).fill(0);
        averageRow[indexes.games1v1] = calculateAverage(filteredData, indexes.games1v1);
        averageRow[indexes.games2v2] = calculateAverage(filteredData, indexes.games2v2);
        averageRow[indexes.gamesOverall] = calculateAverage(filteredData, indexes.gamesOverall);
        averageRow[indexes.winrate1v1] = calculateAverage(filteredData, indexes.winrate1v1, indexes.games1v1);
        averageRow[indexes.winrate2v2] = calculateAverage(filteredData, indexes.winrate2v2, indexes.games2v2);
        averageRow[indexes.winrateOverall] = calculateAverage(filteredData, indexes.winrateOverall, indexes.gamesOverall);

        // averageRow[indexes.winrate1v1] = calculateAverage(filteredData, indexes.winrate1v1);
        // averageRow[indexes.winrate2v2] = calculateAverage(filteredData, indexes.winrate2v2);
        // averageRow[indexes.winrateOverall] = calculateAverage(filteredData, indexes.winrateOverall);


        function calculateEffectiveCardNumber(data, index){
            return data.reduce((previousValue, row) => {
                const matches = row[index];
                return previousValue + ((matches/(10*totalMatches[index]))**2);
            }, 0)**-1
        }

        function round(value, digits){
            return Math.round(value*10**digits)/10**digits
        }

        let extraRow = new Array(Object.keys(indexes).length).fill(0);
        extraRow[indexes.games1v1] = round(calculateEffectiveCardNumber(preparedData, indexes.games1v1), 1);
        extraRow[indexes.games2v2] = round(calculateEffectiveCardNumber(preparedData, indexes.games2v2), 1);
        extraRow[indexes.gamesOverall] = round(calculateEffectiveCardNumber(preparedData, indexes.gamesOverall), 1);


        const getFormattedFooterRow = (footerValues, rowTitle, rowFormat = ROW_FORMATS.PlayrateWinrate) => footerValues.map((value, index) => {
            const FORMATS = {
                PLAYRATE: 0,
                WINRATE: 1,
                TITLE: 2,
                SIMPLE: 3,
            }

            let format = index === 0 ? FORMATS.TITLE : FORMATS.SIMPLE;
            switch (rowFormat) {
                case ROW_FORMATS.PlayrateWinrate:
                    switch (index){
                        case indexes.games1v1:
                        case indexes.games2v2:
                        case indexes.gamesOverall:
                            format = FORMATS.PLAYRATE;
                            break;
                        case indexes.winrate1v1:
                        case indexes.winrate2v2:
                        case indexes.winrateOverall:
                            format = FORMATS.WINRATE;
                            break;
                        default: break;
                    }
                    break;
                default: break;
            }

            switch (format){
                case FORMATS.PLAYRATE:
                    if (!showPlayrates) return value.toFixed(0);
                    return (value*100/totalMatches[index]).toFixed(2) + " %";
                case FORMATS.WINRATE:
                    return (value*100).toFixed(1) + " %";
                case FORMATS.TITLE:
                    return rowTitle;     
                default:
                    return value === 0 ? "- - -" : value
            }
        })

        const processedData = filteredData.map(row => {
            const newRow = [...row]; // copy the row to avoid mutating
            const id = parseInt(row[indexes.cardID]);
            newRow[indexes.cardName] = cardMap.get(id).name;
            newRow[indexes.cardID] = getBonusAttribute(row, selectedBonusAttribute)
            // newRow[indexes.winrate1v1] = (row[indexes.winrate1v1] * 100).toFixed(0) + " %";
            // newRow[indexes.winrate2v2] = (row[indexes.winrate2v2] * 100).toFixed(0) + " %";
            // newRow[indexes.winrateOverall] = (row[indexes.winrateOverall] * 100).toFixed(0) + " %";
            if (showPlayrates) {
                newRow[indexes.games1v1] = (row[indexes.games1v1] / totalMatches1v1 * 100).toFixed(1) + " %";
                newRow[indexes.games2v2] = (row[indexes.games2v2] / totalMatches2v2 * 100).toFixed(1) + " %";
                newRow[indexes.gamesOverall] = (row[indexes.gamesOverall] / totalMatchesOverall * 100).toFixed(1) + " %";
            }
            return newRow;
        });

        const ROW_FORMATS = {
            PlayrateWinrate: 0,
            Simple: 1
        }

        function getBonusAttribute(row, attribute){
            const card = cardMap.get(row[indexes.cardID]);
            switch (attribute){
                case attributeChoices.CARD_ID:
                    return row[indexes.cardID]
                case attributeChoices.DOMINANCE_SCORE_1V1:
                    return calculateDominanceScore(row[indexes.games1v1], totalMatches1v1, row[indexes.winrate1v1], numberOfCards).toFixed(2)
                case attributeChoices.DOMINANCE_SCORE_2V2:
                    return calculateDominanceScore(row[indexes.games2v2], totalMatches2v2, row[indexes.winrate2v2], numberOfCards).toFixed(2)
                case attributeChoices.DOMINANCE_SCORE_OVERALL:
                    return calculateDominanceScore(row[indexes.gamesOverall], totalMatchesOverall, row[indexes.winrateOverall], numberOfCards).toFixed(2)
                case attributeChoices.MOVE_SPEED:
                    let speed = card.speed;
                    if (Array.isArray(speed)) speed = speed[0];
                    return speed ? speed : 0;
                case attributeChoices.HEALTH:
                    let health = card.health;
                    return health ? health : "-";
                case attributeChoices.TOTAL_DPS:
                    let totalDps = card.totalDps;
                    return totalDps ? totalDps : "-";
                default:
                    return row[indexes.cardID]
            }
        }

        function getCellColor(value = undefined, n = -1, showPlayrates = false, contrastFactor = 1){
            let color;
            switch (n){
                case indexes.winrate1v1:
                case indexes.winrate2v2:
                case indexes.winrateOverall:
                    let winrate = value;
                    if (String(winrate).endsWith("%")) winrate = parseFloat(value)/100;
                    color = getCellColorWinrate(winrate, contrastFactor);
                    break;
                case indexes.games1v1:
                case indexes.games2v2:
                case indexes.gamesOverall:
                    // calculate relative deviation from average playrate to color cells accordingly
                    if (showPlayrates){
                        let deviation = parseFloat(value)/(100*averagePlayRate)
                        color = getCellColorPlayrate(deviation, contrastFactor);
                    }
                    else {
                        let deviation = n === indexes.games1v1 ? value/totalMatches1v1 : 
                            n === indexes.games2v2 ? value/totalMatches2v2 :
                            value/totalMatchesOverall;
                        deviation = deviation/averagePlayRate;
                        color = getCellColorPlayrate(deviation, contrastFactor);
                    }
                    break;
                default:
                    color = getCellColorWinrate();
            }
            return color;  
        }

        const footerRowValues = [];
        if (visibleFooters.average) footerRowValues.push(["(Weighted) Average", averageRow, ROW_FORMATS.PlayrateWinrate]);
        if (visibleFooters.median) footerRowValues.push(["Median", medianRow, ROW_FORMATS.PlayrateWinrate]);
        if (visibleFooters.effective) footerRowValues.push(["Effective # of Cards", extraRow, ROW_FORMATS.Simple]);

        const footerRows = footerRowValues.map(([title, row, rowFormat]) => getFormattedFooterRow(row, title, rowFormat))

        const columns = data[data.length-1].map((title, n) => 
        {   

            const getFooterColor = (rowIndex) => {
                const rowData = footerRowValues[rowIndex];
                switch (rowData[2]){
                    case ROW_FORMATS.PlayrateWinrate:
                        return getCellColor(rowData[1][n].toFixed(3), n, false, 1.5);
                    case ROW_FORMATS.Simple:
                        return getCellColor()
                    default:
                        return
                }   
            }
            return {  
                id: `col-${n}`,
                accessor: (row, i) => row[n],
                Header: n === indexes.cardID ? selectAttributePopover : title,
                Footer: footerRows.map(row => row[n]),//footerRow[n],//(averageRow[n]*100).toFixed(2) +" %",
                // Footer: footerRow[n],
                width: n === indexes.cardName ? 225 : 120,
                align: n === indexes.cardName ? "left" : "right",
                getFooterColor,
                footerAlign: n === indexes.cardName ? "left" : "right",
                getCellProps: (cell) => {
                    return {
                        style: {
                            backgroundColor: getCellColor(cell.value, n, showPlayrates),
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
                searchHint={`${filteredData.length} records...`}
                >
                    {additionalElements}
                </TableFilterInput>
                <ReactTable
                columns={columns}
                data={processedData}
                showGlobalFilter={false}
                sortBy={[{ id: "winrateTotal", desc: true }]}
                minTableHeight={450}
                />
            </>
        )
    }
    catch{
        return <p style={{ color: 'yellow' }}> 
            Failed to load data correctly. 
            The format of the google sheet might have changed. 
        </p>;
    }
};