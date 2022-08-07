import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import css from "./conquest-countdown.module.scss";

const compensateTimezone = (date) => {
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date;
}

function getHourFormatFromMilliSeconds(millisec) {
  var seconds = (millisec / 1000).toFixed(0);
  var minutes = Math.floor(Number(seconds) / 60).toString();
  let hours;
  if (Number(minutes) > 59) {
    hours = Math.floor((Number(minutes) / 60));
    hours = (hours >= 10) ? hours : "0" + hours;
    minutes = (Number(minutes) - (hours * 60)).toString();
    minutes = (Number(minutes) >= 10) ? minutes : "0" + minutes;
  }

  seconds = Math.floor(Number(seconds) % 60).toString();
  seconds = (Number(seconds) >= 10) ? seconds : "0" + seconds;
  if (!hours) {
    hours = "00";
  }
  if (!minutes) {
    minutes = "00";
  }
  if (!seconds) {
    seconds = "00";
  }

  const days = Math.floor(hours/ 24);
  return days +"d " + (hours % 24)+ ":" + minutes + ":" + seconds;

}

const CYCLE_TIME_IN_MS = 1000*60*60*24*3;


function calcTime() {
  const DATE_TO_ALIGN_CYCLE  = new Date(2022, 0, 21, 7,0,0,0);

  const NOW = new Date();

  // 1d 17h
  // 17.12 09:00
  // 15.12 09:00
  // 19.12 09:00
  // 1d 16h 14m
  const diffSinceReferenceConquestFromPast = NOW.getTime() + (NOW.getTimezoneOffset() * 1000 * 60) - DATE_TO_ALIGN_CYCLE.getTime();
  const remainingTimeInMsAbsolute = diffSinceReferenceConquestFromPast - CYCLE_TIME_IN_MS;
  const remainingTimeInMs = CYCLE_TIME_IN_MS - (remainingTimeInMsAbsolute % CYCLE_TIME_IN_MS); //

  let number = Date.now() + remainingTimeInMs;

  const nextConquestEnd = new Date(number);

  const remainingTime = Math.floor(remainingTimeInMs / 1000);
  const days =  Math.floor(remainingTime / (60 * 60 * 24));
  const hours = Math.floor((remainingTime / (60 * 60 )) % 24)
  const minutes = Math.floor((remainingTime % (60*60)) / 60);
  const seconds = Math.floor(remainingTime % 60);

  const diff = `${days}d ${hours}h ${minutes}m ${seconds}s`
  return {nextConquestEnd, diff};
}

export function ConquestCountdown(){

  const [timeLeft, setTimeLeft] = useState({
    diff: "",
    nextConquestEnd: new Date()
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calcTime());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
      <div className={css.conquest}>
        Conquest Cycle ends:
      <div>
       {timeLeft.diff}
      </div>
        <div>
          {format(timeLeft.nextConquestEnd, "EEE")+  " " + format(timeLeft.nextConquestEnd, "P")  + " "+  format(timeLeft.nextConquestEnd, "p")}
        </div>
      </div>
  );
}