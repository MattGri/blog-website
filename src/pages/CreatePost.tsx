import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../config/firebase-config";
import { firestore } from "../config/firebase-config";
import { Alert, styled } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/createPost.scss";
import { useTranslation } from "react-i18next";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Create post";
  }, []);

  const SuccessAlert = styled(Alert)`
    background-color: #0f7512;
    width: 700px;
    margin: 10px auto;
    color: #fff;
  `;

  const ErrorAlert = styled(Alert)`
    background-color: #ff0000;
    width: 700px;
    margin: 10px auto;
    color: #fff;
  `;

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || post === "") {
      setError("Please fill all the fields");

      return setTimeout(() => {
        setError(false);
      }, 2000);
    }
    const postsCollection = collection(firestore, "posts");
    addDoc(postsCollection, {
      title,
      post,
      user: user?.displayName,
    })
      .then(() => {
        console.log("Post created successfully");
        setTitle("");
        setPost("");
        setSuccess(true);
        return setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="title">{t("CreatePost")}</h1>
        <form className="formSubmit" onSubmit={createPost}>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder={t("Title")}
            />
          </div>
          <div>
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="input"
              placeholder={t("Post")}
            />
          </div>
          <button className="submit">{t("CreatePost")}</button>
        </form>
      </div>

      {success && (
        <SuccessAlert severity="success">
          {t("PostCreated")}
        </SuccessAlert>
      )}
      {error && <ErrorAlert severity="error">{error}</ErrorAlert>}
    </>
  );
};

export default CreatePost;
