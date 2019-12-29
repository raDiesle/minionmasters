import React from "react";
import {CardDeckSlot} from "./CardDeckSlot";
import styled from "styled-components";

const CardDeckStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export function CardDeck() {
    return <div>
        <h3>Your Deck</h3>
        <CardDeckStyle>

            {
                [...Array(11).keys()].map((number) => <CardDeckSlot key={number} number={number}/>)
            }
        </CardDeckStyle>
    </div>;
}