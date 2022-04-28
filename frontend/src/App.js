import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tracks from "./Components/Tracks";
import Albums from "./Components/Albums";
import Login from "./Components/Login/Login";
import { Container } from "react-bootstrap";
import NVbar from "./Components/NVbar";
import useToken from "./useToken";
import Album from "./Components/Album";
import Playlist from "./Components/Playlist";
import Home from "./Components/Home/Home"
import Signup from "./Components/Signup/Signup"

function App() {
  // const { token, setToken } = useToken(); //Calling the custom hook for auth

  // console.log("token in app.js", token);
  //no token, no login
  // if (!token) {
  //   return (
  //     <div>
  //       <NVbar />
  //       <Login setToken={setToken} />
  //     </div>
  //   )
  // }
  return (
    <div className="main">
      <NVbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<Album />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
    </div>
  );
}

export default App;
