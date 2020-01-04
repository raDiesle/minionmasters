import {FacebookIcon, FacebookShareButton} from "react-share";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import React from "react";

export default function CardDeckShare({lastSelectedCards}) {

    const lastSelectedCardPageIds = lastSelectedCards.filter(Boolean).map(({card: {pageId}}) => pageId);
    const pageIdsToParam = lastSelectedCardPageIds.join("&pageId=");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?pageId=${pageIdsToParam}`;

    return (
        <div>
            <b>Share configured deck</b>
            <div style={{display: "flex"}}>
                <FacebookShareButton
                    url={url}
                    className="Demo__some-network__share-button">
                    <FacebookIcon
                        size={32}
                        round/>
                </FacebookShareButton>

                <CopyToClipboard
                    text={url}
                    onCopy={() => {
                        toast("Link copied to clipboard");
                    }}
                    title="Copy link"
                >
                    <button>
                        <FontAwesomeIcon icon={faLink}/>
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
}