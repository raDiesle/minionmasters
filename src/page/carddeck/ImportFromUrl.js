/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from "react";
import qs from "qs";
import allCardsData from "../../generated/jobCardProps";
import {toast} from "react-toastify";

export function ImportFromUrl({setLastSelectedCards, setSelectedHero}) {

    useEffect(() => {

        let urlParams = qs.parse(window.location.search, {ignoreQueryPrefix: true});
        if (urlParams.hero) {
            setSelectedHero(urlParams.hero);
        }

        let selectediDsFromUrl = urlParams.iD;
        if (selectediDsFromUrl && !Array.isArray(selectediDsFromUrl)) {
            selectediDsFromUrl = [selectediDsFromUrl];
        }
        if (!selectediDsFromUrl || selectediDsFromUrl.size === 0) {
            return;
        }
        const selectediDsNormalized = selectediDsFromUrl ? selectediDsFromUrl.map(iD => parseInt(iD)) : [];
        const prefillSelectedCardsWithData = selectediDsNormalized.map(selectediD => {
            const selectedCardData = allCardsData.find(({iD}) => selectediD === parseInt(iD));
            return typeof selectedCardData === 'undefined' ? {iD: 0} : selectedCardData;
        }).map(card => {
            return {eventId: 0, card}
        });

        setLastSelectedCards((initialSelectedCards) => {
            const normalized = initialSelectedCards.map((card, index) => prefillSelectedCardsWithData[index] || card);
            // TODO const nextFreeSlot = normalized.findIndex(({iD}) => iD === 0);
            // TODO setCurrentSelectedSlot(nextFreeSlot);
            return normalized;
        });

        toast("Deck was loaded from link.");
    }, []); // eslint-disable-line  react-hooks/exhaustive-deps

    return null;

}