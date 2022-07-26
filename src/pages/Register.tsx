import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Register";
  }
    , []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 6) {
      return alert("Password must be at least 6 characters long");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User created successfully");
        alert("User created successfully");
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch((error) => {
        alert("Email alredy exists");
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
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="input"
          />
          <button className="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
