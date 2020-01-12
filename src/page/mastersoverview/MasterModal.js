import ReactModal from "react-modal";
import React from "react";
import {mastersMapping} from "./mastersMapping";

export default function MasterModal({masterKey, isOpenHeroModal, setIsOpenHeroModal}) {
    return (<ReactModal
            isOpen={
                isOpenHeroModal
            }
            onRequestClose={() => setIsOpenHeroModal(false)}
        >
            <div>
                <h2>
                    {masterKey}
                </h2>
                {mastersMapping[masterKey].content}
            </div>

        </ReactModal>
    );
}