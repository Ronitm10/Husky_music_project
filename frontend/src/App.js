import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tracks from './Components/Tracks';
import Albums from './Components/Albums';
import Login from './Components/Login/Login';
import { Container } from 'react-bootstrap';
import NVbar from './Components/NVbar';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken(); //Calling the custom hook for auth

  console.log("token in app.js", token);
  //no token, no login
  if (!token) {
    return (
      <div>
        <NVbar />
        <Login setToken={setToken} />
      </div>
    )
  }
  return (
    <div>
      <NVbar></NVbar>
      <Router>
        <Routes>
          <Route path="/tracks" element={<Tracks />}></Route>
          <Route path="/albums" element={<Albums />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
