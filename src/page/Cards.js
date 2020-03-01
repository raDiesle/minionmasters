import React from "react";
import styled from "styled-components";
import {Card} from "./Card";

const CardsStyle = styled.a`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const CardNameStyle = styled.div`
  font-size: 11px;
  text-align: center;
`;

export default function Cards({cards, isShowNames, cardActionWrapper}) {
    return (
        <div>
            <CardsStyle name="cardsview">
                {
                    cards.map(card =>
                        <div key={card.pageId}>

                            <Card card={card}>
                                {cardActionWrapper(card)}
                            </Card>

                            <CardNameStyle>{isShowNames ? card.name : null}</CardNameStyle>
                        </div>
                    )
                }
            </CardsStyle>
            Count: {cards.length}
        </div>
    );
}