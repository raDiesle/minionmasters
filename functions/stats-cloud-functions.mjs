// This is a copy from src\page\public-stats\
// because imports from outside the functions folder usually do not work

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