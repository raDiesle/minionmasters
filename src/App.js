import React from "react";

import styled from "styled-components"
import {Contents} from "./BaseComponents"

import "./App.css";
import {CardOverview} from "./cardoverview/CardOverview";
import {toast} from 'react-toastify';


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
    font-weight: normal;
    font-size: 1rem;
    display: inline;
  }
`;

const FlexContents = styled(Contents)`
  display: flex;
  justify-content: space-between;
`;

const App = () => {
    toast.configure();

    return (
        <div>
            <Header>
                <FlexContents>
                    <div>
                        <h1> MinionMasters</h1>
                    </div>
                </FlexContents>
            </Header>
            <CardOverview/>

        </div>

    );
};


export default App;
