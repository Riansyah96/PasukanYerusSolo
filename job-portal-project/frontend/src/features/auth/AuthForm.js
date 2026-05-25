import React, { useState } from 'react';

const AuthForm = ({ isRegister, onSubmitAuth }) => {
    const [formData, setFormData] = useState({ nama: '', email: '', password: '', role: 'Pelamar' });

    const handleChange = (e) => {
        // Menggunakan computed property name sesuai materi Pertemuan 9
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitAuth(formData); // Melempar data state ke fungsi handler parent
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
            <h2>{isRegister ? 'Daftar Akun' : 'Masuk Sistem'}</h2>
            {isRegister && (
                <input type="text" name="nama" placeholder="Nama Lengkap" value={formData.nama} onChange={handleChange} required />
            )}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {isRegister && (
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="Pelamar">Pelamar Kerja</option>
                    <option value="Perusahaan">Perusahaan / HRD</option>
                </select>
            )}
            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>
    );
};

export default AuthForm;