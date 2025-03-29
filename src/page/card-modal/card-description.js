import cardData from "generated/jobCardProps.json";
// import { ABILITIES_CONFIG } from "page/abilities-config"; not needed anymore
import CardDetailsModal from "page/card-modal/card-details-modal";
import {
  TYPE_CARD_REF,
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

  const {elements: formattedDescriptions, terms, displayString} = formatText(description, setCardSubModalData, setIsOpenCardSubModal);
  const uniqueTerms = terms.filter(
    (item, index, self) => index === self.findIndex((t) => t.term === item.term)
  );
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
        {formattedDescriptions.map((block, index) => (
          <React.Fragment key={"descr_" + index}>{block}</React.Fragment>
        ))}
      </div>
      {uniqueTerms.length > 0 && <br/>}
      <div>
        {uniqueTerms.map(({ display, term, description }, index) => (
          <fieldset key={`${term}-${index}`} style={{ marginTop: "0px" }}>
            <legend style={{ color: "yellow" }}>{display}</legend> {description}
          </fieldset>
        ))}
      </div>
    </div>
  );
  // console.log(displayString);
  return result;
}

function splitBrackets(str, brackets = ["[","]"], onlyFullBrackets = true) {
  let results = [];
  let startIndexes = [];
  let outsideIndex = 0;
  for (let i = 0; i < str.length; i++) {
      if (str[i] === brackets[0]) {
          if (startIndexes.length === 0 && i > outsideIndex) results.push(str.substring(outsideIndex, i));
          startIndexes.push(i);
      } else if (str[i] === brackets[1]) {
          if (startIndexes.length > 0) {
              let start = startIndexes.pop();
              if (startIndexes.length === 0 || !onlyFullBrackets) results.push(str.substring(start, i + 1)); // Capture the bracketed expression
              if (startIndexes.length === 0) outsideIndex = i + 1;
          }
      }
  }
  if (outsideIndex < str.length) results.push(str.substring(outsideIndex, str.length));
  return results;
}

function formatText(text, setCardSubModalData, setIsOpenCardSubModal){ 
  // will return {elements, terms, displayString}
  // terms are {display, term, description} objects
  const terms = [];
  const blocks = splitBrackets(text, ["{","}"], true);
  let displayString = "";

  function formatTextRecursive(text) {
    text = text.replaceAll('"*','"');
    let recursiveResult = formatText(text, setCardSubModalData, setIsOpenCardSubModal);
    // console.log("formatted recursively")
    // console.log(recursiveResult)
    recursiveResult.elements = recursiveResult.elements.map((element, index) => {
      return <React.Fragment key={`descr_${index}`}>{element}</React.Fragment>;
    });
    terms.push(...recursiveResult.terms);
    // displayString += recursiveResult.displayString;
    return recursiveResult;
  }
  // console.log(blocks);
  const formattedElements = blocks.map((block, index) => {
    const isSpecialBlock = block.startsWith("{");
    if (isSpecialBlock === false) {
      displayString += block;
      return <>{block}</>;
    }
    if (block === "{\\n}") {
      displayString += "\n";
      return <br/>;
    }
    else if (block.match(/^{(\\n)+}$/)) {
      displayString += "\n\n";
      return <br style = {{lineHeight: "1.4" }}/>
    }

    const [...matches] = block.matchAll(/"(.*?)"[,}]/g);
    const [display, type, value] = [matches[0][1], matches[1][1], matches[2][1]];
    // console.log(display);
    // console.log(type);
    // console.log(value);
    let formattedDisplay = formatTextRecursive(display);
    displayString += formattedDisplay.displayString;
    if (type === TYPE_TERM) {
      terms.push({
        display: formattedDisplay.elements,
        term: formattedDisplay.displayString,
        description: formatTextRecursive(value).elements,
      });

      return (
        <span style={{ color: "yellow" }}>{formattedDisplay.elements}</span>
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
          {formattedDisplay.elements}
        </a>
      );
    }
    else if (type === TYPE_HIGHLIGHT) {
      return <span style={{ color: "yellow" }}>{formattedDisplay.elements}</span>
    }
    else if (type === TYPE_BOLD) {
      return <strong>{formattedDisplay.elements}</strong>
    }
    else if (type === TYPE_FLAVOR) {
      return <p style={{ fontStyle: "italic", margin: "0px", marginTop: "0px", lineHeight: "0" }}>{formattedDisplay.elements}</p>
    }
    // TODO other types
    else {
      displayString += display;
      return <span>{display}</span>;
    }
  });
  return {elements: formattedElements, terms, displayString};
}