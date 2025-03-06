import React, { useEffect, useState } from 'react';
import { ReactTable } from '../elo/react-table';
import { fetchGoogleSheetData, fetchSheetMetaData } from './fetch-google-sheet-data';
import { API_KEY, SHEET_ID } from "./public-stats-config";
import { getCellColorWinrate, getCellColorPlayrate } from './stats-functions';
// import { color } from 'html2canvas';

export function CardStatsTable({showPlayrates = false})
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    
    //calculate number of matches in 1v1 / 2v2 (needed for playrates)
    const indexes = {
        cardID : 0,
        cardName: 1,
        games1v1: 2,
        winrate1v1: 3,
        games2v2: 4,
        winrate2v2: 5,
        gamesOverall: 6,
        winrateOverall: 7,
    }

    const totalMatches1v1 = data.slice(1)
        .map((value) => value[indexes.games1v1])
        .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
        )/10;

    const totalMatches2v2 = data.slice(1)
        .map((value) => value[indexes.games2v2])
        .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
        )/10;
    
    const totalMatchesOverall = data.slice(1)
        .map((value) => value[indexes.gamesOverall])
        .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
        )/10;
    
    const numberOfCards = data.length - 1
    const averagePlayRate = 10/numberOfCards
    


    const processedData = data.slice(1).map(row => {
        const newRow = [...row]; // copy the row to avoid mutating
        if (showPlayrates) {
            newRow[indexes.games1v1] = (row[indexes.games1v1] / totalMatches1v1 * 100).toFixed(1) + " %";
            newRow[indexes.games2v2] = (row[indexes.games2v2] / totalMatches2v2 * 100).toFixed(1) + " %";
            newRow[indexes.gamesOverall] = (row[indexes.gamesOverall] / totalMatchesOverall * 100).toFixed(1) + " %";
        }
        return newRow;
    });
    
    const columns = data[0].map((title, n) => 
        ({
            accessor: (row, i) => row[n],
            Header: title,
            width: n == indexes.cardName ? 225 : 120,
            align: n == indexes.cardName ? "left" : "right",
            getCellProps: (cell) => {
                let bgColor = ""
                switch (n){
                    case indexes.winrate1v1:
                    case indexes.winrate2v2:
                    case indexes.winrateOverall:
                        bgColor = getCellColorWinrate(cell.value);
                        break;
                    case indexes.games1v1:
                    case indexes.games2v2:
                    case indexes.gamesOverall:
                        // calculate relative deviation from average playrate to color cells accordingly
                        if (showPlayrates){
                            let deviation = parseFloat(cell.value)/(100*averagePlayRate)
                            bgColor = getCellColorPlayrate(deviation);
                        }
                        else {
                            let deviation = n == indexes.games1v1 ? cell.value/totalMatches1v1 : 
                                n == indexes.games2v2 ? cell.value/totalMatches2v2 :
                                cell.value/totalMatchesOverall;
                            deviation =  deviation/averagePlayRate;
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
            data={processedData}
            sortBy={[{ id: "winrateTotal", desc: true }]}
            minTableHeight={520}
            />
        </div>
    )

};
