import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import Modal from '../Modal/Modal';
import { SparklesIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, ArrowPathIcon, RocketLaunchIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', message: '', type: 'success' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const showNotification = (title, message, type = 'success') => {
        setModalMessage({ title, message, type });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const res = await api.post('/auth/login', formData);
            
            if (res.data?.token) {
                const token = res.data.token;
                localStorage.setItem('token', token);
                
                let userRole = res.data.user?.role || res.data.role;
                if (userRole) {
                    localStorage.setItem('role', userRole);
                }
                
                showNotification('Berhasil Login', `Selamat datang kembali!`, 'success');
                
                if (onLoginSuccess) onLoginSuccess();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                showNotification('Gagal Login', 'Response tidak valid dari server', 'error');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Email atau password salah!';
            showNotification('Gagal Login', errorMsg, 'error');
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
            background: isDark ? '#120902' : '#f5f5f4',
            padding: '1rem',
            transition: 'all 0.3s ease'
        },
        card: { 
            width: '100%', 
            maxWidth: '420px', 
            background: isDark 
                ? 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)' 
                : 'linear-gradient(180deg, #ffffff 0%, #fef3c7 100%)',
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: isDark 
                ? '0 20px 25px -5px rgba(45, 15, 0, 0.4)' 
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
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
            transition: 'all 0.3s ease'
        },
        btnGuest: { 
            width: '100%', 
            padding: '0.85rem', 
            borderRadius: '0.75rem', 
            border: `1px solid #ea580c`, 
            background: 'transparent', 
            color: '#ea580c', 
            fontWeight: '700', 
            fontSize: '0.9rem', 
            cursor: 'pointer', 
            marginTop: '0.75rem',
            transition: 'all 0.3s ease'
        },
        errorAlert: { 
            padding: '0.75rem', 
            background: isDark ? '#7f1d1d' : '#fee2e2', 
            color: isDark ? '#fca5a5' : '#dc2626', 
            borderRadius: '0.5rem', 
            fontSize: '0.85rem', 
            marginBottom: '1rem', 
            textAlign: 'center',
            animation: 'shake 0.3s ease'
        },
        link: { 
            color: '#facc15', 
            cursor: 'pointer', 
            fontWeight: '700', 
            marginLeft: '0.25rem',
            transition: 'all 0.3s ease'
        },
        footerText: { 
            textAlign: 'center', 
            marginTop: '20px', 
            fontSize: '13px', 
            color: isDark ? '#fca5a5' : '#57534e' 
        }
    };

    return (
        <>
            
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
                        <SparklesIcon style={{ width: 20, height: 20, verticalAlign: 'middle', marginTop: '-3px', color: '#ea580c' }} /> Masuk Akun
                    </h2>
                    {error && <div style={styles.errorAlert}>{error}</div>}
                    <form onSubmit={handleLogin}>
                        <label style={styles.label}><EnvelopeIcon style={{ width: 14, height: 14, verticalAlign: 'middle', marginTop: '-2px' }} /> Email</label>
                        <div style={styles.inputWrapper}>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="nama@email.com"
                                value={formData.email} 
                                onChange={handleChange} 
                                style={styles.input}
                                required 
                            />
                        </div>
                        
                        <label style={styles.label}><LockClosedIcon style={{ width: 14, height: 14, verticalAlign: 'middle', marginTop: '-2px' }} /> Password</label>
                        <div style={styles.inputWrapper}>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Masukkan password Anda"
                                value={formData.password} 
                                onChange={handleChange} 
                                style={styles.input}
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.passwordToggle}
                            >
                                {showPassword ? <EyeIcon style={{ width: 18, height: 18 }} /> : <LockClosedIcon style={{ width: 18, height: 18 }} />}
                            </button>
                        </div>
                        
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
                            {loading ? <><ArrowPathIcon style={{ width: 18, height: 18, verticalAlign: 'middle', marginTop: '-2px', animation: 'spin 1s linear infinite' }} /> Memverifikasi...</> : <><RocketLaunchIcon style={{ width: 18, height: 18, verticalAlign: 'middle', marginTop: '-2px' }} /> Masuk Akun</>}
                        </button>
                    </form>
                    
                    <button 
                        type="button" 
                        onClick={() => navigate('/')} 
                        style={styles.btnGuest}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#ea580c';
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#ea580c';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <MagnifyingGlassIcon style={{ width: 18, height: 18, verticalAlign: 'middle', marginTop: '-2px' }} /> Jelajahi Sebagai Guest
                    </button>
                    
                    <p style={styles.footerText}>
                        Belum punya akun? 
                        <span 
                            onClick={() => navigate('/register')} 
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.textDecoration = 'none';
                            }}
                        >
                            Daftar Sekarang
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
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </>
    );
};

export default Login;