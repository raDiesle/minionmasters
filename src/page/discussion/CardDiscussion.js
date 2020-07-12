import React from "react";
import WikiEditor from "../wikiEditor/WikiEditor";

export default function CardDiscussion({card, discussionType}) {

    return (
        <div>
            <WikiEditor card={card} discussionType={discussionType}/>
        </div>
    );
}