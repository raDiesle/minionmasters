import cssButton from "components/button.module.scss";
import * as classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import cssHelpers from "components/helper.module.scss";
import React from "react";
import { INITIAL_EMPTY_SLOT_DATA } from "page/page-config";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs";
import { ALL_NORMAL_CARDS } from "page/deck-manager/build/filters-with-cards";
import Tooltip from "rc-tooltip";

export function RandomGenerateDeck({ setCards, setSelectedMaster, availableCards }) {
  const poolOfCardsToChoose = availableCards.length === 0 ? ALL_NORMAL_CARDS : availableCards;

  const getRandomDeckSlots = () => {
    return INITIAL_EMPTY_SLOT_DATA.map((current, index, all) => {
      const position = Math.floor(Math.random() * poolOfCardsToChoose.length);
      const randomCard = poolOfCardsToChoose[position];
      poolOfCardsToChoose.splice(position, 1);
      return { card: randomCard, count: 1 };
    });
  };

  const getRandomMaster = () => {
    const masterKeys = Object.keys(mastersMapping).map((masterKey) => masterKey);
    const position = Math.floor(Math.random() * masterKeys.length);
    return masterKeys[position];
  };

  const setRandomDeckToPlayerOne = () => {
    setSelectedMaster(getRandomMaster());
    setCards(getRandomDeckSlots());
  };

  return (
    <div className={cssButton.ButtonGroupStyle}>
      <Tooltip
        placement="bottomLeft"
        overlay={
          <div>
            Picks random cards. If you have your available cards configured in "My profile", it will
            take cards from there, instead.
          </div>
        }
      >
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
          onClick={() => setRandomDeckToPlayerOne()}
        >
          <FontAwesomeIcon icon={faCogs} />
          <span className={cssHelpers.hideOnMobile}>Generate Random Deck</span>
        </button>
      </Tooltip>
    </div>
  );
}
