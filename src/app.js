import AppPreview from "app-preview";
import { CURRENT_GAME_VERSION, isForImagePreview } from "components/helper";
import ConsentBanner from "footer/consent-banner";
import Footer from "footer/footer";

import LoginLogout from "header/login-logout";
import "modal.scss";

import { Page } from "page/page";
import React from "react";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  width: 100%;
  background-color: #375a7f;
  color: white;
  padding: 5px 10px;

  align-items: center;
  @media (max-width: 767px) {
    align-items: flex-start;
  }

  a {
    color: #fff;
  }
  h1 {
    display: inline;
  }
`;

const PageHeaderStyle = styled.h1`
  flex: 1;
  margin: 5px;
  line-height: 1;
  font-weight: normal;
  font-size: 24px;
  @media (max-width: 767px) {
    font-size: 17px;
  }
`;

const CapitalLetterStyle = styled.span`
  font-weight: 700;
`;

const App = () => {
  toast.configure();
  Modal.setAppElement("body");

  if (isForImagePreview) {
    return <AppPreview />;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div style={{ paddingBottom: "26px" }}>
        <Header>
          <PageHeaderStyle>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/img/mm_logo.png" alt="mm logo" style={{ height: "50px" }} />
              <span style={{ paddingLeft: "10px" }}>
                <CapitalLetterStyle>M</CapitalLetterStyle>inionmasters
                <span>
                  {" "}
                  <CapitalLetterStyle>M</CapitalLetterStyle>anager
                </span>
                <div style={{ fontSize: "13px" }}>v{CURRENT_GAME_VERSION}</div>
              </span>
            </div>
          </PageHeaderStyle>
          <div style={{ paddingLeft: "10px" }}>
            <LoginLogout />
          </div>
        </Header>

        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </div>
      <ConsentBanner />
      <Footer />
    </div>
  );
};

export default App;
