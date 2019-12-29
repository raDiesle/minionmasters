import React, {useState} from "react";
import {useDrop} from "react-dnd";
import styled from "styled-components";
import {Card} from "../Card";

const CardContainerStyle = styled.div`
    width: 100px;
    height: 119px;
    margin-right: 1px;
    margin-top: 2px;
    border: 1px solid black;
`;

function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
        return 'darkgreen'
    } else if (canDrop) {
        return 'darkkhaki'
    } else {
        return '#222'
    }
}

export function CardDeckSlot({number}) {
    const [lastSelectedCard, setLastSelectedCard] = useState({});

    const [{canDrop, isOver}, drop] = useDrop({
        accept: "card",
        drop: (selectedItem) => {
            setLastSelectedCard(selectedItem.card);
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
    const isActive = canDrop && isOver;

    const backgroundColor = selectBackgroundColor(isActive, canDrop);


    return (
        <div ref={drop}>
            {lastSelectedCard.image ? <Card card={lastSelectedCard}/> :
                <CardContainerStyle>Drop card here</CardContainerStyle>}
        </div>

    );

};