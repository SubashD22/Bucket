import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const { user, changeEmail, changePassword } = useAuthContext();
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate('/')
    }, [user]);
    const callChangeEmail = async (e) => {
        e.preventDefault()
        setLoading(true)
        await changeEmail(email);
        setLoading(false)
    }
    const callChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (cpassword === password) {
            await changePassword(password)
        } else (
            toast.error('password do not match')
        )
        setLoading(false)
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Typography component='h1' variant='h5'>
                    Change Email Id
                </Typography>
                <Box component='form' onSubmit={callChangeEmail} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type='email'
                        autoComplete="email"
                        value={email}
                        autoFocus
                        variant='standard'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>

                </Box>
                <Typography component='h1' variant='h6'>
                    or
                </Typography>
                <Typography component='h1' variant='h5'>
                    Change Password
                </Typography>
                <Box component='form' onSubmit={callChangePassword} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type='password'
                        value={password}
                        autoFocus
                        variant='standard'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="cpassword"
                        label="Confirm Password"
                        name="password"
                        type='password'
                        autoComplete="email"
                        value={cpassword}
                        autoFocus
                        variant='standard'
                        onChange={(e) => setcPassword(e.target.value)}
                    />

                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>

                </Box>


                <Link to="/" variant="body2">
                    Back to Home
                </Link>
            </Box>
        </Container>
    )
}

export default EditProfile