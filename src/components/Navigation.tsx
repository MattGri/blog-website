import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/navigation.scss";


const Navigation = () => {

  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (

    <nav className="container">
      <Link to="/" className="items">
        Home
      </Link>
      <>
        <Link to="/register" className="items">
          Register
        </Link>
        <Link to="/login" className="items">
          Login
        </Link>
      </>
      {
        user && (
          <>

            <button onClick={handleSignOut} className="signout">
              Log out
            </button>
            <Link to="/createpost" className="items">
              Create Post
            </Link>
            {
              auth.currentUser?.photoURL ? (
                <img className='profileImage' src={auth.currentUser?.photoURL || ""} alt='' />
              ) : (
                <></>
              )
            }
          </>

        )
      }
    </nav>
  );
};




export default Navigation;
