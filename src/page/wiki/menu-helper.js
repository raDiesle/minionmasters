import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "components/helper.module.scss";
import React from "react";
import { Link } from "react-scroll";

export function Menu({ menuitems }) {
  return (
    <ol>
      {menuitems.map((item, index) => (
        <li key={"menu_" + index}>
          <Link to={item} smooth>
            {item}
          </Link>
        </li>
      ))}
    </ol>
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
export const anchorLinkTarget = (menuLink, children = null) => (
  <>
    <a name={menuLink} id={menuLink}></a>
    <a href={`#${menuLink}`} className={css.menuLink}>
      <span>
        <h3>
          <FontAwesomeIcon icon={faLink} /> {children || menuLink}
        </h3>
      </span>
    </a>
  </>
);
