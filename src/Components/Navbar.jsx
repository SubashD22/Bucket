import { AirplaneTicket, LocalMovies, Logout, MenuBook, Settings, SportsEsports, Verified } from '@mui/icons-material'
import { AppBar, Box, Button, Card, CardContent, CardMedia, Drawer, Grid, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext';

import { useListContext } from '../context/ListContext'
import SearchResults from './SearchResults'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-hot-toast'
import NavDrawer from './NavDrawer'


const Navbar = () => {
    const { user } = useAuthContext();
    const { setList,
        reducer,
        searchList,
        loading,
        setLoading,
        search,
        setSearch,
        setSearchList } = useListContext()
    const [drawer, setDrawer] = useState(false);
    const [cat, setCat] = React.useState("Books");
    const location = useLocation();


    const onClose = () => {
        setLoading(false);
        setSearchList()
    }

    const handleChange = (event) => {
        setCat(event.target.value);
        setSearch('')
    };

    const navigate = useNavigate()

    const callAddToList = (listItem) => {
        setList(p => ([
            listItem,
            ...p
        ]));
        setSearch('')
    };

    const [searchResults, dispatch] = useReducer(reducer, []);
    useEffect(() => {
        if (!search) {
            setSearchList()
        }

        const getData = setTimeout(async () => {
            setLoading(false)
            if (search && search !== '') {
                setLoading(true)
                dispatch({ type: cat });
            }
        }, 2000);
        return () => clearTimeout(getData)
    }, [search]);
    if (location.pathname === '/login' || location.pathname === '/register') {
        return (<></>)
    }
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
                                id='search'
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
                            <SearchResults loading={loading} searchList={searchList} close={onClose} />
                            {
                                loading ?
                                    <Paper sx={{
                                        zIndex: '999',
                                        top: '70px',
                                        position: 'absolute',
                                        maxWidth: '350px',
                                        overflowY: 'scroll',
                                    }}> <Stack >
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="96"
                                                visible={true}
                                            />
                                        </Stack>

                                    </Paper> :
                                    <Paper sx={{
                                        zIndex: '999',
                                        top: '70px',
                                        position: 'absolute',
                                        maxWidth: '350px',
                                        overflowY: 'scroll',
                                        height: '60vh',
                                        visibility: searchList ? 'visible' : 'hidden'
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

                                    </Paper>
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
            <NavDrawer drawer={drawer} setDrawer={setDrawer} />

        </>
    )
}

export default Navbar