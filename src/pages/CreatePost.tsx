import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase-config";
import { firestore } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/createPost.scss";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  useEffect(() => {
    document.title = "Create post";
  }
    , []);

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const createPost = () => {
    if (title === "" || post === "") {
      return alert("Please fill in all fields");
    }
    const postsCollection = collection(firestore, "posts");
    addDoc(postsCollection, {
      title,
      post,
      user: user?.email,
    })
      .then(() => {
        console.log("Post created successfully");
        setTitle("");
        setPost("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="title">Create Post</h1>
        <div>
          <label className="subtitle">Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="subtitle">Post: </label>
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="input"
          />
        </div>
        <button onClick={createPost} className="submit">
          create post
        </button>
      </div>
    </>
  );
};

export default CreatePost;
