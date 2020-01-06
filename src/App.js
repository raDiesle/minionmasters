import React from "react";
import styled from "styled-components"

import {CardOverview} from "./cardoverview/CardOverview";
import {toast} from 'react-toastify';

const Header = styled.header`
 display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  width: 100%;
  background-color: #f1f1f1;
  padding: 20px 5px;

  a {
    color: black;
   
  }
  h1 {
    display: inline;
  }
`;

const PageHeaderStyle = styled.h1`

    margin: 5px;
    line-height: 0.8;
    font-weight: normal;
    font-size: 100%;
`;

const SubheaderLinkStyle = styled.a`
  font-size: 100%;
  line-height: 1;
`;

const CapitalLetterStyle = styled.span`
  font-weight: 700;
`;

const App = () => {
    toast.configure();
    return (
        <div>
            <Header>

                <SubheaderLinkStyle href="https://minionmasters.gamepedia.com/Category:Cards">

                    Wiki needs contributors

                </SubheaderLinkStyle>
                <PageHeaderStyle>

                    <CapitalLetterStyle>M</CapitalLetterStyle>inion <CapitalLetterStyle>M</CapitalLetterStyle>asters <CapitalLetterStyle>M</CapitalLetterStyle>anager

                </PageHeaderStyle>
                <SubheaderLinkStyle href="https://github.com/raDiesle/minionmasters/issues">
                    Ideas for new features?
                </SubheaderLinkStyle>

            </Header>
            <CardOverview/>
        </div>
    );
};


export default App;
