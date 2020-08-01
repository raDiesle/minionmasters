import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import css from "./Footer.module.scss";

const SubheaderLinkStyle = styled.a`
  font-size: 100%;
  line-height: 1;
  padding-right: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export default function Footer() {
  return (
    <div className={css.FooterStyle}>
      <SubheaderLinkStyle
        onClick={() =>
          toast("Contact me in Discord: raDies_chen#4904", {
            position: "bottom-right",
          })
        }
      >
        Ideas for new features or you want to contribute?
      </SubheaderLinkStyle>
    </div>
  );
}
