import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/route'; // Ensure this path is correct
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function App() {
  return (
    <div className="App">
        <Link className="App-link" to="/register">ลงทะเบียน</Link> {/* Use Link instead of a */}
        <Link className="App-link" to="/mainpage">Main Page</Link> {/* Use Link instead of a */}
      <AppRoutes /> {/* Use AppRoutes to define your routes */}
    </div>
  );
}

export default App;
