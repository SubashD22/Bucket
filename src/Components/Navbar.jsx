import { AccountBox, Logout, Settings } from '@mui/icons-material'
import { AppBar, Button, Drawer, Grid, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const Navbar = () => {
    const { user, logOut } = useAuthContext();
    const [drawer, setDrawer] = useState(false);
    const navigate = useNavigate()
    const callLogout = () => {
        logOut();
        setDrawer(false)
    }
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
                        <Grid item xs={8} justifyContent="center">
                            <InputBase
                                sx={{ ml: 3, color: 'inherit' }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
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