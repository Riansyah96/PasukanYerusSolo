import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        email: '',
        password: '',
        role: 'Pelamar'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/register', formData);
            alert('Pendaftaran berhasil! Silakan login masuk.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Gagal mendaftarkan akun baru.');
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
            // OPTIMASI BACKDROP SINKRON: Gradasi lingkaran gelap sinematik
            background: 'radial-gradient(circle, #1a0f08 0%, #0a0502 100%)', 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            padding: '20px'
        },
        card: { 
            width: '100%', 
            maxWidth: '440px', 
            background: 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)', 
            borderRadius: '24px', 
            padding: '40px 36px', 
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)', 
            border: '1px solid #3d1d07',
            boxSizing: 'border-box'
        },
        brand: { textAlign: 'center', marginBottom: '24px' },
        logo: { fontSize: '34px', fontWeight: '900', color: '#ea580c', margin: '0', letterSpacing: '-1px' },
        subBrand: { fontSize: '11px', color: '#9e8476', textTransform: 'uppercase', letterSpacing: '4px', marginTop: '4px', fontWeight: '800' },
        title: { fontSize: '18px', fontWeight: '700', color: '#fef3c7', textAlign: 'center', marginBottom: '24px', letterSpacing: '-0.3px' },
        label: { display: 'block', fontSize: '11px', fontWeight: '800', color: '#ea580c', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
        input: { 
            width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #4a240b',
            background: '#0d0603', color: '#fef3c7', fontSize: '14px', marginBottom: '20px', 
            boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease',
        },
        select: { 
            width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #4a240b',
            background: '#0d0603', color: '#fef3c7', fontSize: '14px', marginBottom: '24px', 
            boxSizing: 'border-box', outline: 'none', cursor: 'pointer', transition: 'all 0.2s ease',
        },
        btn: { 
            width: '100%', padding: '15px', borderRadius: '12px', border: 'none', 
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', color: '#ffffff',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)',
            transition: 'all 0.2s ease',
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
                
                <h2 style={styles.title}>Buat Akun Baru</h2>
                
                {error && (
                    <div style={{ 
                        color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', 
                        borderRadius: '10px', fontSize: '13px', marginBottom: '20px', textAlign: 'center',
                        border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: '500'
                    }}>
                        ⚠️ {error}
                    </div>
                )}
                
                <form onSubmit={handleRegister}>
                    <label style={styles.label}>Nama Lengkap</label>
                    <input 
                        type="text" name="nama_lengkap" placeholder="Nama Lengkap" value={formData.nama_lengkap} onChange={handleChange}
                        style={styles.input} required onFocus={(e) => e.target.style.borderColor = '#ea580c'} onBlur={(e) => e.target.style.borderColor = '#4a240b'}
                    />
                    
                    <label style={styles.label}>Alamat Email</label>
                    <input 
                        type="email" name="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange}
                        style={styles.input} required onFocus={(e) => e.target.style.borderColor = '#ea580c'} onBlur={(e) => e.target.style.borderColor = '#4a240b'}
                    />
                    
                    <label style={styles.label}>Kata Sandi</label>
                    <input 
                        type="password" name="password" placeholder="Minimal 8 karakter" value={formData.password} onChange={handleChange}
                        style={styles.input} required onFocus={(e) => e.target.style.borderColor = '#ea580c'} onBlur={(e) => e.target.style.borderColor = '#4a240b'}
                    />
                    
                    <label style={styles.label}>Daftar Sebagai</label>
                    <select 
                        name="role" value={formData.role} onChange={handleChange} style={styles.select}
                        onFocus={(e) => e.target.style.borderColor = '#ea580c'} onBlur={(e) => e.target.style.borderColor = '#4a240b'}
                    >
                        <option value="Pelamar" style={{background: '#2e1505'}}>Pelamar Kerja</option>
                        <option value="Perusahaan" style={{background: '#2e1505'}}>Perusahaan / HRD</option>
                    </select>
                    
                    <button 
                        type="submit" style={styles.btn} disabled={loading}
                        onMouseOver={(e) => e.target.style.opacity = '0.9'} onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Sudah punya akun?
                    <span onClick={() => navigate('/login')} style={styles.link} onMouseOver={(e) => e.target.style.color = '#f59e0b'} onMouseOut={(e) => e.target.style.color = '#ea580c'}>
                        Masuk di sini
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;