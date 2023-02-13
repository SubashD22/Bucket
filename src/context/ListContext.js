import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAuthContext } from './authContext';


const ListContext = createContext();
const ListProvider = ({children}) => {
    const{user}= useAuthContext();
    const userList = `${user?.uid}`+'list'
    const localList = JSON.parse(localStorage.getItem(userList))
    const[list,setList]=useState(localList || []);
    const [searchList, setSearchList] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const updatedb = async()=>{
    const token = await user?.getIdToken();
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
               if(user){
                localStorage.setItem(userList,JSON.stringify(list))
                try {
                    const token = await user?.getIdToken();
                const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
                }
                const data = {list:list}
                    await axios.put('http://localhost:5000/api/updatelist',data,config)
                    toast.success('updated')  
                } catch (error) {
                   toast.error(error.message) 
                }
               }
        }
       updatelist()
    },[list]);
    const addToList =(listItem)=>{
        setList(p=>([
            ...p,
            listItem
        ]))
    }
    const reducer = (state, action) => {
        if (action.type === "Books") {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}:keyes&${process.env.REACT_APP_GBOOKS_API_KEY}`)
                .then((res) => {
                    console.log(res.data)
                    const results = res.data.items.map(r => ({
                        id: r.id,
                        title: r.volumeInfo.title,
                        image: r.volumeInfo.imageLinks.smallThumbnail,
                        author: r.volumeInfo.authors?.[0],
                        rating: r.volumeInfo.averageRating,
                        year: r.volumeInfo?.publishedDate,
                        cat: r.volumeInfo?.categories?.[0]
                    }));
                    setSearchList(results);
                    setLoading(false)
                    return
                }).catch(error => {
                    setSearchList();
                    setLoading(false);
                    toast.error(error.message);
                });
        }
        if (action.type === 'Games') {
            axios.get(`https://api.rawg.io/api/games?key=59dcf7d03e874cb5afd437ed1386beca&page=1&search=${search}`)
                .then((res) => {
                    console.log(res.data)
                    const results = res.data.results.map(r => {
                        const cat = r?.genres?.map(g => ([g.name]));
                        return {
                            id: `${r.id}`,
                            title: r.name,
                            image: r.background_image,
                            rating: r.rating,
                            year: r.released,
                            cat: cat?.toString()
                        }
                    })
                    setSearchList(results);
                    setLoading(false);
                }).catch(error => {
                    setSearchList();
                    setLoading(false);
                    toast.error(error.message);
                })
        }
        if (action.type === 'Movies') {
            const options = {
                method: 'GET',
                url: `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${search}.json`,
                headers: {
                    'X-RapidAPI-Key': '72f62c7819msh076ebbc38b3150fp161c99jsn5b3aba7d9cd5',
                    'X-RapidAPI-Host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
                }
            };
            axios.request(options).then(function (response) {
                console.log(response.data)
                const result = response.data.d.map((r) => ({
                    id: r.id,
                    title: r.l,
                    image: r.i?.imageUrl,
                    tag: r.q,
                    year: r.y
                }));
                setSearchList(result);
                setLoading(false);
            }).catch(function (error) {
                setSearchList();
                setLoading(false);
                toast.error(error.message);
            });
        };
        if (action.type === 'Travel') {
            const options = {
                method: 'GET',
                url: 'https://travel-advisor.p.rapidapi.com/locations/search',
                params: {
                    query: `${search}`
                },
                headers: {
                    'X-RapidAPI-Key': '72f62c7819msh076ebbc38b3150fp161c99jsn5b3aba7d9cd5',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            };
            axios.request(options).then(function (response) {
               
                    const result = response.data.data.map(r => ({
                        id: r.result_object?.location_id,
                        title: r.result_object?.name,
                        image: r.result_object?.photo?.images?.medium?.url,
                        location: r.result_object?.location_string,
                        tag: action.type
                    }));
                    setSearchList(result);
                
                setLoading(false)
            }).catch(error => {
                setSearchList();
                setLoading(false);
                toast.error(error.message);
            })
        }
    }
  return (
   <ListContext.Provider value={{list,
   setList,
   addToList,
   updatedb,
   reducer,
   searchList,
   setSearchList,
   loading,
   setLoading,
   search,
   setSearch}}>
    {children}
   </ListContext.Provider>
  )
}
export const useListContext = () => useContext(ListContext)
export default ListProvider