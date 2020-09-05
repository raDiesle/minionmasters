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
import * as classnames from "classnames";
import { targetsMapping } from "components/attack/targetsMapping";
import cssButton from "components/button.module.scss";

import { factionMapping } from "components/faction/factions-mapping-config";
import { MANACOST } from "components/manacost/manacost";
import PerkMasterIcon from "components/rarity/perk-master-icon";
import { RarityMappingConfig } from "components/rarity/rarity-mapping-config";
import { typeMapping } from "components/typeMapping";
import cloneDeep from "lodash/cloneDeep";
import {
  ALL_UNIT_COUNT_DEFAULT_CONFIG,
  setAllFilterStates,
} from "page/deck-manager/build/filters-with-cards";
import css from "page/deck-manager/build/filters/filter-inputs.module.scss";
import { FilterButton } from "page/deck-manager/build/filters/filterButton";
import Tooltip from "rc-tooltip";
import React from "react";

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

  children,
}) {
  return (
    <div className={css.FilterContainerStyle}>
      <div>
        <div>Search</div>
        <div className={cssButton.ButtonGroupStyle}>
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
            <button className={cssButton.ButtonInGroupStyle}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className={cssButton.ButtonGroupStyle}>
        <Tooltip placement="bottomRight" overlay={<span>Show Names</span>}>
          <button
            className={cssButton.ButtonInGroupStyle}
            value={isShowNamesOnCards}
            onClick={() => setIsShowNamesOnCards((prevShowDetailsOnCard) => !prevShowDetailsOnCard)}
          >
            <FontAwesomeIcon icon={isShowNamesOnCards ? faEyeRegular : faEyeSlashRegular} />
          </button>
        </Tooltip>
        <Tooltip placement="bottomRight" overlay={<span>Show details on cards</span>}>
          <button
            className={cssButton.ButtonInGroupStyle}
            value={isShowDetailsOnCard}
            onClick={() =>
              setIsShowDetailsOnCard((prevShowDetailsOnCard) => !prevShowDetailsOnCard)
            }
          >
            <FontAwesomeIcon icon={isShowDetailsOnCard ? faEyeSolid : faEyeSlashSolid} />
          </button>
        </Tooltip>
      </div>

      <div>
        Faction
        <FilterButton btnkey="faction" filters={filters.faction} setFilters={setFilters}>
          {Object.keys(factionMapping).map((faction) => (
            <div key={factionMapping[faction]}>{factionMapping[faction]}</div>
          ))}
        </FilterButton>
      </div>
      <div style={{ paddingRight: "5px" }}>
        Manacost
        <FilterButton
          btnkey="manacost"
          filters={filters.manacost}
          setFilters={setFilters}
          isShowTooltip={false}
        >
          {MANACOST.map((number) => (
            <div key={number}>{number}</div>
          ))}
        </FilterButton>
      </div>
      <div className={cssButton.ButtonGroupStyle}>
        <button
          className={classnames([
            sortByMana === "asc" ? cssButton.isButtonActive : cssButton.isButtonInactive,
            cssButton.ButtonInGroupStyleWithState,
          ])}
          onClick={() => setSortByMana("asc")}
        >
          <Tooltip placement="bottomRight" overlay={<span> Sort Mana Ascending</span>}>
            <FontAwesomeIcon icon={faSortAmountUp} />
          </Tooltip>
        </button>
        <button
          className={classnames([
            sortByMana === "desc" ? cssButton.isButtonActive : cssButton.isButtonInactive,
            cssButton.ButtonInGroupStyleWithState,
          ])}
          onClick={() => setSortByMana("desc")}
        >
          <Tooltip placement="bottomRight" overlay={<span> Sort Mana Descending</span>}>
            <FontAwesomeIcon icon={faSortAmountDown} />
          </Tooltip>
        </button>
      </div>
      <div>
        Rarity
        <FilterButton btnkey="rarity" filters={filters.rarity} setFilters={setFilters}>
          {Object.keys(RarityMappingConfig).map((rarity) => (
            <div key={rarity} style={{ color: RarityMappingConfig[rarity] }}>
              {rarity !== "Perk" ? (
                <FontAwesomeIcon icon={faSquare} size={"xs"} />
              ) : (
                <PerkMasterIcon />
              )}
            </div>
          ))}
        </FilterButton>
      </div>
      <div>
        Type
        <FilterButton btnkey="type" filters={filters.type} setFilters={setFilters}>
          {Object.keys(typeMapping).map((type) => (
            <div key={type}>
              <FontAwesomeIcon icon={typeMapping[type]} size="xs" />
            </div>
          ))}
        </FilterButton>
      </div>
      <div>
        Attack
        <FilterButton btnkey="targets" filters={filters.targets} setFilters={setFilters}>
          {Object.keys(targetsMapping).map((target) => (
            <div key={target}>{targetsMapping[target]}</div>
          ))}
        </FilterButton>
      </div>

      <div>
        <div>Unit Count</div>
        <div className={cssButton.ButtonGroupStyle}>
          {ALL_UNIT_COUNT_DEFAULT_CONFIG.map(({ btnkey }, position) => (
            <button
              className={classnames(
                countFilter[position].isActive
                  ? cssButton.isButtonActive
                  : cssButton.isButtonInactive,
                cssButton.ButtonInGroupStyleWithState
              )}
              key={`unitcount_${btnkey}`}
              onClick={() => {
                setCountFilter((prevCounterFilter) => {
                  const newCounterFilter = cloneDeep(prevCounterFilter);
                  newCounterFilter[position].isActive = !prevCounterFilter[position].isActive;
                  return newCounterFilter;
                });
              }}
            >
              {btnkey}
            </button>
          ))}
        </div>
      </div>

      <div className={cssButton.ButtonGroupStyle}>
        <button
          className={cssButton.ButtonInGroupStyle}
          onClick={() => {
            setFilters(setAllFilterStates(false));
            setIsShowNamesOnCards(false);
            setIsShowDetailsOnCard(false);
            setName("");
            setSortByMana("asc");
            setCountFilter(ALL_UNIT_COUNT_DEFAULT_CONFIG);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Reset
        </button>
      </div>

      {children}
    </div>
  );
}
