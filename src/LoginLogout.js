import React, {useState} from "react";
import * as firebase from "firebase";
import {auth, firebaseApp} from "./firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import ReactModal from "react-modal";
import styled from "styled-components";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons/faSignInAlt";


export default function LoginLogout() {
    const [isLoginModalShown, setIsLoginModalShown] = useState(false);

    const logout = () => {
        auth.signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    };

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //    firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => true
        }
    };

    const ModalCloseStyle = styled.div`
    display: flex;
    justify-content: flex-end;
  & > svg {
      &:hover{
        color: #a0a0a0;
        filter:drop-shadow(1px 1px 1px #a0a0a0);
        cursor: pointer;
      }
  }
`;

    const SignInLinkStyle = styled.a`
      &:hover{
        cursor: pointer;
        color: #34aadc;
      }
    `;


    return (
        <div>
            {firebase.auth().currentUser ?
                <div onClick={logout}>Logout</div>
                :
                <>
                    <SignInLinkStyle onClick={() => setIsLoginModalShown(true)}><FontAwesomeIcon
                        icon={faSignInAlt}/></SignInLinkStyle>
                    <ReactModal
                        className="modalContentStyle"
                        isOpen={
                            isLoginModalShown
                        }
                        onRequestClose={() => setIsLoginModalShown(false)}
                    >
                        <ModalCloseStyle><FontAwesomeIcon icon={faTimesCircle} size={"2x"}
                                                          onClick={() => setIsLoginModalShown(false)}/>
                        </ModalCloseStyle>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseApp.auth()}/>
                    </ReactModal>
                </>
            }

        </div>
    )
}