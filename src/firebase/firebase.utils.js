import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBfsYNtzQq-xFOZLpDlTwisrgancIISdGI",
    authDomain: "shop-db-f3941.firebaseapp.com",
    databaseURL: "https://shop-db-f3941.firebaseio.com",
    projectId: "shop-db-f3941",
    storageBucket: "shop-db-f3941.appspot.com",
    messagingSenderId: "117553844931",
    appId: "1:117553844931:web:b367890ff7141515984876",
    measurementId: "G-TNX7EH6D7Z"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;