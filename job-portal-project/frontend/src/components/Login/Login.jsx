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
            const res = await api.post('/login', formData);
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                const userData = res.data.user || res.data.data || res.data;
                const namaUser = userData.nama_lengkap || userData.name || 'User';
                const roleUser = userData.role || 'Pelamar';

                localStorage.setItem('user_name', namaUser);
                localStorage.setItem('role', roleUser); 

                alert('Login Berhasil!');
                if (typeof onLoginSuccess === 'function') {
                    onLoginSuccess(roleUser);
                }
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            const pesanError = err.response?.data?.message || err.response?.data?.error || 'Email atau kata sandi Anda salah.';
            setError(pesanError);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestAccess = () => {
        localStorage.clear();
        localStorage.setItem('user_name', 'Tamu Eksplorasi');
        localStorage.setItem('role', 'Guest');
        if (typeof onLoginSuccess === 'function') {
            onLoginSuccess('Guest');
        }
        navigate('/');
    };

    const styles = {
        container: { 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            // OPTIMASI BACKDROP: Efek gradasi lingkaran gelap sinematik
            background: 'radial-gradient(circle, #1a0f08 0%, #0a0502 100%)', 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            padding: '20px'
        },
        card: { 
            width: '100%', 
            maxWidth: '420px', 
            background: 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)', 
            borderRadius: '24px', 
            padding: '40px 36px', 
            // Memperhalus bayangan luar card agar membaur di latar gelap
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)', 
            border: '1px solid #3d1d07',
            boxSizing: 'border-box'
        },
        brand: { textAlign: 'center', marginBottom: '28px' },
        logo: { fontSize: '34px', fontWeight: '900', color: '#ea580c', margin: '0', letterSpacing: '-1px' },
        subBrand: { fontSize: '11px', color: '#9e8476', textTransform: 'uppercase', letterSpacing: '4px', marginTop: '4px', fontWeight: '800' },
        title: { fontSize: '18px', fontWeight: '700', color: '#fef3c7', textAlign: 'center', marginBottom: '24px', letterSpacing: '-0.3px' },
        label: { display: 'block', fontSize: '11px', fontWeight: '800', color: '#ea580c', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
        input: { 
            width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #4a240b',
            background: '#0d0603', color: '#fef3c7', fontSize: '14px', marginBottom: '20px', 
            boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease',
        },
        btn: { 
            width: '100%', padding: '15px', borderRadius: '12px', border: 'none', 
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', color: '#ffffff',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)',
            transition: 'all 0.2s ease',
        },
        dividerContainer: { display: 'flex', alignItems: 'center', textAlign: 'center', margin: '20px 0', color: '#5c391f' },
        dividerLine: { flex: 1, borderBottom: '1px solid #4a240b' },
        dividerText: { padding: '0 10px', fontSize: '12px', fontWeight: '600', color: '#826555', textTransform: 'uppercase' },
        btnGuest: {
            width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #5c391f',
            background: 'transparent', color: '#fef3c7', fontSize: '14px', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.2s ease',
        },
        footerText: { textAlign: 'center', color: '#9e8476', fontSize: '13px', marginTop: '28px', fontWeight: '500' },
        link: { color: '#ea580c', fontWeight: '700', cursor: 'pointer', marginLeft: '5px', textDecoration: 'none', transition: 'color 0.2s' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.brand}>
                    <h1 style={styles.logo}>YerusSolo</h1>
                    <div style={styles.subBrand}>Job Portal</div>
                </div>
                
                <h2 style={styles.title}>Masuk Akun</h2>
                
                {error && (
                    <div style={{ 
                        color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', 
                        borderRadius: '10px', fontSize: '13px', marginBottom: '20px', textAlign: 'center',
                        border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: '500'
                    }}>
                        ⚠️ {error}
                    </div>
                )}
                
                <form onSubmit={handleLogin}>
                    <label style={styles.label}>Alamat Email</label>
                    <input 
                        type="email" name="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange}
                        style={styles.input} required onFocus={(e) => e.target.style.borderColor = '#ea580c'} onBlur={(e) => e.target.style.borderColor = '#4a240b'}
                    />
                    
                    <label style={styles.label}>Kata Sandi</label>
                    <input 
                        type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange}
                        style={styles.input} required onFocus={(e) => e.target.style.borderColor = '#ea580c'} onBlur={(e) => e.target.style.borderColor = '#4a240b'}
                    />
                    
                    <button 
                        type="submit" style={styles.btn} disabled={loading}
                        onMouseOver={(e) => e.target.style.opacity = '0.9'} onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        {loading ? 'Memverifikasi...' : 'Masuk Akun'}
                    </button>
                </form>

                <div style={styles.dividerContainer}>
                    <div style={styles.dividerLine}></div>
                    <div style={styles.dividerText}>Atau</div>
                    <div style={styles.dividerLine}></div>
                </div>

                <button 
                    type="button" onClick={handleGuestAccess} style={styles.btnGuest}
                    onMouseOver={(e) => { e.target.style.background = 'rgba(234, 88, 12, 0.08)'; e.target.style.borderColor = '#ea580c'; }}
                    onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = '#5c391f'; }}
                >
                    🔍 Jelajahi Sebagai Guest
                </button>

                <p style={styles.footerText}>
                    Belum punya akun?
                    <span onClick={() => navigate('/register')} style={styles.link} onMouseOver={(e) => e.target.style.color = '#f59e0b'} onMouseOut={(e) => e.target.style.color = '#ea580c'}>
                        Daftar Sekarang
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;