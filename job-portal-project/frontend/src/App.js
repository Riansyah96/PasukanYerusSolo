import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './features/auth/Register';
import Login from './features/auth/Login'; // Pastikan file Login.jsx sudah ada

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Alur: Jika buka root, arahkan ke login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Route untuk Login & Register sesuai kriteria laporan */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Nantinya kamu bisa tambah route Dashboard di sini */}
          <Route path="/dashboard" element={<div>Selamat Datang di Dashboard</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;