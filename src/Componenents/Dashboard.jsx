import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true
import jwtDecode from 'jwt-decode';
import {  useNavigate } from 'react-router-dom';

const Dashboard = () => {
  let no = 1;
  const [name,setName] = useState('');
  const [expire,setExpire] = useState('');
  const [token,setToken] = useState('');
  const [users,setUsers] = useState([]);
  const navigate = useNavigate('');

  useEffect(() => {
    refreshToken();
    getAllUser();
  },[])
  
  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:3003/akun/refreshToken',{ withCredentials: true })
      console.log(response.data.accesToken);
      const decode = jwtDecode(response.data.accesToken);
      setName(decode.name);
      setExpire(decode.exp);
    } catch (error) {
      if(error.response){
        navigate('/');
      }
    }
  }

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if(expire * 1000 < currentDate.getTime()){
      const response = await axios.get('http://localhost:3003/akun/refreshToken');
      config.headers.Authorization = `Bearer ${response.data.accesToken}`;
      setToken(response.data.accesToken);
      const decode = jwtDecode(response.data.accesToken);
      setName(decode.name);
      setExpire(decode.exp);
      console.log(response.data.accesToken)
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  })

  const getAllUser = async () => {
    try {
      const response = await axiosJwt.get('http://localhost:3003/akun/getAKUN',{
        headers: {
          Authorization: `Bearer ${token}`
          }
      });
      setUsers(response.data.getAkun);
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <p>halaman Dashboard</p>
      <h1>welcome back: {name}</h1>
      <button onClick={getAllUser}>get all usser</button>
      {users.map(user => {
          return <ul key={user._id}>
            <li>no {no++}</li>
            <li>nama:{user.name}</li>
            <li>email:{user.email}</li>
          </ul>
          

        })
     }
    </div>
  )
}

export default Dashboard
