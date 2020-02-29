import React from "react";
import styled from "styled-components";
import {Card} from "./Card";
import {toast} from "react-toastify";
import CardActionAddCardToDeck from "./CardActionAddCardToDeck";

const CardsStyle = styled.a`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const CardNameStyle = styled.div`
  font-size: 11px;
  text-align: center;
`;

export default function Cards({cards, setSelectedCardEvent, isShowNames}) {
    return (
        <div>
            <CardsStyle name="cardsview">
                {
                    cards.map(card =>
                        <div key={card.pageId}>
                            <Card card={card}>
                                <CardActionAddCardToDeck
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
                                    card={card}
                                />
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