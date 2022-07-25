import React, { useState } from 'react'
import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../styles/register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User created successfully');
        setEmail('');
        setPassword('');
        navigate('/login');
      }
      )
      .catch(error => {
        console.log(error);
      }
      );
  }


  return (
    <>
      <h1 className='title'>Sign in</h1>
      <form onClick={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className='register'>create account</button>
      </form>
    </>
  )
}

export default Register