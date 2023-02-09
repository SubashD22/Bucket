
import { Button, Card, CardActions, CardContent, Checkbox, Dialog, DialogTitle, FormControlLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useListContext } from '../context/ListContext';

const Modal = ({ open, props, close }) => {
    const { list, setList } = useListContext();
    const [checked, setChecked] = useState(props?.completed)
    const handleChecked = (e, id) => {
        if (e.target.checked) {
            const checked = list.filter(i => i.id === id);
            const newList = list.filter(i => i.id !== id);
            setList([...newList, { ...checked[0], completed: true }]);
            close()
        } else if (!e.target.checked) {
            const checked = list.filter(i => i.id === id);
            const newList = list.filter(i => i.id !== id);
            setList([{ ...checked[0], completed: false }, ...newList]);
            close()
        }
    }
    const onDelete = (id) => {
        const newList = list.filter((i) => i.id !== id);
        setList(newList);
        close();
    }
    return (
        <Dialog
            open={open}
            onClose={close}
            sx={{ width: 350, margin: 'auto' }}>
            <Card sx={{ textAlign: 'center' }}>
                <CardContent>
                    <Typography>{props?.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props?.author}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                        {props?.cat}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                        {props?.year}
                    </Typography>
                </CardContent>
                <CardActions>
                    <FormControlLabel
                        control={<Checkbox checked={props?.completed}
                            onChange={(e) => handleChecked(e, props.id)} />}
                        label='Completed' />
                </CardActions>
                <CardActions>
                    <Button variant='contained' color='error' onClick={() => onDelete(props.id)}>Delete</Button>
                </CardActions>
            </Card>
        </Dialog>
    )
}

export default Modal