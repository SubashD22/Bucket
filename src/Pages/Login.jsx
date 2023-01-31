import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Login = () => {
    const { signInWithGoogle, signUpWithEmail, login, logOut, user } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const register = async (e) => {
        e.preventDefault();
        await signUpWithEmail(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
    }
    const callLogin = async (e) => {
        e.preventDefault()
        await login(emailRef.current.value, passwordRef.current.value)
    }
    return (
        <div>
            <form onSubmit={callLogin} style={{
                marginTop: '6rem'
            }}>
                <fieldset>
                    <legend>login</legend>
                    <input type='email' ref={emailRef} name='email' placeholder='Email' />
                    <br />
                    <input type='password' ref={passwordRef} name='password' placeholder='Password' />
                    <br />
                    <button type='submit'>Log In</button>
                </fieldset>
            </form>
            <button onClick={signInWithGoogle}>Log in with Google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Login