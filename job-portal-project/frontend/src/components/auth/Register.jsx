import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import Modal from '../Modal/Modal';

const Register = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        email: '',
        password: '',
        role: 'Pelamar'
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', message: '', type: 'success' });

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        
        if (e.target.name === 'password') {
            let strength = 0;
            if (value.length >= 6) strength++;
            if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
            if (value.match(/[0-9]/)) strength++;
            if (value.match(/[^a-zA-Z0-9]/)) strength++;
            setPasswordStrength(strength);
        }
    };

    const showNotification = (title, message, type = 'success') => {
        setModalMessage({ title, message, type });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            nama: formData.nama_lengkap, 
            email: formData.email,
            password: formData.password,
            role: formData.role
        };

        try {
            await api.post('/auth/register', payload);
            showNotification('✨ Pendaftaran Berhasil', 'Akun Anda berhasil dibuat! Silakan masuk.', 'success');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Terjadi kesalahan saat pendaftaran.';
            showNotification('❌ Pendaftaran Gagal', errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return '#e5e5e5';
        if (passwordStrength === 1) return '#ef4444';
        if (passwordStrength === 2) return '#f59e0b';
        if (passwordStrength === 3) return '#eab308';
        return '#22c55e';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength === 0) return 'Belum diisi';
        if (passwordStrength === 1) return 'Lemah';
        if (passwordStrength === 2) return 'Sedang';
        if (passwordStrength === 3) return 'Kuat';
        return 'Sangat Kuat';
    };

    const styles = {
        container: { 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: isDark ? '#120902' : '#f5f5f4',
            padding: '1rem',
            transition: 'all 0.3s ease'
        },
        card: { 
            width: '100%', 
            maxWidth: '450px', 
            background: isDark 
                ? 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)' 
                : 'linear-gradient(180deg, #ffffff 0%, #fef3c7 100%)',
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: isDark 
                ? '0 25px 50px -12px rgba(45, 15, 0, 0.4)' 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            color: isDark ? '#fef3c7' : '#1c1917',
            transition: 'all 0.3s ease',
            animation: 'slideUp 0.5s ease'
        },
        brand: { textAlign: 'center', marginBottom: '1.5rem' },
        logo: { 
            fontSize: '1.75rem', 
            fontWeight: '900', 
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            margin: 0 
        },
        subBrand: { 
            fontSize: '0.75rem', 
            color: '#ea580c', 
            letterSpacing: '0.2rem', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            marginTop: '0.25rem' 
        },
        title: { 
            fontSize: '1.25rem', 
            fontWeight: '700', 
            color: isDark ? '#ffffff' : '#1c1917', 
            textAlign: 'center', 
            marginBottom: '1.5rem' 
        },
        label: { 
            fontSize: '0.75rem', 
            fontWeight: '700', 
            color: '#ea580c', 
            textTransform: 'uppercase', 
            display: 'block', 
            marginBottom: '0.5rem',
            letterSpacing: '0.5px'
        },
        inputWrapper: {
            position: 'relative',
            marginBottom: '1rem'
        },
        input: { 
            width: '100%', 
            padding: '0.85rem 1rem', 
            borderRadius: '0.75rem', 
            border: `1px solid ${isDark ? 'rgba(254, 215, 170, 0.15)' : '#e5e5e5'}`, 
            backgroundColor: isDark ? '#2e1d11' : '#ffffff', 
            fontSize: '1rem', 
            color: isDark ? '#fef3c7' : '#1c1917', 
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.3s ease'
        },
        select: { 
            width: '100%', 
            padding: '0.85rem 1rem', 
            borderRadius: '0.75rem', 
            border: `1px solid ${isDark ? 'rgba(254, 215, 170, 0.15)' : '#e5e5e5'}`, 
            backgroundColor: isDark ? '#2e1d11' : '#ffffff', 
            fontSize: '1rem', 
            color: isDark ? '#fef3c7' : '#1c1917', 
            marginBottom: '1.25rem', 
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.3s ease'
        },
        passwordToggle: {
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: isDark ? '#a3a3a3' : '#57534e',
            transition: 'all 0.3s ease'
        },
        passwordStrength: {
            marginTop: '-8px',
            marginBottom: '16px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
        },
        strengthBar: {
            flex: 1,
            height: '4px',
            background: isDark ? '#2e1d11' : '#e5e5e5',
            borderRadius: '2px',
            overflow: 'hidden'
        },
        strengthFill: {
            width: `${(passwordStrength / 4) * 100}%`,
            height: '100%',
            background: getPasswordStrengthColor(),
            transition: 'width 0.3s ease'
        },
        btn: { 
            width: '100%', 
            padding: '0.85rem', 
            borderRadius: '0.75rem', 
            border: 'none', 
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
            color: '#fff', 
            fontWeight: '700', 
            fontSize: '1rem', 
            cursor: 'pointer',
            marginTop: '0.5rem',
            transition: 'all 0.3s ease'
        },
        footerText: { 
            textAlign: 'center', 
            marginTop: '1.25rem', 
            fontSize: '0.85rem', 
            color: isDark ? '#fca5a5' : '#57534e' 
        },
        link: { 
            color: '#facc15', 
            fontWeight: '700', 
            marginLeft: '0.25rem', 
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        roleHint: {
            fontSize: '11px',
            color: isDark ? '#a3a3a3' : '#57534e',
            marginTop: '-12px',
            marginBottom: '16px',
            display: 'block'
        }
    };

    const handleInputFocus = (e) => {
        e.currentTarget.style.borderColor = '#ea580c';
        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(234, 88, 12, 0.2)';
    };

    const handleInputBlur = (e) => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(254, 215, 170, 0.15)' : '#e5e5e5';
        e.currentTarget.style.boxShadow = 'none';
    };

    return (
        <>
            {/* Modal Notification */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalMessage.title}
                message={modalMessage.message}
                type={modalMessage.type}
            />

            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.brand}>
                        <h1 style={styles.logo}>PasukanYerusSolo</h1>
                        <div style={styles.subBrand}>Job Portal</div>
                    </div>

                    <h2 style={styles.title}>
                        <span style={{ color: '#ea580c' }}>📝</span> Buat Akun Baru
                    </h2>

                    <form onSubmit={handleRegister}>
                        <label style={styles.label}>👤 Nama Lengkap</label>
                        <div style={styles.inputWrapper}>
                            <input 
                                type="text" 
                                name="nama_lengkap"
                                placeholder="Masukkan nama lengkap Anda"
                                value={formData.nama_lengkap}
                                onChange={handleChange}
                                style={styles.input}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                required
                            />
                        </div>

                        <label style={styles.label}>📧 Alamat Email</label>
                        <div style={styles.inputWrapper}>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="nama@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                required
                            />
                        </div>

                        <label style={styles.label}>🔒 Kata Sandi</label>
                        <div style={styles.inputWrapper}>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                placeholder="Buat kata sandi minimal 8 karakter"
                                value={formData.password}
                                onChange={handleChange}
                                style={styles.input}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.passwordToggle}
                            >
                                {showPassword ? '👁️' : '🔒'}
                            </button>
                        </div>
                        
                        {formData.password && (
                            <div style={styles.passwordStrength}>
                                <span>Kekuatan: {getPasswordStrengthText()}</span>
                                <div style={styles.strengthBar}>
                                    <div style={styles.strengthFill} />
                                </div>
                            </div>
                        )}

                        <label style={styles.label}>🏢 Daftar Sebagai (Tipe Akun)</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            style={styles.select}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        >
                            <option value="Pelamar" style={{ background: isDark ? '#2e1505' : '#ffffff' }}>
                                👨‍💼 Pelamar Kerja (Mencari Pekerjaan)
                            </option>
                            <option value="Perusahaan" style={{ background: isDark ? '#2e1505' : '#ffffff' }}>
                                🏢 Perusahaan / HRD Partner
                            </option>
                        </select>
                        <span style={styles.roleHint}>
                            {formData.role === 'Pelamar' 
                                ? '💡 Anda akan dapat mencari dan melamar pekerjaan' 
                                : '💡 Anda akan dapat memposting lowongan pekerjaan'}
                        </span>

                        <button 
                            type="submit" 
                            style={styles.btn} 
                            disabled={loading}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(234, 88, 12, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {loading ? '⏳ Mendaftarkan Akun...' : '✨ Daftar Sekarang'}
                        </button>
                    </form>

                    <p style={styles.footerText}>
                        Sudah punya akun? 
                        <span 
                            onClick={() => navigate('/login')} 
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.textDecoration = 'none';
                            }}
                        >
                            Masuk di sini
                        </span>
                    </p>
                </div>
                <style>{`
                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
        </>
    );
};

export default Register;