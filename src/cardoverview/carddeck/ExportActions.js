import React, {useState} from "react";
import {FacebookIcon, FacebookShareButton} from "react-share";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import styled from "styled-components";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";

import ExportToGameModal from "./ExportToGameModal";

const ExportStyle = styled.div`
  display: flex;
  & > * {
    margin-right: 20px;
  }
`;

export default function ExportActions({lastSelectedCards}) {
    const [isOpenCopyInfo, setIsOpenCopyInfo] = useState(false);

// Export to URL
    const lastSelectedCardPageIds = lastSelectedCards.filter(Boolean).map(({card: {pageId}}) => pageId);
    const pageIdsToParam = lastSelectedCardPageIds.join("&pageId=");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?pageId=${pageIdsToParam}`;

// Export to game
    const mmImportCommand = "/setdeck ";
    const defaultHero = "Stormbringer: ";
    const cardShareWithGame = mmImportCommand + defaultHero + lastSelectedCards.map(({card: {name}}) => name).join(", ");

    return (
        <div>
            <div>Share configured deck</div>
            <ExportStyle>
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

            </ExportStyle>
            <ExportToGameModal isOpenCopyInfo={isOpenCopyInfo} setIsOpenCopyInfo={setIsOpenCopyInfo}/>
        </div>
    );
}