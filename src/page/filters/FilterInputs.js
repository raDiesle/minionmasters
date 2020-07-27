import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons/faSortAmountDown";
import { faSortAmountUp } from "@fortawesome/free-solid-svg-icons/faSortAmountUp";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons/faSquareFull";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "rc-tooltip";
import React, { useEffect } from "react";
import styled from "styled-components";
import { targetsMapping } from "../../attack/targetsMapping";
import { typeMapping } from "../../cardtype/typeMapping";

import { factionMapping } from "../../faction/Factions";
import { MANACOST } from "../../manacost/manacost";
import PerkHeroIcon from "../../rarity/PerkHeroIcon";

import { rarityMapping } from "../../rarity/rarityMapping";
import { ButtonFilterGroup, ButtonGroupStyle, ButtonInGroupStyle } from "./ButtonFilterGroup";

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
  padding: 0 0 10px 0px;

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
  isDescriptionIncluded,
  setIsDescriptionIncluded,
  sortByMana,
  setSortByMana,
}) {
  return (
    <FilterContainerStyle>
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
          {Object.keys(rarityMapping).map((rarity) => (
            <div key={rarity} style={{ color: rarityMapping[rarity] }}>
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

      <div>
        <div>Name | incl. Description</div>
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
            <ButtonInGroupStyle
              value={isDescriptionIncluded}
              onClick={() =>
                setIsDescriptionIncluded((prevIsDescriptionIncluded) => !prevIsDescriptionIncluded)
              }
            >
              <FontAwesomeIcon icon={isDescriptionIncluded ? faCheckSquare : faSquareFull} />
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
    </FilterContainerStyle>
  );
}
