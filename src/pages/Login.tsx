import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert, styled } from '@mui/material';

interface LoginProps {
  setIsAuth: (isAuth: boolean) => void;
}

const Login = ({ setIsAuth }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<boolean | string>(false);

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
    document.title = "Login";
  }
    , []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User signed in successfully");
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
        setSuccess(true);
        setTimeout(() => {
          setEmail('');
          setPassword('');
          navigate('/');
        }
          , 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          setError('Wrong password');
        }
        else if (error.code === 'auth/user-not-found') {
          setError('User not found');
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
        <h1 className="title">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="password"
            required
          />
          <button className="submit">login</button>
        </form>
      </div>

      {success && <SuccessAlert severity='success'>Success</SuccessAlert>}
      {error && <ErrorAlert severity="warning">{error}</ErrorAlert>}
    </>
  );
};

export default Login;
