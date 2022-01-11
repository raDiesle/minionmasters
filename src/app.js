import * as classnames from "classnames";
import { isForImagePreview } from "components/helper";
import cssHelper from "components/helper.module.scss";
import ConsentCookieBanner from "footer/consent-cookie-banner";
import Footer from "footer/footer";

import LoginLogout from "header/login-logout";
import "modal.scss";

import { Page } from "page/page";
import React from "react";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { Events } from "react-scroll";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import css from "./app.module.scss";
import { ConquestCountdown } from "header/conquest-countdown";

const App = () => {
  toast.configure();
  Modal.setAppElement("body");

  Events.scrollEvent.register("begin", function (to, _) {
    window.location.hash = encodeURIComponent(to);
  });

  let theme = createTheme({
    mode: 'dark',
    MuiSvgIcon: {
      htmlColor: '#aa0011',
    },
    props : {
      MuiSvgIcon: {
        htmlColor: '#aa0011',
      }
    },
    "overrides": {
      MuiSvgIcon: {
        colorPrimary: {
          color: ["#625b5b", "!important"],
        },
        colorSecondary: {
          color: ["#d5d7d8", "!important"],
        },
      }
    }
  });

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ThemeProvider theme={theme}>
      <div style={{ paddingBottom: "26px" }}>
        <header
          className={classnames(isForImagePreview ? cssHelper.hideForImagePreview : css.Header)}
        >
          <h1 className={css.PageHeaderStyle}>
            <img src="/img/mm_logo.png" alt="mm logo" style={{ height: "50px" }} />
          </h1>
          <div className={css.middle}>
            <ConquestCountdown />
          </div>
          <div style={{ paddingLeft: "10px" }}>
            <LoginLogout />
          </div>
        </header>

        <BrowserRouter basename={"/"}>
          <Page />
        </BrowserRouter>
      </div>
      <ConsentCookieBanner />
      <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
