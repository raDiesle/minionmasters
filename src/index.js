import * as Sentry from "@sentry/react";
import "rc-tooltip/assets/bootstrap_white.css";
import React from "react";
import ReactDOM from "react-dom";
import "react-tabs/style/react-tabs.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

Sentry.init({ dsn: "https://487d2f84e8784b78b2658663894c9073@o430881.ingest.sentry.io/5380445" });

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
