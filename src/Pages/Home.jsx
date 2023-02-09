import { useTheme } from '@emotion/react';
import { Card, Box, CardContent, Typography, CardMedia, IconButton, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import { useAuthContext } from '../context/authContext'
import { useListContext } from '../context/ListContext';

const Home = () => {
    const { user } = useAuthContext();
    const { list, setList } = useListContext();
    const [open, setOpen] = useState(false);
    const [ModalProps, setModalProps] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user]);
    const closeModal = () => {
        setOpen(false);
        setModalProps(undefined)
    }
    const handleModal = (obj) => {
        setModalProps(obj);
        setOpen(true)
    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const completedIndex = list.findIndex(i => i.completed === true);
        console.log(completedIndex - 1)
        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index < list.findIndex(i => i.completed === true) ?
            result.destination.index : list.findIndex(i => i.completed === true) - 1
            , 0, reorderedItem)
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
                                    let card;
                                    if (img.height >= img.width) {
                                        card = <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', maxWidth: '300px', height: 120, padding: 0, backgroundColor: l.completed && 'grey' }}
                                            onClick={() => handleModal(l)} >
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                    <Typography component="div" variant="h5" fontSize='1rem' sx={{ height: 'auto', overflowY: 'hidden', textOverflow: 'ellipsis' }} >
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
                                        card = <Card sx={{ maxWidth: 300, backgroundColor: l.completed && 'grey' }}
                                            onClick={() => handleModal(l)}>
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
                                        <Draggable key={l.id} draggableId={l.id} index={i} isDragDisabled={l.completed}>
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
            <Modal open={open} props={ModalProps} close={closeModal} />
        </div>
    )
}

export default Home