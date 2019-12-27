import React from 'react';

import {Flipped} from "react-flip-toolkit";

export function CardExpanded({card: {pageId, image}, onClick})  {
    return  (<Flipped
        flipId={pageId}
        stagger="card"
        onStart={el => {
            setTimeout(() => {
                el.classList.add("animated-in");
            }, 400);
        }}
    >
        <div className="expandedListItem" onClick={() => onClick(pageId)}>
            <Flipped inverseFlipId={pageId}>
                <div className="expandedListItemContent">
                    <Flipped
                        flipId={`${pageId}`}
                        stagger="card-content"
                        delayUntil={pageId}
                    >
                        <img
                            style={{width: "100%"}}
                            src={
                                "/img/" +
                                image
                            }
                            alt={image}/>
                    </Flipped>
                    <div className="description">
                            <Flipped
                                flipId={`description-${pageId}`}
                                stagger="card-content"
                                delayUntil={pageId}
                            >
                                <div />
                            </Flipped>
                    </div>
                    <div className="additional-content">
                        TONS OF DETAILS
                    </div>
                </div>
            </Flipped>
        </div>
    </Flipped>);
}