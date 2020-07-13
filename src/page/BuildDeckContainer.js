import React, {useEffect, useRef, useState} from "react";
import CardDeckContainer, {IDENTIFIER_FOR_EMPTY_SLOT} from "./carddeck/DeckContainer";

const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};


const useTraceableState = initialValue => {
    const [value, setValue] = useState(initialValue);
    const prevValue = usePreviousValue(value);
    return [prevValue, value, setValue];
};


export default function BuildDeckContainer() {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [selectedHero, setSelectedHero] = useState("");

    const [, selectedCardEvent, setSelectedCardEvent] = useTraceableState({
        eventId: 0,
        card: {
            iD: IDENTIFIER_FOR_EMPTY_SLOT
        }
    });

    return (
        <CardDeckContainer
            selectedHero={selectedHero}
            setSelectedHero={setSelectedHero}
            selectedCardEvent={selectedCardEvent}
            setSelectedCardEvent={setSelectedCardEvent}
            setSelectedTabIndex={setSelectedTabIndex}
        />
    )
}