import React ,{useState }from 'react'
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const signin = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,SetPassword] = useState('');
  const [msg,setMsg] = useState('');
  const navigate = useNavigate('');

  const handleSubmit = () => {
    axios.post('http://localhost:3003/akun/register',
    {
      name,email,password
    }
    ).then(res => {
      setMsg(res.data.msg)
    })

    //tunggu 3 detik
    try {
      setTimeout(() => {
        navigate('/login');
      },5000)
      
    } catch (error) {
      console.log(error)
    }

      //lalu navigasi ke ahalamn login
  
    
  }
  

  return (
    <div className='login'>
      <h1>ussername </h1>
      <p>{msg}</p>
      <br />
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="name" required/>
      <br/>
         <h1>email </h1>
      <input type="email" onChange={(e) =>setEmail(e.target.value)} value={email} name="email" required/>
      <br/>

      <h1>password</h1>
      <input type="password" onChange={(e) => SetPassword(e.target.value)} value={password} name='password' required/>

        <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default signin
