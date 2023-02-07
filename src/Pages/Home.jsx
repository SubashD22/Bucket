import { useTheme } from '@emotion/react';
import { Padding, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Card, Box, CardContent, Typography, CardMedia, IconButton, List, ListItem } from '@mui/material';
import React, { useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'
import { useListContext } from '../context/ListContext';

const Home = () => {
    const { user } = useAuthContext();
    const { list, setList } = useListContext();
    console.log(typeof (list))
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user]);
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setList(items);
    }
    const theme = useTheme();
    return (
        <div style={{
            marginTop: '6rem',
            display: 'flex',
            justifyContent: 'center'
        }}>
            {list && list.length ?
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='bucketList'>
                        {(provided) => (

                            <List {...provided.droppableProps} ref={provided.innerRef} width='100%'>
                                {list.map((l, i) => {
                                    const img = new Image();
                                    img.src = l.image;
                                    console.log(img.height > img.width)
                                    let card;
                                    if (img.height >= img.width) {
                                        card = <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', maxWidth: '300px', textOverflow: 'ellipsis', height: 120, padding: 0 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                    <Typography component="div" variant="h5" fontSize='1rem'  >
                                                        {l.title}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                        {l?.author}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                                                        {l?.cat}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                                                        {l?.year}
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
                                    } else {
                                        card = <Card sx={{ maxWidth: 300 }}>
                                            <CardMedia
                                                component='img'
                                                alt="green iguana"

                                                image={l.image}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {l.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {l.author || l.location}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div" >
                                                    {l?.cat}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div" >
                                                    {l?.year}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    }

                                    return (
                                        <Draggable key={l.id} draggableId={l.id} index={i}>
                                            {(provided) => (
                                                <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    {card}
                                                </ListItem>
                                            )}
                                        </Draggable>)
                                })}
                            </List>

                        )}
                    </Droppable>
                </DragDropContext> :
                <Typography>List Empty</Typography>}
        </div>
    )
}

export default Home