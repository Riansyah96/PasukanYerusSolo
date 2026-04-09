import React, { useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ nama: '', email: '', password: '', role: 'pencari_kerja' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      alert(res.data.msg);
    } catch (err) {
      alert("Registrasi Gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Registrasi Pasukan YerusSolo</h2>
      <input type="text" placeholder="Nama Lengkap" onChange={e => setFormData({...formData, nama: e.target.value})} required /><br/>
      <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required /><br/>
      <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required /><br/>
      <select onChange={e => setFormData({...formData, role: e.target.value})}>
        <option value="pencari_kerja">Pencari Kerja</option>
        <option value="perusahaan">Perusahaan</option>
      </select><br/>
      <button type="submit">Daftar Sekarang</button>
      <p>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
    </form>
  );
};

export default Register;