import css from "page/deck-manager/savedeck/save-deck-form.module.scss";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";

export const simpleLabelToValue = (label) => ({
  value: label.toLowerCase().replace(/\W/g, ""),
  label,
});
const TAGS_CONFIG_INITIAL = [
  "Beginner Friendly",
  "Voidborne",
  "Elves",
  "Zen-Chi",
  "Accursed",
  "Meta",
  "Fun",
  "Spell Intense",
  "Big Minions",
  "Medium Minions",
  "Small Minions",
  "Siege Pack",
  "Ranged",
  "Call to Arms",
  "Early Game",
  "Mid Game",
  "Late Game",
  "Easy skill",
  "Medium skill",
  "Hard skill",
  "Experimental",
  "Tournament Winner",
].map((label) => simpleLabelToValue(label));

export function TagsInput({ tags, setTags }) {
  const [tagsConfig, setTagsConfig] = useState([...new Set([...TAGS_CONFIG_INITIAL, ...tags])]);

  return (
    <CreatableSelect
      name="tags"
      options={tagsConfig}
      value={tags}
      onChange={(newValue) => {
        setTags(newValue || []);
      }}
      isValidNewOption={() => true}
      formatCreateLabel={(value) => <span>add "{value}"</span>}
      onCreateOption={(inputValue) => {
        const newValueObject = {
          value: inputValue.toLowerCase().replace(/\W/g, ""),
          label: inputValue,
        };
        setTagsConfig((prevTags) => [...prevTags, newValueObject]);
        setTags((prevTags) => [...prevTags, newValueObject]);
      }}
      isMulti
      isClearable
      isSearchable
      classNamePrefix="react-select"
      className={css.tagInput}
      placeholder="Select multiple and add new"
      closeMenuOnSelect={false}
    />
  );
}
