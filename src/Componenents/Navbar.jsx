import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate('');
  const handleLogout =async  () => {
    try {
   const response =await  axios.delete('http://localhost:3003/akun/delete');
   console.log(response)
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container-fluid">
          <Link to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link to="/Dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
              <Link to="/login">login</Link>
              </li>
              <li className="nav-item">
              <Link to="/signin">signin</Link>
              </li>
            </ul>
            <button type="submit" className="logout" onClick={handleLogout}>logout</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
