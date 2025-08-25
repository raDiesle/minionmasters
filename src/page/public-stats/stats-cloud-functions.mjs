import { getStorage, getDownloadURL, ref } from "firebase/storage";
import axios from "axios";

const STATS_ROOT_PATH = ""
const SEASON_DATA_FILENAME = "seasonData.json"

let seasonDates = [
    new Date(0),
    new Date("2025-02-22T10:00Z"),
    new Date("2025-03-22T10:00Z"),
    new Date("2025-04-26T10:00Z"),
    new Date("2025-05-24T10:00Z"),
    new Date("2025-06-23T10:00Z"),
]

let seasonDatesDownloaded = false;

/**
 * @param {import('@google-cloud/storage').Bucket} bucket
*/
export async function addSeasonStartDate(startDate = new Date(), bucket){
    const requestHeader = { gzip: true, contentType: "application/json" };
    // console.log(`adding Date: ${startDate.toUTCString()}`)
    let seasonData = [];
    try{
        seasonData = await getSeasonDates(bucket);
        console.log("downloaded seasonData successfully")
        console.log(seasonData)
        // seasonDates = seasonDates.map(dateString => new Date(dateString));
        seasonData.push(startDate);
        console.log("New season start date added:", seasonData)
        // if (seasonData.length > 12) seasonData.shift();
        await bucket.file(`${STATS_ROOT_PATH}${SEASON_DATA_FILENAME}`).save(JSON.stringify(seasonData), requestHeader);
    }
    catch(e){
        console.log("Saving new date to seasonData.json failed:", e);
    }
}

export async function getSeasonDatesAdmin(bucket){
    let seasonData = [];

    try{
        const dataResponse = await bucket.file(`${STATS_ROOT_PATH}${SEASON_DATA_FILENAME}`).download();
        /** @type {Array} */
        seasonData = JSON.parse(dataResponse);
        if (!seasonData) seasonData = [];
        seasonData = seasonData.map(dateString => new Date(dateString));
    }
    catch(e){
        console.warn("Error while getting seasonData.json:", e);
    }
    return seasonData
}

export async function getSeasonDates(storage = undefined){
    // call this to initialize the seasonDates list
    if (seasonDatesDownloaded){
        return seasonDates;
    }

    if (storage === undefined){
        storage = getStorage()
    }
    let seasonData = [];

    try{
        const url = await getDownloadURL(ref(storage, `${STATS_ROOT_PATH}${SEASON_DATA_FILENAME}`));
        const { data : dataResponse } = await axios.get(url);
        // const dataResponse = await bucket.file(`${STATS_ROOT_PATH}${SEASON_DATA_FILENAME}`).download();
        /** @type {Array} */
        seasonData = dataResponse;
        if (!seasonData) seasonData = [];
        seasonData = seasonData.map(dateString => new Date(dateString));
    }
    catch(e){
        console.warn("Error while getting seasonData.json:", e);
    }
    seasonDates = seasonData;
    seasonDatesDownloaded = true;
    return seasonData
}

export function getSeasonStartDate(date = new Date(), startDates = undefined){
    if (startDates === undefined) {
        if (!seasonDatesDownloaded) {
            console.warn("Season start dates have not been initialized! Using default values.")
        }
        startDates = seasonDates;
    }
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