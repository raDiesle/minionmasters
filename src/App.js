import React from "react";

import styled from "styled-components"
import {Contents} from "./BaseComponents"

import "./App.css";

import Cards from "./Cards";

const Header = styled.header`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid black;
  width: 100%;
  z-index: 1;
  position: relative;
  background-color: #f1f1f1;
  z-index: 10;
  a {
    color: black;
    &:hover {
      font-weight: bold;
    }
  }
  h1 {
    font-weight: normal;
    font-size: 1rem;
    display: inline;
  }
`;

const FlexContents = styled(Contents)`
  display: flex;
  justify-content: space-between;
`;


const App = () => (
    <div>
        <Header>
            <FlexContents>
                <div>
                    <div
                        style={{width: "20px", marginRight: ".5rem"}}
                    />
                    <h1> MinionMasters</h1>
                </div>
            </FlexContents>
        </Header>
        <Cards/>
    </div>

);


export default App;
