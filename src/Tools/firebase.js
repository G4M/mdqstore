import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4gb2hMwhnHsoPxYL5mWdZm8OwaNtbAXQ",
    authDomain: "mdq-store.firebaseapp.com",
    databaseURL: "https://mdq-store.firebaseio.com",
    projectId: "mdq-store",
    storageBucket: "mdq-store.appspot.com",
    messagingSenderId: "303914116723",
    appId: "1:303914116723:web:15f48e7f01c49090022c06",
    measurementId: "G-CFNBSPJC97"
};

const DB = firebase.initializeApp(firebaseConfig);
export const GetDBFireBase = () => firebase.firestore(DB);