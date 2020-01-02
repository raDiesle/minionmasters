import React from "react";
import styled from "styled-components";
import {Card} from "./Card";
import orderBy from "lodash/orderBy";
import {toast} from "react-toastify";

const CardsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export default function Cards({cards, setSelectedCardEvent, zoom}) {
    let sortOrder = "asc";

    return (
        <div>

            <CardsStyle>
                {
                    orderBy(cards, ({manacost}) => parseInt(manacost), sortOrder)
                        .map(card =>
                            <Card
                                key={card.pageId}
                                card={card}
                                onClick={() => {
                                    setSelectedCardEvent({
                                        eventId: Math.random(),
                                        card: {
                                            pageId: card.pageId
                                        }
                                    });
                                    toast("Card added to Deck");
                                }}
                                zoom={zoom}
                            />
                        )
                }

            </CardsStyle>
        </div>);
}