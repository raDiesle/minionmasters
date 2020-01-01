import React from "react";
import styled from "styled-components";
import {Card} from "./Card";
import orderBy from "lodash/orderBy";

const CardsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export default function Cards({cards, setSelectedCard}) {
    let sortOrder = "asc";

    return (
        <div>

            <CardsStyle>
                {
                    orderBy(cards, ({manacost}) => parseInt(manacost), sortOrder)
                        .map(card =>
                            <Card key={card.pageId} card={card} onClick={() => {
                                setSelectedCard({
                                    pageId: card.pageId
                                });
                            }}/>
                        )
                }

            </CardsStyle>
        </div>);
}