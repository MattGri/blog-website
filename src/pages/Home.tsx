import React, { useState, useEffect } from 'react'
import { auth } from '../firebase-config';
import { firestore } from '../firebase-config'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/home.scss'

const Home = () => {

  const [user, loading, error] = useAuthState(auth);

  const [posts, setPosts] = useState<any>([])


  useEffect(() => {
    showPosts()
  }, [posts])


  const showPosts = () => {
    const postsCollection = collection(firestore, 'posts')
    getDocs(postsCollection)
      .then(response => {
        const postsdb = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }
        )
        setPosts(postsdb)
      }
      )
      .catch(error => {
        console.log(error)
      }
      );
  }

  const deletePost = (id: string) => {
    const postsCollection = doc(firestore, 'posts', id)
    deleteDoc(postsCollection)
      .then(() => {
        console.log('Post deleted successfully')
        showPosts()
      }
      )
      .catch(error => {
        console.log(error)
      }
      );
  }

  return (
    <>
      <h1 className='title'>Blog app</h1>
      {
        loading ?
          <p>Loading...</p>
          :
          error ?
            <p>Error: {error.message}</p>
            :
            user ?
              <>
                <p className='title'>Welcome {user.email}</p>

              </>
              :
              <></>
      }
      <ul>
        {posts.map(posted => (
          <>
            <div key={posted.id} className='homeWrapper'>
              <h1 className='title'>{posted.title}</h1>
              <p className='text'>{posted.post}</p>
              <p className='text'>{posted.user}</p>
              <button onClick={() => deletePost(posted.id)} className='submit'>delete</button>
            </div>
          </>
        ))}
      </ul>
    </>
  )
}

export default Home