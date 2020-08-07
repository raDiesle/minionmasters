import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons/faMinusSquare";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RARITY_KEYS } from "rarity/RARITY_MAPPING_CONFIG";
import React from "react";
import styled from "styled-components";

export default function CardActionAddOrRemoveCardToDeck({ card, isDeckCard, onClick }) {
  const IconStyleSize = styled.div`
    & > svg {
      vertical-align: bottom;
      font-size: 25px;
      @media (max-width: 767px) {
        font-size: 0.6rem;
      }
    }
  `;

  const AddCardToDeckOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0px;
    padding: 59% 50%;

    &:hover {
      cursor: pointer;
    }

    &:hover > div {
      color: yellow;
    }
    &:active > div {
      color: #375a7f;
    }
  `;

  return (
    <>
      {card.rarity !== RARITY_KEYS.Perk && (
        <AddCardToDeckOverlay onClick={onClick}> </AddCardToDeckOverlay>
      )}
    </>
  );
}
