import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth as authInstance } from "mm-firestore";
import React, { useEffect, useState } from "react";

export default function LoginRequired() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unregisterAuthObserver = authInstance.onAuthStateChanged((user) => setIsLoggedIn(!!user));
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <div>
      {!isLoggedIn && (
        <fieldset>
          <legend>Login required</legend>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              size="2x"
              color="yellow"
              style={{ paddingRight: "10px" }}
            />
            <b>You must login first so you can save</b>
          </div>
        </fieldset>
      )}
    </div>
  );
}
