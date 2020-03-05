import React from "react";
import styled from "styled-components";
import {Card} from "./Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons/faArrowDown";
import CardDeckSlotStyle from "../CardDeckSlotStyle";
import EmptyCardSlotSelected from "../EmptyCardSlotSelected";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";


import firebase from "firebase";
import {toast} from "react-toastify";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";

const CardsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const VotingStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  line-height: 16px;
`;

const SingleVoteStyle = styled.div`
  cursor: pointer;
  padding: 2px 8px;
`;


export default function AgainstCards({goodorBadAgainstRef, votedCards, triggerDataRefresh, handleEmptyCardDeckSlotClick, updateUpvoteSelection}) {

    const handleUpVote = (iD) => {
        updateUpvoteSelection(goodorBadAgainstRef.doc(String(iD)))
            .then(_ => triggerDataRefresh());
    };

    const updateDownvote = (iD, votes) => {
        if (votes <= 1) {
            goodorBadAgainstRef.doc(String(iD)).delete().then(() => {
                toast("card was removed from votes.");
                triggerDataRefresh();
            });
            return;
        }
        goodorBadAgainstRef.doc(String(iD)).set({
            votes: firebase.firestore.FieldValue.increment(-1)
        }, {merge: true})
            .then(function () {
                toast("Card suggested less importance for good ");
                triggerDataRefresh();
            })
            .catch(function (error) {
                console.error(error);
                toast("Error to suggest the card.");
            });
    };

    const handleDownVote = (iD, votes) => {
        updateDownvote(iD, votes);
    };


    return <div>
        <CardsStyle>
            {
                votedCards.map(({votedCardiD, votes, card}) =>
                    <div key={votedCardiD}>
                        <Card card={card}></Card>
                        <VotingStyle>
                            <SingleVoteStyle>
                                <FontAwesomeIcon icon={faArrowUp} color={"green"}
                                                 onClick={() => handleUpVote(card.iD)}/>
                            </SingleVoteStyle>
                            {votes}
                            <SingleVoteStyle>
                                <FontAwesomeIcon icon={votes > 1 ? faArrowDown : faTrashAlt} color={"red"}
                                                 onClick={() => handleDownVote(card.iD, votes)}/>
                            </SingleVoteStyle>
                        </VotingStyle>
                    </div>
                )
            }


            <CardDeckSlotStyle>
                <EmptyCardSlotSelected onClick={() => handleEmptyCardDeckSlotClick()}>
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </EmptyCardSlotSelected>
            </CardDeckSlotStyle>

        </CardsStyle>


    </div>
}