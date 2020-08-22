import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { useGaTrackView } from "footer/consent-cookie-banner";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";

import css from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import ExportAsImage from "page/deck-manager/deck/export/export-as-image";
import { exportDeckUrl } from "page/deck-manager/deck/export/export-as-url";
import cssGuide from "page/deck-manager/deck/Guide.module.scss";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { FacebookIcon, FacebookShareButton } from "react-share";
import { toast } from "react-toastify";
import styled from "styled-components";

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

export default function ExportDeck({ lastSelectedCards, selectedMaster }) {
  useGaTrackView("/ExportActions");
  if (typeof selectedMaster === undefined || selectedMaster === "") {
    return (
      <div>
        <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />
        You must select master first to export.
      </div>
    );
  }

  // Export to game
  const cardsToGameString = `${lastSelectedCards
    .filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
    .map(({ card: { name } }) => name)
    .join(", ")}`;

  const cardShareWithGame = `/setdeck ${selectedMaster}: ${cardsToGameString}`;

  const url = exportDeckUrl(selectedMaster, lastSelectedCards);

  return (
    <div>
      <ExportStyle>
        <ButtonGroupStyle>
          <div className={classnames(css.ButtonInGroupStyle, css.fixedWidth)}>
            <FacebookShareButton
              url={url}
              style={{ padding: "5px" }}
              quote="My Minionmaster deck"
              hashtag="minionmastersdecks"
            >
              <div style={{ display: "flex", alignContent: "center" }}>
                <FacebookIcon size={24} round />
                <span style={{ paddingLeft: "5px" }}>Create post in Facebook</span>
              </div>
            </FacebookShareButton>
          </div>
        </ButtonGroupStyle>

        <ExportAsImage url={url} />

        <ExportInGameStyleContainer>
          <div>
            <h3>Minionmasters Game</h3>
            <ol className={cssGuide.olGuide}>
              <li>
                Press:
                <ButtonGroupStyle>
                  <CopyToClipboard
                    text={cardShareWithGame}
                    onCopy={() => {
                      toast("Deck copied to clipboard. STRG+V in Minionmasters chat");
                    }}
                    title="Export for game"
                  >
                    <button
                      className={classnames(css.ButtonInGroupStyle)}
                      style={{
                        width: `${315}px`,
                        paddingLeft: "20px",
                        lineHeight: "1.5",
                      }}
                    >
                      Export-command for game copy-button
                    </button>
                  </CopyToClipboard>
                </ButtonGroupStyle>
              </li>
              <li>Open Minionmasters game & select deck slot to replace with</li>
              <li>
                Select chat and <code>STRG+V</code> to insert
              </li>
              <li>
                Press <code>ENTER</code> to send command to chat
              </li>
            </ol>
          </div>
        </ExportInGameStyleContainer>
      </ExportStyle>
    </div>
  );
}
