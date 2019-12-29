import React from "react";
import {useDrop} from "react-dnd";
import styled from "styled-components";
import {Card} from "../Card";

const CardDeckSlotStyle = styled.div`
    border-style: ${({canDrop, isOver}) => {
    if (canDrop && isOver) {
        return "dashed";
    } else if (canDrop) {
        return "dotted";
    } else {
        return "solid";
    }
}};
    border-width: 1px;
    border-color: ${({canDrop, isOver}) => {
    if (canDrop && isOver) {
        return "darkgreen"
    } else if (canDrop) {
        return "green";
    } else {
        return "#222";
    }
}
}
`;

const CardContainerStyle = styled.div`
    width: 100px;
    height: 119px;
    margin-right: 1px;
    margin-top: 2px;
`;

export function CardDeckSlot({number, lastSelectedCard, setLastSelectedCard}) {

    const [{canDrop, isOver}, drop] = useDrop({
        accept: "card",
        drop: (selectedItem) => {
            setLastSelectedCard(selectedItem.card, number);
            return ({
                name: number,
                allowedDropEffect: "move",
            })
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    return (
        <CardDeckSlotStyle ref={drop} canDrop={canDrop} isOver={isOver}>
            {lastSelectedCard ? <Card card={lastSelectedCard}/> :
                <CardContainerStyle>Drop card here</CardContainerStyle>}
        </CardDeckSlotStyle>
    );

};