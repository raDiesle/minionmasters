import React from "react";
import styled from "styled-components";
import {Card} from "./Card";
import orderBy from "lodash/orderBy";

const CardsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export default function Cards({cards, setSelectedCardId}) {
    let sortOrder = "asc";

    return (
        <div>

            <CardsStyle>
                {
                    orderBy(cards, ({manacost}) => parseInt(manacost), sortOrder)
                        .map(card =>
                            <Card key={card.pageId} card={card} onClick={() => {
                                console.log("selected");
                                setSelectedCardId(card.pageId);
                            }}/>
                        )
                }

            </CardsStyle>
        </div>);
}