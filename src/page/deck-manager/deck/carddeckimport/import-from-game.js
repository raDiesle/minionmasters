import mToast from "components/mToast";
import { useGaTrackView } from "footer/consent-cookie-banner";
import cardData from "generated/jobCardProps.json";
import { ButtonGroupStyle, ButtonInGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import { getCardWithDataByListOfId } from "page/deck-manager/deck/carddeckimport/import-helper";
import css from "page/deck-manager/deck/Guide.module.scss";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const CardeckPlaceholderStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  & > * {
    padding-right: 10px;
  }
`;

const InputTextStyle = styled.input`
  color: #444;
  background-color: #fff;
  border: 1px solid #444;
  width: 170px;
  height: 24px;
`;

const MissingCardStyle = styled.span`
  font-weight: bold;
`;

const MissingCardMessage = ({ nameExtracted }) => (
  <>
    <MissingCardStyle>{nameExtracted}</MissingCardStyle>
    is missing in gamepedia wiki and will be skipped
  </>
);

export default function ImportFromGame({ setLastSelectedCards, setSelectedMaster }) {
  useGaTrackView("/ImportFromGame");
  // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
  const handleCopyPasteFromGame = (event) => {
    try {
      let value = event.target.value;
      let endOfMasterNamePos = value.indexOf(":");

      const masterName = value.substring(0, endOfMasterNamePos);
      const cardNamesValue = value.substring(endOfMasterNamePos + 2);
      const cardNames = cardNamesValue.split(", ");

      const cardIds = cardNames.map((nameExtracted) => {
        const matchedCardData = cardData.find(({ name }) => name === nameExtracted);
        if (matchedCardData === undefined) {
          toast(<MissingCardMessage nameExtracted={nameExtracted} />);
          return {
            iD: IDENTIFIER_FOR_EMPTY_SLOT,
          };
        } else {
          return matchedCardData.iD;
        }
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
      mToast("Imported");
    } catch (e) {
      mToast("Could not copy paste from game. Please read the info.");
    }
  };

  return (
    <CardeckPlaceholderStyle>
      <div>
        <h3>Import from game</h3>
        <ol className={css.olGuide}>
          <li>In game, select the deck and master you want to copy</li>
          <li>
            In Minionmasters chat type:
            <div>
              <code>/copydeck</code>
            </div>
          </li>
          <li>
            Focus:
            <ButtonGroupStyle>
              <ButtonInGroupStyle>
                <InputTextStyle
                  value=""
                  placeholder="Paste here"
                  onInput={handleCopyPasteFromGame}
                  onChange={() => {}}
                />
              </ButtonInGroupStyle>
            </ButtonGroupStyle>
            <div>
              and press <code>CTRL+V</code> or <code>*Mouse right click* + Insert</code>
            </div>
          </li>
        </ol>
      </div>
    </CardeckPlaceholderStyle>
  );
}
