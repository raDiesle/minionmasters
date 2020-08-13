import { useCookie } from "@use-hook/use-cookie";
import "firebase/analytics";
import firebase from "firebase/app";
import * as Cookies from "js-cookie";
import { firebaseApp } from "mm-firestore";
import React, { useEffect, useState } from "react";

import css from "./consent-banner.module.scss";

const fakeGA = {
  logEvent: (eventName, eventParams) => console.debug(`${eventName}:${eventParams.screen_name}`),
};
// firebaseApp force to load before
window.ga = Cookies.get("isAllowCookies") ? firebaseApp && firebase.analytics() : fakeGA;

export const useGaTrackView = (screen_name) => {
  useEffect(() => {
    window.ga.logEvent("screen_view", { screen_name });
  }, []);
};

export default function ConsentBanner() {
  const [isAllowCookies, setAllowCookies] = useCookie("isAllowCookies", null);
  const [isDeclinedTemporary, setIsDeclinedTemporary] = useState(false);

  useEffect(() => {
    window.ga = isAllowCookies ? firebase.analytics() : fakeGA;
  }, [isAllowCookies]);

  if (isAllowCookies || isDeclinedTemporary || window.location.host.includes("localhost")) {
    return null;
  }

  return (
    <div className={css.container}>
      <div className={css.consentText}>
        We use cookies to provide social media features and to analyse our traffic with Google
        Analytics.
      </div>
      <div className={css.buttonLayout}>
        <button className={css.acceptButton} onClick={() => setAllowCookies(true)}>
          Accept
        </button>
        <button className={css.declineButton} onClick={() => setIsDeclinedTemporary(true)}>
          Decline
        </button>
      </div>
    </div>
  );
}
