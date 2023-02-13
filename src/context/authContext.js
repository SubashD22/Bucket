import axios from 'axios';
import { onAuthStateChanged, sendEmailVerification, updateEmail, updatePassword} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    auth,
    googleProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,updateProfile } from '../config/firebaseConfig';


const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const[user,setUser] = useState();
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const authListener = onAuthStateChanged(auth,async(user)=>{
           setUser(user)
           setLoading(false)
        });
        return authListener
    },
    [])
    const addUsertoMongodb = async(token) =>{
        console.log('called')
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signIn`,{token:token});
            console.log(response.data)
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
            await addUsertoMongodb(token);
        }catch(error){
            console.log(error)
        }
    }
    
    const signUpWithEmail = async(email,password,username)=>{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(res.user,{displayName:username});
    }
    const login = async(email,password)=>{
         await signInWithEmailAndPassword(auth,email,password);
        }
    const logOut = async()=>{
        try {
            localStorage.clear();
            await signOut(auth);
            
        } catch (error) {
            console.log(error)
        }
    }
    const resetPassword = async(email)=>{
        try {
            return await sendPasswordResetEmail(auth,email)  
        } catch (error) {
            toast.error(error.message)
        }
       
    }
    const emailVerification=async()=>{
         try {
            await sendEmailVerification(user);
         } catch (error) {
            console.log(error)
         }
    }
    const changeEmail = async(email)=>{
        try {
            await updateEmail(user,email);
            toast.success('Email updated successfuly');
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changePassword= async(password)=>{
        try {
           await updatePassword(user,password);
           toast.success('Password updated successfully'); 
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
     <AuthContext.Provider value={{
        signInWithGoogle,
        signUpWithEmail,
        resetPassword,
        emailVerification,
        login,
        logOut,
        user,
        changeEmail,
        changePassword
     }}>
        {!loading && children}
     </AuthContext.Provider>
  )
}
export const useAuthContext = ()=> useContext(AuthContext)
export default AuthProvider