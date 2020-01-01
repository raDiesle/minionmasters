import {useEffect} from "react";
import qs from "qs";

export function CardDeckPrefillFromUrl({allCardsData, setLastSelectedCards, setCurrentSelectedSlot}) {

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

        setLastSelectedCards((initialSelectedCards) => {
            const normalized = initialSelectedCards.map((card, index) => prefillSelectedCardsWithData[index] || card);
            const nextFreeSlot = normalized.findIndex(({pageId}) => pageId === 0);
            setCurrentSelectedSlot(nextFreeSlot);
            return normalized;
        });
    }, [allCardsData, setCurrentSelectedSlot, setLastSelectedCards]);

    return null;

}