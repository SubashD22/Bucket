import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,
getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,updateProfile} from "firebase/auth";
import axios from "axios";
const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,
  
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  
    projectId: process.env.REACT_APP_PROJECT_ID,
  
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
  
    appId: process.env.REACT_APP_APP_ID,
  
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  
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