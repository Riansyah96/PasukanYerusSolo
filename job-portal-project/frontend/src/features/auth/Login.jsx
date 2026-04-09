import React, { useState } from 'react';
import API from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Simpan token
      alert(`Selamat datang, ${res.data.nama}!`);
      window.location.href = '/dashboard'; // Redirect ke dashboard
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>Masuk ke Portal Kerja</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br/>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;