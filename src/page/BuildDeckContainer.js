import CardDeckContainer from "./carddeck/DeckContainer";
import React, {useEffect, useRef, useState} from "react";

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
            iD: 0
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