import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import css from "./helper.module.scss";
/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
export const anchorLinkTarget = (menuLink, children = null) => (
  <>
    <a name={menuLink}></a>
    <a href={`#${menuLink}`} className={css.menuLink}>
      <span>
        <h3>
          <FontAwesomeIcon icon={faLink} /> {children || menuLink}
        </h3>
      </span>
    </a>
  </>
);

const IMG_FOLDER = "generated/img/";
const FILE_ENDING = ".jpg";
const WIDTH = "_78";
export const imgPathFn = (image) => IMG_FOLDER + image + WIDTH + FILE_ENDING;

export function is_touch_device() {
  try {
    let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

    let mq = function (query) {
      return window.matchMedia(query).matches;
    };

    if (
      "ontouchstart" in window ||
      (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)
    ) {
      return true;
    }

    return mq(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""));
  } catch (e) {
    console.error("(Touch detect failed)", e);
    return false;
  }
}

export const CURRENT_GAME_VERSION = "1.15.43740";

export const insertAtCaret = (txtarea, text, setValue) => {
  var scrollPos = txtarea.scrollTop;
  var strPos = 0;

  var br =
    txtarea.selectionStart || txtarea.selectionStart === "0"
      ? "ff"
      : document.selection
      ? "ie"
      : false;
  if (br === "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart("character", -txtarea.value.length);
    strPos = range.text.length;
  } else if (br === "ff") strPos = txtarea.selectionStart;

  var front = txtarea.value.substring(0, strPos);
  var back = txtarea.value.substring(strPos, txtarea.value.length);

  const newValue = front + text + back;

  // will be overridden by setValue
  txtarea.value = newValue;
  setValue(newValue);

  // txtarea.value
  setTimeout(() => {
    strPos = strPos + text.length;
    if (br === "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart("character", -txtarea.value.length);
      range.moveStart("character", strPos);
      range.moveEnd("character", 0);
      range.select();
    } else if (br === "ff") {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
  }, 500); // TODO async issue? move to useasyncEffect in editor
};
