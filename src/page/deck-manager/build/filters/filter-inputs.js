import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash as faEyeSlashRegular } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash as faEyeSlashSolid } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons/faSortAmountDown";
import { faSortAmountUp } from "@fortawesome/free-solid-svg-icons/faSortAmountUp";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloneDeep from "lodash/cloneDeep";
import {
  ALL_UNIT_COUNT_DEFAULT_CONFIG,
  setAllFilterStates,
} from "page/deck-manager/build/filters-with-cards";
import AvailableCardsFilter from "page/deck-manager/build/filters/available-cards-filter";
import { RarityMappingConfig } from "components/rarity/rarity-mapping-config";
import Tooltip from "rc-tooltip";
import React, { useState } from "react";
import { targetsMapping } from "components/attack/targetsMapping";
import { typeMapping } from "components/typeMapping";

import { factionMapping } from "components/faction/factions-mapping-config";
import { MANACOST } from "components/manacost/manacost";
import PerkMasterIcon from "components/rarity/perk-master-icon";
import {
  ButtonFilterGroup,
  ButtonGroupStyle,
  ButtonInGroupStyle,
} from "page/deck-manager/build/filters/ButtonFilterGroup";
import css from "page/deck-manager/build/filters/filter-inputs.module.scss";

export function FilterInputs({
  filters,
  setFilters,
  name,
  setName,
  isShowDetailsOnCard,
  setIsShowDetailsOnCard,
  isShowNamesOnCards,
  setIsShowNamesOnCards,
  sortByMana,
  setSortByMana,
  countFilter,
  setCountFilter,
  availableCards,
  setAvailableCards,
  isToggleAvailableCards,
  setIsToggleAvailableCards,
  children,
}) {
  const [toPasteAvailableCards, setToPasteAvailableCards] = useState(false);

  return (
    <div className={css.FilterContainerStyle}>
      <div>
        <div>Search</div>
        <ButtonGroupStyle>
          <input
            className={css.InputTextStyle}
            type="text"
            value={name}
            onChange={(event) => {
              event.persist();
              const typedInEventName = event.target.value;
              if (isShowNamesOnCards === false && typedInEventName !== "") {
                setIsShowNamesOnCards(true);
              }
              setName(typedInEventName);
            }}
          />

          <Tooltip placement="bottomRight" overlay={<span>Search by Name & Description</span>}>
            <ButtonInGroupStyle>
              <FontAwesomeIcon icon={faInfoCircle} />
            </ButtonInGroupStyle>
          </Tooltip>
        </ButtonGroupStyle>
      </div>

      <ButtonGroupStyle>
        <Tooltip placement="bottomRight" overlay={<span>Show Names</span>}>
          <ButtonInGroupStyle
            value={isShowNamesOnCards}
            onClick={() => setIsShowNamesOnCards((prevShowDetailsOnCard) => !prevShowDetailsOnCard)}
          >
            <FontAwesomeIcon icon={isShowNamesOnCards ? faEyeRegular : faEyeSlashRegular} />
          </ButtonInGroupStyle>
        </Tooltip>
        <Tooltip placement="bottomRight" overlay={<span>Show details on cards</span>}>
          <ButtonInGroupStyle
            value={isShowDetailsOnCard}
            onClick={() =>
              setIsShowDetailsOnCard((prevShowDetailsOnCard) => !prevShowDetailsOnCard)
            }
          >
            <FontAwesomeIcon icon={isShowDetailsOnCard ? faEyeSolid : faEyeSlashSolid} />
          </ButtonInGroupStyle>
        </Tooltip>
      </ButtonGroupStyle>

      <div>
        Faction
        <ButtonFilterGroup btnkey="faction" filters={filters.faction} setFilters={setFilters}>
          {Object.keys(factionMapping).map((faction) => (
            <div key={factionMapping[faction]}>{factionMapping[faction]}</div>
          ))}
        </ButtonFilterGroup>
      </div>
      <div style={{ paddingRight: 0 }}>
        Manacost
        <ButtonFilterGroup
          btnkey="manacost"
          filters={filters.manacost}
          setFilters={setFilters}
          isShowTooltip={false}
        >
          {MANACOST.map((number) => (
            <div key={number}>{number}</div>
          ))}
        </ButtonFilterGroup>
      </div>
      <ButtonGroupStyle>
        <ButtonInGroupStyle
          isButtonActive={sortByMana === "asc"}
          onClick={() => setSortByMana("asc")}
        >
          <Tooltip placement="bottomRight" overlay={<span> Sort Mana Ascending</span>}>
            <FontAwesomeIcon icon={faSortAmountUp} />
          </Tooltip>
        </ButtonInGroupStyle>
        <ButtonInGroupStyle
          isButtonActive={sortByMana === "desc"}
          onClick={() => setSortByMana("desc")}
        >
          <Tooltip placement="bottomRight" overlay={<span> Sort Mana Descending</span>}>
            <FontAwesomeIcon icon={faSortAmountDown} />
          </Tooltip>
        </ButtonInGroupStyle>
      </ButtonGroupStyle>
      <div>
        Rarity
        <ButtonFilterGroup btnkey="rarity" filters={filters.rarity} setFilters={setFilters}>
          {Object.keys(RarityMappingConfig).map((rarity) => (
            <div key={rarity} style={{ color: RarityMappingConfig[rarity] }}>
              {rarity !== "Perk" ? (
                <FontAwesomeIcon icon={faSquare} size={"xs"} />
              ) : (
                <PerkMasterIcon />
              )}
            </div>
          ))}
        </ButtonFilterGroup>
      </div>
      <div>
        Type
        <ButtonFilterGroup btnkey="type" filters={filters.type} setFilters={setFilters}>
          {Object.keys(typeMapping).map((type) => (
            <div key={type}>
              <FontAwesomeIcon icon={typeMapping[type]} size="xs" />
            </div>
          ))}
        </ButtonFilterGroup>
      </div>
      <div>
        Attack
        <ButtonFilterGroup btnkey="targets" filters={filters.targets} setFilters={setFilters}>
          {Object.keys(targetsMapping).map((target) => (
            <div key={target}>{targetsMapping[target]}</div>
          ))}
        </ButtonFilterGroup>
      </div>

      <div>
        <div>Unit Count</div>
        <ButtonGroupStyle>
          {ALL_UNIT_COUNT_DEFAULT_CONFIG.map(({ btnkey }, position) => (
            <ButtonInGroupStyle
              key={`unitcount_${btnkey}`}
              onClick={() => {
                setCountFilter((prevCounterFilter) => {
                  const newCounterFilter = cloneDeep(prevCounterFilter);
                  newCounterFilter[position].isActive = !prevCounterFilter[position].isActive;
                  return newCounterFilter;
                });
              }}
              isButtonActive={countFilter[position].isActive}
            >
              {btnkey}
            </ButtonInGroupStyle>
          ))}
        </ButtonGroupStyle>
      </div>

      <AvailableCardsFilter
        availableCards={availableCards}
        setAvailableCards={setAvailableCards}
        isToggleAvailableCards={isToggleAvailableCards}
        setIsToggleAvailableCards={setIsToggleAvailableCards}
        toPasteAvailableCards={toPasteAvailableCards}
        setToPasteAvailableCards={setToPasteAvailableCards}
      />

      <ButtonGroupStyle>
        <ButtonInGroupStyle
          onClick={() => {
            setFilters(setAllFilterStates(false));
            setIsShowNamesOnCards(false);
            setIsShowDetailsOnCard(false);
            setName("");
            setSortByMana("asc");
            setCountFilter(ALL_UNIT_COUNT_DEFAULT_CONFIG);
            setToPasteAvailableCards(false);
            setAvailableCards("");
            setIsToggleAvailableCards(false);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Reset
        </ButtonInGroupStyle>
      </ButtonGroupStyle>

      {children}
    </div>
  );
}
