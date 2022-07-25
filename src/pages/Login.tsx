import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import { signInWithEmailAndPassword, } from 'firebase/auth'



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
        if (
          error.code === 'auth/wrong-password'
        ) {
          alert('Wrong password')
        }
        else if (
          error.code === 'auth/user-not-found'
        ) {
          alert('User not found')
        }
      }
      );
  }



  return (
    <>
      <div className='wrapper'>
        <h1 className='title'>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='input' placeholder='email' />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='input' placeholder='password' />
          <button className='submit'>login</button>
        </form>
      </div>
    </>
  )
}

export default Login