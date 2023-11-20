import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Alert, styled } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/login.scss";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<boolean | string>(false);

  const { t } = useTranslation();

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
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User signed in successfully");
        setSuccess(true);
        setTimeout(() => {
          setEmail("");
          setPassword("");
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          setError("Wrong password");
        } else if (error.code === "auth/user-not-found") {
          setError("User not found");
        }
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        console.log("User logged in");
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
        <h1 className="title">
          {t("Login")}
        </h1>
        <form className="formSubmit" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
            placeholder={t("Email")}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
            placeholder={t("Password")}
          />
          <p className="text">{t("Google")}</p>
          <div className="googleIcon" onClick={signInWithGoogle}>
            <GoogleIcon />
          </div>
          <button className="submit">
            {t("Login")}
          </button>
        </form>
        <Link to="/forgotpassword" className="forgot">
          {t("ForgotPassword")}
        </Link>
      </div>

      {success && <SuccessAlert severity="success">Success</SuccessAlert>}
      {error && <ErrorAlert severity="warning">{error}</ErrorAlert>}
    </>
  );
};

export default Login;
