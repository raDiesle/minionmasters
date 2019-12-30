import {Filters} from "./Filters";
import Cards from "./Cards";
import React, {useEffect, useState} from "react";
import {CardDeck} from "./carddeck/CardDeck";

async function fetchCards() {
    const response = await fetch("jobCardProps.json");
    const data = response.json();
    return data;
}

export function CardOverview() {
    const [selectedCardId, setSelectedCardId] = useState(0);

    let [cards, setCards] = useState([]);
    useEffect(() => {
        fetchCards().then(data => {
            setCards(data);
        });
    }, []);

    return <>
        <CardDeck allCardsData={cards} selectedCardId={selectedCardId}/>
        <h3>All cards</h3>

        <Filters/>
        <Cards cards={cards} setSelectedCardId={setSelectedCardId}/>
    </>;
}