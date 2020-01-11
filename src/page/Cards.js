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

const CardNameStyle = styled.div`
  font-size: 11px;
  text-align: center;
`;

export default function Cards({cards, setSelectedCardEvent, isShowNames}) {
    let sortOrder = "asc";

    return (
        <div>
            <CardsStyle>
                {
                    orderBy(cards, ({manacost}) => parseInt(manacost), sortOrder)
                        .map(card =>
                            <div key={card.pageId}>

                                <Card
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
                                />
                                <CardNameStyle>{isShowNames ? card.name : null}</CardNameStyle>
                            </div>
                        )
                }
            </CardsStyle>
        </div>);
}