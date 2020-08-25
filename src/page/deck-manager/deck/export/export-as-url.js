// Export to URL
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";

import copy from "copy-to-clipboard";
import { generateDynamicLink } from "mm-dynamic-link";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { getCardIdsFromCount } from "page/deck-manager/deck/export/export-helper";
import { DEFAULT_MASTER_NOT_SELECTED } from "page/page-config";
import Tooltip from "rc-tooltip";
import React from "react";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";

export function toParams(selectedMaster, lastSelectedCards) {
  const lastSelectedCardiDs = getCardIdsFromCount(lastSelectedCards);
  const iDsToParam = lastSelectedCardiDs.join("&iD=");

  const masterParam = `master=${
    mastersMapping[selectedMaster] ? mastersMapping[selectedMaster].iD : DEFAULT_MASTER_NOT_SELECTED
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
  const deckIdParamPrefix = `&deckId=${deckId}`;
  return <ExportAsUrl url={url + deckIdParamPrefix} />;
}

export function ExportAsUrlFromDeckManager({ selectedMaster, lastSelectedCards }) {
  const url = exportDeckUrl(selectedMaster, lastSelectedCards);
  return <ExportAsUrl url={url} />;
}

function ExportAsUrl({ url }) {
  const handleCopyButtonClick = () => {
    generateDynamicLink(url).then(({ data: { shortLink } }) => {
      copy(shortLink);
      mToast("Link copied to clipboard");
    });
  };

  return (
    <ButtonGroupStyle>
      <Tooltip placement="topLeft" overlay={<span>To share deck with others by link.</span>}>
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
          onClick={() => handleCopyButtonClick()}
        >
          <FontAwesomeIcon icon={faLink} />
          <span className={cssHelpers.hideOnMobile}>Share link</span>
        </button>
      </Tooltip>
    </ButtonGroupStyle>
  );
}
