import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase-config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert, styled } from '@mui/material';

const ForgotPassword = () => {

    useEffect(() => {
        document.title = "Forgot Password";
    }
        , []);


    const [email, setEmail] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const SuccessAlert = styled(Alert)`
        background-color: #0f7512;
        width: 700px;
        margin: 10px auto;
        color: #fff;
    `;

    const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Email sent");
                setEmail('');
                setSuccess(true);

                setInterval(() => {
                    setSuccess(false);
                }
                    , 3000);
            }
                , (error) => {
                    console.log(error);
                }
            );
    }

    return (
        <>
            <div className='wrapper'>
                <h1 className='title'>Forgot Password</h1>
                <form onSubmit={resetPassword}>
                    <label className='labelText'>
                        Email address
                    </label>
                    <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className='submit'>Reset password</button>
                </form>

            </div>
            {success && <SuccessAlert severity="success">Email sent</SuccessAlert>}
        </>
    )
}

export default ForgotPassword