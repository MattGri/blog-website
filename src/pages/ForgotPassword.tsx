import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const { t } = useTranslation();

  const SuccessAlert = styled(Alert)`
    background-color: #0f7512;
    width: 700px;
    margin: 10px auto;
    color: #fff;
  `;

  const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email).then(
      () => {
        console.log("Email sent");
        setEmail("");
        setSuccess(true);

        setInterval(() => {
          setSuccess(false);
        }, 3000);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="title">{t("Forgot")}</h1>
        <form className="formSubmit" onSubmit={resetPassword}>
          <input
            className="input"
            type="email"
            placeholder={t("Email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit">{t("ResetPassword")}</button>
        </form>
      </div>
      {success && (
        <SuccessAlert severity="success">{t("EmailSent")}</SuccessAlert>
      )}
    </>
  );
};

export default ForgotPassword;
