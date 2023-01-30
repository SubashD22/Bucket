import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,
getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,updateProfile} from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import axios from "axios";
const firebaseConfig = {

    apiKey: "AIzaSyDDqqdWXIq9fAWOWjEWh8igmmosicZ6bWY",
  
    authDomain: "authapp-64622.firebaseapp.com",
  
    projectId: "authapp-64622",
  
    storageBucket: "authapp-64622.appspot.com",
  
    messagingSenderId: "483463401726",
  
    appId: "1:483463401726:web:ed2860dd3b8837b570d5af",
  
    measurementId: "G-6M9GCQVHVX"
  
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async ()=>{
  try{
      const res = await signInWithPopup(auth,googleProvider);
      const user = res.user;
      const token = await user.getIdToken();
      const response = await axios.post('http://localhost:5000/api/signIn',{token:token});
      console.log(response.data)
  }catch(error){
      console.log(error)
  }
}
const logOut = ()=>{
    signOut(auth)
}
export {
    app,
    auth,
    signInWithGoogle,
    logOut,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,updateProfile
}