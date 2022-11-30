// import './App.css'
import Home from './page/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Componenents/Login';
import Dashboard from './Componenents/Dashboard';
import Signin from './Componenents/Signin';
import Navbar from './Componenents/Navbar';

function App() {
  return (
  
    <div>
      <Router>
        <Navbar/>
        <Routes>
            <Route path='/signin' element={  <Signin/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/' exact element={<Home/>}/>
        </Routes>
      </Router>
   </div>
  )
}

export default App
