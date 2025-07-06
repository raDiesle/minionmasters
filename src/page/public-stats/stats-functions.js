import { clamp } from "lodash";
import cardData from "generated/jobCardProps.json";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from "axios"

const STATS_ROOT_PATH = ""
const SEASON_DATA_FILENAME = "seasonData.json"

const seasonDates = [
    new Date(0),
    new Date("2025-02-22T10:00Z"),
    new Date("2025-03-22T10:00Z"),
    new Date("2025-04-26T10:00Z"),
    new Date("2025-05-24T10:00Z"),
    new Date("2025-06-23T10:00Z"),
]

/**
 * @param {import('@google-cloud/storage').Bucket} bucket
*/
export async function addSeasonStartDate(startDate = new Date(), bucket){
    const requestHeader = { gzip: true, contentType: "application/json" };
    try{
        const dataResponse = await bucket.file(`${STATS_ROOT_PATH}${SEASON_DATA_FILENAME}`).download();
        /** @type {Array} */
        let seasonData = JSON.parse(dataResponse)
        
        if (!seasonData) seasonData = [];
        seasonData.push(startDate);
        // if (seasonData.length > 12) seasonData.shift();
        await bucket.file(`${STATS_ROOT_PATH}seasonData.json`).save(seasonData, requestHeader);
    }
    catch(e){
        console.log("Saving new date to seasonData.json failed:", e);
    }
}

export async function getSeasonDates(){
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, `${STATS_ROOT_PATH}${SEASON_DATA_FILENAME}`));
    
    
    const { data } = await axios.get(url);
    /** @type {Array} */
    let seasonDates = data;
    seasonDates = seasonDates.map(dateString => new Date(dateString));
    return seasonDates
}

export function getSeasonStartDate(date = new Date(), startDates = seasonDates){
    // last Saturday of a month - does not match the actual schedule
    // const seasonStartDate = new Date(date)
    // seasonStartDate.setHours(10,0,0,0)      // 
    // seasonStartDate.setDate(date.getDate() + (6 - date.getDay()));  //next Saturday
    // seasonStartDate.setDate(seasonStartDate.getDate() - 7*Math.ceil(seasonStartDate.getDate()/7))   //go back full weeks to previous month (last saturday of month)
    
    // the plan is to detect season start dates by elo reset
    let seasonStartDate = startDates[0];
    for (let sDate of startDates) {
        if (sDate < date) seasonStartDate = sDate;
    }
    return seasonStartDate
}

export function eloResetCount(oldElo, newElo){
    while(oldElo > newElo){
        oldElo = undefined;
    }
}

export function timeDifferenceInDays(date1, date2){
    const day_ms = 1000*60*60*24;
    return Math.floor((date2.getTime() - date1.getTime())/day_ms);
}

export function mixColors(rgb1, rgb2, percentage){
    percentage = clamp(percentage, 0, 1)
    let rgb = [0,0,0];
    for(let i = 0; i<3; i++){
        rgb[i] = rgb1[i]*(1-percentage) + rgb2[i]*percentage
    }
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}

export function getCellColorWinrate(percent = 0.5, contrastFactor = 1){
    const exp = 0.6 / contrastFactor;
    const rgb_base = [14,14,60]; 
    const rgb_low = [185,0,0];
    const rgb_high = [0,185,0];
    if (percent > 1 || percent < 0) {
        return mixColors(rgb_base,rgb_base,0);
    }
    if (percent > 0.5){
        const mixPercent = Math.pow(2*(percent-0.5), exp)
        return mixColors(rgb_base, rgb_high, mixPercent);
    }
    else {
        const mixPercent = Math.pow(1-2*percent, exp)
        return mixColors(rgb_base, rgb_low, mixPercent);
    }
}

export function getCellColorPlayrate(deviation = 1, contrastFactor = 1){
    const exp = 0.5 * contrastFactor;
    const rgb_base = [14,14,60]; 
    const rgb_low = [20,20,20];
    const rgb_high = [20,70,160];
    deviation = Math.pow(deviation, exp)
    if (deviation > 1){
        deviation = 1/deviation;
        return mixColors(rgb_high, rgb_base, deviation)
    }
    else return mixColors(rgb_low, rgb_base, deviation)
}

export function getCardCount(){
    let count = 0;
    cardData.forEach(props => {
        count += props.catagory === "Standard"
    });
    return count;
}

export function calculateSum(data){
    return data.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    }, 0);
}


export function calculateAverage(values, weights = undefined){
    if(weights){
        if (values.length !== weights.length) throw("Value and weight arrays must be of the same length!") 
    }
    let sum = values.reduce((previousValue, currentValue, currentIndex) => {
        if (weights) currentValue *= weights[currentIndex];
        previousValue += currentValue;
        return previousValue;
    }, 0);
    const divisor = weights ? calculateSum(weights) : values.length;
    return sum / divisor;
}

export function calculateDominanceScore(matches, totalMatches, winrate, cardCount){

    //add a few extra matches of 50% winrate, to account for statistical uncertainty at low playrates
    const neutralMatches = 100
    const playrate = (matches+neutralMatches)/(totalMatches+cardCount*neutralMatches/10)
    const playrateAverage = 10/cardCount
    winrate = (winrate*matches + neutralMatches/2)/(matches+neutralMatches)
    const sign = Math.sign(winrate-0.5);
    const sign_factor = Math.tanh(Math.cosh(100*(winrate-0.5)))     //for smooth transition between positive and negative winrate

    return 10*((playrate/playrateAverage)**(sign * sign_factor) * ((winrate/(1-winrate))**sign-1)*sign)+0.2*(playrate-playrateAverage)/playrateAverage
}

export function round(value, digits){
    return Math.round(value*10**digits)/10**digits
}