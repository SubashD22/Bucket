import { Google, LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import PasswordResetModal from '../Components/PasswordResetModal';
import { useAuthContext } from '../context/authContext';

const Login = () => {
    const { signInWithGoogle, signUpWithEmail, login, logOut, user } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const modalClose = () => setModalOpen(false)
    const callLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await login(email, password);
            setLoading(false)
            toast.success('login successful')
        } catch (error) {
            setLoading(false);
            toast.error(error.message)
        }

    }
    const demoLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await login('demo@email.com', process.env.REACT_APP_DEMO_PASSWORD);
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
                    <LockOutlined />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign In
                </Typography>
                <Box component='form' onSubmit={callLogin} sx={{ mt: 1 }}>
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
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={demoLogin}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In as Demo
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
                <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    variant='text'
                    onClick={() => { setModalOpen(true) }}
                >forgot password?
                </Button>
                <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Box>
            <PasswordResetModal open={modalOpen} close={modalClose} />
        </Container>
    )
}

export default Login