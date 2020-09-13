import * as Sentry from "@sentry/react";
import App from "app";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "rc-tooltip/assets/bootstrap_white.css";
import React from "react";
import ReactDOM from "react-dom";
import "react-tabs/style/react-tabs.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

JavascriptTimeAgo.addLocale(en);
if (!window.location.host.includes("localhost")) {
  Sentry.init({ dsn: "https://487d2f84e8784b78b2658663894c9073@o430881.ingest.sentry.io/5380445" });
}

// eslint-disable-next-line no-restricted-globals
history.pushState(null, null, location.href);
window.onpopstate = function () {
  // eslint-disable-next-line no-restricted-globals
  history.go(1);
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
