import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import css from "./helper.module.scss";
/* eslint-disable jsx-a11y/anchor-is-valid */
export const anchorLinkTarget = (menuLink, children = null) => (
  <>
    <a href={`#${menuLink}`} className={css.menuLink}>
      <span>
        <h3>
          <FontAwesomeIcon icon={faLink} /> {children || menuLink}
        </h3>
      </span>
    </a>
    <a name={menuLink}></a>
  </>
);
