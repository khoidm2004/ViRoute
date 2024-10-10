import { useState } from 'react';
import './App.css';
import Taskbar from './components/taskbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Taskbar />
      <Routes>
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </Router>
  )
}
export default App