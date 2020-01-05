import React from "react";
import styled from "styled-components"

import {CardOverview} from "./cardoverview/CardOverview";
import {toast} from 'react-toastify';
import {ButtonGroupStyle} from "./cardoverview/filters/ButtonFilterGroup";


const Header = styled.header`
  border-bottom: 1px solid black;
  width: 100%;
  background-color: #f1f1f1;

  a {
    color: black;
    &:hover {
      font-weight: bold;
    }
  }
  h1 {
    display: inline;
  }
`;

const Contents = styled.div`
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto;
`;

const FlexContents = styled(Contents)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageHeaderStyle = styled.h1`
    margin: 2px;
    line-height: 1.8;
`;

const LinkStyle = styled.a`
  &:hover{
     font-weight: normal;
  }
`;

const App = () => {
    toast.configure();
    return (
        <div>
            <Header>
                <FlexContents>
                    <PageHeaderStyle> MinionMastersManager</PageHeaderStyle>
                    <div style={{position: "relative", width: "235px", paddingTop: "5px"}}>
                        <a href="https://minionmasters.gamepedia.com/Category:Cards">
                            <ButtonGroupStyle>
                                <img src="wiki_contrib.jpg" alt="wiki-contrib"/>
                            </ButtonGroupStyle>
                        </a>
                        <div style={{
                            position: "absolute",
                            color: "#d6cba0",
                            top: "11px",
                            left: "69px",
                            fontWeight: "bold"
                        }}>
                            Card missing?
                        </div>
                    </div>
                    <LinkStyle href="https://github.com/raDiesle/minionmasters/issues">
                        Ideas for new features?
                    </LinkStyle>
                </FlexContents>
            </Header>
            <CardOverview/>
        </div>

    );
};


export default App;
