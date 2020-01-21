import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (snapShot.exists === false) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocumentsObject = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  for (var key in objectsToAdd) {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, objectsToAdd[key]);
  }

  console.log(`Creating new collection with key: ${collectionKey} from object`);
  return await batch.commit();
};

export const addCollectionAndDocumentsArray = async (
  collectionKey,
  documentsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  documentsToAdd.forEach(doc => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, doc);
  });

  console.log(`Creating new collection with key: ${collectionKey} from array`);
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = async collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default firebase;
