// Export to URL
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { getCardIdsFromCount } from "page/deck-manager/deck/export/export-helper";
import { DEFAULT_MASTER_NOT_SELECTED } from "page/page-config";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import css from "./export-button.module.scss";

export function toParams(selectedMaster, lastSelectedCards) {
  const lastSelectedCardiDs = getCardIdsFromCount(lastSelectedCards);
  const iDsToParam = lastSelectedCardiDs.join("&iD=");

  const masterParam = `master=${
    mastersMapping[selectedMaster] ? mastersMapping[selectedMaster].iD : DEFAULT_MASTER_NOT_SELECTED
  }`;
  const params = `?${masterParam}&iD=${iDsToParam}`;
  return params;
}

export function exportDeckUrl(selectedMaster, lastSelectedCards) {
  const params = toParams(selectedMaster, lastSelectedCards);
  const port = window.location.port === "3000" ? `:${window.location.port}` : "";
  // const path = "preview"; // indicator for preview   //`${window.location.pathname}`;
  const url = `${window.location.protocol}//${window.location.hostname}${port}/${params}`;
  return url;
}

export function ExportAsUrl({ selectedMaster, lastSelectedCards }) {
  const url = exportDeckUrl(selectedMaster, lastSelectedCards);

  return (
    <ButtonGroupStyle>
      <CopyToClipboard
        text={url}
        onCopy={() => {
          mToast("Link copied to clipboard");
        }}
        title="To share by Discord, Twitter, Facebook with Image Preview without saving to database."
      >
        <button className={classnames(css.button, cssButton.ButtonInGroupStyle)}>
          <FontAwesomeIcon icon={faLink} />
          <span style={{ paddingLeft: "4px" }} className={cssHelpers.hideOnMobile}>
            Copy link
          </span>
        </button>
      </CopyToClipboard>
    </ButtonGroupStyle>
  );
}
