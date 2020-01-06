import ReactModal from "react-modal";
import React from "react";

export default function ImportFromGameModal({isOpenCopyInfo, setIsOpenCopyInfo}) {
    return <ReactModal
        isOpen={
            isOpenCopyInfo
        }
        onRequestClose={() => setIsOpenCopyInfo(false)}
    >
        <h2>How to import current deck from game to here</h2>

        <ol>
            <li>Switch Minionmasters to "English" language</li>
            <li>Select deck you want to copy</li>
            <li>Type in Minionmasters chat
                <div>
                    <code>/copydeck</code>
                </div>
            </li>
            <li>Go to webapp and "Paste here"
                <div>
                    by <code>CTRL+V</code>
                    or
                    <code>*Mouse right click* + Insert</code>
                </div>
            </li>
        </ol>

        <button onClick={() => setIsOpenCopyInfo(false)}>Close</button>
    </ReactModal>
}