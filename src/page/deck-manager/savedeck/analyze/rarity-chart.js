import { RarityMappingConfig } from "components/rarity/rarity-mapping-config";
import css from "page/deck-manager/savedeck/analyze/rarity-chart.module.scss";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";

export function RarityChart({ lastSelectedCards }) {
  const actualSelectedCards = lastSelectedCards.filter(
    ({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT
  );

  var raritiesWithOccurenceMap = {};
  actualSelectedCards.forEach(({ count, card: { rarity } }) => {
    if (raritiesWithOccurenceMap[rarity]) {
      raritiesWithOccurenceMap[rarity] = raritiesWithOccurenceMap[rarity] + count;
    } else {
      raritiesWithOccurenceMap[rarity] = count;
    }
  });

  const percentages = Object.keys(raritiesWithOccurenceMap).map((key) => ({
    key: key,
    percentage: (raritiesWithOccurenceMap[key] * 100) / actualSelectedCards.length,
  }));

  return (
    <div className={css.rarityChart}>
      {Object.keys(RarityMappingConfig).map(
        (mappingKey) =>
          percentages.map(({ key }) => key).includes(mappingKey) && (
            <div
              key={mappingKey + Math.random()}
              style={{
                backgroundColor: RarityMappingConfig[mappingKey],
                width: (300 * percentages.find(({ key }) => key === mappingKey).percentage) / 100,
              }}
              className={css.rarityLabel}
            >
              {mappingKey}
            </div>
          )
      )}
    </div>
  );
}
