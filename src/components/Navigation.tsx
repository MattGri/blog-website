import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import "../styles/navigation.scss";

interface NavigationProps {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

const Navigation = ({ isAuth, setIsAuth }: NavigationProps) => {

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        localStorage.clear();
        setIsAuth(false);
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
      {!isAuth ? (
        <>
          <Link to="/register" className="items">
            Register
          </Link>
          <Link to="/login" className="items">
            Login
          </Link>
        </>
      ) : (
        <>
          <button onClick={handleSignOut} className="signout">
            Log out
          </button>
          <Link to="/createpost" className="items">
            Create Post
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
