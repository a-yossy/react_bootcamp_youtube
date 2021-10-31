import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOnEHlKq48HrslTbcsPBmKiMkgGarnoqo",
  authDomain: "react-bootcamp-63f31.firebaseapp.com",
  projectId: "react-bootcamp-63f31",
  storageBucket: "react-bootcamp-63f31.appspot.com",
  messagingSenderId: "672578609165",
  appId: "1:672578609165:web:f8692dde632bedd5903544"
};

firebase.initializeApp(firebaseConfig);
export const fireAuth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export default firebase;
