// Export to URL
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";

import copy from "copy-to-clipboard";
import isEmpty from "lodash.isempty";
import { generateDynamicLink } from "mm-dynamic-link";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { getCardIdsFromCount } from "page/deck-manager/deck/export/export-helper";
import { DEFAULT_MASTER_SELECTED } from "page/page-config";
import Tooltip from "rc-tooltip";
import React from "react";

export function toParams(selectedMaster, lastSelectedCards) {
  const lastSelectedCardiDs = getCardIdsFromCount(lastSelectedCards);
  const iDsToParam = lastSelectedCardiDs.join("&iD=");

  const masterParam = `master=${
    mastersMapping[selectedMaster] ? mastersMapping[selectedMaster].iD : DEFAULT_MASTER_SELECTED
  }`;
  const params = `?${masterParam}&iD=${iDsToParam}`;
  return params;
}

export function exportDeckUrl(
  selectedMaster,
  lastSelectedCards,
  title = "My deck",
  description = "open link to edit or copy deck to game"
) {
  const params = toParams(selectedMaster, lastSelectedCards);
  const titleParams = `&title=${encodeURIComponent(title)}`;
  const descriptionParams = `&description=${encodeURIComponent(description)}`;

  const port = window.location.port === "3000" ? `:${window.location.port}` : "";
  const url = `${window.location.protocol}//${window.location.hostname}${port}/${params}${titleParams}${descriptionParams}`;
  return url;
}

export function ExportAsUrlFromSavedDeck({
  title,
  description,
  deckId,
  selectedMaster,
  lastSelectedCards,
}) {
  const url = exportDeckUrl(selectedMaster, lastSelectedCards, title, description);
  const deckIdParamPrefix = `&deckId=${encodeURIComponent(deckId)}`;
  return <ExportAsUrl url={url + deckIdParamPrefix} />;
}

export const AVAILABLE_CARDS_BY_URL_KEY = `availableCards`;

/* TODO: should only calculate url, when clicked on button */
export function ExportAsUrlFromDeckManager({ selectedMaster, lastSelectedCards, availableCards }) {
  const url = exportDeckUrl(selectedMaster, lastSelectedCards);
  const urlWithYourAvailableCards = `${url}&${AVAILABLE_CARDS_BY_URL_KEY}=${availableCards.join(
    ","
  )}`;

  return <ExportAsUrl url={urlWithYourAvailableCards} availableCards={availableCards} />;
}

function ExportAsUrl({ url, availableCards }) {
  const handleCopyButtonClick = () => {
    generateDynamicLink(url).then(({ data: { shortLink } }) => {
      copy(shortLink);
      mToast("Link copied to clipboard");
    });
  };

  return (
    <div className={cssButton.ButtonGroupStyle}>
      <Tooltip
        placement="topLeft"
        overlay={
          <span>Share link, so others can help you complete deck or suggest other cards.</span>
        }
      >
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
          onClick={() => handleCopyButtonClick()}
        >
          <FontAwesomeIcon icon={faLink} />
          <span className={cssHelpers.hideOnMobile}>
            Share link {!isEmpty(availableCards) && <span>with your available cards</span>}
          </span>
        </button>
      </Tooltip>
    </div>
  );
}
