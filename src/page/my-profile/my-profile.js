import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import mToast from "components/mToast";
import cssNeon from "components/neon-effect.module.scss";
import cardData from "generated/jobCardProps.json";
import localStorage from "local-storage";
import isEmpty from "lodash/isEmpty";
import { AVAILABLE_CARDS_LOCALSTORAGE_KEY } from "page/my-profile/my-profile-config";
import css from "page/my-profile/my-profile.module.scss";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const normalizedValueFn = (pastedValue) => {
  const VOLCO_ALL_IN_CARD_ID = 18;
  const CURSED_FIREBALL_ID = 109;
  return pastedValue
    .trim()
    .split(" ")
    .map(Number)
    .filter((val) => ![VOLCO_ALL_IN_CARD_ID, CURSED_FIREBALL_ID].includes(val));
};

export function MyProfile({ yourAvailableCardIds, setAvailableCards }) {
  const [toPasteAvailableCards, setToPasteAvailableCards] = useState(false);

  const totalCountOfCards = cardData.filter(({ rarity }) => rarity !== "Perk");

  const cards = yourAvailableCardIds.map((idFromLocalstorage) => {
    const matchedCard = cardData.find((card) => {
      return card.iD === idFromLocalstorage;
    });
    return matchedCard;
  });
  const availableCardsWithData = cards.filter(({ rarity }) => rarity !== "Perk");

  const handlePastedGaoc = (e) => {
    const pastedValue = e.currentTarget.value;
    if (pastedValue) {
      const normalizedAvailableCards = normalizedValueFn(pastedValue);
      localStorage(AVAILABLE_CARDS_LOCALSTORAGE_KEY, normalizedAvailableCards);
      setAvailableCards(normalizedAvailableCards);
      mToast("Successful imported all your cards.");
    }
  };

  return (
    <div>
      <h3>Sync available cards from game</h3>

      <fieldset className={css.status}>
        <legend>Status of last synchronization</legend>
        {isEmpty(yourAvailableCardIds) ? (
          <div className={css.statusMissing}>You have no cards synced, yet</div>
        ) : (
          <div className={css.statusOk}>
            You own{" "}
            <b>
              {availableCardsWithData.length}/{totalCountOfCards.length}
            </b>{" "}
            cards
          </div>
        )}
      </fieldset>

      <div className={classnames(cssButton.ButtonGroupStyle)}>
        {!toPasteAvailableCards ? (
          <CopyToClipboard
            text={"/gaoc"}
            onCopy={() => {
              toast(
                "Command copied. Paste it anywhere in Minionmasters game chat and press ENTER."
              );
              setToPasteAvailableCards(true);
            }}
            title="Import your available cards from game"
          >
            <button className={classnames(cssButton.ButtonInGroupStyle)}>
              <div className={classnames(isEmpty(yourAvailableCardIds) && cssNeon.neonEffect)}>
                Click here to copy command
              </div>
            </button>
          </CopyToClipboard>
        ) : (
          <input type="text" placeholder="paste here" onChange={(e) => handlePastedGaoc(e)} />
        )}
      </div>

      <div>
        <h4>How to</h4>
        <ol>
          <li>Click button to copy chat command</li>
          <li>Switch to game</li>
          <li>
            Paste command and press <code>Enter</code>
          </li>
          <li>Switch back to this page and paste command in Text-Input</li>
          <li>Your cards will be remembered in browser.</li>
        </ol>

        <h4>Features</h4>
        <ol>
          <li>See available cards when building deck</li>
          <li>Filter decks by your cards</li>
          <li>
            Let others see your available cards, so they can help you to build decks, whenever you
            share link
          </li>
        </ol>
      </div>
    </div>
  );
}
