import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'

const Home = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate()
    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    }, [user])
    return (
        <div style={{
            marginTop: '6rem'
        }}>Home</div>
    )
}

export default Home