import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDR0PV6LscrmOqACntGaoia-7ID30cfFCQ",
  authDomain: "e-commerce-20fff.firebaseapp.com",
  projectId: "e-commerce-20fff",
  storageBucket: "e-commerce-20fff.appspot.com",
  messagingSenderId: "883463103440",
  appId: "1:883463103440:web:4143b3f3b9fd5ff7decfd5",
  measurementId: "G-FMNH5LB4D8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;