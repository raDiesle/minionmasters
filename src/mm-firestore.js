import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { toast } from "react-toastify";

export const FIREBASE_API_CONFIG = {
  apiKey: "AIzaSyAJSnLNkSA4pvIfL6sTVJIUMnme-8gRdEM",
  authDomain: "minionmastersmanager.firebaseapp.com",
  databaseURL: "https://minionmastersmanager.firebaseio.com",
  projectId: "minionmastersmanager",
  storageBucket: "minionmastersmanager.appspot.com",
  messagingSenderId: "353468046845",
  appId: "1:353468046845:web:0796bd8198b334f3fb4d94",
  measurementId: "G-0J3Y5FMREJ",
};
const firebaseApp = firebase.initializeApp(FIREBASE_API_CONFIG);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const dbErrorHandlerPromise = (error) => {
  console.error(error);
  const errorMessage = "Some error occured. You may need to be logged in to edit data.";
  toast(errorMessage);
  return Promise.reject();
};

export { db, auth, firebaseApp, dbErrorHandlerPromise };
