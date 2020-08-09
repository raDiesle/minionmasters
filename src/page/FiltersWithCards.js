import orderBy from "lodash/orderBy";

import { RARITY_MAPPING_CONFIG } from "rarity/RARITY_MAPPING_CONFIG";
import React, { useCallback, useState } from "react";
import { targetsMapping } from "../attack/targetsMapping";
import { typeMapping } from "../cardtype/typeMapping";
import { factionMapping } from "../faction/Factions";
import cardData from "../generated/jobCardProps";
import { MANACOST } from "../manacost/manacost";
import Cards from "./Cards";
import { FilterInputs } from "./filters/FilterInputs";

export function setAllFilterStates(isActive) {
  const setFilterState = (key) => {
    return {
      btnkey: key,
      isActive: isActive,
    };
  };
  return {
    faction: Object.keys(factionMapping).map(setFilterState),
    manacost: MANACOST.map(setFilterState),
    rarity: Object.keys(RARITY_MAPPING_CONFIG).map(setFilterState),
    type: Object.keys(typeMapping).map(setFilterState),
    targets: Object.keys(targetsMapping).map(setFilterState),
  };
}

// different logic than previous filter buttons
const UNITS_COUNT_GREATER_5 = ">";
export const ALL_UNIT_COUNT_DEFAULT_CONFIG = [0, 1, 2, 3, 4, 5, UNITS_COUNT_GREATER_5].map(
  (key) => ({
    btnkey: key,
    isActive: false,
  })
);

export default function FiltersWithCards({ cardActionWrapper, isFullWidthClickable }) {
  const [name, setName] = useState("");
  const [isShowDetailsOnCard, setIsShowDetailsOnCard] = useState(false);
  const [isShowNamesOnCards, setIsShowNamesOnCards] = useState(false);
  const [sortByMana, setSortByMana] = useState("asc");

  const [countFilter, setCountFilter] = useState(ALL_UNIT_COUNT_DEFAULT_CONFIG);
  const [availableCards, setAvailableCards] = useState("");
  const [isToggleAvailableCards, setIsToggleAvailableCards] = useState(false);

  const [filters, setFilters] = useState(setAllFilterStates(false));
  const setFiltersMemoized = useCallback((filtrs) => setFilters(filtrs), []);

  const filteredMasterCards = cardData.filter(({ rarity }) => rarity !== "Perk");

  const fullCount = filteredMasterCards.length;

  const filteredCardsDataWithRarity = filters.rarity.every(({ isActive }) => !isActive)
    ? filteredMasterCards
    : cardData.filter(({ rarity }) =>
        filters.rarity
          .filter(({ isActive }) => isActive)
          .map(({ btnkey }) => btnkey)
          .includes(rarity)
      );
  const filteredCardsDataFaction = filters.faction.every(({ isActive }) => !isActive)
    ? filteredCardsDataWithRarity
    : filteredCardsDataWithRarity.filter(({ faction }) =>
        filters.faction
          .filter(({ isActive }) => isActive)
          .map(({ btnkey }) => btnkey)
          .includes(faction)
      );
  const filteredCardsDataWithManacost = filters.manacost.every(({ isActive }) => !isActive)
    ? filteredCardsDataFaction
    : filteredCardsDataFaction.filter(({ manacost }) =>
        filters.manacost
          .filter(({ isActive }) => isActive)
          .map(({ btnkey }) => btnkey)
          .includes(parseInt(manacost))
      );

  const filteredCardsDataWithType = filters.type.every(({ isActive }) => !isActive)
    ? filteredCardsDataWithManacost
    : filteredCardsDataWithManacost.filter(({ type }) =>
        filters.type
          .filter(({ isActive }) => isActive)
          .map(({ btnkey }) => btnkey)
          .includes(type)
      );
  const filteredCardsDataWithName =
    name === ""
      ? filteredCardsDataWithType
      : filteredCardsDataWithType.filter(({ name: nameItem, description }) => {
          const isMatchByFn = (searchValue) =>
            searchValue.toLowerCase().includes(name.toLowerCase());
          return isMatchByFn(nameItem) || isMatchByFn(description);
        });

  const filteredCardsDataWithTargets = filters.targets.every(({ isActive }) => !isActive)
    ? filteredCardsDataWithName
    : filteredCardsDataWithName.filter(({ targets }) =>
        filters.targets
          .filter(({ isActive }) => isActive)
          .map(({ btnkey }) => btnkey)
          .includes(targets)
      );

  const filteredCardsDataWithCount = Object.values(countFilter).every(({ isActive }) => !isActive)
    ? filteredCardsDataWithTargets
    : filteredCardsDataWithTargets.filter(({ count }) =>
        countFilter
          .filter(({ isActive }) => isActive)
          .some(({ btnkey }) => {
            if (btnkey === UNITS_COUNT_GREATER_5) {
              return count > 5;
            } else if (btnkey === 0) {
              return !count;
            } else {
              return count >= btnkey && count <= btnkey;
            }
          })
      );

  const filteredCardsWithAvailableCards = !availableCards
    ? filteredCardsDataWithCount
    : filteredCardsDataWithCount.filter(({ iD }) =>
        isToggleAvailableCards ? !availableCards.includes(iD) : availableCards.includes(iD)
      );

  const sortedByManaCards = orderBy(
    filteredCardsWithAvailableCards,
    ({ manacost }) => parseInt(manacost),
    sortByMana
  );

  return (
    <div>
      <FilterInputs
        setFilters={setFiltersMemoized}
        filters={filters}
        name={name}
        setName={setName}
        countFilter={countFilter}
        setCountFilter={setCountFilter}
        availableCards={availableCards}
        setAvailableCards={setAvailableCards}
        isToggleAvailableCards={isToggleAvailableCards}
        setIsToggleAvailableCards={setIsToggleAvailableCards}
        isShowDetailsOnCard={isShowDetailsOnCard}
        setIsShowDetailsOnCard={setIsShowDetailsOnCard}
        isShowNamesOnCards={isShowNamesOnCards}
        setIsShowNamesOnCards={setIsShowNamesOnCards}
        setSortByMana={setSortByMana}
        sortByMana={sortByMana}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10px",
          paddingRight: "2px",
        }}
      >
        <div>
          Results: {sortedByManaCards.length}/{fullCount}
        </div>
      </div>

      <Cards
        cards={sortedByManaCards}
        isShowDetailsOnCard={isShowDetailsOnCard}
        isShowNamesOnCards={isShowNamesOnCards}
        cardActionWrapper={cardActionWrapper}
        fullCount={fullCount}
        isFullWidthClickable={isFullWidthClickable}
      />
    </div>
  );
}
