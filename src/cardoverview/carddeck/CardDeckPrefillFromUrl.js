import {useEffect} from "react";
import qs from "qs";
import allCardsData from "../../generated/jobCardProps";

export function CardDeckPrefillFromUrl({setLastSelectedCards, setCurrentSelectedSlot}) {

    useEffect(() => {


        let selectedPageIdsFromUrl = qs.parse(window.location.search, {ignoreQueryPrefix: true}).pageId;
        if (selectedPageIdsFromUrl && !Array.isArray(selectedPageIdsFromUrl)) {
            selectedPageIdsFromUrl = [selectedPageIdsFromUrl];
        }
        if (!selectedPageIdsFromUrl || selectedPageIdsFromUrl.size === 0) {
            return;
        }
        const selectedPageIdsNormalized = selectedPageIdsFromUrl ? selectedPageIdsFromUrl.map(pageId => parseInt(pageId)) : [];
        const prefillSelectedCardsWithData = selectedPageIdsNormalized.map(selectedPageId => {
            const selectedCardData = allCardsData.find(({pageId}) => selectedPageId === parseInt(pageId));
            return typeof selectedCardData === 'undefined' ? {pageId: 0} : selectedCardData;
        }).map(card => {
            return {eventId: 0, card}
        });
        debugger;
        setLastSelectedCards((initialSelectedCards) => {
            const normalized = initialSelectedCards.map((card, index) => prefillSelectedCardsWithData[index] || card);
            // TODO const nextFreeSlot = normalized.findIndex(({pageId}) => pageId === 0);
            // TODO setCurrentSelectedSlot(nextFreeSlot);
            return normalized;
        });
    }, []);

    return null;

}