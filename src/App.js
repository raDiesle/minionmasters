import React from "react";
import styled from "styled-components"

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
`;

const App = () => {
    toast.configure();
    return (
        <div>
            <Header>
                <FlexContents>

                    <h1> MinionMasters</h1>

                    <h3><a href="https://github.com/raDiesle/minionmasters/issues">Ideas for new features?</a></h3>

                </FlexContents>
            </Header>
            <CardOverview/>

        </div>

    );
};


export default App;
