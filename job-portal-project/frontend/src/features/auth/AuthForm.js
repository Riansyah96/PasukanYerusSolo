import React, { useState } from 'react';

const AuthForm = ({ isRegister, onSubmitAuth }) => {
    const [formData, setFormData] = useState({ nama: '', email: '', password: '', role: 'Pelamar' });
    const [isFocused, setIsFocused] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitAuth(formData);
    };

    // Styling modern terpusat menggunakan objek JavaScript
    const styles = {
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            width: '100%',
        },
        title: {
            margin: '0 0 8px 0',
            color: '#1e293b',
            fontSize: '24px',
            fontWeight: '700',
            textAlign: 'center',
            letterSpacing: '-0.5px'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        label: {
            fontSize: '13px',
            fontWeight: '600',
            color: '#64748b',
        },
        input: (fieldName) => ({
            padding: '12px 16px',
            borderRadius: '10px',
            border: isFocused === fieldName ? '2px solid #6366f1' : '1px solid #cbd5e1',
            fontSize: '14px',
            color: '#334155',
            backgroundColor: '#f8fafc',
            outline: 'none',
            transition: 'all 0.2s ease-in-out',
            boxShadow: isFocused === fieldName ? '0 0 0 4px rgba(99, 102, 241, 0.15)' : 'none'
        }),
        select: {
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
            color: '#334155',
            backgroundColor: '#f8fafc',
            outline: 'none',
            cursor: 'pointer'
        },
        button: {
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
            color: '#ffffff',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.1s ease, opacity 0.2s ease',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            marginTop: '10px'
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <h2 style={styles.title}>{isRegister ? '🚀 Buat Akun Baru' : '🔐 Selamat Datang Kembali'}</h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', margin: '-10px 0 10px 0' }}>
                {isRegister ? 'Lengkapi data untuk bergabung dengan PasukanYerusSolo' : 'Silahkan masuk ke panel job portal kamu'}
            </p>

            {isRegister && (
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Nama Lengkap</label>
                    <input 
                        type="text" 
                        name="nama" 
                        placeholder="Masukkan nama lengkap Anda" 
                        value={formData.nama} 
                        onChange={handleChange} 
                        onFocus={() => setIsFocused('nama')}
                        onBlur={() => setIsFocused('')}
                        style={styles.input('nama')} 
                        required 
                    />
                </div>
            )}

            <div style={styles.inputGroup}>
                <label style={styles.label}>Alamat Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="name@example.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused('')}
                    style={styles.input('email')} 
                    required 
                />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>Kata Sandi</label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="••••••••" 
                    value={formData.password} 
                    onChange={handleChange} 
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused('')}
                    style={styles.input('password')} 
                    required 
                />
            </div>

            {isRegister && (
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Daftar Sebagai</label>
                    <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
                        <option value="Pelamar">Pelamar Kerja (Mencari Lowongan)</option>
                        <option value="Perusahaan">Perusahaan / HRD (Membuka Lowongan)</option>
                    </select>
                </div>
            )}

            <button 
                type="submit" 
                style={styles.button}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
                {isRegister ? 'Daftar Sekarang' : 'Masuk ke Akun'}
            </button>
        </form>
    );
};

export default AuthForm;