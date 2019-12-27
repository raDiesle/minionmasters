import React from 'react';

import {CardExpanded} from "./CardExpanded";
import {CardMinimized} from "./CardMinimized";

export function CardContainer({card, focused, onClick}) {

    return (
        <li style={{width: "100px"}} >
            {card.pageId === focused ? (
                <CardExpanded
                    index={focused}
                    card={card}
                    onClick={onClick}
                />
            ) : (
                <CardMinimized card={card} onClick={onClick} />
            )}
        </li>
    );
}