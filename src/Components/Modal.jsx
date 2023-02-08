
import { Button, Card, CardActions, CardContent, Checkbox, Dialog, DialogTitle, FormControlLabel, Typography } from '@mui/material'
import React from 'react'
import { useListContext } from '../context/ListContext';

const Modal = ({ open, props, close }) => {
    const { list, setList } = useListContext();
    const handleChecked = (e, id) => {
        if (e.target.checked) {
            const checked = list.filter(i => i.id === id);
            const newList = list.filter(i => i.id !== id);
            setList([...newList, { ...checked[0], completed: true }])
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
            <Card>
                <CardContent>
                    <Typography>{props?.title}</Typography>
                </CardContent>
                <CardActions>
                    <FormControlLabel
                        control={<Checkbox
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