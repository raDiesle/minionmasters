import { imgPathFn } from "components/helper";
import cardData from "generated/jobCardProps.json";
import CardDetailsModal from "page/card-modal/card-details-modal";
import { MasterModal } from "page/deck-manager/build/masters/MasterModal";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { SEPARATOR, TYPE_CARD, TYPE_MASTER } from "page/discussion/editor/mention-config";
import css from "page/discussion/editor/mention-readonly.module.scss";
import React, { useState } from "react";

/* eslint-disable jsx-a11y/anchor-is-valid */

const OVERRIDEN_WIDTH = "25";
export default function WikiEditorReadOnly({ value = "" }) {
  const [cardSubModalData, setCardSubModalData] = useState({});
  const [isOpenCardSubModal, setIsOpenCardSubModal] = useState(false);
  const [masterSubModalData, setMasterSubModalData] = useState(null);
  const [isOpenMasterSubModal, setIsOpenMasterSubModal] = useState(false);

  const handleCardClick = (target_key, card) => {
    setCardSubModalData({
      iD: target_key,
      card,
    });
    setIsOpenCardSubModal(true);
  };

  const handleMasterClick = (target_key) => {
    setMasterSubModalData(target_key);
    setIsOpenMasterSubModal(true);
  };

  const regex = /@(\[.*?\]\(.*?\))/g;
  const textAndMentionBlocks = value.split(regex);
  const blocksAsJson = textAndMentionBlocks.map((block) => {
    const isMention = block.startsWith("[");
    if (isMention) {
      const [, display_value, typeKey] = block.match(/\[(.*?)\]\((.*?)\)/);
      const [target_type, target_key] = typeKey.split(SEPARATOR);

      return {
        element_type: "MENTION",
        display_value,
        target_type,
        target_key: parseInt(target_key),
      };
    } else {
      return {
        element_type: "PLAIN_TEXT",
        display_value: block,
        target_type: "NONE",
        target_key: "NONE",
      };
    }
  });

  const blocksToRenderedJsx = blocksAsJson.map(
    ({ element_type, display_value, target_type, target_key }) => {
      if (element_type === "PLAIN_TEXT") {
        return <span>{display_value}</span>;
      } else if (element_type === "MENTION") {
        if (target_type === TYPE_MASTER) {
          const matchedMaster = Object.values(mastersMapping).find(({ iD }) => iD === target_key);

          return (
            <a onClick={() => handleMasterClick(display_value)} className={css.mentionLink}>
              <img
                width={OVERRIDEN_WIDTH}
                src={imgPathFn(matchedMaster.icon)}
                alt={display_value}
              />
              &nbsp;{display_value}
            </a>
          );
        } else if (target_type === TYPE_CARD) {
          const matchedCard = cardData.find(({ iD }) => iD === target_key);
          return (
            <a onClick={() => handleCardClick(target_key, matchedCard)} className={css.mentionLink}>
              <img
                width={OVERRIDEN_WIDTH}
                src={imgPathFn(matchedCard.imageName)}
                alt={target_key}
              />
              &nbsp;{display_value}
            </a>
          );
        } else {
          console.error("not supported" + element_type);
        }
      } else {
        console.error("not supported" + target_type);
      }
      return null;
    }
  );

  return (
    <div className={css.readOnlyText}>
      {cardSubModalData.iD && (
        <CardDetailsModal
          key={cardSubModalData.iD}
          card={cardSubModalData.card}
          isOpenDetails={isOpenCardSubModal}
          setIsOpenDetails={setIsOpenCardSubModal}
        />
      )}
      {masterSubModalData !== null && isOpenMasterSubModal && (
        <MasterModal
          masterKey={masterSubModalData}
          isOpenMasterModal={isOpenMasterSubModal}
          setIsOpenMasterModal={setIsOpenMasterSubModal}
        />
      )}
      {blocksToRenderedJsx.map((block, index) => (
        <React.Fragment key={index}>{block}</React.Fragment>
      ))}
    </div>
  );
}
