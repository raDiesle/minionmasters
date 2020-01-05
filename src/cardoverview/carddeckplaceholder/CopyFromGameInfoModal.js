import ReactModal from "react-modal";
import React from "react";

export default function CopyFromGameInfoModal({isOpenCopyInfo, setIsOpenCopyInfo}) {
    return <ReactModal
        isOpen={
            isOpenCopyInfo
        }
        onRequestClose={() => setIsOpenCopyInfo(false)}
    >
        <h2>How to import current deck from game to here</h2>

        <ol>

            <li>Card Names must be english, so Minionmasters must be selected to "English"</li>
            <li>Type in Minionmasters chat <code>/cd</code></li>
            <li>Insert in Input "Copy from game" by CTRL+V or (Mouse right click)+Insert</li>
        </ol>
    </ReactModal>
}