import { useTheme } from '@emotion/react';
import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Card, Box, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'

const Home = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])
    const theme = useTheme();
    return (
        <div style={{
            marginTop: '6rem'
        }}>
            <Card sx={{ display: 'flex', maxWidth: '300px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Live From Space
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography>
                    </CardContent>

                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564"
                    alt="Live from space album cover"
                />
            </Card>
        </div>
    )
}

export default Home