import React from "react";
import {FacebookIcon, FacebookShareButton} from "react-share";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import styled from "styled-components";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";

const CardShareWithGameStyle = styled.img`
  height: 20px;
`;

export default function CardDeckShare({lastSelectedCards}) {
    const lastSelectedCardPageIds = lastSelectedCards.filter(Boolean).map(({card: {pageId}}) => pageId);
    const pageIdsToParam = lastSelectedCardPageIds.join("&pageId=");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?pageId=${pageIdsToParam}`;

    let defaultHero = "Stormbringer: ";
    const cardShareWithGame = defaultHero + lastSelectedCards.map(({card: {name}}) => name).join(", ");

    return (
        <div>
            <b>Share configured deck</b>
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

                <ButtonInGroupStyle>
                    <CopyToClipboard
                        text={cardShareWithGame}
                        onCopy={() => {
                            toast("Deck copied to clipboard. Write '/sd STRG+V' in Minionmasters chat");
                        }}
                        title="Export for game"
                    >
                        <CardShareWithGameStyle
                            src="https://gamepedia.cursecdn.com/minionmasters_gamepedia_en/thumb/d/dc/MinionMasters_Logo.png/300px-MinionMasters_Logo.png?version=60c9a126af63c994ad0f5a733491a34d"
                            alt="minionmasters game"
                        />
                    </CopyToClipboard>
                </ButtonInGroupStyle>
            </ButtonGroupStyle>
        </div>
    );
}