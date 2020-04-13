import React from "react";

import InfoDetailsCardOverlay from "../InfoDetailsCardOverlay";
import FiltersWithCards from "../FiltersWithCards";

export default function DiscussOnCards() {
    return (
        <div>
            <FiltersWithCards cardActionWrapper={(card) =>
                <>
                    <InfoDetailsCardOverlay card={card}/>
                </>
            }/>
        </div>
    );
}