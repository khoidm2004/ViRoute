import React from 'react';
import Home from './pages/Home.jsx';
import Tracking_page from './pages/Tracking.jsx';
import Ticket_page from './pages/Ticket_page.jsx';
import Taskbar from './components/taskbar/taskbar';
import Login from './components/login/login';
import Register from './components/register/register';
import Feedback_page from './pages/Feedback_page.jsx';
import UserInformation_page from './pages/userInformation_page.jsx';
import RouteDetail from './components/home/routedetail';
import UserInformation from './components/user_information/user_information';
import NotFound from './components/not_found/not_found';
import Reclaimpass from './components/reclaimpass/reclaimpass';
import SuccessChange from './components/reclaimpass/success_change';
import { Routes, Route} from 'react-router-dom';

function AppRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/tracking" element={<Tracking_page/>}/>
          <Route path="/tickets" element={<Ticket_page/>}/>   
          <Route path="/feedback" element={<Feedback_page/>}/>
          <Route path="/login" element={<><Login/></>} />
          <Route path="/register" element={<><Register/></>}/> 
          <Route path="/reclaimpass" element={<><Taskbar/><Reclaimpass/></>}/>
          <Route path="/reclaimpass/success_change" element={<><Taskbar/><SuccessChange/></>}/>
          <Route path="/user/:id" element={<UserInformation_page/>} />
          <Route path="/route/:bus_start-:bus_end" element={<p>Route</p>} />

          <Route path="/*" element={<><Taskbar/><NotFound/></>}/>

          <Route path='/test' element={<h>Testing page</h>}/>
        </Routes>
    );
  };
  
  
  export default AppRoutes