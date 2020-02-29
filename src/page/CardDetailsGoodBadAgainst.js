import styled from "styled-components";
import React, {useState} from "react";
import FiltersWithCards from "./FiltersWithCards";
import EmptyCardSlotSelected from "../EmptyCardSlotSelected";

const GoodBadStyle = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CardRelationStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CardDetailsGoodBadAgainst({pageId}) {

    const [isShowCardToSuggestView, setShowCardToSuggestView] = useState(false);

    const setSelectedCardEvent = (pageId) => {
        setShowCardToSuggestView(false);
    };

    const handleCardDeckSlotClick = () => {

        setShowCardToSuggestView(true);
    };

    return <div>
        <GoodBadStyle>
            <CardRelationStyle>
                Good
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
            isShowCardToSuggestView && <FiltersWithCards setSelectedCardEvent={setSelectedCardEvent}/>
        }
    </div>

        ;
}