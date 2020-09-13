import * as classnames from "classnames";
import cardData from "generated/jobCardProps.json";
import orderBy from "lodash/orderBy";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import defaultMentionStyle from "page/discussion/editor/defaultMentionStyle";
import defaultStyle from "page/discussion/editor/defaultStyle";
import { SEPARATOR, TYPE_CARD, TYPE_MASTER } from "page/discussion/editor/mention-config";
import css from "page/discussion/editor/textarea-editor.module.scss";
import React, { useLayoutEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";

export default function TextareaEditor({
  value,
  setValue,
  isDisabledInput,
  placeholder = null,
  editorRef,
}) {
  const masters = Object.keys(mastersMapping).map((name) => ({
    id: TYPE_MASTER + SEPARATOR + mastersMapping[name].iD,
    display: name,
    image: mastersMapping[name].icon,
  }));

  const mentions = [
    ...masters,
    ...orderBy(cardData, ["manacost", "type"], ["asc", "asc"]).map(({ name, imageName, iD }) => ({
      id: TYPE_CARD + SEPARATOR + iD,
      display: name,
      imageName,
    })),
  ];

  useLayoutEffect(() => {
    editorRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const renderSuggestion = (
    { imageName, display },
    entry,
    search,
    highlightedDisplay,
    index,
    focused
  ) => {
    const IMG_FOLDER = "generated/img/";
    const FILE_ENDING = ".jpg"; //.webp
    const WIDTH = "_78";
    const IMG_PATH = IMG_FOLDER + imageName + WIDTH + FILE_ENDING;

    return (
      <div>
        <img src={IMG_PATH} className={css.imgPicto} alt={imageName} />
      </div>
    );
  };

  return (
    <div className={classnames(css.maxWidth, !isDisabledInput && css.editable)}>
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
    </div>
  );
}
