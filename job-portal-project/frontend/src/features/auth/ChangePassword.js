import React, { useState } from 'react';
import api from '../../services/api';

const ChangePassword = ({ appTheme, isMobile }) => {
    const [passwords, setPasswords] = useState({ password_lama: '', password_baru: '' });
    const isDark = appTheme === 'dark';

    // Skema Warna Premium PasukanYerusSolo (Kohesif dengan App.js)
    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        inputBg: isDark ? '#080402' : '#fdfdfd',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e',
        accent: '#ea580c'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch('/update-password', passwords);
            alert(response.data.message);
            setPasswords({ password_lama: '', password_baru: '' });
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengubah kata sandi');
        }
    };

    const styles = {
        container: {
            width: '100%',
            maxWidth: '600px', // Membatasi lebar agar form tidak terlalu melar di desktop
            margin: '0 auto',
            background: colors.cardBg,
            border: colors.border,
            borderRadius: '24px',
            padding: isMobile ? '24px 20px' : '40px',
            boxSizing: 'border-box',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        title: {
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '800',
            margin: '0 0 8px 0',
            color: colors.accent
        },
        subtitle: {
            color: colors.textMuted,
            margin: '0 0 32px 0',
            fontSize: '14px',
            lineHeight: '1.6',
            fontWeight: '500'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        label: {
            fontSize: '12px',
            fontWeight: '850',
            color: colors.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.7px'
        },
        input: {
            width: '100%',
            padding: '14px 16px',
            borderRadius: '12px',
            border: colors.border,
            backgroundColor: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            outline: 'none',
            fontWeight: '500',
            transition: 'border-color 0.2s ease'
        },
        submitBtn: {
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(234, 88, 12, 0.15)',
            textAlign: 'center',
            marginTop: '12px',
            transition: 'opacity 0.2s ease'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Keamanan Akun</h2>
            <p style={styles.subtitle}>
                Perbarui kata sandi Anda secara berkala untuk menjaga keamanan data profil dan akses lowongan kerja Anda.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Field: Password Lama */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password Lama</label>
                    <input 
                        type="password" 
                        placeholder="Masukkan password lama Anda" 
                        value={passwords.password_lama}
                        onChange={(e) => setPasswords({...passwords, password_lama: e.target.value})} 
                        required 
                        style={styles.input}
                    />
                </div>

                {/* Field: Password Baru */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password Baru</label>
                    <input 
                        type="password" 
                        placeholder="Buat password baru yang kuat" 
                        value={passwords.password_baru}
                        onChange={(e) => setPasswords({...passwords, password_baru: e.target.value})} 
                        required 
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.submitBtn}>
                    Update Password Sekarang
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;