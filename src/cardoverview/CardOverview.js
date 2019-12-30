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
    const [selectedCard, setSelectedCard] = useState({pageId: 0});

    let [cards, setCards] = useState([]);
    useEffect(() => {
        fetchCards().then(data => {
            setCards(data);
        });
    }, []);

    return <>
        <CardDeck allCardsData={cards} selectedCard={selectedCard}/>
        <h3>All cards</h3>

        <Filters/>
        <Cards cards={cards} setSelectedCard={setSelectedCard}/>
    </>;
}