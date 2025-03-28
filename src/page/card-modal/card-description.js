import cardData from "generated/jobCardProps.json";
import { ABILITIES_CONFIG } from "page/abilities-config";
import CardDetailsModal from "page/card-modal/card-details-modal";
import {
  TYPE_CARD_REF,
  TYPE_SUBTEXT,
  TYPE_TERM,
  TYPE_HIGHLIGHT,
  TYPE_BOLD,
  TYPE_FLAVOR,
} from "page/discussion/editor/card-description-types";
import css from "page/discussion/editor/mention-readonly.module.scss";
import React, { useState } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function CardDescription({ description }) {
  const [cardSubModalData, setCardSubModalData] = useState({});
  const [isOpenCardSubModal, setIsOpenCardSubModal] = useState(false);

  // const blocks = description.split(/(\{.*?\})/);


  const [formattedDescription, terms] = formatText(description, setCardSubModalData, setIsOpenCardSubModal);
  const uniqueTerms = terms.filter(
    (item, index, self) => 
      index === self.findIndex((t) => t.term === item.term)
  );
  console.log("terms:")
  let result = (
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
      {uniqueTerms.length > 0 && <br/>}
      <div>
        {uniqueTerms.map(({ display, description }, index) => (
          <fieldset key={`${display}-${index}`} style={{ marginTop: "0px" }}>
            <legend style={{ color: "yellow" }}>{display}</legend> {description}
          </fieldset>
        ))}
      </div>
    </div>
  );
  console.log(result)
  return result;
}

function extractBrackets(str, brackets = ["[","]"], onlyFullBrackets = false) {
  let results = [];
  let startIndexes = [];
  let outsideIndex = 0;
  for (let i = 0; i < str.length; i++) {
      if (str[i] === brackets[0]) {
          if (startIndexes.length === 0) results.push(str.substring(outsideIndex, i));
          startIndexes.push(i);
      } else if (str[i] === brackets[1]) {
          if (startIndexes.length > 0) {
              let start = startIndexes.pop();
              if (startIndexes.length === 0 || !onlyFullBrackets) results.push(str.substring(start, i + 1)); // Capture the bracketed expression
              if (startIndexes.length === 0) outsideIndex = i + 1;
          }
      }
  }
  results.push(str.substring(outsideIndex, str.length+1));
  return results;
}

function formatText(text, setCardSubModalData, setIsOpenCardSubModal){
  const terms = [];
  function formatTextRecursive(text) {
    text = text.replaceAll('"*','"');
    const [recursivelyFormattedText, recursiveTerms] = formatText(text, setCardSubModalData, setIsOpenCardSubModal);
    terms.push(...recursiveTerms);
    return recursivelyFormattedText;
  }
  const blocks = extractBrackets(text, ["{","}"], true);
  // console.log(blocks);

  const formattedText = blocks.map((block, index) => {
    const isSpecialBlock = block.startsWith("{");
    if (isSpecialBlock === false) {
      if (block.startsWith(".")) {
        const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
        return <span>{insertAt(block, " ", 1)} </span>;
      }
      return <>{block}</>;
    }
    if (block === "{\\n}") return <br/>;
    else if (block.match(/^{(\\n)+}$/)) return <br style = {{lineHeight: "1.4" }}/>

    const [...matches] = block.matchAll(/"(.*?)"[,}]/g);
    const [display, type, value] = [matches[0][1], matches[1][1], matches[2][1]];
    // console.log(display);
    // console.log(type);
    // console.log(value);

    if (type === TYPE_TERM) {
      //#region remove later 
      // const termConfigsWithoutCategories = Object.values(ABILITIES_CONFIG).reduce(
      //   (result, { terms }) => result.concat(terms),
      //   []
      // );

      // const matchedTermConfig = Object.values(termConfigsWithoutCategories).find(
      //   ({ key }) => key === value
      // );
      // const matchedTermToDescriptionMappingConfig = matchedTermConfig || {
      //   display: display,
      //   description: value,
      // };

      // if (matchedTermToDescriptionMappingConfig.description === "") {
      //   console.info(`${value} : not defined yet`);
      // }
      //#endregion
      terms.push({
        display: display,
        term: display,
        description: formatTextRecursive(value),
      });
      return (
        <span style={{ color: "yellow" }}>{display}</span>
      );
    } 
    else if (type === TYPE_CARD_REF) {
      // TODO
      const matchedCard = cardData.find(
        ({ name, title, unitToSummon }) =>
          title === value ||
          name === display ||
          name.replace(/\s+/g, "").includes(value.replace(/\s+/g, "")) ||
          unitToSummon === value ||
          name === display + "s"
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
    else if (type === TYPE_HIGHLIGHT) {
      return <span style={{ color: "yellow" }}>{display}</span>
    }
    else if (type === TYPE_BOLD) {
      return <strong>{formatTextRecursive(display)}</strong>
    }
    else if (type === TYPE_FLAVOR) {
      return <p style={{ fontStyle: "italic", margin: "0px", marginTop: "0px", lineHeight: "0" }}>{formatTextRecursive(display)}</p>
    }
    // TODO other types
    return <span>{display}</span>;
  });
  return [formattedText, terms];
}