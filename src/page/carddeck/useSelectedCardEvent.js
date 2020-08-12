import { DEFAULT_SELECTED_CARD_EVENT } from "page/carddeck/DeckContainer";
import { useEffect, useRef, useState } from "react";

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useTraceableState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const prevValue = usePreviousValue(value);
  return [prevValue, value, setValue];
};

export const useSelectedCardEvent = () => {
  const [, selectedCardEvent, setSelectedCardEvent] = useTraceableState(
    DEFAULT_SELECTED_CARD_EVENT
  );

  return [selectedCardEvent, setSelectedCardEvent];
};
