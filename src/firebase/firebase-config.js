import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyCcFl2vnYnU3YyQWGQLj5MAeQWTXYc1uqI",
    authDomain: "react-app-cursos-ba949.firebaseapp.com",
    projectId: "react-app-cursos-ba949",
    storageBucket: "react-app-cursos-ba949.appspot.com",
    messagingSenderId: "712927062369",
    appId: "1:712927062369:web:f95bc4946312a495207d20",
    measurementId: "G-21J6G0R0Q3"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
