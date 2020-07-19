import {IDENTIFIER_FOR_EMPTY_SLOT} from "page/carddeck/DeckContainer";
import css from "page/carddeck/Guide.module.scss";
import React from "react";
import {toast} from "react-toastify";
import styled from "styled-components";
import cardData from "../../../generated/jobCardProps";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../../filters/ButtonFilterGroup";

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

const MissingCardMessage = (({nameExtracted}) => <>
    <MissingCardStyle>{nameExtracted}</MissingCardStyle>
    is missing in
    gamepedia wiki and will be skipped
</>);


export default function ImportFromGame({setLastSelectedCards, setSelectedHero}) {

// Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
    const handleCopyPasteFromGame = (event) => {

        try {
            let value = event.target.value;
            let endOfHeroNamePos = value.indexOf(":");

            const heroName = value.substring(0, endOfHeroNamePos);
            const cardNamesValue = value.substring(endOfHeroNamePos + 2);
            const cardNames = cardNamesValue.split(", ");
            const cards = cardNames.map((nameExtracted) => {
                const matchedCardData = cardData.find(({name}) => name === nameExtracted);
                if (matchedCardData === undefined) {
                    toast(<MissingCardMessage nameExtracted={nameExtracted}/>);
                    return {
                        iD: IDENTIFIER_FOR_EMPTY_SLOT
                    };
                } else {
                    return matchedCardData;
                }
            });
            const cardsOnDeckSlots = cards.map(card => {
                return {eventId: 0, card}
            });

            if (endOfHeroNamePos === -1 || cards.length === 0 || cardNames[0] === "" || cardsOnDeckSlots.length === 0) {
                throw new Error("could not parse from game");
            }
            setLastSelectedCards(cardsOnDeckSlots);
            setSelectedHero(heroName);
            toast("Imported");
        } catch (e) {
            toast("Could not copy paste from game.    Please read the info.");
        }
    };

    return (
        <CardeckPlaceholderStyle>
            <div>
                <h3>Import from game</h3>
                <ol className={css.olGuide}>
                    <li>In game, select the deck and master you want to copy</li>
                    <li>In Minionmasters chat type:
                        <div>
                            <code>/copydeck</code>
                        </div>
                    </li>
                    <li>
                        Focus:
                        <ButtonGroupStyle>
                            <ButtonInGroupStyle>
                                <InputTextStyle value=""
                                                placeholder="Paste here"
                                                onInput={handleCopyPasteFromGame}
                                                onChange={() => {
                                                }}/>
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