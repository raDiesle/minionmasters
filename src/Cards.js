import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Card} from "./Card";
import orderBy from "lodash/orderBy";

async function fetchCards() {
    const response = await fetch("/jobCardProps.json");
    const data = response.json();
    return data;
}

const CardsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default function Cards() {
    let [cards, setCards] = useState([]);
    useEffect(() => {
        fetchCards().then(data => {
            setCards(data);
        });
    }, []);

    let sortOrder = "asc";
    return <CardsStyle>
        {
            orderBy(cards, ({manacost}) => parseInt(manacost), sortOrder).map(card => <Card key={card.pageId}
                                                                                            card={card}/>)
        }
    </CardsStyle>
}