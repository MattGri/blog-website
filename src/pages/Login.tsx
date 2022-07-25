import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase-config'
import { signInWithEmailAndPassword, signInWithPopup, } from 'firebase/auth'



interface LoginProps {
  setIsAuth: (isAuth: boolean) => void
}


const Login = ({ setIsAuth }: LoginProps) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User signed in successfully')
        localStorage.setItem('isAuth', 'true')
        setIsAuth(true)
        setEmail('')
        setPassword('')
        navigate('/')
      }
      )
      .catch(error => {
        console.log(error)
      }
      );
  }



  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>login</button>
      </form>
    </>
  )
}

export default Login