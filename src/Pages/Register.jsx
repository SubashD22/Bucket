import { AccountCircleOutlined, Google } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Register = () => {
    const { signInWithGoogle, signUpWithEmail, login, logOut, user } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setname] = useState('');
    const [loading, setLoading] = useState(false)
    const register = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await signUpWithEmail(email, password, name);
            setLoading(false)
            toast.success('login successful')
        } catch (error) {
            setLoading(false);
            toast.error(error.message)
        }
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AccountCircleOutlined />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign Up
                </Typography>
                <Box component='form' onSubmit={register} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type='text'
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        autoFocus
                        variant='standard'
                        onChange={(e) => setname(e.target.value)}
                    />
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        variant='standard'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>

                </Box>
                <Typography component='h1' variant='h6'>
                    or
                </Typography>
                <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    endIcon={<Google />}
                    onClick={signInWithGoogle}
                >Sign In with
                </Button>
                <Link to="/login" variant="body2">
                    {"Do you have an account? Sign In"}
                </Link>
            </Box>
        </Container>
    )
}

export default Register