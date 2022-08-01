import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Alert, styled, } from '@mui/material';
import "../styles/register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(false);

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
  }
    , []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User created successfully");
        setSuccess(true);
        setTimeout(() => {
          setEmail('');
          setPassword('');
          navigate('/login');
        }
          , 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters');
        }
        else if (error.code === 'auth/email-already-in-use') {
          setError('email already in use');
        }
        else if (error.code === 'auth/invalid-email') {
          setError('invalid email');
        }
        setTimeout(() => {
          setError(false);
        }
          , 2000);
      });
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="title">Create account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="input"
            required
          />
          <button className="submit">Register</button>
        </form>
      </div>


      {success && <SuccessAlert severity="success">Registration completed</SuccessAlert>}
      {error && <ErrorAlert severity="warning">{error}</ErrorAlert>}


    </>
  );
};

export default Register;
