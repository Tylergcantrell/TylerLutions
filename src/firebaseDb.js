import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8CLdrwNWQ_WRTDILYym08VKhxDXCVPwY",
  authDomain: "criswell-project.firebaseapp.com",
  projectId: "criswell-project",
  storageBucket: "criswell-project.appspot.com",
  messagingSenderId: "1023260639158",
  appId: "1:1023260639158:web:a292bc88c7d4ff56f3cb17",
  measurementId: "G-XX15ZES7CE"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();