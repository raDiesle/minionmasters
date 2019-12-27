import React from "react";
import {Router} from "react-router"
import {Link, Route} from "react-router-dom"
import {createBrowserHistory} from "history"
import styled from "styled-components"
import IndexPage from "./IndexPage"
import {Contents} from "./BaseComponents"

import "./App.css";
import {Flipper} from "react-flip-toolkit";

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

const StyledLink = styled.a`
  text-decoration: underline;
`;

const history = createBrowserHistory();
const cachedPush = history.push;

// override history.push method to allow to exit animations and delayed FLIP
history.push = args => {
    if (typeof args === "string") {
        return cachedPush(args)
    }
    if (args && args.state && args.state.animate) {
        args.state.animate().then(() => {
            delete args.state.animate
            cachedPush(args)
        })
    } else {
        cachedPush(args)
    }
}


const App = () => (
    <Router history={history}>
        <Route
            render={({location, search}) => {
                return (
                    <Flipper
                        flipKey={`${location.pathname}-${location.search}`}
                        decisionData={{
                            location,
                            search
                        }}
                    >
                        <Header>
                            <FlexContents>
                                <div>
                                    <Link to="/">
                                        <div
                                            style={{width: "20px", marginRight: ".5rem"}}
                                        />
                                        <h1> MinionMasters</h1>
                                    </Link>
                                </div>
                            </FlexContents>
                        </Header>
                        <IndexPage/>
                    </Flipper>
                )
            }}
        />
    </Router>
);


export default App;
