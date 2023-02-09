import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    app,
    auth,
    googleProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,updateProfile } from '../config/firebaseConfig';


const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const authListener = onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setLoading(false)
        });
        return authListener
    },
    [])
    const addUsertoMongodb = async(token) =>{
        try {
            const response = await axios.post('http://localhost:5000/api/signIn',{token:token});
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    const signInWithGoogle = async ()=>{
        try{
            const res = await signInWithPopup(auth,googleProvider);
            const user = res.user;
            const token = await user.getIdToken();
            const mongoUser = await addUsertoMongodb(token);
            setUser(user)
        }catch(error){
            console.log(error)
        }
    }
    
    const signUpWithEmail = async(email,password,username)=>{
        console.log(email)
        const res = await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(res.user,{displayName:username});
        const token = await res.user.getIdToken();
        const mongoUser = await addUsertoMongodb(token);
        console.log(mongoUser)
    }
    const login = async(email,password)=>{
        const res= await signInWithEmailAndPassword(auth,email,password);
          if(res){
            setUser(res.user)
          }  }
    const logOut = async()=>{
        try {
            localStorage.clear()
            await signOut(auth);
            
        } catch (error) {
            console.log(error)
        }
      
        
    }
  return (
     <AuthContext.Provider value={{
        signInWithGoogle,
        signUpWithEmail,
        login,
        logOut,
        user
     }}>
        {!loading && children}
     </AuthContext.Provider>
  )
}
export const useAuthContext = ()=> useContext(AuthContext)
export default AuthProvider