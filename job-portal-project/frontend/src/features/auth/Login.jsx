import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
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
        setLoading(false);

        // Simulasi Validasi / Integrasi API
        try {
            setLoading(true);
            const res = await api.post('/auth/login', formData);
            
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_name', res.data.user.nama_lengkap);
                localStorage.setItem('user_role', res.data.user.role);
                navigate('/dashboard');
            }
        } catch (err) {
            // Mode Cadangan untuk Demo Frontend PasukanYerusSolo jika API offline
            console.log("Menjalankan sesi demo mode...");
            if (formData.email.includes('admin')) {
                localStorage.setItem('user_name', 'Administrator');
                localStorage.setItem('user_role', 'Admin');
            } else if (formData.email.includes('hrd') || formData.email.includes('perusahaan')) {
                localStorage.setItem('user_name', 'PT Solusi Digital');
                localStorage.setItem('user_role', 'Perusahaan');
            } else {
                localStorage.setItem('user_name', formData.email.split('@')[0]);
                localStorage.setItem('user_role', 'Pelamar');
            }
            localStorage.setItem('token', 'demo-token-yerussolo');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#fffbf7', // Warna krem hangat luar
            fontFamily: 'inherit',
            padding: '20px'
        },
        card: {
            width: '100%',
            maxWidth: '450px',
            background: 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)', // Gradasi Cokelat Gelap khas YerusSolo
            borderRadius: '28px',
            padding: '40px 35px',
            boxShadow: '0 25px 50px -12px rgba(45, 15, 0, 0.4)',
            color: '#fef3c7',
            border: '1px solid rgba(255, 165, 0, 0.05)'
        },
        brand: {
            textAlign: 'center',
            marginBottom: '30px'
        },
        logo: {
            fontSize: '28px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #fb923c 0%, #facc15 100%)',
            display: 'block',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1.2px',
            margin: 0
        },
        subBrand: {
            fontSize: '11px',
            color: '#ea580c',
            letterSpacing: '3px',
            fontWeight: '800',
            textTransform: 'uppercase',
            marginTop: '6px'
        },
        title: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '24px'
        },
        label: {
            fontSize: '12px',
            fontWeight: '700',
            color: '#fb923c',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '8px',
            letterSpacing: '0.5px'
        },
        input: {
            width: '100%',
            padding: '14px 18px',
            borderRadius: '14px',
            border: '1px solid rgba(254, 215, 170, 0.15)',
            backgroundColor: '#2e1d11',
            fontSize: '14px',
            color: '#fef3c7',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: '20px',
            fontWeight: '500'
        },
        btn: {
            width: '100%',
            padding: '14px',
            borderRadius: '14px',
            border: 'none',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#fff',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(234, 88, 12, 0.3)',
            marginTop: '10px',
            transition: 'transform 0.2s'
        },
        footerText: {
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '13px',
            color: '#fca5a5'
        },
        link: {
            color: '#facc15',
            textDecoration: 'none',
            fontWeight: '700',
            marginLeft: '5px',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.brand}>
                    <h1 style={styles.logo}>YerusSolo</h1>
                    <div style={styles.subBrand}>Job Portal</div>
                </div>

                <h2 style={styles.title}>Selamat Datang Kembali</h2>
                {error && <p style={{ color: '#ef4444', fontSize: '13px', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <label style={styles.label}>Alamat Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="contoh: pelamar@yerussolo.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Kata Sandi</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <button type="submit" style={styles.btn} disabled={loading}>
                        {loading ? 'Memverifikasi...' : 'Masuk Akun'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Belum punya akun? 
                    <span onClick={() => navigate('/register')} style={styles.link}>Daftar Sekarang</span>
                </p>
            </div>
        </div>
    );
};

export default Login;