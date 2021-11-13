import React, { useRef } from "react";
import cssButton from "components/button.module.scss";
import * as classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import cssHelpers from "components/helper.module.scss";
import { useScreenshot } from "use-react-screenshot";
import { getBlobFromImageElement, copyBlobToClipboard } from "copy-image-clipboard";
import useAsyncEffect from "use-async-effect";
import mToast from "components/mToast";

export const Copyasimagetoclipboardbutton = ({ deckWithAnalysisRef } ) => {
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => {
    takeScreenshot(deckWithAnalysisRef.current);
  }

  const imageHolderRef = useRef(null);

  useAsyncEffect(async() => {
    if(image !== null){
      const blob = await getBlobFromImageElement(imageHolderRef.current);
      await copyBlobToClipboard(blob);
      mToast("Deck is copied as image copied to clipboard.");
    }
  }, [image]);

  // const downloadRef = useRef(null);
   /* if(downloadRef.current !== null){
      downloadRef.current.click();
    };*/
  return (<div className={cssButton.ButtonGroupStyle} >
    <button
      className={classnames(
        cssButton.buttonSpacingNoTextOnMobile,
        cssButton.ButtonInGroupStyle
      )}
      onClick={getImage}
    >
      <FontAwesomeIcon icon={faCopy} />
      {/*<a download='name' href={image} ref={downloadRef}><img src='image'/></a>*/}
      <img src={image} ref={imageHolderRef} style={{display: "none"}}/>
      <span className={cssHelpers.hideOnMobile}>Copy Image</span>
    </button>
  </div>)
};