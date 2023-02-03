import { useTheme } from '@emotion/react';
import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Card, Box, CardContent, Typography, CardMedia, IconButton, List, ListItem } from '@mui/material';
import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'
import { useListContext } from '../context/ListContext';

const Home = () => {
    const { user } = useAuthContext();
    const { list } = useListContext();
    console.log(typeof (list))
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])
    const theme = useTheme();
    return (
        <div style={{
            marginTop: '6rem',
            display: 'flex',
            justifyContent: 'center'
        }}>



            {list && list.length ?
                <DragDropContext>
                    <List>
                        <Droppable>
                            {list.map((l, i) => {
                                return (
                                    <ListItem>
                                        <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', maxWidth: '300px' }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                    <Typography component="div" variant="h5">
                                                        {l.title}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                        {l.author}
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                            <CardMedia

                                                component="img"
                                                sx={{ width: 80, mr: 0, objectFit: 'contain' }}
                                                image={l.image}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                    </ListItem>
                                )
                            })}
                        </Droppable>
                    </List>
                </DragDropContext> :
                <Typography>List Empty</Typography>}

        </div>
    )
}

export default Home