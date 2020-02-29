import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAJSnLNkSA4pvIfL6sTVJIUMnme-8gRdEM",
    authDomain: "minionmastersmanager.firebaseapp.com",
    databaseURL: "https://minionmastersmanager.firebaseio.com",
    projectId: "minionmastersmanager",
    storageBucket: "minionmastersmanager.appspot.com",
    messagingSenderId: "353468046845",
    appId: "1:353468046845:web:0796bd8198b334f3fb4d94",
    measurementId: "G-0J3Y5FMREJ"
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
export {db};