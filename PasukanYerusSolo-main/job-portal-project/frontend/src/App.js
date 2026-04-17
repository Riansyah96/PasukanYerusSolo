import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './features/auth/Register';
import Login from './features/auth/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect ke login saat akses pertama kali */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Route Auth dengan Wrapper CSS */}
          <Route path="/login" element={
            <div className="auth-wrapper">
              <Login />
            </div>
          } />
          
          <Route path="/register" element={
            <div className="auth-wrapper">
              <Register />
            </div>
          } />
          
          {/* Placeholder Dashboard yang lebih rapi */}
          <Route path="/dashboard" element={
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>Selamat Datang di Dashboard</h1>
              <p>Anda berhasil masuk ke sistem PasukanYerusSolo.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;