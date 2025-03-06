import React, { useEffect, useState } from 'react';
import { ReactTable } from '../elo/react-table';
import { fetchGoogleSheetData } from './fetch-google-sheet-data';
import { clamp } from 'lodash';
import { API_KEY, SHEET_ID } from "./public-stats-config";
// import { color } from 'html2canvas';

export function PerkStatsTable()
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const range = 'Heroes';  //Sheet tab name

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

    
    // //calculate number of matches in 1v1 / 2v2 (needed for playrates)
    // const totalMatches1v1 = data.slice(1)
    //     .map((value) => value[2])
    //     .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
    //     )/10;

    // const totalMatches2v2 = data.slice(1)
    //     .map((value) => value[4])
    //     .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
    //     )/10;
    
    // const totalMatchesOverall = data.slice(1)
    //     .map((value) => value[6])
    //     .reduce((previousValue, currentValue,) => parseInt(previousValue) + parseInt(currentValue)
    //     )/10;
    
    // const cardAmount = data.length - 1

    function mixColors(rgb1, rgb2, percentage){
        percentage = clamp(percentage, 0, 1)
        let rgb = [0,0,0];
        for(let i = 0; i<3; i++){
            rgb[i] = rgb1[i]*(1-percentage) + rgb2[i]*percentage
        }
        return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    }

    function getCellColor(percent = 0.5){
        const rgb_base = [15,15,40]
        const rgb_low = [180,0,0]
        const rgb_high = [0,180,0]
        if (percent > 1 || percent < 0) {
            return mixColors(rgb_base,rgb_base,0);
        }
        if (percent > 0.5){
            const mixPercent = Math.pow(2*(percent-0.5), 0.6)
            return mixColors(rgb_base, rgb_high, mixPercent);
        }
        else {
            const mixPercent = Math.pow(1-2*percent, 0.6)
            return mixColors(rgb_base, rgb_low, mixPercent);
        }
    }
    

    const columns = data[data.length-1].map((title, n) => 
        ({
            accessor: (row, i) => row[n],
            Header: title,
            width: n == 0 ? 58 : 112,
            align: n == 1 ? "left" : "right",
            getCellProps: (cell) => {
                const color = n>2 ? getCellColor(cell.value) : getCellColor();
                return {
                    style: {
                        backgroundColor: color,
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
            data={data.slice(0, data.length-2)}
            sortBy={[{ id: "winrateTotal", desc: true }]}
            minTableHeight={450}
            />
        </div>
    )

};
