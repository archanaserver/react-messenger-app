import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDCbtxWPua-mdqusTpDwKraEnphgVrHOXY",
    authDomain: "fb-messenger-clone-8c4da.firebaseapp.com",
    databaseURL: "https://fb-messenger-clone-8c4da.firebaseio.com",
    projectId: "fb-messenger-clone-8c4da",
    storageBucket: "fb-messenger-clone-8c4da.appspot.com",
    messagingSenderId: "914148622076",
    appId: "1:914148622076:web:25f10f7b1993e871a4a179",
    measurementId: "G-4BXMMB8V6Z"
})

const db = firebaseApp.firestore();

export default db; //mentioning `default` here can allow us to use it in any of our file