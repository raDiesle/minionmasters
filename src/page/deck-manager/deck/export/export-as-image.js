import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import copy from "copy-to-clipboard";
import { generateDynamicLink } from "mm-dynamic-link";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import css from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import Tooltip from "rc-tooltip";
import React from "react";

// not used anymore
const IMAGE_SERVER = `https://minionmastersmanager-286215.ew.r.appspot.com/screenshot`;
export default function ExportAsImage({ url }) {
  const handleCopyButtonClick = () => {
    const shareImageUrl = `${IMAGE_SERVER}/${encodeURIComponent(
      url + "&isPreview"
    )}?width=917&height=101`;

    generateDynamicLink(shareImageUrl).then(({ data: { shortLink } }) => {
      copy(shortLink);
      mToast("Link copied to clipboard");
    });
  };

  return (
    <ButtonGroupStyle>
      <Tooltip
        placement="topLeft"
        overlay={<span>Link will be resolved as image without link in Discord automatically.</span>}
      >
        <button
          className={classnames(css.buttonSpacingNoTextOnMobile, css.ButtonInGroupStyle)}
          onClick={() => handleCopyButtonClick()}
        >
          <FontAwesomeIcon icon={faImage} />
          <span className={cssHelpers.hideOnMobile}>Image Link</span>
        </button>
      </Tooltip>
    </ButtonGroupStyle>
  );
}
