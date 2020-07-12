import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import CardDeckSlotStyle from "../CardDeckSlotStyle";
import EmptyCardSlotSelected from "../EmptyCardSlotSelected";
import {db, dbErrorHandlerPromise} from "../firestore";
import cardData from "../generated/jobCardProps";
import {Card} from "./Card";
import InfoDetailsCardOverlay from "./InfoDetailsCardOverlay";

const CardsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: center;
    }
`;

const VotingStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  line-height: 16px;
`;

const SingleVoteStyle = styled.div`
  cursor: pointer;
`;

const swapArrayElements = (arr, x, y) => {
    if (arr[x] === undefined || arr[y] === undefined) {
        return arr
    }
    const a = x > y ? y : x;
    const b = x > y ? x : y;
    return [
        ...arr.slice(0, a),
        arr[b],
        ...arr.slice(a + 1, b),
        arr[a],
        ...arr.slice(b + 1)
    ]
};

const OrderOverlayStyle = styled.div`
    position: absolute;
    top: 15%;
    right: 40%;
    padding: 15% 0 15% 15%;
    
    font-size: 30px;
    
    color: rgba(255,255,255, 0.7);
    font-weight: bolder;
   
    &:hover{
      cursor: pointer;
    }
`;


export default function AgainstCards({cardModalId, againstKey, votedCards: votedCardiDs, triggerDataRefresh, handleEmptyCardDeckSlotClick, updateUpvoteSelection}) {

    const handleUpVote = (iD) => {
        updateUpvoteSelection(againstKey, iD)
            .then(_ => triggerDataRefresh())
            .catch(dbErrorHandlerPromise);
    };

    const handleDownVote = (iD, idx) => {
        const lastPosition = votedCardiDs.length - 1;
        const newOrderedOrRemovedCards = idx === lastPosition ? votedCardiDs.filter((_, index) => index !== lastPosition) : swapArrayElements(votedCardiDs, idx, idx + 1);

        const againstRef = db.collection("cards").doc(String(cardModalId));
        againstRef.set({
            [againstKey]: newOrderedOrRemovedCards
        }, {merge: true})
            .then(() => {
                triggerDataRefresh();
            })
            .catch(dbErrorHandlerPromise);
    };


    const votedCardsData = votedCardiDs.map((votedCardiD) => {
        const matchedData = cardData.find(({iD: cdId}) => votedCardiD === cdId);
        return matchedData;
    });

    return <div>
        <CardsStyle>
            {
                votedCardsData.map((votedCardData, idx) =>
                    <div key={votedCardData.iD}>
                        <Card card={votedCardData}>
                            <InfoDetailsCardOverlay card={votedCardData}/>
                            <OrderOverlayStyle>
                                {idx + 1}
                            </OrderOverlayStyle>
                        </Card>
                        <VotingStyle>
                            <SingleVoteStyle>
                                <FontAwesomeIcon icon={faArrowLeft} color={idx === 0 ? "white" : "green"}
                                                 onClick={() => {
                                                     idx > 0 && handleUpVote(votedCardData.iD)
                                                 }}/>
                            </SingleVoteStyle>

                            <SingleVoteStyle>
                                <FontAwesomeIcon icon={idx < votedCardiDs.length - 1 ? faArrowRight : faTrashAlt}
                                                 color={"red"}
                                                 onClick={() => handleDownVote(votedCardData.iD, idx)}/>
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