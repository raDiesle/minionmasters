import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import {IDENTIFIER_FOR_EMPTY_SLOT} from "page/carddeck/DeckContainer";
import css from "page/filters/ButtonFilterGroup.module.scss";
import {mastersMapping} from "page/mastersoverview/mastersMapping";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

import {FacebookIcon, FacebookShareButton} from "react-share";
import {toast} from "react-toastify";
import styled from "styled-components";
import {ButtonGroupStyle} from "../filters/ButtonFilterGroup";

const ExportStyle = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    padding-bottom: 5px; 
  }
`;

const ExportInGameStyleContainer = styled.div`
  padding-top: 20px;
`;

export default function ExportActions({lastSelectedCards, selectedHero}) {

    if (typeof selectedHero === undefined || selectedHero === "") {
        return <div>
            <FontAwesomeIcon icon={faExclamationTriangle} color="orange"/>
            You must select hero first to export.
        </div>;
    }
// Export to URL
    const lastSelectedCardiDs = lastSelectedCards.reduce((total, {count, card: {iD}}) => {
        const wildcardsToMultipleIds = [...Array(count).keys()].map(() => iD);
        const mergeTotal = [...total, ...wildcardsToMultipleIds];
        return mergeTotal;
    }, []);
    const iDsToParam = lastSelectedCardiDs.join("&iD=");

    const heroParam = `hero=${mastersMapping[selectedHero].iD}`;
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?${heroParam}&iD=${iDsToParam}`;

// Export to game
    const cardsToGameString = `${lastSelectedCards.filter(({card: {iD}}) => iD !== IDENTIFIER_FOR_EMPTY_SLOT).map(({card: {iD}}) => iD).join(" ")}`;
    const cardShareWithGame = `/setdeck ${mastersMapping[selectedHero].iD}} ${cardsToGameString}`;

    return (
        <div>
            <ExportStyle>
                <ButtonGroupStyle>
                    <div className={classnames(css.ButtonInGroupStyle, css.fixedWidth)}>
                        <FacebookShareButton url={url}
                                             style={{padding: "5px"}}
                                             quote="My Minionmaster deck"
                                             hashtag="minionmastersdecks">
                            <div style={{display: "flex", alignContent: "center"}}>
                                <FacebookIcon size={24} round/>
                                <span style={{paddingLeft: "5px"}}>Share in Facebook</span>
                            </div>
                        </FacebookShareButton>
                    </div>
                </ButtonGroupStyle>
                <ButtonGroupStyle>
                    <CopyToClipboard
                        text={url}
                        onCopy={() => {
                            toast("Link copied to clipboard");
                        }}
                        title="Copy link"
                    >
                        <button className={classnames(css.ButtonInGroupStyle, css.fixedWidth)}>
                            <FontAwesomeIcon icon={faLink} size="xs"
                                             style={{marginLeft: "5px"}}
                            />
                            <span style={{paddingLeft: "11px"}}>Share by link</span>
                        </button>
                    </CopyToClipboard>
                </ButtonGroupStyle>
                <ExportInGameStyleContainer>

                    <div>
                        <h4>How to export current deck to Minionmasters game</h4>
                        <ol>
                            <li>Press
                                <ButtonGroupStyle>
                                    <CopyToClipboard
                                        text={cardShareWithGame}
                                        onCopy={() => {
                                            toast("Deck copied to clipboard. STRG+V in Minionmasters chat");
                                        }}
                                        title="Export for game"
                                    >
                                        <button className={classnames(css.ButtonInGroupStyle)}
                                                style={{width: `${170 - 30}px`}}
                                        >
                                            Export to game
                                        </button>
                                    </CopyToClipboard>
                                </ButtonGroupStyle>
                            </li>
                            <li>Open Minionmasters game & select deck slot to replace with</li>
                            <li>Select chat and STRG+V to insert</li>
                            <li>Press ENTER to send command to chat</li>
                        </ol>
                    </div>
                </ExportInGameStyleContainer>

            </ExportStyle>

        </div>
    );
}