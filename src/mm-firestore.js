import "firebase/compat/analytics";
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
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
  debugger;
  console.error(error);
  const errorMessage = "Some error occured. You may need to be logged in to edit data.";
  toast(errorMessage);
  return Promise.resolve("something went wrong");
};

export { db, auth, firebaseApp, dbErrorHandlerPromise };
