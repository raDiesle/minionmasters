import { useGaTrackView } from "consent-banner";
import CardforInfoActionOverlay from "page/discussion/cardforinfo-actionoverlay";
import React, { useMemo } from "react";
import FiltersWithCards from "../FiltersWithCards";

const FiltersWithCardsWrapperMemo = () => {
  return useMemo(() => {
    const cardActionWrapper = (card) => <CardforInfoActionOverlay card={card} />;
    return <FiltersWithCards cardActionWrapper={cardActionWrapper} isFullWidthClickable={true} />;
  }, []);
};

export default function DiscussOnCards() {
  useGaTrackView("/DiscussOnCards");

  return (
    <div>
      <FiltersWithCardsWrapperMemo />
    </div>
  );
}
