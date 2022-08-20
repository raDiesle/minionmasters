import { faTimesCircle } from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import css from "header/login-logout.module.scss";
import { auth as authInstance } from "mm-firestore";
import React, { useEffect, useState } from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ReactModal from "react-modal";
import firebase from "firebase/compat/app";

export default function LoginLogout() {
  const [isLoginModalShown, setIsLoginModalShown] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = authInstance.onAuthStateChanged((user) => setIsSignedIn(!!user));
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  const logout = () => {
    authInstance
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      "facebook.com",
      "twitter.com",
      "google.com",

    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => true,
    },
  };

  return (
    <>
      {isSignedIn === true ? (
        <div>
          <button className={css.SignInLinkStyle} onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      ) : (
        <>
          <div>
            <button className={css.SignInLinkStyle} onClick={() => setIsLoginModalShown(true)}>
              Login <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          </div>
          <ReactModal
            className="modalContentStyle"
            overlayClassName="modalOverlayStyle"
            isOpen={isLoginModalShown}
            onRequestClose={() => setIsLoginModalShown(false)}
          >
            <div className={css.ModalCloseStyle}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size={"2x"}
                onClick={() => setIsLoginModalShown(false)}
              />
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authInstance} />
          </ReactModal>
        </>
      )}
    </>
  );
}
