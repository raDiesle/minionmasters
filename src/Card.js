import React, {useState} from "react";
import styled from "styled-components";
import ReactModal from 'react-modal';

const CardStyle = styled.div`
    width: 100px;
`;

const CardImageStyle = styled.img`
    width: 100%;
`;

export function Card({card: {pageId, image, manacost, description, name, rarity}}) {
    const [focused, setFocused] = useState(false);

    return <CardStyle>
        <CardImageStyle src={`/img/${image}`} alt={image} onClick={() => setFocused(true)}/>
        <ReactModal
            isOpen={
                focused
            }
            onRequestClose={() => setFocused(false)}
        >
            <div>
                <h2>
                    {name}
                </h2>
                <ul>
                    <li>
                        <img src="minion.jpg" alt="minion"/>
                    </li>
                    <li>
                        PageId: {pageId}
                    </li>
                    <li>
                        rarity: {rarity}
                    </li>
                    <li>
                        {description}
                    </li>
                    <li>
                        Manacost: {manacost}
                    </li>
                </ul>
            </div>
        </ReactModal>
    </CardStyle>;
}