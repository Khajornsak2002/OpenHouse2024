import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../components/register';
import MainPage from '../components/mainpage';
import AdminDashboard from '../Admins/Admin';
import Checkin from '../components/Checkin';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/Check-in" element={<Checkin />} />
    </Routes>
  );
}

export default AppRoutes;
