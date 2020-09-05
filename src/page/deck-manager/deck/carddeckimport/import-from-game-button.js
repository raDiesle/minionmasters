import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import copy from "copy-to-clipboard";
import cardData from "generated/jobCardProps.json";
import { getCardWithDataByListOfId } from "page/deck-manager/deck/carddeckimport/import-helper";
import { INITIAL_EMPTY_SLOT_DATA } from "page/page-config";
import Tooltip from "rc-tooltip";
import React, { useState } from "react";

export function ImportFromGameButton({ setSelectedMaster, setLastSelectedCards }) {
  const handleCopyPasteFromGame = (value) => {
    try {
      let endOfMasterNamePos = value.indexOf(":");

      const masterName = value.substring(0, endOfMasterNamePos);
      const Jahun = "Jahun";
      const Ting = "Ting";
      const tingLong = "Ting, Teng & Tung";
      const jahunLong = "Jahun, Keeper of Jadespark";

      const markdred = "Tardred";
      const mardredLong = "Mar'Dred, Prince of Nightmares";

      const cardNamesValue = value
        .substring(endOfMasterNamePos + 2)
        .replace(/Ting\, Teng \& Tung/g, "Ting")
        .replace(/Jahun\, Keeper of Jadespark/g, Jahun)
        .replace(/Mar\'Dred\, Prince of Nightmares/g, markdred);

      const cardNames = cardNamesValue.split(", ");

      const cardIds = cardNames.map((nameExtracted) => {
        if (nameExtracted === Ting) {
          nameExtracted = tingLong;
        }
        if (nameExtracted === Jahun) {
          nameExtracted = jahunLong;
        }
        if (nameExtracted === markdred) {
          nameExtracted = mardredLong;
        }

        const matchedCardData = cardData.find(({ name }) => name === nameExtracted);
        return matchedCardData.iD;
      });

      const cardsOnDeckSlots = getCardWithDataByListOfId(cardIds);

      const cardsOnDeckSlotsFilled = INITIAL_EMPTY_SLOT_DATA.map((data, index) =>
        cardsOnDeckSlots[index] ? cardsOnDeckSlots[index] : data
      );

      /*
      const cardsOnDeckSlots = cards.map((card) => {
        return { card };
      });
       */

      if (
        endOfMasterNamePos === -1 ||
        //cards.length === 0 ||
        cardNames[0] === "" ||
        cardsOnDeckSlotsFilled.length === 0
      ) {
        throw new Error("could not parse from game");
      }

      setLastSelectedCards(cardsOnDeckSlotsFilled);
      setSelectedMaster(masterName);
      setIsCopiedCommand(false);
      mToast("Imported");
    } catch (e) {
      mToast("Could not copy paste from game.");
      throw e;
      console.error(value);
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
