import React from "react";
import {DndProvider} from "react-dnd";
import MultiBackend from 'react-dnd-multi-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import {MouseTransition, TouchTransition} from 'dnd-multi-backend';


import styled from "styled-components"
import {Contents} from "./BaseComponents"

import "./App.css";
import {CardOverview} from "./cardoverview/CardOverview";


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


const HTML5toTouch = {
    backends: [{
        backend: HTML5Backend,
        transition: MouseTransition
    }, {
        backend: TouchBackend,
        options: {
            enableMouseEvents: true,
            delay: 0,
            scrollAngleRanges: [{start: 30, end: 150}, {start: 210, end: 330}]
        },
        preview: true,
        transition: TouchTransition
    }]
};

const App = () => {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    return (
        <div>
            <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                <Header>
                    <FlexContents>
                        <div>
                            <h1> MinionMasters</h1>
                        </div>
                    </FlexContents>
                </Header>
                <CardOverview/>
            </DndProvider>
        </div>

    );
}


export default App;
