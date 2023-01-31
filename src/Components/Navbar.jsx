import { AccountBox, Logout, Settings } from '@mui/icons-material'
import { AppBar, Box, Button, Card, CardContent, CardMedia, Drawer, Grid, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popover, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const Navbar = () => {
    const { user, logOut } = useAuthContext();
    const [drawer, setDrawer] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState()
    const navigate = useNavigate()
    const callLogout = () => {
        logOut();
        setDrawer(false)
    }
    useEffect(() => {
        const getData = setTimeout(async () => {
            setSearchResults(null)
            const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}:keyes&${process.env.REACT_APP_GBOOKS_API_KEY}`);
            if (res) {
                const results = res.data.items.map(r => ({
                    title: r.volumeInfo.title,
                    description: r.volumeInfo.description,
                    image: r.volumeInfo.imageLinks.smallThumbnail,
                    author: r.volumeInfo.authors[0],
                    rating: r.volumeInfo.averageRating
                }));
                setSearchResults(results)
            }
        }, 2000);
        return () => clearTimeout(getData)
    }, [search])
    return (
        <>
            <AppBar >
                <Toolbar>
                    <Grid container spacing={2}>
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
                        <Grid item xs={8} justifyContent="center" position='relative'>
                            <InputBase
                                aria-describedby='search'
                                sx={{ ml: 3, color: 'inherit' }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Paper sx={{
                                zIndex: '999',
                                top: '70px',
                                position: 'absolute',
                                maxWidth: '350px',
                                overflowY: 'scroll',
                                height: '60vh'
                            }}>{searchResults ? <Stack >
                                <List>
                                    {searchResults.map(r => (
                                        <ListItem key={r.title}>
                                            <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', maxWidth: '300px' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h5">
                                                            {r.title}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                                            {r.author}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                                <CardMedia

                                                    component="img"
                                                    sx={{ width: 80, mr: 0 }}
                                                    image={r.image}
                                                    alt="Live from space album cover"
                                                />
                                            </Card>
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack> : <></>}

                            </Paper>
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
            </AppBar>
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