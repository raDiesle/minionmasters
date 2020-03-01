import styled from "styled-components";
import React, {useEffect, useState} from "react";
import firebase from 'firebase/app';

import FiltersWithCards from "./FiltersWithCards";
import EmptyCardSlotSelected from "../EmptyCardSlotSelected";
import {toast} from "react-toastify";
import {db} from "../firestore";
import {Card} from "./Card";
import cardData from "../generated/jobCardProps";
import CardDeckSlotStyle from "../CardDeckSlotStyle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons/faThumbsDown";


const GoodBadStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardRelationStyle = styled.div`
  display: flex;
  flex-direction: column;
`;


const CardsStyle = styled.div`
  display: flex;
  
`;

const ActionEventListenerStyle = styled.div`
   position: absolute;
   top: 0;
   width: 100%;
   height: 100%;
   cursor: pointer;
   z-index: 1000;
`;


export default function CardDetailsGoodBadAgainst({card, card: {iD}}) {

    const [isShowCardToSuggestView, setShowCardToSuggestView] = useState(false);
    const [goodAgainstCards, setGoodAgainstCards] = useState([]);

    const goodAgainstRef = db.collection("cards").doc(String(iD)).collection("goodAgainst");

    function fetchGoodCards() {
        goodAgainstRef.get().then((querySnapshot) => {
            const voteGoodCards = querySnapshot.docs.map((doc) => {
                const card = cardData.find(({iD}) => iD === parseInt(doc.id));

                return ({
                        goodAgainstId: doc.id,
                        votes: doc.data().votes,
                        card
                    }
                )
            });
            setGoodAgainstCards(voteGoodCards);
        });
    }

    const handleSelectCard = (iD) => {
        goodAgainstRef.doc(String(iD)).set({
            votes: firebase.firestore.FieldValue.increment(1)
        }, {merge: true})
            .then(function () {
                toast("Card suggested for good");
                fetchGoodCards();
            })
            .catch(function (error) {
                console.error(error);
                toast("Error to suggest the card.");
            });

        setShowCardToSuggestView(false);
    };

    const handleCardDeckSlotClick = () => {
        setShowCardToSuggestView(true);
    };

    useEffect(() => {
        fetchGoodCards();
    }, []);

    const upVote = (iD) => {
        handleSelectCard(iD);
    };

    const downVote = (iD, votes) => {
        if (votes === 0) {
            toast("card has no votes.");
            return;
        }
        goodAgainstRef.doc(String(iD)).set({
            votes: firebase.firestore.FieldValue.increment(-1)
        }, {merge: true})
            .then(function () {
                toast("Card suggested less importance for good ");
                fetchGoodCards();
            })
            .catch(function (error) {
                console.error(error);
                toast("Error to suggest the card.");
            });
    };

    return <div>
        <GoodBadStyle>
            <CardRelationStyle>
                Good against
                <CardsStyle>

                    {
                        !isShowCardToSuggestView && goodAgainstCards.map(({goodAgainstId, votes, card}) =>
                            <div>
                                <Card key={goodAgainstId} card={card}></Card>
                                <FontAwesomeIcon icon={faThumbsUp} color={"green"} onClick={() => upVote(card.iD)}/>
                                {votes}
                                <FontAwesomeIcon icon={faThumbsDown} color={"red"}
                                                 onClick={() => downVote(card.iD, votes)}/>
                            </div>
                        )}

                    {
                        !isShowCardToSuggestView &&
                        <CardDeckSlotStyle>
                            <EmptyCardSlotSelected onClick={() => handleCardDeckSlotClick()}>
                                Suggest Card
                            </EmptyCardSlotSelected>
                        </CardDeckSlotStyle>
                    }
                </CardsStyle>
            </CardRelationStyle>
            <CardRelationStyle>
                Bad against
            </CardRelationStyle>
        </GoodBadStyle>

        {
            isShowCardToSuggestView && <FiltersWithCards cardActionWrapper={(card) =>
                <ActionEventListenerStyle
                    onClick={() => handleSelectCard(card.iD)}
                >
                </ActionEventListenerStyle>
            }>
            </FiltersWithCards>
        }
    </div>;
}