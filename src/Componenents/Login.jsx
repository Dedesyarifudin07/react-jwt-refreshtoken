import axios from 'axios';
import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import "./Login.css"
const login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState('');
  const [msgpwd,setMsgpwd] = useState('');
  const [succes,setSucces] = useState('');
  const [waiting,setWaiting] = useState();
  const navigate = useNavigate('');
  const oAuth = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3003/akun/login',
        {
          email,password}).then((res) => {
          if(res.data.msg){
            setTimeout(() => {
              navigate('/signin')
            },3000)
            setMsg(res.data.msg)
          }else if(res.data.msgPwd){
            setEmail('');
            setPassword('');
            setMsgpwd('password salah cuy||isi yang bener');
          }else{
            setTimeout(() => {
              navigate('/Dashboard')
            },5000)
            setWaiting('menuju halanman dashboard')
            setSucces(res.data.succes)
          }
          console.log(res.data);
          const decode = jwtDecode(res.data.refreshToken);
          console.log(decode);
        })
    } catch (error) {
console.log(error)
    }



    
  }
  return (
    <div className='login' >
      <p className='mr-2'>halaman login</p>
  {waiting} <br /> {succes}
      <form onSubmit={oAuth}>
          <h1>email</h1>
          <input type="email" onChange={e => setEmail(e.target.value)} value={email} required/>
          <br/>

          <h1>password</h1>
          <input type="password"   onChange={e => setPassword(e.target.value)} value={password}  required/>

          <button>submit</button>
        <h1>{msg}</h1> 
        <br />
        <h1>{msgpwd}</h1>
      </form>
   
    </div>
  )
}

export default login
