import { List } from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { json } from 'react-router-dom';


const ListContext = createContext()
const ListProvider = ({children}) => {
    const listData = JSON.parse(localStorage.getItem('list')); 
    const[list,setList]=useState(listData || []);
    useEffect(()=>{
        if(list && list.length){
            console.log(list)
            localStorage.setItem('list',JSON.stringify(list))
        };
        console.log(list)
    },[list]);
    const addToList =(listItem)=>{
        console.log(listItem)
        setList(p=>([
            ...p,
            listItem
        ]))
    }
  return (
   <ListContext.Provider value={{list,setList,addToList}}>
    {children}
   </ListContext.Provider>
  )
}
export const useListContext = () => useContext(ListContext)
export default ListProvider