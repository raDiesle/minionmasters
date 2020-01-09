import ReactModal from "react-modal";
import React from "react";

export default function InfoMasterDetailsModal({masterKey, isOpenDetails, setIsOpenDetails}) {
    return (<ReactModal
            isOpen={
                isOpenDetails
            }
            onRequestClose={() => setIsOpenDetails(false)}
        >
            <div>
                <h2>
                    {masterKey}
                </h2>
                <ul>
                    <li>TBD</li>
                </ul>
            </div>
            <div>
                <a href={`https://minionmasters.gamepedia.com/${masterKey.replace(" ", "_")}`}>Link to Wiki</a>
            </div>
        </ReactModal>
    );
}