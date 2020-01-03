import Cards from "./Cards";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {CardDeck} from "./carddeck/CardDeck";
import {Filters} from "./filters/Filters";
import cardData from "../jobCardProps";
import {FACTIONS} from "../faction/Factions";
import {rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {MANACOST} from "../manacost/manacost";

const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
const useTraceableState = initialValue => {
    const [value, setValue] = useState(initialValue);
    const prevValue = usePreviousValue(value);
    return [prevValue, value, setValue];
};

function setAllFilterStates(isActive) {
    const setFilterState = (key) => {
        return {
            btnkey: key,
            isActive: isActive
        };
    };
    return {
        name: "",
        faction: FACTIONS.map(setFilterState),
        manacost: MANACOST.map(setFilterState),
        rarity: Object.keys(rarityMapping).map(setFilterState),
        type: Object.keys(typeMapping).map(setFilterState)
    };
}

export function CardOverview() {
    const [prevSelectedCardEvent, selectedCardEvent, setSelectedCardEvent] = useTraceableState({
        eventId: 0,
        card: {
            pageId: 0
        }
    });

    const [zoom, setZoom] = useState(5);
    const [filters, setFilters] = useState(setAllFilterStates(false));
    const setFiltersMemoized = useCallback((filtrs) => setFilters(filtrs), []);

    const filteredCardsDataFaction = filters.faction.every(({isActive}) => !isActive) ? cardData : cardData.filter(({faction}) => filters.faction.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(faction));
    const filteredCardsDataWithManacost = filters.manacost.every(({isActive}) => !isActive) ? filteredCardsDataFaction : filteredCardsDataFaction.filter(({manacost}) => filters.manacost.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(parseInt(manacost)));
    const filteredCardsDataWithRarity = filters.rarity.every(({isActive}) => !isActive) ? filteredCardsDataWithManacost.filter(({rarity}) => rarity !== 'Perk') : filteredCardsDataWithManacost.filter(({rarity}) => filters.rarity.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(rarity));
    const filteredCardsDataWithType = filters.type.every(({isActive}) => !isActive) ? filteredCardsDataWithRarity : filteredCardsDataWithRarity.filter(({type}) => filters.type.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(type));
    const filteredCardsDataWithName = filters.name === "" ? filteredCardsDataWithType : filteredCardsDataWithType.filter(({name}) => name.toLowerCase().startsWith(filters.name.toLowerCase()));

    return <>
        <CardDeck allCardsData={cardData} prevSelectedCardEvent={prevSelectedCardEvent}
                  selectedCardEvent={selectedCardEvent} setSelectedCardEvent={setSelectedCardEvent}/>
        <h3>All cards</h3>
        <Filters setFilters={setFiltersMemoized} filters={filters} zoom={zoom} setZoom={setZoom}/>
        <Cards cards={filteredCardsDataWithName}
               setSelectedCardEvent={setSelectedCardEvent} zoom={zoom}/>
    </>;
}