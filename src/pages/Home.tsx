import React from 'react'
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {

  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <h1>Home</h1>
      {
        loading ?
          <p>Loading...</p>
          :
          error ?
            <p>Error: {error.message}</p>
            :
            user ?
              <p>Welcome {user.email}</p>
              :
              <></>
      }
    </>
  )
}

export default Home