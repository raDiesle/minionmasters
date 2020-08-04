import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons/faSortAmountDown";
import { faSortAmountUp } from "@fortawesome/free-solid-svg-icons/faSortAmountUp";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setAllFilterStates } from "page/FiltersWithCards";

import { RARITY_MAPPING_CONFIG } from "rarity/RARITY_MAPPING_CONFIG";
import Tooltip from "rc-tooltip";
import React from "react";
import InputRange from "react-input-range";
import styled from "styled-components";
import { targetsMapping } from "../../attack/targetsMapping";
import { typeMapping } from "../../cardtype/typeMapping";

import { factionMapping } from "../../faction/Factions";
import { MANACOST } from "../../manacost/manacost";
import PerkHeroIcon from "../../rarity/PerkHeroIcon";
import { ButtonFilterGroup, ButtonGroupStyle, ButtonInGroupStyle } from "./ButtonFilterGroup";

import "./FilterInputs.scss";

const InputTextStyle = styled.input`
  color: #fff;
  border: 1px solid #000;
  font-weight: bold;
  width: 100px;
  background-color: #444;

  &:hover {
    border-color: yellow;
    outline: none;
  }

  &:focus,
  &:active {
    background-color: #111;
  }
`;

const FilterContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 0 5px 10px 0px;

  & > div {
    padding-right: 20px;
  }
`;

export function FilterInputs({
  filters,
  setFilters,
  name,
  setName,
  isShowNames,
  setIsShowNames,
  sortByMana,
  setSortByMana,
  countFilter,
  setCountFilter,
  children,
}) {
  return (
    <FilterContainerStyle>
      <div>
        <div>Search</div>
        <ButtonGroupStyle>
          <InputTextStyle
            type="text"
            value={name}
            onChange={(event) => {
              event.persist();
              const typedInEventName = event.target.value;
              if (isShowNames === false && typedInEventName !== "") {
                setIsShowNames(true);
              }
              setName(typedInEventName);
            }}
          />

          <Tooltip placement="bottomRight" overlay={<span>Search by Name & Description</span>}>
            <ButtonInGroupStyle>
              <FontAwesomeIcon icon={faInfoCircle} />
            </ButtonInGroupStyle>
          </Tooltip>
          <Tooltip placement="bottomRight" overlay={<span>Show Card Names</span>}>
            <ButtonInGroupStyle
              value={isShowNames}
              onClick={() => setIsShowNames((prevShowNames) => !prevShowNames)}
            >
              <FontAwesomeIcon icon={isShowNames ? faEye : faEyeSlash} />
            </ButtonInGroupStyle>
          </Tooltip>
        </ButtonGroupStyle>
      </div>
      <ButtonGroupStyle>
        <ButtonInGroupStyle onClick={() => setFilters(setAllFilterStates(false))}>
          <FontAwesomeIcon icon={faTrashAlt} /> Reset
        </ButtonInGroupStyle>
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
          {Object.keys(RARITY_MAPPING_CONFIG).map((rarity) => (
            <div key={rarity} style={{ color: RARITY_MAPPING_CONFIG[rarity] }}>
              {rarity !== "Perk" ? (
                <FontAwesomeIcon icon={faSquare} size={"xs"} />
              ) : (
                <PerkHeroIcon />
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

      <div className="countStyle">
        <div>Unit Count</div>
        <InputRange
          maxValue={15}
          minValue={0}
          value={countFilter}
          onChange={(value) => setCountFilter(value)}
        />
      </div>
      {children}
    </FilterContainerStyle>
  );
}
