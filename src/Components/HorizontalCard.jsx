import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const HorizontalCard = ({ item }) => {
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', maxWidth: '300px', height: 120, padding: 0, backgroundColor: item.completed && 'grey' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" fontSize='1rem' sx={{ height: 'auto', overflowY: 'hidden', textOverflow: 'ellipsis' }} >
                        {item?.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item?.author}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                        {item?.cat}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                        {item?.year}
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 80, mr: 0, objectFit: 'contain' }}
                image={item?.image}
                alt="Live from space album cover"
            />
        </Card>
    )
}

export default HorizontalCard