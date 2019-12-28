import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Card} from "./Card";

async function fetchCards() {
    const response = await fetch("/jobCardProps.json");
    const data = response.json();
    return data;
}

const CardStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default function Cards() {
    let [cards, setCards] = useState([]);
    useEffect(() => {
        fetchCards().then(data => {
            setCards(data);
        });
    }, []);

    return <CardStyle>
        {cards.map(card => <Card card={card}/>)}
    </CardStyle>
}