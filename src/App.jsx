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
  /*path /hn */
  return (
    <Router>
      <Routes>
        <Route path="/:cityCode/" element={<><Taskbar/><Homescreen/></>} />
        <Route path="/:cityCode/:route" element={<><Taskbar/><RouteDetail /></>} />
        <Route path="/:cityCode/tracking" element={<><Taskbar/></>}/>
        <Route path="/:cityCode/tickets" element={<><Taskbar/></>}/>
        <Route path="/:cityCode/feedback" element={<><Taskbar/></>}/>
        <Route path="/login" element={<><Login/></>} />
        <Route path="/register" element={<><Register/></>}/>       
      </Routes>
    </Router>
  );
};


export default App