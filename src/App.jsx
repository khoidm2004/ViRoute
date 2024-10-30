import React from 'react';
import './App.css';
import AppRoutes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
        <AppRoutes/>
    </Router>
  );
};


export default App