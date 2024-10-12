// openhouse2024/src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';

function Navbar() {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/mainpage" className="navbar-link">หน้าหลัก</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">ลงทะเบียน</Link>
          </li>
          <li className="navbar-item">
            <Link to="/admin" className="navbar-link">Admin</Link>
          </li>
        </ul>
      </nav>
    );
  }
  

export default Navbar;