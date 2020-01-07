import ReactModal from "react-modal";
import React from "react";

export default function CardDetailsModal({card, isOpenDetails, setIsOpenDetails}) {
    return (<ReactModal
            isOpen={
                isOpenDetails
            }
            onRequestClose={() => setIsOpenDetails(false)}
        >
            <div>
                <h2>
                    {card.name}
                </h2>
                <ul>
                    {Object.keys(card).map(key => <li key={key}>{key}: {card[key]}</li>)}
                </ul>
            </div>
            <div>
                <a href={`https://minionmasters.gamepedia.com/${card.name.replace(" ", "_")}`}>Link to Wiki</a>
            </div>
        </ReactModal>
    );
}