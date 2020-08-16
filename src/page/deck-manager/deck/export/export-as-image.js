import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import css from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";

export default function ExportAsImage({ url }) {
  const IMAGE_SERVER = `https://minionmastersmanager-286215.ew.r.appspot.com/screenshot`;
  const shareImageUrl = `${IMAGE_SERVER}/${encodeURIComponent(
    url + "&isPreview"
  )}?width=917&height=101`;

  return (
    <ButtonGroupStyle>
      <CopyToClipboard
        text={shareImageUrl}
        onCopy={() => {
          mToast("Link copied to clipboard");
        }}
        title="Copy link"
      >
        <button className={classnames(css.ButtonInGroupStyle)}>
          <FontAwesomeIcon icon={faLink} />
          <span style={{ paddingLeft: "11px" }} className={cssHelpers.hideOnMobile}>
            Share as Image
          </span>
        </button>
      </CopyToClipboard>
    </ButtonGroupStyle>
  );
}
