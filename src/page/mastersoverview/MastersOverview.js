import React from "react";
import {mastersMapping} from "./mastersMapping";

export default function MastersOverview() {

    return (
        <div>
            {
                Object.keys(mastersMapping).map(master => <img src={"generated/img/" + mastersMapping[master].icon}
                                                               alt={master}/>)
            }
        </div>
    );
}