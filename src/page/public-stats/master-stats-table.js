import React, { useEffect, useState } from 'react';
import { ReactTable } from '../elo/react-table';
import { fetchGoogleSheetData } from './fetch-google-sheet-data';
import { API_KEY, SHEET_ID } from "./public-stats-config";
import { getCellColorWinrate, getCellColorPlayrate } from './stats-functions';
import { isString } from 'lodash';
import { round } from './stats-functions';
// import { color } from 'html2canvas';

export function MasterStatsTable({showPlayrates = false})
{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const range = 'Masters';  //Sheet tab name

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
        // exclude master id columns (by index)
        let preparedData = data.slice(1).map((row) => row.map((value) => {
            if (!isNaN(value)) return parseFloat(value)
            else if(isString(value) && value.endsWith("%")) return parseFloat(value)/100;
            return value
        }));
        const indexes = {
            masterTitle : 0,
            games1v1: 1,
            winrate1v1: 2,
            games2v2Solo: 3,
            winrate2v2Solo: 4,
            games2v2Team: 5,
            winrate2v2Team: 6,
            gamesOverall: 7,
            winrateOverall: 8
        }

        const numberOfMasters = preparedData.length - 1
        const averagePlayRate = 1/numberOfMasters

        //calculate number of matches in 1v1 / 2v2 (needed for playrates)
        const totalMatches1v1 = preparedData.map((value) => value[indexes.games1v1])
            .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
            );
        
        const totalMatches2v2Solo = preparedData.map((value) => value[indexes.games2v2Solo])
            .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
            );
        
        const totalMatches2v2Team = preparedData.map((value) => value[indexes.games2v2Team])
            .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
            );

        const totalMatchesOverall = preparedData.map((value) => value[indexes.gamesOverall])
            .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
            );

        preparedData = preparedData.map(row => row.map((value) => {
            const formattedValue = value
            return {value, formattedValue}
        }));

        preparedData.forEach(row => {
            [indexes.winrate1v1, indexes.winrate2v2Solo, indexes.winrate2v2Team, indexes.winrateOverall].forEach(index =>{
                row[index].formattedValue = round(row[index].value * 100, 0) + " %"
            })
        })

        if (showPlayrates){
            preparedData.map((row) => {
                row[indexes.games1v1].formattedValue = (row[indexes.games1v1].value/totalMatches1v1*100).toFixed(1) + " %"
                row[indexes.games2v2Solo].formattedValue = (row[indexes.games2v2Solo].value/totalMatches2v2Solo*100).toFixed(1) + " %"
                row[indexes.games2v2Team].formattedValue = (row[indexes.games2v2Team].value/totalMatches2v2Team*100).toFixed(1) + " %"
                row[indexes.gamesOverall].formattedValue = (row[indexes.gamesOverall].value/totalMatchesOverall*100).toFixed(1) + " %"
            })
        }

        const columns = data[0].map((title, n) => 
            ({ 
                id: n,
                accessor: (row, i) => row[n].formattedValue,
                Header: title,
                width: n == 0 ? 105 : n >= 6 ? 128 : 115,
                align: n == 0 ? "left" : "right",
                getCellProps: (cell) => {
                    let bgColor = ""
                    switch (n){
                        case indexes.winrate1v1:
                        case indexes.winrate2v2Solo:
                        case indexes.winrate2v2Team:
                        case indexes.winrateOverall:
                            bgColor = getCellColorWinrate(cell.row.original[n].value);
                            break;
                        case indexes.games1v1:
                        case indexes.games2v2Solo:
                        case indexes.games2v2Team:
                        case indexes.gamesOverall:
                            // calculate relative deviation from average playrate, then color cells accordingly
                            if (showPlayrates){
                                let deviation = parseFloat(cell.value)/(100*averagePlayRate)
                                bgColor = getCellColorPlayrate(deviation);
                            }
                            else {
                                let deviation = 1
                                let playRate = 0
                                switch (n){
                                    case indexes.games1v1:
                                        playRate = parseFloat(cell.value)/totalMatches1v1;
                                        break;
                                    case indexes.games2v2Solo:
                                        playRate = cell.value/totalMatches2v2Solo;
                                        break;
                                    case indexes.games2v2Team:
                                        playRate = cell.value/totalMatches2v2Team;
                                        break;
                                    case indexes.gamesOverall:
                                        playRate = cell.value/totalMatchesOverall;
                                        break;
                                }
                                deviation = playRate/averagePlayRate;
                                bgColor = getCellColorPlayrate(deviation);
                            }
                            break;
                        default:
                            bgColor = getCellColorWinrate();
                    }
                    return {
                        style: {
                            backgroundColor: bgColor,
                            // color: color,    
                            // fontWeight: "bold"
                        },
                    };
                },
                
            })
        )

        return (
            <div>
                <ReactTable
                columns={columns}
                data={preparedData}
                sortBy={[{ id: indexes.winrateOverall, desc: true }]}
                minTableHeight={490}
                showGlobalFilter = {false}
                // hiddenColumns={["heroId"]}
                />
            </div>
        )
    }
    catch{
        return <p style={{ color: 'yellow' }}> Failed to load data correctly. The format of the data might have changed. </p>;
    }

};
