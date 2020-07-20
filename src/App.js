import Footer from "Footer";
import React from "react";
import Modal from "react-modal";
import {BrowserRouter} from "react-router-dom";
import {toast} from "react-toastify";
import styled from "styled-components";

import LoginLogout from "./LoginLogout";
import "./Modal.scss";

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

const CapitalLetterStyle = styled.span`
  font-weight: 700;
`;

const App = () => {
  toast.configure();
  Modal.setAppElement("body");

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div style={{ paddingBottom: "20px" }}>
        <Header>
          <PageHeaderStyle>
            <CapitalLetterStyle>M</CapitalLetterStyle>inion{" "}
            <CapitalLetterStyle>M</CapitalLetterStyle>asters{" "}
            <CapitalLetterStyle>M</CapitalLetterStyle>anager
          </PageHeaderStyle>
          <LoginLogout />
        </Header>

        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
};

export default App;
