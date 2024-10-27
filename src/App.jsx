import React from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Taskbar from './components/taskbar/taskbar';
import Login from './components/login/login';
import Register from './components/register/register';
import Homescreen from './components/home/homescreen';
import RouteDetail from './components/home/routedetail';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<><Taskbar/><Homescreen/></>} />
        <Route path="/:route" element={<RouteDetail />} />
        <Route path="/tracking" element={<><Taskbar/></>}/>

        <Route path="/login" element={<><Login/></>} />
        <Route path="/register" element={<><Register/></>}/>        
      </Routes>
    </Router>
  );
};


export default App