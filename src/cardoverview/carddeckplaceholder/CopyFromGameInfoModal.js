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

        <div>
            1. Card Names must be english, so Minionmasters must be selected to "English"
            2. type in Minionmasters chat <code>/cd</code>
            3. Insert in Input "Copy from game" by CTRL+V or (Mouse right click)+Insert
        </div>
    </ReactModal>
}