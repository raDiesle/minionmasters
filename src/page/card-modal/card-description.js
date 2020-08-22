import cardData from "generated/jobCardProps.json";
import { ABILITIES_CONFIG } from "page/abilities-config";
import CardDetailsModal from "page/card-modal/card-details-modal";
import { TYPE_CARD_REF, TYPE_SUBTEXT, TYPE_TERM } from "page/discussion/editor/card-description-types";
import css from "page/discussion/editor/mention-readonly.module.scss";
import React, { useState } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function CardDescription({ description }) {
  const [cardSubModalData, setCardSubModalData] = useState({});
  const [isOpenCardSubModal, setIsOpenCardSubModal] = useState(false);

  const blocks = description.split(/(\{.*?\})/);

  const terms = [];
  const formattedDescription = blocks.map((block, index) => {
    const isSpecialBlock = block.startsWith("{");
    if (isSpecialBlock === false) {
      if (block.startsWith(".")) {
        const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

        return <span>{insertAt(block, " ", 1)} </span>;
      }
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
      const termConfigsWithoutCategories = Object.values(ABILITIES_CONFIG).reduce(
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

      <h3>Description</h3>
      <div className={css.readOnlyText}>
        {formattedDescription.map((block, index) => (
          <React.Fragment key={"descr_" + index}>{block}</React.Fragment>
        ))}
      </div>

      <div>
        {terms.map(({ display, term, description }) => (
          <fieldset key={term} style={{ marginTop: "0px" }}>
            <legend style={{ color: "yellow" }}>{display}</legend> {description}
          </fieldset>
        ))}
      </div>
    </div>
  );
}
