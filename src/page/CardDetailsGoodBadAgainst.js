import styled from "styled-components";
import React, {useState} from "react";
import firebase from 'firebase/app';

import FiltersWithCards from "./FiltersWithCards";
import EmptyCardSlotSelected from "../EmptyCardSlotSelected";
import {toast} from "react-toastify";
import {db} from "../firestore";


const GoodBadStyle = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CardRelationStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionEventListenerStyle = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   cursor: pointer;
   z-index: 1000;
`;

export default function CardDetailsGoodBadAgainst({pageId}) {

    const [isShowCardToSuggestView, setShowCardToSuggestView] = useState(false);
    const [goodAgainstCards, setGoodAgainstCards] = useState([]);

    const goodAgainstRef = db.collection("cards").doc(String(pageId)).collection("goodAgainst");

    const handleSelectCard = (selectedPageId) => {
        goodAgainstRef.doc(String(selectedPageId)).set({
            votes: firebase.firestore.FieldValue.increment(1)
        }, {merge: true})
            .then(function () {
                toast("Card suggested for good");
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

    goodAgainstRef.get().then((querySnapshot) => {

        const ids = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                votes: doc.data().votes
            }
        ));
        setGoodAgainstCards(ids);
    });

    return <div>
        <GoodBadStyle>
            <CardRelationStyle>
                Good
                {!isShowCardToSuggestView && goodAgainstCards.map(({id, votes}) => <div key={id}>{id} , {votes}</div>)}
                {
                    !isShowCardToSuggestView &&
                    <EmptyCardSlotSelected onClick={handleCardDeckSlotClick}>
                        Suggest Card
                    </EmptyCardSlotSelected>
                }

            </CardRelationStyle>
            <CardRelationStyle>
                Bad
            </CardRelationStyle>
        </GoodBadStyle>

        {
            isShowCardToSuggestView && <FiltersWithCards cardActionWrapper={(card) =>
                <ActionEventListenerStyle
                    onClick={() => handleSelectCard(card.pageId)}
                >

                </ActionEventListenerStyle>
            }>
            </FiltersWithCards>
        }
    </div>

        ;
}