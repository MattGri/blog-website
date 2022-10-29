import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Alert, styled } from "@mui/material";
import "../styles/register.scss";
import GoogleIcon from "@mui/icons-material/Google";

const Register = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);

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

  useEffect(() => {
    document.title = "Register";
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        auth.currentUser &&
          updateProfile(auth.currentUser, {
            displayName: displayName,
          })
            .then(() => {
              // console.log("Profile updated successfully");
              // console.log(auth.currentUser?.photoURL);
            })
            .catch((error) => {
              // console.log(error);
            });

        setSuccess(true);
        setTimeout(() => {
          setEmail("");
          setPassword("");
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // console.log(error);
        if (error.code === "auth/weak-password") {
          setError("Password should be at least 6 characters");
        } else if (error.code === "auth/email-already-in-use") {
          setError("email already in use");
        } else if (error.code === "auth/invalid-email") {
          setError("invalid email");
        }
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        // console.log('User logged in');
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="title">Create account</h1>
        <form className="formSubmit" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <p className="text">or use google account</p>
          <div className="googleIcon" onClick={signInWithGoogle}>
            <GoogleIcon />
          </div>
          <button className="submit">Register</button>
        </form>
      </div>

      {success && (
        <SuccessAlert severity="success">Registration completed</SuccessAlert>
      )}
      {error && <ErrorAlert severity="warning">{error}</ErrorAlert>}
    </>
  );
};

export default Register;
