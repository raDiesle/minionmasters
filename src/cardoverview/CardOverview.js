import {Filters} from "./Filters";
import Cards from "./Cards";
import React from "react";
import {CardDeck} from "./carddeck/CardDeck";

export function CardOverview() {
    return <>
        <CardDeck/>
        <h3>All cards</h3>
        <Filters/>
        <Cards/>
    </>;
}