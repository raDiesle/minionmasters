import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import React, {useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import cardData from "../../generated/jobCardProps";
import {toast} from "react-toastify";
import CopyFromGameInfoModal from "./CopyFromGameInfoModal";

const CardeckPlaceholderStyle = styled.div`
  display: flex;
  & > * {
    padding-right: 10px;
  }
`;

const InputTextStyle = styled.input`
  color: #444;
  background-color: #fff;
  border: 1px solid #444;
  font-weight: bold;
  width: 170px;
  height: 24px;
`;


export default function CarddeckPlaceholder({setShowDeck, setLastSelectedCards}) {
    const [isOpenCopyInfo, setIsOpenCopyInfo] = useState(false);

// Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
    const handleCopyPasteFromGame = (event) => {
        try {
            let value = event.target.value;
            let endOfHeroNamePos = value.indexOf(":");

            const heroName = value.substring(0, endOfHeroNamePos);
            const cardNamesValue = value.substring(endOfHeroNamePos + 2);
            const cardNames = cardNamesValue.split(", ");
            const cards = cardNames.map((nameExtracted) => cardData.find(({name}) => name === nameExtracted));
            const cardsOnDeckSlots = cards.map(card => {
                return {eventId: 0, card}
            });
            debugger;
            if (endOfHeroNamePos === -1 || cards.length === 0 || cardNames[0] === "" || cardsOnDeckSlots.length === 0) {
                throw ("could not parse from game");
            }
            setShowDeck(true);
            setLastSelectedCards(cardsOnDeckSlots);
        } catch (e) {
            toast("Could not copy paste from game.    Please read the info.")
        }
    };

    return (<CardeckPlaceholderStyle>
        <ButtonGroupStyle>
            <ButtonInGroupStyle onClick={() => setShowDeck(true)}>
                Add Deck and share it
            </ButtonInGroupStyle>
        </ButtonGroupStyle>
        <ButtonGroupStyle>
            <ButtonInGroupStyle>
                <InputTextStyle value="" placeholder="Copy from game" onInput={handleCopyPasteFromGame}
                                onChange={(event) => {
                                }}/>
            </ButtonInGroupStyle>
            <ButtonInGroupStyle onClick={() => setIsOpenCopyInfo(true)}>
                <FontAwesomeIcon icon={faInfoCircle}/>
            </ButtonInGroupStyle>
        </ButtonGroupStyle>
        <hr style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: .5,
            borderColor: '#000000'
        }}/>
        <CopyFromGameInfoModal isOpenCopyInfo={isOpenCopyInfo} setIsOpenCopyInfo={setIsOpenCopyInfo}/>
    </CardeckPlaceholderStyle>);
}