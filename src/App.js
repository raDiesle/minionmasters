import React from "react";
import {DndProvider} from "react-dnd";
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';


import styled from "styled-components"
import {Contents} from "./BaseComponents"

import "./App.css";
import {CardOverview} from "./cardoverview/CardOverview";


const Header = styled.header`
  padding: 0.75rem 1rem;
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


const App = () => (
    <div>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
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
            <CardOverview/>
        </DndProvider>
    </div>

);


export default App;
