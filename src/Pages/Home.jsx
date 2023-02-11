import { Card, Box, CardContent, Typography, CardMedia, List, ListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import { useAuthContext } from '../context/authContext'
import { useListContext } from '../context/ListContext';

const Home = () => {
    const { user } = useAuthContext();
    const { list, setList } = useListContext();
    const [open, setOpen] = useState(false);
    const [ModalProps, setModalProps] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const fetchdata = async () => {
        setIsLoading(true)
        console.log('called')
        if (user) {
            const token = await user?.getIdToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const res = await axios.get('http://localhost:5000/api/getlist', config)
            if (res.data) {
                setList(res.data);
                setIsLoading(false)
            }
        }
    };
    useEffect(() => {
        if (!user) {
            navigate('/login')
        } if (user) {
            fetchdata()
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
        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        if (completedIndex >= 0) {
            items.splice(result.destination.index < list.findIndex(i => i.completed === true) ?
                result.destination.index : list.findIndex(i => i.completed === true) - 1
                , 0, reorderedItem)
        } else {
            items.splice(result.destination.index, 0, reorderedItem)
        }

        setList(items);
    }
    if (isLoading) {
        return (
            <div style={{
                marginTop: '6rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }
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
                                        card = <Card sx={{ width: 300, backgroundColor: l.completed && 'grey' }}
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