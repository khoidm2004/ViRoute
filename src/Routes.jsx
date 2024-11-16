import React from 'react';
import Footer from './components/footer/footer';
import Taskbar from './components/taskbar/taskbar';
import Login from './components/login/login';
import Register from './components/register/register';
import Homescreen from './components/home/homescreen';
import RouteDetail from './components/home/routedetail';
import Map from './components/map/map';
import Tracking from './components/tracking/tracking';
import Feedback from './components/feedback/feedback';
import UserInformation from './components/user_information/user_information';
import Tickets from './components/tickets/tickets';
import { Routes, Route} from 'react-router-dom';

function AppRoutes() {
    return (
        <Routes>
          <Route path="/" element={<><Taskbar/><Homescreen/></>} />
          <Route path="/tracking" element={<><Taskbar/><Tracking/></>}/>
          <Route path="/tickets" element={<><Taskbar/><Tickets/></>}/>   {/*<Taskbar/> */}
          <Route path="/feedback" element={<><Taskbar/><Feedback/></>}/>
          <Route path="/login" element={<><Login/></>} />
          <Route path="/register" element={<><Register/></>}/> 

          <Route path="/:id" element={<><Taskbar/><UserInformation/></>} />
          <Route path="/route/:route" element={<><Taskbar/><RouteDetail/></>} />
        </Routes>
    );
  };
  
  
  export default AppRoutes