import { async } from '@firebase/util';
import { useRef } from 'react';
import Navbar from './Components/Navbar';
import { useAuthContext } from './context/authContext';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {QueryClientProvider, QueryClient}from 'react-query'
import Home from './Pages/Home';
import Login from './Pages/Login';
import { Toaster } from 'react-hot-toast';
import Register from './Pages/Register';




function App() {
  
  return (
      <Router>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
       {/* <form onSubmit={register} style={{
        marginTop:'6rem'
      }}>
        <fieldset>
          <legend>register</legend>
          <input type='text' ref={nameRef} name='username' placeholder='username'/>
          <br/>
          <input type='email' ref={emailRef} name='email' placeholder='Email'/>
          <br/>
          <input type='password' ref={passwordRef} name='password' placeholder='Password'/>
          <br/>
          <button type='submit'>Register</button>
        </fieldset>
      </form> */}
      </Router>
  );
}

export default App;
