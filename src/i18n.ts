import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          Home: "Home",
          LogOut: "Log Out",
          CreatePost: "Create Post",
          Register: "Register",
          Login: "Login",
          BlogApp: "Blog App",
          BlogWebsite: "Blog Website",
          CreateAccount: "Create Account",
          DisplayName: "Display Name",
          Email: "Email",
          Password: "Password",
          Google: "or use google account",
          RegistrationCompleted: "Registration completed",
          ForgotPassword: "Forgot Password?",
          Forgot: "Retrieve Password",
          ResetPassword: "Reset Password",
          EmailSent: "Email sent",
          Title: "Title",
          Text: "Text",
          PostCreated: "Post created successfully",
          Welcome: "Welcome",
          AddComment: "Add Comment",
          DeleteComment: "Delete Comment",
        },
      },
      pl: {
        translation: {
          Home: "Strona główna",
          LogOut: "Wyloguj się",
          CreatePost: "Stwórz post",
          Register: "Zarejestruj się",
          Login: "Zaloguj się",
          BlogApp: "Blog",
          BlogWebsite: "Blog",
          CreateAccount: "Stwórz konto",
          DisplayName: "Nazwa użytkownika",
          Email: "Email",
          Password: "Hasło",
          Google: "lub użyj konta google",
          RegistrationCompleted: "Rejestracja zakończona pomyślnie",
          ForgotPassword: "Zapomniałeś hasła?",
          Forgot: "Odzyskaj hasło",
          ResetPassword: "Zresetuj hasło",
          EmailSent: "Email wysłany",
          Title: "Tytuł",
          Text: "Tekst",
          PostCreated: "Post utworzony pomyślnie",
          Welcome: "Witaj",
          AddComment: "Dodaj komentarz",
          DeleteComment: "Usuń komentarz",
        },
      },
    },
  });

export default i18next;
