import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {FacebookIcon, FacebookShareButton} from "react-share";
import {toast} from "react-toastify";
import styled from "styled-components";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";

import ExportToGameModal from "./ExportToGameModal";

const ExportStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExportInGameStyleContainer = styled.div`
  padding-top: 20px;
`;

export default function ExportActions({lastSelectedCards, selectedHero}) {
    const [isOpenCopyInfo, setIsOpenCopyInfo] = useState(false);

// Export to URL
    const lastSelectedCardiDs = lastSelectedCards.filter(Boolean).map(({card: {iD}}) => iD);
    const iDsToParam = lastSelectedCardiDs.join("&iD=");
    const heroParam = `hero=${selectedHero}`;
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?${heroParam}&iD=${iDsToParam}`;

// Export to game
    const cardShareWithGame = `/setdeck ${selectedHero}: ${lastSelectedCards.map(({card: {name}}) => name).join(", ")}`;

    return (
        <div>
            <ExportStyle>
                <div>Share by Url</div>
                <ButtonGroupStyle>
                    <ButtonInGroupStyle>
                        <FacebookShareButton url={url}>
                            <FacebookIcon size={24} round/>
                        </FacebookShareButton>
                    </ButtonInGroupStyle>
                    <ButtonInGroupStyle>
                        <CopyToClipboard
                            text={url}
                            onCopy={() => {
                                toast("Link copied to clipboard");
                            }}
                            title="Copy link"
                        >
                            <FontAwesomeIcon icon={faLink} size="xs"/>
                        </CopyToClipboard>
                    </ButtonInGroupStyle>
                </ButtonGroupStyle>
                <ExportInGameStyleContainer>
                    <ButtonGroupStyle>
                        <ButtonInGroupStyle>
                            <CopyToClipboard
                                text={cardShareWithGame}
                                onCopy={() => {
                                    toast("Deck copied to clipboard. STRG+V in Minionmasters chat");
                                }}
                                title="Export for game"
                            >
                                <div>Export to game</div>
                            </CopyToClipboard>
                        </ButtonInGroupStyle>
                        <ButtonInGroupStyle onClick={() => setIsOpenCopyInfo(true)}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                        </ButtonInGroupStyle>
                    </ButtonGroupStyle>
                </ExportInGameStyleContainer>

            </ExportStyle>
            <ExportToGameModal isOpenCopyInfo={isOpenCopyInfo} setIsOpenCopyInfo={setIsOpenCopyInfo}/>
        </div>
    );
}