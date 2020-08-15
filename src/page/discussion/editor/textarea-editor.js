import orderBy from "lodash/orderBy";
import { SEPARATOR, TYPE_CARD, TYPE_MASTER } from "page/discussion/editor/mention-config";
import React, { useLayoutEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";

import styled from "styled-components";

import cardData from "generated/jobCardProps.json";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import defaultMentionStyle from "page/discussion/editor/defaultMentionStyle";
import defaultStyle from "page/discussion/editor/defaultStyle";
import css from "page/discussion/editor/textarea-editor.module.scss";

const masters = Object.keys(mastersMapping).map((name) => ({
  id: TYPE_MASTER + SEPARATOR + mastersMapping[name].iD,
  display: name,
  image: mastersMapping[name].icon,
}));

const mentions = [
  ...masters,
  ...orderBy(cardData, ["manacost", "type"], ["asc", "asc"]).map(({ name, image, iD }) => ({
    id: TYPE_CARD + SEPARATOR + iD,
    display: name,
    image,
  })),
];

const EditorStyle = styled.div`
  //border: 1px dotted grey;

  max-width: 1000px;
  ${({ isEditable }) =>
    isEditable &&
    ` background: 
            linear-gradient(90deg, #000 50%, transparent 50%),
            linear-gradient(0deg, #000 50%, transparent 50%),
            linear-gradient(90deg, #000 50%, transparent 50%),
            linear-gradient(0deg, #000 50%, transparent 50%);
          background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
          background-size: 15px 2px, 2px 15px, 15px 2px, 2px 15px;
          background-position: left top, right top, left bottom, left top;
          animation: border-dance 20s infinite linear;
        }
        
        @keyframes border-dance 
        {
          0%
          {
            background-position: left top, right top, right bottom, left bottom;
          }
          100% 
          {
            background-position: right top, right bottom, left bottom, left top;
          }
  `}

  & textarea[readonly] {
    border: none !important;
    outline: none;
    cursor: default;
  }
`;

export default function TextareaEditor({
  value,
  setValue,
  isDisabledInput,
  placeholder = null,
  editorRef,
}) {
  useLayoutEffect(() => {
    editorRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const renderSuggestion = (
    { image, display },
    entry,
    search,
    highlightedDisplay,
    index,
    focused
  ) => {
    const IMG_FOLDER = "generated/img/";
    const FILE_ENDING = ".jpg"; //.webp
    const WIDTH = "_78";
    const IMG_PATH = IMG_FOLDER + image + WIDTH + FILE_ENDING;

    return (
      <div>
        <img src={IMG_PATH} className={css.imgPicto} alt={image} />
      </div>
    );
  };

  return (
    <EditorStyle isEditable={!isDisabledInput}>
      <MentionsInput
        inputRef={editorRef}
        value={value}
        onChange={handleChange}
        readOnly={isDisabledInput}
        style={defaultStyle}
        placeholder={placeholder}
      >
        <Mention
          trigger="@"
          data={mentions}
          renderSuggestion={renderSuggestion}
          style={defaultMentionStyle}
        />
      </MentionsInput>
    </EditorStyle>
  );
}
