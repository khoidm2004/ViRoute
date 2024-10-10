import { useState } from 'react';
import './App.css';
import Taskbar from './components/taskbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Taskbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<div>Homescreen</div>} />
      </Routes>
    </Router>
  )
}
export default App