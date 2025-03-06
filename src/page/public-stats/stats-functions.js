import { clamp } from "lodash";

export function getSeasonStartDate(date){
    const seasonStartDate = new Date(date)
    seasonStartDate.setHours(10,0,0,0)      // 
    seasonStartDate.setDate(date.getDate() + (6 - date.getDay()));  //next Saturday
    seasonStartDate.setDate(seasonStartDate.getDate() - 7*Math.ceil(seasonStartDate.getDate()/7))   //go back full weeks to previous month (last saturday of month)
    return seasonStartDate
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

export function getCellColorWinrate(percent = 0.5){
    const rgb_base = [15,15,55]; 
    const rgb_low = [185,0,0];
    const rgb_high = [0,185,0];
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

export function getCellColorPlayrate(deviation = 1){
    const rgb_base = [15,15,55]; 
    const rgb_low = [20,20,20];
    const rgb_high = [20,70,160];
    deviation = Math.sqrt(deviation)
    if (deviation > 1){
        deviation = 1/deviation;
        return mixColors(rgb_high, rgb_base, deviation)
    }
    else return mixColors(rgb_low, rgb_base, deviation)
}