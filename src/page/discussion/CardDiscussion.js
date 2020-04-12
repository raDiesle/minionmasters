import WikiEditor from "../wikiEditor/WikiEditor";
import React from "react";

export default function CardDiscussion({card, discussionType}) {

    return (
        <div>
            <WikiEditor card={card} discussionType={discussionType}/>
        </div>
    );
}