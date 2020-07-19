import React from "react";
import styled from "styled-components";
import css from "./Footer.module.scss";

const SubheaderLinkStyle = styled.a`
  font-size: 100%;
  line-height: 1;
  padding-right: 5px;
`;

export default function Footer() {
    return <div className={css.FooterStyle}>
        <SubheaderLinkStyle href="https://github.com/raDiesle/minionmasters/issues">
            Ideas for new features?
        </SubheaderLinkStyle>
    </div>
}