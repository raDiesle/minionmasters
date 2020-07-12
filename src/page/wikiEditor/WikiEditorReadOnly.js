import React from "react";
import cardData from "../../generated/jobCardProps.json";
import {mastersMapping} from "../mastersoverview/mastersMapping";


export default function WikiEditorReadOnly({value = ""}) {

    const emailRegex = /\@\[(.*?)\]\(.*?\)/g;
    //const matched = findMatches(emailRegex, value);
    const matched = value.replace(emailRegex, (match, match1, c) => {
        const matchedMaster = mastersMapping[Object.keys(mastersMapping).find(key => key === match1)];
        const image = matchedMaster ? matchedMaster.icon : cardData.find(({name}) => match1 === name).image;

        return `<a href="#"><img width="25" src='generated/img/${image}'/>&nbsp;${match1}</a>`;
    });

    return <div>

        <div dangerouslySetInnerHTML={{__html: matched}}/>
    </div>;
}