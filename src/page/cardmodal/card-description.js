import { TERMS_CONFIG } from "page/terms-config";
import React, { useState } from "react";
import { TYPE_TERM, TYPE_CARD_REF, TYPE_SUBTEXT } from "card-description-types";
import cardData from "generated/jobCardProps.json";
import CardDetailsModal from "page/CardDetailsModal";
import css from "page/wikiEditor/mention-readonly.module.scss";

export default function CardDescription({ description }) {
  const [cardSubModalData, setCardSubModalData] = useState({});
  const [isOpenCardSubModal, setIsOpenCardSubModal] = useState(false);

  const blocks = description.split(/(\{.*?\})/);

  const terms = [];
  const formattedDescription = blocks.map((block, index) => {
    const isSpecialBlock = block.startsWith("{");
    if (isSpecialBlock === false) {
      return <span>{block} </span>;
    }

    const jsonCompliant = block.replace("{", "[").replace("}", "]");

    const [display, type, value] = (() => {
      try {
        return JSON.parse(jsonCompliant);
      } catch (e) {
        console.error(e);
        return ["", TYPE_SUBTEXT, ""];
      }
    })();

    if (type === TYPE_TERM) {
      const termConfigsWithoutCategories = Object.values(TERMS_CONFIG).reduce(
        (result, { terms }) => result.concat(terms),
        []
      );

      const matchedTermConfig = Object.values(termConfigsWithoutCategories).find(
        ({ key }) => key === value
      );
      const matchedTermToDescriptionMappingConfig = matchedTermConfig || {
        display: display,
        description: value,
      };

      if (matchedTermToDescriptionMappingConfig.description === "") {
        console.info(`${value} : not defined yet`);
      }
      terms.push({
        display: matchedTermToDescriptionMappingConfig.display,
        term: value,
        description: matchedTermToDescriptionMappingConfig.description,
      });
      return (
        <span style={{ color: "yellow" }}>{matchedTermToDescriptionMappingConfig.display}</span>
      );
    } else if (type === TYPE_CARD_REF) {
      // TODO

      const matchedCard = cardData.find(
        ({ name, unitToSummon }) =>
          name === value ||
          name === display ||
          name.replace(/\s+/g, "").includes(value.replace(/\s+/g, "")) ||
          unitToSummon === value
      );
      const isCardUnknown = typeof matchedCard === "undefined";
      if (isCardUnknown) {
        console.error(value + " not found.");
      }
      return (
        <a
          onClick={() => {
            if (isCardUnknown === false) {
              setCardSubModalData({
                iD: matchedCard.iD,
                card: matchedCard,
              });
              setIsOpenCardSubModal(true);
            }
          }}
          className={css.mentionLink}
        >
          {display}
        </a>
      );
    }
    // TODO other types
    return <span>{display}</span>;
  });

  return (
    <div>
      {typeof cardSubModalData.iD !== "undefined" && (
        <CardDetailsModal
          key={cardSubModalData.iD}
          card={cardSubModalData.card}
          isOpenDetails={isOpenCardSubModal}
          setIsOpenDetails={setIsOpenCardSubModal}
        />
      )}

      <h3 style={{ marginBottom: 0 }}>Description</h3>
      <div>
        {formattedDescription.map((block, index) => (
          <React.Fragment key={"descr_" + index}>{block}</React.Fragment>
        ))}
      </div>

      <div style={{ paddingTop: "15px" }}>
        {terms.map(({ display, term, description }) => (
          <div key={term}>
            <span style={{ color: "yellow" }}>{display}:</span> {description}
          </div>
        ))}
      </div>
    </div>
  );
}
