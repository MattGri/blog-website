import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Navigation from "./components/Navigation";

function App() {
  const [isAuth, setIsAuth] = useState<any>(localStorage.getItem("isAuth"));

  return (
    <Router>
      <div className="App">
        <Navigation isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
