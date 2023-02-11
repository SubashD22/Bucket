import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useAuthContext } from './authContext';


const ListContext = createContext();
const ListProvider = ({children}) => {
    const{user}= useAuthContext();
    const userList = `${user?.uid}`+'list'
    const localList = JSON.parse(localStorage.getItem(userList))
    const[list,setList]=useState(localList || []);
    const updatedb = async()=>{
    const token = await user.getIdToken();
    const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    }
    }
        const data = {list:list}
        await axios.put('http://localhost:5000/api/updatelist',data,config)
    }
    useEffect(()=>{
        const updatelist = async()=>{
        if(list && list.length){
            localStorage.setItem(userList,JSON.stringify(list))
            await updatedb();
        };}
        return () => updatelist()
    },[list]);
    const addToList =(listItem)=>{
        setList(p=>([
            ...p,
            listItem
        ]))
    }
  return (
   <ListContext.Provider value={{list,setList,addToList,updatedb}}>
    {children}
   </ListContext.Provider>
  )
}
export const useListContext = () => useContext(ListContext)
export default ListProvider