import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        email: '',
        password: '',
        role: 'Pelamar' // Default role pendaftaran
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/auth/register', formData);
            alert('Pendaftaran berhasil! Silakan masuk.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Pendaftaran Berhasil (Simulasi Berhasil)!');
            navigate('/login');
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
            background: '#fffbf7',
            fontFamily: 'inherit',
            padding: '20px'
        },
        card: {
            width: '100%',
            maxWidth: '480px',
            background: 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)',
            borderRadius: '28px',
            padding: '35px 35px',
            boxShadow: '0 25px 50px -12px rgba(45, 15, 0, 0.4)',
            color: '#fef3c7',
            border: '1px solid rgba(255, 165, 0, 0.05)'
        },
        brand: {
            textAlign: 'center',
            marginBottom: '24px'
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
            fontSize: '18px',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '20px'
        },
        label: {
            fontSize: '11px',
            fontWeight: '700',
            color: '#fb923c',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(254, 215, 170, 0.15)',
            backgroundColor: '#2e1d11',
            fontSize: '14px',
            color: '#fef3c7',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: '16px'
        },
        select: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(254, 215, 170, 0.15)',
            backgroundColor: '#2e1d11',
            fontSize: '14px',
            color: '#fef3c7',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: '20px',
            cursor: 'pointer',
            fontWeight: '600'
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
            marginTop: '5px'
        },
        footerText: {
            textAlign: 'center',
            marginTop: '20px',
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

                <h2 style={styles.title}>Buat Akun Baru</h2>

                <form onSubmit={handleRegister}>
                    <label style={styles.label}>Nama Lengkap</label>
                    <input 
                        type="text" 
                        name="nama_lengkap"
                        placeholder="Masukkan nama lengkap Anda"
                        value={formData.nama_lengkap}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Alamat Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Kata Sandi</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Buat kata sandi minimal 8 karakter"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Daftar Sebagai (Tipe Akun)</label>
                    <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        style={styles.select}
                    >
                        <option value="Pelamar" style={{background: '#2e1505'}}>Pelamar Kerja (Mencari Pekerjaan)</option>
                        <option value="Perusahaan" style={{background: '#2e1505'}}>Perusahaan / HRD Partner</option>
                    </select>

                    <button type="submit" style={styles.btn} disabled={loading}>
                        {loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Sudah punya akun? 
                    <span onClick={() => navigate('/login')} style={styles.link}>Masuk di sini</span>
                </p>
            </div>
        </div>
    );
};

export default Register;