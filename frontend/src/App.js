import './App.css';
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Tracks from './Components/Tracks';
import Albums from './Components/Albums';
import Login from './Components/Login/Login';
import { Container } from 'react-bootstrap';
import NVbar from './Components/NVbar';
import useToken from './useToken';
import Album from './Components/Album';
import Home from './Components/Home/Home';

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
    <div>
      <NVbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<Album />} />
      </Routes>
    </div>
  );
}

export default App;
