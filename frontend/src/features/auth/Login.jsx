import React, { useState } from 'react';
import API from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert(`Selamat datang, ${res.data.nama}!`);
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response?.data?.msg || "Login Gagal. Silakan periksa kembali akun Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Selamat Datang</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Masuk ke Portal Kerja untuk melanjutkan
      </p>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Alamat Email</label>
          <input 
            type="email" 
            className="form-input"
            placeholder="nama@perusahaan.com" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Kata Sandi</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="••••••••" 
            value={password}
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk Sekarang'}
        </button>
      </form>

      <div className="auth-footer">
        Belum memiliki akun? <a href="/register">Daftar secara gratis</a>
      </div>
    </div>
  );
};

export default Login;