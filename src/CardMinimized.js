import React from "react";
import {Flipped} from "react-flip-toolkit";

export function CardMinimized({card: {pageId, image}, onClick}) {
    const shouldFlip = index => (prev, current) =>
        index === prev || index === current;

    return <Flipped
        flipId={pageId}
        stagger="card"
        shouldInvert={shouldFlip(pageId)}
    >
        <div onClick={() => onClick(pageId)}>
            <img
                style={{width: "100%"}}
                src={
                    "/img/" +
                    image
                }
                alt={image}/>
        </div>
    </Flipped>;
}