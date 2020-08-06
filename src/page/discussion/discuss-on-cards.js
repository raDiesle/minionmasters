import { gaTrackView } from "firestore";
import React from "react";
import FiltersWithCards from "../FiltersWithCards";

import InfoDetailsCardOverlay from "../InfoDetailsCardOverlay";

export default function DiscussOnCards() {
  gaTrackView("/DiscussOnCards");
  return (
    <div>
      <FiltersWithCards
        cardActionWrapper={(card) => (
          <>
            <InfoDetailsCardOverlay card={card} isFullWidthClickable={true} />
          </>
        )}
        isFullWidthClickable={true}
      />
    </div>
  );
}
