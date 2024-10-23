import React from 'react';
import './App.css';
import Footer from './components/footer';
import Taskbar from './components/taskbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Homescreen from './components/homescreen';

const WithTaskbar = ({children}) => {
  return (
    <>
      <Taskbar />
      {children}
    </>
  );
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WithTaskbar><Homescreen/></WithTaskbar>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
};


export default App