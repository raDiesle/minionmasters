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
const FILE_ENDING = ".webp";
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
