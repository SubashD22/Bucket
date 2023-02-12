import { Logout, Settings, Verified } from '@mui/icons-material'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const NavDrawer = ({ drawer, setDrawer }) => {
    const { user, logOut, emailVerification } = useAuthContext();
    const callLogout = async () => {
        logOut();
        setDrawer(false)
    }
    const callEmailverification = () => {
        try {
            emailVerification();
            toast.success('email sent')
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
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
                    <ListItemButton >
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary='Edit' />
                    </ListItemButton>
                </ListItem>
                {user?.emailVerified === false ?
                    <ListItem>
                        <ListItemButton onClick={callEmailverification}>
                            <ListItemIcon>
                                <Verified />
                            </ListItemIcon>
                            <ListItemText>Verify Email</ListItemText>
                        </ListItemButton>
                    </ListItem> : <></>}
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
    )
}

export default NavDrawer