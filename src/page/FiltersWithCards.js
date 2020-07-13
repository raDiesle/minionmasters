import orderBy from "lodash/orderBy";
import React, {useCallback, useState} from "react";
import {targetsMapping} from "../attack/targetsMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {factionMapping} from "../faction/Factions";
import cardData from "../generated/jobCardProps";
import {MANACOST} from "../manacost/manacost";
import {rarityMapping} from "../rarity/rarityMapping";
import Cards from "./Cards";
import {Filters} from "./filters/Filters";


export default function FiltersWithCards({cardActionWrapper, isFullWidthClickable}) {

    function setAllFilterStates(isActive) {
        const setFilterState = (key) => {
            return {
                btnkey: key,
                isActive: isActive
            };
        };
        return {
            name: "",
            faction: Object.keys(factionMapping).map(setFilterState),
            manacost: MANACOST.map(setFilterState),
            rarity: Object.keys(rarityMapping).map(setFilterState),
            type: Object.keys(typeMapping).map(setFilterState),
            targets: Object.keys(targetsMapping).map(setFilterState)
        };
    }


    const [isShowNames, setIsShowNames] = useState(false);
    const [sortByMana, setSortByMana] = useState("asc");

    const [filters, setFilters] = useState(setAllFilterStates(false));
    const setFiltersMemoized = useCallback((filtrs) => setFilters(filtrs), []);


    const filteredMasterCards = cardData.filter(({rarity}) => rarity !== 'Perk');
    const fullCount = filteredMasterCards.length;


    const filteredCardsDataWithRarity = filters.rarity.every(({isActive}) => !isActive) ? filteredMasterCards : cardData.filter(({rarity}) => filters.rarity.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(rarity));
    const filteredCardsDataFaction = filters.faction.every(({isActive}) => !isActive) ? filteredCardsDataWithRarity : filteredCardsDataWithRarity.filter(({faction}) => filters.faction.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(faction));
    const filteredCardsDataWithManacost = filters.manacost.every(({isActive}) => !isActive) ? filteredCardsDataFaction : filteredCardsDataFaction.filter(({manacost}) => filters.manacost.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(parseInt(manacost)));

    const filteredCardsDataWithType = filters.type.every(({isActive}) => !isActive) ? filteredCardsDataWithManacost : filteredCardsDataWithManacost.filter(({type}) => filters.type.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(type));
    const filteredCardsDataWithName = filters.name === "" ? filteredCardsDataWithType : filteredCardsDataWithType.filter(({name}) => name.toLowerCase().includes(filters.name.toLowerCase()));
    const filteredCardsDataWithTargets = filters.targets.every(({isActive}) => !isActive) ? filteredCardsDataWithName : filteredCardsDataWithName.filter(({targets}) => filters.targets.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(targets));
    const sortedByManaCards = orderBy(filteredCardsDataWithTargets, ({manacost}) => parseInt(manacost), sortByMana);


    return <div>
        <Filters setFilters={setFiltersMemoized}
                 filters={filters}
                 isShowNames={isShowNames}
                 setIsShowNames={setIsShowNames}
                 setSortByMana={setSortByMana}
                 sortByMana={sortByMana}
        />

        <Cards cards={sortedByManaCards}
               isShowNames={isShowNames}
               cardActionWrapper={cardActionWrapper}
               fullCount={fullCount}
               isFullWidthClickable={isFullWidthClickable}
        />
    </div>;
}