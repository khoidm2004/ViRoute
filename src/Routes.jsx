import React from 'react';
import Footer from './components/footer/footer';
import Taskbar from './components/taskbar/taskbar';
import Login from './components/login/login';
import Register from './components/register/register';
import Homescreen from './components/home/homescreen';
import RouteDetail from './components/home/routedetail';
import { Routes, Route} from 'react-router-dom';

function AppRoutes() {
    return (
        <Routes>
          <Route path="/" element={<><Taskbar/><Homescreen/></>} />
          <Route path="/:route" element={<><Taskbar/><RouteDetail /></>} />
          <Route path="/tracking" element={<><Taskbar/></>}/>
          <Route path="/tickets" element={<><Taskbar/></>}/>
          <Route path="/feedback" element={<><Taskbar/></>}/>
          <Route path="/login" element={<><Login/></>} />
          <Route path="/register" element={<><Register/></>}/>       
        </Routes>
    );
  };
  
  
  export default AppRoutes