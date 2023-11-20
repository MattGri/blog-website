import { useState } from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/navigation.scss";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Navigation = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("User signed out successfully");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    if (selectedLanguage === "Polski") {
      i18n.changeLanguage("pl");
    }
    if (selectedLanguage === "English") {
      i18n.changeLanguage("en");
    }
  };

  return (
    <nav className="container">
      <div className="hamburgerIcon" onClick={() => setOpen(!open)}>
        {open ? <IoMdClose /> : <RxHamburgerMenu />}
      </div>

      <div className={`navLinks ${open ? "open" : "close"}`}>
        <Link to="/" className="items">
          {t("Home")}
        </Link>
        {user ? (
          <>
            <button onClick={handleSignOut} className="signout">
              {t("LogOut")}
            </button>
            <Link to="/createpost" className="items">
              {t("CreatePost")}
            </Link>
            <p className="items">{user?.displayName}</p>
          </>
        ) : (
          <>
            <Link to="/register" className="items">
              {t("Register")}
            </Link>
            <Link to="/login" className="items">
              {t("Login")}
            </Link>
          </>
        )}
        <select onChange={handleLanguageChange} className="selectLanguage">
          <option className="languageOption">English</option>
          <option className="languageOption">Polski</option>
        </select>
      </div>
    </nav>
  );
};

export default Navigation;
