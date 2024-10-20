import React from 'react';
import ReactDOM from 'react-dom/client'; // แก้ไขที่นี่
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from '../src/Navbar/Navbar';

// ใช้ createRoot แทน ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root')); // แก้ไขที่นี่
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <App />
    </Router>
  </React.StrictMode>
);
