import { Children, useState } from 'react';
import './App.css';
import Taskbar from './components/taskbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login';

const withTaskbar = ({children}) => {
  return (
    <>
      <Taskbar />
      {children}
    </>
  );
};
/*lỗi hiện taskbar - kh hiện taskbar*/ 
function App() {
  const [count, setCount] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<withTaskbar><div>Homescreen</div></withTaskbar>} />
      </Routes>
    </Router>
  );
};


export default App