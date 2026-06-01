import React, { useState, useEffect } from 'react';

const AuthContainer = ({ onLoginSuccess, appTheme }) => {
    // State untuk menentukan apakah sedang di halaman Login atau Register
    const [isLoginView, setIsLoginView] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Pelamar' // Default role sesuai spek aplikasi
    });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLoginView) {
            // SIMULASI LOGIN FITUR UTAMA
            localStorage.setItem('token', 'mock-jwt-token-xyz');
            localStorage.setItem('role', formData.role);
            localStorage.setItem('user_name', formData.email.split('@')[0]);
            onLoginSuccess(formData.role);
        } else {
            // SIMULASI REGISTER
            if (formData.password !== formData.confirmPassword) {
                alert('Kata sandi konfirmasi tidak cocok!');
                return;
            }
            alert('Registrasi berhasil! Silakan masuk.');
            setIsLoginView(true);
        }
    };

    const isDark = appTheme === 'dark';

    // Palet Warna Sinkron dengan Dashboard Utama
    const colors = {
        bg: isDark ? '#0a0502' : '#faf8f6',
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        inputBorder: isDark ? '1px solid #3d2514' : '1px solid #d1d5db',
        inputBg: isDark ? '#0d0703' : '#f9fafb',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
        border: colors.inputBorder,
        background: colors.inputBg,
        color: colors.textMain,
        transition: 'all 0.2s ease',
        marginTop: '6px'
    };

    return (
        <div style={{
            display: 'flex',
            width: '100vw',
            minHeight: '100vh',
            background: colors.bg,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxSizing: 'border-box',
            overflowX: 'hidden'
        }}>
            {/* SISI KIRI: BRANDING & ILUSTRASI (Hanya tampil di Desktop/Tablet) */}
            {!isMobile && (
                <div style={{
                    flex: 1.2,
                    background: isDark ? 'linear-gradient(135deg, #120b06 0%, #22140a 100%)' : 'linear-gradient(135deg, #fcfaf7 0%, #f4eae1 100%)',
                    borderRight: colors.border,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '60px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ maxWidth: '480px' }}>
                        <div style={{ paddingLeft: '16px', borderLeft: '5px solid #ea580c', marginBottom: '32px' }}>
                            <h1 style={{ fontSize: '42px', fontWeight: '900', margin: 0, background: 'linear-gradient(135deg, #facc15 0%, #ea580c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YerusSolo</h1>
                            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', color: '#ea580c', display: 'block', marginTop: '6px' }}>Portal Karir Modern</span>
                        </div>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', color: colors.textMain, lineHeight: '1.4', marginBottom: '16px' }}>
                            Temukan Peluang Kerja Terbaik & Kelola Talenta Secara Efisien.
                        </h2>
                        <p style={{ color: colors.textMuted, fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                            Sistem manajemen rekrutmen terintegrasi untuk pelamar dan divisi HRD perusahaan dalam menyelaraskan ekosistem kerja profesional.
                        </p>
                    </div>
                    
                    {/* Variasi Dekorasi Latar Belakang Lingkaran Halus */}
                    <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(234, 88, 12, 0.04)', borderRadius: '50%', bottom: '-100px', left: '-50px', filter: 'blur(40px)' }}></div>
                </div>
            )}

            {/* SISI KANAN / UTAMA: FORMULIR AUTENTIKASI (Sangat Fleksibel di HP) */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '24px 16px' : '40px',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '440px', // Pembatas lebar agar tetap proporsional dan tidak melebar di tablet/HP besar
                    background: isMobile ? 'transparent' : colors.cardBg,
                    border: isMobile ? 'none' : colors.border,
                    borderRadius: '24px',
                    padding: isMobile ? '0px' : '40px 32px',
                    boxSizing: 'border-box'
                }}>
                    
                    {/* Header Ringkas Logo untuk HP */}
                    {isMobile && (
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <h1 style={{ fontSize: '32px', fontWeight: '900', margin: 0, background: 'linear-gradient(135deg, #facc15 0%, #ea580c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YerusSolo</h1>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: colors.textMuted, margin: '4px 0 0 0' }}>Gerbang Karir & Manajemen Talenta</p>
                        </div>
                    )}

                    {/* Judul Form Utama */}
                    <div style={{ marginBottom: '24px', textAlign: isMobile ? 'center' : 'left' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: colors.textMain }}>
                            {isLoginView ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
                        </h2>
                        <p style={{ color: colors.textMuted, fontSize: '14px', margin: 0 }}>
                            {isLoginView ? 'Silakan masuk untuk mengakses workspace Anda.' : 'Daftarkan diri Anda untuk mulai mengeksplorasi.'}
                        </p>
                    </div>

                    {/* Form Interaktif */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        {/* INPUT NAMA: Hanya muncul saat Registrasi */}
                        {!isLoginView && (
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textMain }}>Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required 
                                    placeholder="Masukkan nama lengkap Anda" 
                                    style={inputStyle}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {/* INPUT EMAIL */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textMain }}>Alamat Email</label>
                            <input 
                                type="email" 
                                name="email"
                                required 
                                placeholder="nama@contoh.com" 
                                style={inputStyle}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* SELEKSI ROLE (Hak Akses Akun) */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textMain }}>Tipe Akun (Otoritas)</label>
                            <select 
                                name="role"
                                style={inputStyle}
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="Pelamar">Pelamar Kerja (Mencari Pekerjaan)</option>
                                <option value="Perusahaan">Perusahaan / HRD (Membuka Lowongan)</option>
                                <option value="Admin">Administrator Sistem</option>
                            </select>
                        </div>

                        {/* INPUT KATA SANDI */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textMain }}>Kata Sandi</label>
                            <input 
                                type="password" 
                                name="password"
                                required 
                                placeholder="••••••••" 
                                style={inputStyle}
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* KONFIRMASI KATA SANDI: Hanya muncul saat Registrasi */}
                        {!isLoginView && (
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textMain }}>Konfirmasi Kata Sandi</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    required 
                                    placeholder="••••••••" 
                                    style={inputStyle}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {/* TOMBOL AKSI UTAMA */}
                        <button type="submit" style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                            color: '#ffffff',
                            fontSize: '15px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            marginTop: '10px',
                            boxShadow: '0 6px 20px rgba(234, 88, 12, 0.2)',
                            transition: 'transform 0.1s ease'
                        }}>
                            {isLoginView ? 'Masuk ke Akun' : 'Daftar Sekarang'}
                        </button>
                    </form>

                    {/* FOOTER NAVIGASI: Pengalih Login / Register */}
                    <div style={{ 
                        marginTop: '24px', 
                        textAlign: 'center', 
                        fontSize: '13px', 
                        color: colors.textMuted,
                        borderTop: isMobile ? colors.border : 'none',
                        paddingTop: isMobile ? '20px' : '0px'
                    }}>
                        {isLoginView ? 'Belum punya akun? ' : 'Sudah memiliki akun? '}
                        <button 
                            type="button"
                            onClick={() => {
                                setIsLoginView(!isLoginView);
                                setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'Pelamar' });
                            }}
                            style={{ 
                                background: 'transparent', 
                                border: 'none', 
                                color: '#ea580c', 
                                fontWeight: '700', 
                                cursor: 'pointer',
                                padding: '0 4px',
                                textDecoration: 'underline'
                            }}
                        >
                            {isLoginView ? 'Daftar di sini' : 'Masuk di sini'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthContainer;