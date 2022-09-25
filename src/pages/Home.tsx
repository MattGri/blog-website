import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase-config";
import { firestore } from "../config/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/home.scss";

interface Post {
  id: string;
  title?: string;
  post?: string;
  user?: string;
}


const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    document.title = "Home";
    const postsCollection = collection(firestore, "posts");
    onSnapshot(postsCollection, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPosts(posts);
    });
  }, []);

  const deletePost = (id: string) => {
    const postsCollection = doc(firestore, "posts", id);
    deleteDoc(postsCollection)
      .then(() => {
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="title">Blog app</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : user ? (
        <>
          <p className="title">Welcome {user.email}</p>
        </>
      ) : (
        <></>
      )}
      <ul>
        {posts.map((posted) => (
          <>
            <div key={posted.id} className="homeWrapper">
              <h1 className="title">{posted.title}</h1>
              <p className="text">{posted.post}</p>
              <p className="text">{posted.user}</p>
              {
                user?.email === posted.user ? (
                  <>
                    <button className="submit" onClick={() => deletePost(posted.id)}>Delete</button>
                  </>
                ) : (
                  <></>
                )

              }
            </div>
          </>
        ))}
      </ul>
    </>
  );
};

export default Home;
