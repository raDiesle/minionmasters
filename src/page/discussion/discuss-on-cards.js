import { useGaTrackView } from "consent-banner";
import CardforInfoActionOverlay from "page/discussion/cardforinfo-actionoverlay";
import FiltersWithCards from "page/filters-with-cards";
import React, { useMemo } from "react";

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
