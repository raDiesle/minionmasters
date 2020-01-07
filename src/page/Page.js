import Cards from "./Cards";
import React, {useCallback, useEffect, useRef, useState} from "react";

import {Filters} from "./filters/Filters";
import cardData from "../generated/jobCardProps";
import {factionMapping} from "../faction/Factions";
import {rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {MANACOST} from "../manacost/manacost";
import CardDeckContainer from "./carddeck/CardDeckContainer";
import {targetsMapping} from "../attack/targetsMapping";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import MastersOverview from "./mastersoverview/MastersOverview";


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
        faction: Object.keys(factionMapping).map(setFilterState),
        manacost: MANACOST.map(setFilterState),
        rarity: Object.keys(rarityMapping).map(setFilterState),
        type: Object.keys(typeMapping).map(setFilterState),
        targets: Object.keys(targetsMapping).map(setFilterState)
    };
}

export function Page() {
    const [, selectedCardEvent, setSelectedCardEvent] = useTraceableState({
        eventId: 0,
        card: {
            pageId: 0
        }
    });


    const [zoom, setZoom] = useState(5);
    const [isShowNames, setIsShowNames] = useState(false);

    const [filters, setFilters] = useState(setAllFilterStates(false));
    const setFiltersMemoized = useCallback((filtrs) => setFilters(filtrs), []);

    const filteredCardsDataFaction = filters.faction.every(({isActive}) => !isActive) ? cardData : cardData.filter(({faction}) => filters.faction.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(faction));
    const filteredCardsDataWithManacost = filters.manacost.every(({isActive}) => !isActive) ? filteredCardsDataFaction : filteredCardsDataFaction.filter(({manacost}) => filters.manacost.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(parseInt(manacost)));
    const filteredCardsDataWithRarity = filters.rarity.every(({isActive}) => !isActive) ? filteredCardsDataWithManacost.filter(({rarity}) => rarity !== 'Perk') : filteredCardsDataWithManacost.filter(({rarity}) => filters.rarity.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(rarity));
    const filteredCardsDataWithType = filters.type.every(({isActive}) => !isActive) ? filteredCardsDataWithRarity : filteredCardsDataWithRarity.filter(({type}) => filters.type.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(type));
    const filteredCardsDataWithName = filters.name === "" ? filteredCardsDataWithType : filteredCardsDataWithType.filter(({name}) => name.toLowerCase().startsWith(filters.name.toLowerCase()));
    const filteredCardsDataWithTargets = filters.targets.every(({isActive}) => !isActive) ? filteredCardsDataWithName : filteredCardsDataWithName.filter(({targets}) => filters.targets.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(targets));


    // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
    return <div style={{padding: "5px"}}>
        <CardDeckContainer allCardsData={cardData}
                           selectedCardEvent={selectedCardEvent}
                           setSelectedCardEvent={setSelectedCardEvent}
        />

        <Tabs>
            <TabList>
                <Tab>Cards</Tab>
                <Tab>Masters</Tab>
            </TabList>
            <TabPanel>
                <Filters setFilters={setFiltersMemoized} filters={filters} setZoom={setZoom} isShowNames={isShowNames}
                         setIsShowNames={setIsShowNames}/>

                <Cards cards={filteredCardsDataWithTargets}
                       setSelectedCardEvent={setSelectedCardEvent}
                       zoom={zoom}
                       isShowNames={isShowNames}

                />
                Count: {filteredCardsDataWithTargets.length}
            </TabPanel>
            <TabPanel>
                <MastersOverview/>
            </TabPanel>
        </Tabs>

    </div>;
}