import React from "react";
import styled from "styled-components";
import {Card} from "./Card";

const CardsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const CardNameStyle = styled.div`
  font-size: 11px;
  text-align: center;
`;

export default function Cards({cards, isShowNames, cardActionWrapper, fullCount, isFullWidthClickable}) {
    return (
        <div>
            <CardsStyle name="cardsview">
                {
                    cards.map(card =>
                        <div key={card.iD}>
                            <Card card={card} isFullWidthClickable={isFullWidthClickable}>
                                {cardActionWrapper(card)}
                            </Card>
                            <CardNameStyle>{isShowNames ? card.name : null}</CardNameStyle>
                        </div>
                    )
                }
            </CardsStyle>
            Count: {cards.length}/{fullCount}
        </div>
    );
}