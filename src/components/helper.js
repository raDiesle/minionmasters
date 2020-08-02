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
