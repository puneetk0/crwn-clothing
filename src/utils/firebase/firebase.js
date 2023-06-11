import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG6vHTLJFQJ7tXXfPdomnxCHmkvIgk1XE",
  authDomain: "crwn-clothing-db-5d808.firebaseapp.com",
  projectId: "crwn-clothing-db-5d808",
  storageBucket: "crwn-clothing-db-5d808.appspot.com",
  messagingSenderId: "348858461884",
  appId: "1:348858461884:web:53c691d4fdbe13ae796ab9",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export { auth, provider };

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  addittionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addittionalInformation,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
