import React, { useState } from 'react';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    nama: '', 
    email: '', 
    password: '', 
    role: 'pencari_kerja' 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/register', formData);
      alert(res.data.msg);
      navigate('/login'); // Gunakan navigate untuk UX yang lebih mulus
    } catch (err) {
      alert(err.response?.data?.msg || "Registrasi Gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Gabung Sekarang</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Mulai langkah karirmu bersama Pasukan YerusSolo.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input 
            type="text" 
            className="form-input"
            placeholder="Masukkan nama lengkap" 
            onChange={e => setFormData({...formData, nama: e.target.value})} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Alamat Email</label>
          <input 
            type="email" 
            className="form-input"
            placeholder="nama@email.com" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Kata Sandi</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="Minimal 8 karakter" 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Daftar Sebagai</label>
          <select 
            className="form-input" 
            value={formData.role}
            onChange={e => setFormData({...formData, role: e.target.value})}
            style={{ appearance: 'none', cursor: 'pointer' }}
          >
            <option value="pencari_kerja">Pencari Kerja</option>
            <option value="perusahaan">Perusahaan</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Mendaftarkan...' : 'Buat Akun'}
        </button>
      </form>

      <div className="auth-footer">
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </div>
    </div>
  );
};

export default Register;