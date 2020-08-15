import { faTimesCircle } from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth as authInstance } from "mm-firestore";
import React, { useEffect, useState } from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ReactModal from "react-modal";
import styled from "styled-components";

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
      //  "emailLink",
      "facebook.com",
      "twitter.com",
      "google.com",
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => true,
    },
  };

  const ModalCloseStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    & > svg {
      &:hover {
        color: #a0a0a0;
        filter: drop-shadow(1px 1px 1px #a0a0a0);
        cursor: pointer;
      }
    }
  `;

  const SignInLinkStyle = styled.a`
    &:hover {
      cursor: pointer;
      color: #34aadc;
    }
  `;

  return (
    <>
      {isSignedIn === true ? (
        <div>
          <SignInLinkStyle onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </SignInLinkStyle>
        </div>
      ) : (
        <>
          <div>
            <SignInLinkStyle onClick={() => setIsLoginModalShown(true)}>
              Login <FontAwesomeIcon icon={faSignInAlt} />
            </SignInLinkStyle>
          </div>
          <ReactModal
            className="modalContentStyle"
            overlayClassName="modalOverlayStyle"
            isOpen={isLoginModalShown}
            onRequestClose={() => setIsLoginModalShown(false)}
          >
            <ModalCloseStyle>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size={"2x"}
                onClick={() => setIsLoginModalShown(false)}
              />
            </ModalCloseStyle>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authInstance} />
          </ReactModal>
        </>
      )}
    </>
  );
}
