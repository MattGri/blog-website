import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth,googleProvider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Alert, styled } from '@mui/material';
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import '../styles/login.scss';

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

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        console.log('User logged in');
        localStorage.setItem('isAuth', 'true');
        setIsAuth(true);
        navigate('/');
      }
      )
      .catch(error => {
        console.log(error);
        setError(error);
      }
      );
  }

  return (
    <>
      <div className="wrapper">
        <h1 className="title">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label className="labelText">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <label className="labelText">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <p className="text">or use google account</p>
          <div className="googleIcon" onClick={signInWithGoogle} >
            <GoogleIcon />
          </div>
          <button className="submit">Login</button>
        </form>
        <Link to='/forgotpassword' className="forgot">Forgot password?</Link>
      </div>

      {success && <SuccessAlert severity='success'>Success</SuccessAlert>}
      {error && <ErrorAlert severity="warning">{error}</ErrorAlert>}
    </>
  );
};

export default Login;
