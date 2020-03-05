import styled from "styled-components";
import React, {useEffect, useState} from "react";
import firebase from 'firebase/app';

import FiltersWithCards from "./FiltersWithCards";

import {toast} from "react-toastify";
import {db} from "../firestore";
import cardData from "../generated/jobCardProps";
import AgainstCards from "./AgainstCards";


const GoodBadStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  
  & > div {
  flex: 50%;
   padding-right: 10px;
  }
`;

const CardRelationStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
   & > div {
   padding-left: 20px;
   }
`;


const ActionEventListenerStyle = styled.div`
   position: absolute;
   top: 0;
   width: 100%;
   height: 100%;
   cursor: pointer;
   z-index: 1000;
`;

const AgainstGoodHeaderStyle = styled.div`
  color: darkgreen;
  font-weight: bold;
`;

const AgainstBadHeaderStyle = styled.div`
  color: darkred;
  font-weight: bold;
`;


const fetchAgainstCards = (iD, goodorBadAgainstRef) => {
    return goodorBadAgainstRef.orderBy("votes", "desc").get().then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
            const card = cardData.find(({iD}) => iD === parseInt(doc.id));

            return ({
                    votedCardiD: doc.id,
                    votes: doc.data().votes,
                    card
                }
            )
        });
    });
};


export default function CardDetailsGoodBadAgainst({card, card: {iD}}) {
    const goodAgainstRef = db.collection("cards").doc(String(iD)).collection("goodAgainst");
    const badAgainstRef = db.collection("cards").doc(String(iD)).collection("badAgainst");

    const [selectionState, setSelectionState] = useState("NONE");

    const [goodAgainstVotedCards, setGoodAgainstVotedCards] = useState([]);
    const triggerDataRefreshGoodAgainst = () => {
        fetchAgainstCards(iD, goodAgainstRef).then(data => {
            setGoodAgainstVotedCards(data);
        });
    };
    useEffect(() => {
        triggerDataRefreshGoodAgainst();
    }, []);


    const [badAgainstVotedCards, setBadAgainstVotedCards] = useState([]);
    const triggerDataRefreshBadAgainst = () => {
        fetchAgainstCards(iD, badAgainstRef).then(data => {
            setBadAgainstVotedCards(data);
        });
    };
    useEffect(() => {
        triggerDataRefreshBadAgainst();
    }, []);

    const updateUpvoteSelection = (goodOrBadAgainstRefVotedCardId) => {
        setSelectionState("NONE");
        return goodOrBadAgainstRefVotedCardId.set({
            votes: firebase.firestore.FieldValue.increment(1)
        }, {merge: true})
            .then(function () {
                toast("Saved");
                return Promise.resolve();
            })
            .catch(function (error) {
                console.error(error);
                toast("Error");
                return Promise.resolve();
            });
    };

    const handleSelectCard = (iD) => {
        const refGoodOrBad = selectionState === "GOOD_AGAINST" ? goodAgainstRef : badAgainstRef;
        const goodOrBadAgainstRefVotedCardId = refGoodOrBad.doc(String(iD));

        updateUpvoteSelection(goodOrBadAgainstRefVotedCardId).then(_ => {
            selectionState === "GOOD_AGAINST" ? triggerDataRefreshGoodAgainst() : triggerDataRefreshBadAgainst();
        });
        setSelectionState("NONE");
    };

    return <div>
        {
            selectionState === "NONE" &&
            <GoodBadStyle>
                <CardRelationStyle>
                    <AgainstGoodHeaderStyle>
                        Good against
                    </AgainstGoodHeaderStyle>

                    <AgainstCards
                        triggerDataRefresh={triggerDataRefreshGoodAgainst}
                        goodorBadAgainstRef={goodAgainstRef}
                        votedCards={goodAgainstVotedCards}
                        setSelectionState={setSelectionState}
                        updateUpvoteSelection={updateUpvoteSelection}
                        handleEmptyCardDeckSlotClick={() => setSelectionState("GOOD_AGAINST")}/>

                </CardRelationStyle>
                <CardRelationStyle>
                    <AgainstBadHeaderStyle>
                        Bad against
                    </AgainstBadHeaderStyle>

                    <AgainstCards
                        triggerDataRefresh={triggerDataRefreshBadAgainst}
                        goodorBadAgainstRef={badAgainstRef}
                        votedCards={badAgainstVotedCards}
                        setSelectionState={setSelectionState}
                        updateUpvoteSelection={updateUpvoteSelection}
                        handleEmptyCardDeckSlotClick={() => setSelectionState("BAD_AGAINST")}
                    />

                </CardRelationStyle>
            </GoodBadStyle>
        }
        {
            selectionState !== "NONE" &&
            (
                <div>
                    {selectionState === "GOOD_AGAINST" ? <AgainstGoodHeaderStyle>Good against</AgainstGoodHeaderStyle> :
                        <AgainstBadHeaderStyle>Bad against</AgainstBadHeaderStyle>}
                    <FiltersWithCards cardActionWrapper={(card) =>
                        <ActionEventListenerStyle
                            onClick={() => handleSelectCard(card.iD)}
                        >
                        </ActionEventListenerStyle>
                    }>
                    </FiltersWithCards>
                </div>
            )
        }


    </div>;
}