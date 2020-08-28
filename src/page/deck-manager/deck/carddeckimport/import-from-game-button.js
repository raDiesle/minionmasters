import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import copy from "copy-to-clipboard";
import cardData from "generated/jobCardProps.json";
import { getCardWithDataByListOfId } from "page/deck-manager/deck/carddeckimport/import-helper";
import Tooltip from "rc-tooltip";
import React, { useState } from "react";

export function ImportFromGameButton({ setSelectedMaster, setLastSelectedCards }) {
  const handleCopyPasteFromGame = (value) => {
    try {
      let endOfMasterNamePos = value.indexOf(":");

      const masterName = value.substring(0, endOfMasterNamePos);
      const cardNamesValue = value.substring(endOfMasterNamePos + 2);
      const cardNames = cardNamesValue.split(", ");

      const cardIds = cardNames.map((nameExtracted) => {
        const matchedCardData = cardData.find(({ name }) => name === nameExtracted);
        return matchedCardData.iD;
      });

      const cardsOnDeckSlots = getCardWithDataByListOfId(cardIds);

      /*
      const cardsOnDeckSlots = cards.map((card) => {
        return { card };
      });
       */

      if (
        endOfMasterNamePos === -1 ||
        //cards.length === 0 ||
        cardNames[0] === "" ||
        cardsOnDeckSlots.length === 0
      ) {
        throw new Error("could not parse from game");
      }

      setLastSelectedCards(cardsOnDeckSlots);
      setSelectedMaster(masterName);
      setIsCopiedCommand(false);
      mToast("Imported");
    } catch (e) {
      mToast("Could not copy paste from game. Jahun and Ting Teng Tung does not work right now.");
      throw e;
    }
  };

  const [isCopiedCommand, setIsCopiedCommand] = useState(false);
  const handleCopyButtonClick = () => {
    copy("/copydeck");
    mToast(
      <div>
        /copydeck copied to clipboard
        <ol>
          <li>Go to Minionmasters game</li>
          <li>Select chat and paste command</li>
          <li>Press Enter</li>
          <li>Go back to webapp and paste</li>
        </ol>
      </div>,
      10000
    );
    setIsCopiedCommand(true);
  };

  if (isCopiedCommand) {
    return (
      <div className={cssButton.ButtonGroupStyle}>
        <input
          type="text"
          placeholder="paste here"
          onChange={(e) => {
            const pastedValue = e.currentTarget.value;
            if (pastedValue) {
              handleCopyPasteFromGame(pastedValue);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={cssButton.ButtonGroupStyle}>
      <Tooltip
        placement="bottomLeft"
        overlay={
          <div>
            <ol>
              <li>Click button to copy command to clipboard.</li> <li>Go to MM game.</li>
              <li>Paste command in chat</li>
              <li>Press Enter</li>
              <li>Go back to webapp and paste</li>
            </ol>
          </div>
        }
      >
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
          onClick={() => handleCopyButtonClick()}
        >
          <FontAwesomeIcon icon={faGamepad} />
          <span className={cssHelpers.hideOnMobile}>Import from game</span>
        </button>
      </Tooltip>
    </div>
  );
}
