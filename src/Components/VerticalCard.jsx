import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const VerticalCard = ({ item }) => {
    return (
        <Card sx={{ width: 300, backgroundColor: item?.completed && 'grey' }}
        >
            <CardMedia
                component='img'
                alt="green iguana"

                image={item?.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item?.author || item?.location}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" >
                    {item?.cat}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" >
                    {item?.year}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default VerticalCard