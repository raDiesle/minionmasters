/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from "react";
import qs from "qs";
import allCardsData from "../../generated/jobCardProps";
import {toast} from "react-toastify";

export function CardDeckPrefillFromUrl({setLastSelectedCards}) {

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

        setLastSelectedCards((initialSelectedCards) => {
            const normalized = initialSelectedCards.map((card, index) => prefillSelectedCardsWithData[index] || card);
            // TODO const nextFreeSlot = normalized.findIndex(({pageId}) => pageId === 0);
            // TODO setCurrentSelectedSlot(nextFreeSlot);
            return normalized;
        });

        toast("Deck was loaded from link.");
    }, []); // eslint-disable-line  react-hooks/exhaustive-deps

    return null;

}