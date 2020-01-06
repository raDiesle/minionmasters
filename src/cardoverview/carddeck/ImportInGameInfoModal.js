import ReactModal from "react-modal";
import React from "react";

export default function ImportInGameInfoModal({isOpenCopyInfo, setIsOpenCopyInfo}) {
    return <ReactModal
        isOpen={
            isOpenCopyInfo
        }
        onRequestClose={() => setIsOpenCopyInfo(false)}
    >
        <h2>How to export current deck to Minionmasters game</h2>

        <ol>
            <li>Press button to "export"</li>
            <li>Make sure your game is configured in English</li>
            <li>Open Minionmasters game & select deck slot to replace</li>
            <li>Select chat and STRG+V to insert & press ENTER</li>
        </ol>
    </ReactModal>
}