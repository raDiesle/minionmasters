import Cards from "./Cards";
import React, {useEffect, useState} from "react";
import {CardDeck} from "./carddeck/CardDeck";
import {Filters} from "./filters/Filters";
import cardData from "../jobCardProps";
import {FACTIONS} from "../faction/Factions";
import {rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {MANACOST} from "../manacost/manacost";

export function CardOverview() {
    const [selectedCard, setSelectedCard] = useState({pageId: 0});
    const [isDirtyFilter, setIsDirtyFilter] = useState(0);

    function setAllFilterStates(isActive) {
        const setFilterState = (key) => {
            return {
                btnkey: key,
                isActive: isActive
            };
        };
        return {
            faction: FACTIONS.map(setFilterState),
            size: ["zoomOut", "reset", "zoomIn"].map(setFilterState),
            manacost: MANACOST.map(setFilterState),
            rare: Object.keys(rarityMapping).map(setFilterState),
            type: Object.keys(typeMapping).map(setFilterState)
        };
    }

    const [filters, setFilters] = useState(setAllFilterStates(false));

    const filteredCardsData = isDirtyFilter < 2 ? [] : cardData.filter(({faction}) => filters.faction.filter(item => item.isActive).map(item => item.btnkey).includes(faction));

    useEffect(() => {
        setIsDirtyFilter((prevDirtyCount) => prevDirtyCount + 1);
    }, [filters]);

    return <>
        <CardDeck allCardsData={cardData} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
        <h3>All cards</h3>

        <Filters setFilters={setFilters} filters={filters}/>
        <Cards cards={isDirtyFilter < 2 ? cardData : filteredCardsData} setSelectedCard={setSelectedCard}/>
    </>;
}