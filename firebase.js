import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4ITIf06TpBYndwYhhVsENIDAydEtBJqo",
  authDomain: "project01-b18cf.firebaseapp.com",
  projectId: "project01-b18cf",
  storageBucket: "project01-b18cf.appspot.com",
  messagingSenderId: "175795392501",
  appId: "1:175795392501:web:6daa2385feb2c115561abc",
  measurementId: "G-2B93JTYNEW"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app()
}

const auth = firebase.auth()

export {auth};