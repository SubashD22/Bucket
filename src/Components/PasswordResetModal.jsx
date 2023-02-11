import { Box, Button, Dialog, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const PasswordResetModal = ({ open, close }) => {
    const [email, setEmail] = useState()
    const { resetPassword } = useAuthContext();
    const callResetPassword = async (e) => {
        e.preventDefault()
        await resetPassword(email);
        toast.success('check email');
        close();
    }
    return (
        <Dialog
            open={open}
            onClose={close}>
            <Container component='main' maxWidth='xs'>
                <Box
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Typography component='h1' variant='h5'>
                        Reset Password
                    </Typography>
                    <Box component='form' sx={{ mt: 1 }}
                        onSubmit={callResetPassword}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            autoFocus
                            variant='standard'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>

                    </Box>
                    <Link to="/register" variant="body2">
                        {"Create New Account? Sign Up"}
                    </Link>
                </Box>
            </Container>
        </Dialog>
    )
}

export default PasswordResetModal