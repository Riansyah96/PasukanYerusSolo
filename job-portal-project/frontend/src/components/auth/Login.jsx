import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/auth/login', formData);
            if (res.data?.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_name', res.data.user?.nama_lengkap || 'User');
                alert('Login Berhasil!');
                if (onLoginSuccess) onLoginSuccess();
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Email atau password salah!');
        } finally {
            setLoading(false);
        }
    };

    // Menggunakan objek style yang konsisten dengan Register.jsx
    const styles = {
        container: { display: 'flex',justifyContent: 'center',alignItems: 'center',minHeight: '100vh',background: '#120902', padding: '1rem' },card: { width: '100%', maxWidth: '400px', background: 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(45, 15, 0, 0.4)', color: '#fef3c7' },
        brand: { textAlign: 'center', marginBottom: '1.5rem' },
        logo: { fontSize: '1.75rem', fontWeight: '900', background: 'linear-gradient(135deg, #fb923c 0%, #facc15 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 },
        subBrand: { fontSize: '0.75rem', color: '#ea580c', letterSpacing: '0.2rem', fontWeight: '800', textTransform: 'uppercase', marginTop: '0.25rem' },
        title: { fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', textAlign: 'center', marginBottom: '1.5rem' },
        label: { fontSize: '0.75rem', fontWeight: '700', color: '#fb923c', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' },
        input: { width: '100%', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(254, 215, 170, 0.15)', backgroundColor: '#2e1d11', fontSize: '1rem', color: '#fef3c7', marginBottom: '1rem', boxSizing: 'border-box', outline: 'none' },
        btn: { width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', color: '#fff', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' },
        btnGuest: { width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ea580c', background: 'transparent', color: '#fb923c', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.75rem' },
        errorAlert: { padding: '0.75rem', background: '#7f1d1d', color: '#fca5a5', borderRadius: '0.5rem', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' },
        link: { color: '#facc15', cursor: 'pointer', fontWeight: '700', marginLeft: '0.25rem' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.brand}>
                    <h1 style={styles.logo}>YerusSolo</h1>
                    <div style={styles.subBrand}>Job Portal</div>
                </div>
                <h2 style={styles.title}>Masuk Akun</h2>
                {error && <div style={styles.errorAlert}>{error}</div>}
                <form onSubmit={handleLogin}>
                    <label style={styles.label}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
                    <label style={styles.label}>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required />
                    <button type="submit" style={styles.btn} disabled={loading}>{loading ? 'Memverifikasi...' : 'Masuk Akun'}</button>
                </form>
                <button type="button" onClick={() => navigate('/')} style={styles.btnGuest}>🔍 Jelajahi Sebagai Guest</button>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#fca5a5' }}>
                    Belum punya akun? <span onClick={() => navigate('/register')} style={styles.link}>Daftar Sekarang</span>
                </p>
            </div>
        </div>
    );
};

export default Login;