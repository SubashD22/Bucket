import Navbar from './Components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { Toaster } from 'react-hot-toast';
import Register from './Pages/Register';
import EditProfile from './Pages/EditProfile';




function App() {
  
  return (
      <Router>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/editprofile' element={<EditProfile/>}/>
      </Routes>
      </Router>
  );
}

export default App;
