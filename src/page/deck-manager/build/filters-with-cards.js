import { targetsMapping } from "components/attack/targetsMapping";
import { factionMapping } from "components/faction/factions-mapping-config";
import { MANACOST } from "components/manacost/manacost";

import { RarityMappingConfig } from "components/rarity/rarity-mapping-config";
import { typeMapping } from "components/typeMapping";
import cardData from "generated/jobCardProps.json";
import isEmpty from "lodash.isempty";
import orderBy from "lodash/orderBy";
import Cards from "page/deck-manager/build/cards/cards";

import css from "page/deck-manager/build/filters-with-cards.module.scss";
import { FilterInputs } from "page/deck-manager/build/filters/filter-inputs";
import React, { useCallback, useState } from "react";
import groupBy from "lodash.groupby";

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
    rarity: Object.keys(RarityMappingConfig).map(setFilterState),
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

export const ALL_NORMAL_CARDS = cardData.filter(({ rarity }) => rarity !== "Perk");

export default function FiltersWithCards({
  cardActionWrapper,
  isFullWidthClickable,
  availableCards,
}) {
  const [name, setName] = useState("");
  const [isShowDetailsOnCard, setIsShowDetailsOnCard] = useState(false);
  const [isShowNamesOnCards, setIsShowNamesOnCards] = useState(false);
  const [sortByMana, setSortByMana] = useState("asc");

  const [countFilter, setCountFilter] = useState(ALL_UNIT_COUNT_DEFAULT_CONFIG);

  const [filters, setFilters] = useState(setAllFilterStates(false));
  const setFiltersMemoized = useCallback((filtrs) => setFilters(filtrs), []);

  const filteredMasterCards = ALL_NORMAL_CARDS;

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

  const cardsBeforeByMana = filteredCardsDataWithCount.map(({ manacost, ...rest }) => ({
    ...rest,
    ...{ manacost: parseInt(manacost) },
  }));
  const sortedByManaCards = orderBy(cardsBeforeByMana, ["manacost", "name"], sortByMana, name);

  const cardsByMana = groupBy(sortedByManaCards, "manacost");
  const cardsByGroup =
    sortByMana === "asc"
      ? Object.keys(cardsByMana).map((mana) => ({ mana, cards: cardsByMana[mana] }))
      : Object.keys(cardsByMana)
          .reverse()
          .map((mana) => ({ mana, cards: cardsByMana[mana] }));

  return (
    <div>
      <FilterInputs
        setFilters={setFiltersMemoized}
        filters={filters}
        name={name}
        setName={setName}
        countFilter={countFilter}
        setCountFilter={setCountFilter}
        isShowDetailsOnCard={isShowDetailsOnCard}
        setIsShowDetailsOnCard={setIsShowDetailsOnCard}
        isShowNamesOnCards={isShowNamesOnCards}
        setIsShowNamesOnCards={setIsShowNamesOnCards}
        setSortByMana={setSortByMana}
        sortByMana={sortByMana}
      />
      <div className={css.results}>
        <div>
          Results: {sortedByManaCards.length}/{fullCount}
          {!isEmpty(availableCards) && <span>, {availableCards.length} you own</span>}
        </div>
      </div>

      <Cards
        cards={cardsByGroup}
        availableCards={availableCards}
        isShowDetailsOnCard={isShowDetailsOnCard}
        isShowNamesOnCards={isShowNamesOnCards}
        cardActionWrapper={cardActionWrapper}
        fullCount={fullCount}
        isFullWidthClickable={isFullWidthClickable}
      />
    </div>
  );
}
