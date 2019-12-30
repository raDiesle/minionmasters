import {useEffect} from "react";
import qs from "qs";

export function CardDeckPrefillFromUrl({allCardsData, setLastSelectedCards}) {

    useEffect(() => {
        if (allCardsData.length === 0) {
            return;
        }
        let selectedPageIdsFromUrl = qs.parse(window.location.search, {ignoreQueryPrefix: true}).pageId;
        if (selectedPageIdsFromUrl && !Array.isArray(selectedPageIdsFromUrl)) {
            selectedPageIdsFromUrl = [selectedPageIdsFromUrl];
        }
        if (!selectedPageIdsFromUrl || selectedPageIdsFromUrl.size === 0) {
            return;
        }
        const selectedPageIdsNormalized = selectedPageIdsFromUrl ? selectedPageIdsFromUrl.map(pageId => parseInt(pageId)) : [];
        const prefillSelectedCardsWithData = selectedPageIdsNormalized.map(selectedPageId => {
            const selectedCardData = allCardsData.find(({pageId}) => selectedPageId === pageId);
            return typeof selectedCardData === 'undefined' ? {pageId: 0} : selectedCardData;
        });


        let oldWithNewSelectedMergeCards = (initialSelectedCards) => {
            const merged = initialSelectedCards.map((card, index) => prefillSelectedCardsWithData[index] || card);
            debugger;
            return merged;
        }
        setLastSelectedCards(oldWithNewSelectedMergeCards);
    }, [allCardsData]);

    return null;

}