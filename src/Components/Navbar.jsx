import { AccountBox, AirplaneTicket, LocalMovies, Logout, MenuBook, Settings, SportsEsports } from '@mui/icons-material'
import { AppBar, Box, Button, Card, CardContent, CardMedia, Drawer, FormControl, Grid, InputBase, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Popover, Select, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext';
import uuid from 'react-uuid';
import { useListContext } from '../context/ListContext'


const Navbar = () => {
    const { user, logOut } = useAuthContext();
    const [drawer, setDrawer] = useState(false);
    const [search, setSearch] = useState('');
    const [searchList, setSearchList] = useState();
    const [cat, setCat] = React.useState("Books");

    const handleChange = (event) => {
        setCat(event.target.value);
        setSearch('')
    };
    const { setList } = useListContext()
    // const [searchResults, setSearchResults] = useState()
    const navigate = useNavigate()
    const callLogout = () => {
        logOut();
        setDrawer(false)
    }
    const callAddToList = (listItem) => {
        setList(p => ([
            listItem,
            ...p
        ]));
        setSearch('')
    };
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
                    setSearchList(results)
                    return
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
                    setSearchList(results)
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
                setSearchList(result)
            }).catch(function (error) {
                console.error(error);
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
                setSearchList(result)
            }).catch(function (error) {
                console.error(error);
            });
        }
    }
    const [searchResults, dispatch] = useReducer(reducer, []);
    useEffect(() => {
        const getData = setTimeout(async () => {
            setSearchList()
            if (search && search !== '') {
                dispatch({ type: cat });
            }
        }, 2000);
        return () => clearTimeout(getData)
    }, [search]);

    return (
        <>
            <AppBar >
                <Toolbar>
                    <Grid container spacing={2} justifyContent='center' alignItems='center'>
                        <Grid item xs={2} textAlign='center'>
                            <Typography variant='h6'
                                sx={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate('/')}
                            >
                                BUCKET
                            </Typography>
                        </Grid>
                        <Grid item xs={8} alignItems='center' sx={{ justifyContent: 'space-between' }} position='relative'>
                            <InputBase
                                aria-describedby='search'
                                sx={{ ml: 3, color: 'inherit', borderBottom: '3px solid white' }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Select
                                id="demo-simple-select-standard"
                                value={cat}
                                onChange={handleChange}
                                label="Category"
                                sx={{ ml: 3, color: 'inherit', height: 25, border: 'none', borderColor: 'transparent' }}
                            >
                                <MenuItem value="Books">
                                    <MenuBook />
                                </MenuItem>
                                <MenuItem value='Travel'><AirplaneTicket /></MenuItem>
                                <MenuItem value='Games'><SportsEsports /></MenuItem>
                                <MenuItem value='Movies'><LocalMovies /></MenuItem>
                            </Select>
                            {
                                searchList ?
                                    <Paper sx={{
                                        zIndex: '999',
                                        top: '70px',
                                        position: 'absolute',
                                        maxWidth: '350px',
                                        overflowY: 'scroll',
                                        height: '60vh'
                                    }}> <Stack >
                                            <List>
                                                {searchList?.map((r, i) => {
                                                    return (
                                                        <ListItem key={i}>
                                                            <ListItemButton onClick={() => callAddToList(searchList[i])}>
                                                                <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', maxWidth: '300px' }}>
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                                                            <Typography component="div" variant="h5">
                                                                                {r.title}
                                                                            </Typography>
                                                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                                {r?.author || r?.tag}
                                                                            </Typography>
                                                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                                {r?.year || r?.location}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Box>
                                                                    <CardMedia

                                                                        component="img"
                                                                        sx={{ width: 80, mr: 0, objectFit: 'contain' }}
                                                                        image={r?.image}
                                                                        alt="Live from space album cover"
                                                                    />
                                                                </Card>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    )
                                                })}
                                            </List>
                                        </Stack>

                                    </Paper> : <></>
                            }

                        </Grid>
                        {user ?
                            <Grid item xs={2}>
                                <Stack flexDirection='row' textAlign='center'>
                                    <Button sx={{ color: 'inherit' }}
                                        onClick={() => setDrawer(true)}
                                    >{user ? user.displayName : "Username"}</Button>
                                </Stack>
                            </Grid> : <></>}
                    </Grid>
                </Toolbar>
            </AppBar >
            <Drawer
                anchor='right'
                open={drawer}
                onClose={() => setDrawer(false)}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary='Edit' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={callLogout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default Navbar