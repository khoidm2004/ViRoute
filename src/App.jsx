import React from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Taskbar from './components/taskbar/taskbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Homescreen from './components/home/homescreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Taskbar/><Homescreen/></>} />
        <Route path="/login" element={<><Login/><Footer/></>} />
        <Route path="/register" element={<><Register/><Footer/></>}/>
      </Routes>
    </Router>
  );
};


export default App