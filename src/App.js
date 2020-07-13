import React from "react";
import Modal from 'react-modal';
import {BrowserRouter} from "react-router-dom";
import {toast} from 'react-toastify';
import styled from "styled-components"

import LoginLogout from "./LoginLogout";
import './Modal.scss';

import {Page} from "./page/Page";


const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  width: 100%;
  background-color: #375a7f;
  color: white;
  padding: 20px 10px;

  a {
    color: #fff;
   
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
  padding-left: 5px;
`;

const CapitalLetterStyle = styled.span`
  font-weight: 700;
`;

const App = () => {
    toast.configure();
    Modal.setAppElement('body');

    return (
        <div>
            <Header>
                <PageHeaderStyle>
                    <CapitalLetterStyle>M</CapitalLetterStyle>inion <CapitalLetterStyle>M</CapitalLetterStyle>asters <CapitalLetterStyle>M</CapitalLetterStyle>anager
                </PageHeaderStyle>
                <LoginLogout/>
            </Header>

            <BrowserRouter>
                <Page/>
            </BrowserRouter>
            <SubheaderLinkStyle href="https://github.com/raDiesle/minionmasters/issues">
                Ideas for new features?
            </SubheaderLinkStyle>
        </div>
    );
};


export default App;
