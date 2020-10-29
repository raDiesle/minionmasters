import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import copy from "copy-to-clipboard";
import { generateDynamicLink } from "mm-dynamic-link";
import Tooltip from "rc-tooltip";
import React from "react";

// not used anymore
const IMAGE_SERVER = `https://minionmastersmanager-286215.ew.r.appspot.com/screenshot`;
export default function ExportAsImage({ urlFn }) {
  const handleCopyButtonClick = () => {
    // should be in sync with backend rendering meta tag height
    const HEIGHT = `301`;
    const WIDTH = `945`;
    // TODO IF PREMADE

    const shareImageUrl = `${IMAGE_SERVER}/${encodeURIComponent(
      urlFn() + "&isPreview"
    )}?width=${WIDTH}&height=${HEIGHT}`;

    generateDynamicLink(shareImageUrl).then(({ data: { shortLink } }) => {
      copy(shortLink);
      mToast("Link copied to clipboard");
    });
  };

  return (
    <div className={cssButton.ButtonGroupStyle}>
      <Tooltip placement="topLeft" overlay={<span>To paste without edit link.</span>}>
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
          onClick={() => handleCopyButtonClick()}
        >
          <FontAwesomeIcon icon={faImage} />
          <span className={cssHelpers.hideOnMobile}>Image Link</span>
        </button>
      </Tooltip>
    </div>
  );
}
