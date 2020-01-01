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

    const [zoom, setZoom] = useState(5);

    function setAllFilterStates(isActive) {
        const setFilterState = (key) => {
            return {
                btnkey: key,
                isActive: isActive
            };
        };
        return {
            faction: FACTIONS.map(setFilterState),
            manacost: MANACOST.map(setFilterState),
            rarity: Object.keys(rarityMapping).map(setFilterState),
            type: Object.keys(typeMapping).map(setFilterState)
        };
    }

    const cardDataInitialFiltered = cardData.filter(({rarity}) => rarity !== 'Perk');

    const [filters, setFilters] = useState(setAllFilterStates(false));
    const filteredCardsDataFaction = isDirtyFilter < 2 ? [] : filters.faction.every(({isActive}) => !isActive) ? cardDataInitialFiltered : cardDataInitialFiltered.filter(({faction}) => filters.faction.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(faction));
    const filteredCardsDataWithManacost = filters.manacost.every(({isActive}) => !isActive) ? filteredCardsDataFaction : filteredCardsDataFaction.filter(({manacost}) => filters.manacost.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(parseInt(manacost)));
    const filteredCardsDataWithRarity = filters.rarity.every(({isActive}) => !isActive) ? filteredCardsDataWithManacost : filteredCardsDataWithManacost.filter(({rarity}) => filters.rarity.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(rarity));
    const filteredCardsDataWithType = filters.type.every(({isActive}) => !isActive) ? filteredCardsDataWithRarity : filteredCardsDataWithRarity.filter(({type}) => filters.type.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(type));

    useEffect(() => {
        setIsDirtyFilter((prevDirtyCount) => prevDirtyCount + 1);
    }, [filters]);

    return <>
        <CardDeck allCardsData={cardData} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
        <h3>All cards</h3>

        <Filters setFilters={setFilters} filters={filters} zoom={zoom} setZoom={setZoom}/>
        <Cards cards={isDirtyFilter < 2 ? cardDataInitialFiltered : filteredCardsDataWithType}
               setSelectedCard={setSelectedCard} zoom={zoom}/>
    </>;
}