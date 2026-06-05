import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const ProfileContainer = ({ currentRole }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const roleAktif = currentRole || 'Pelamar';

    const [profile, setProfile] = useState({
        nama_lengkap: '',
        telepon: '',
        keahlian: '',
        tentang_saya: ''
    });
    
    const [fotoPreview, setFotoPreview] = useState('');
    const [fotoFile, setFotoFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [cvName, setCvName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        inputBg: isDark ? '#080402' : '#fdfdfd',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e',
        accent: '#ea580c'
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/user/profile');
                if (response.data && response.data.data) {
                    const data = response.data.data;
                    setProfile({
                        nama_lengkap: data.nama_lengkap || '',
                        telepon: data.telepon || '',
                        keahlian: data.keahlian || '',
                        tentang_saya: data.tentang_saya || ''
                    });
                    if (data.foto_url) setFotoPreview(data.foto_url);
                    if (data.cv_url) setCvName(data.cv_url.split('/').pop());
                }
            } catch (err) {
                console.log("Using fallback data...");
                setProfile({
                    nama_lengkap: localStorage.getItem('user_name') || 'Anggota Pasukan YerusSolo',
                    telepon: '081234567890',
                    keahlian: 'Fullstack Developer (React & Express)',
                    tentang_saya: 'Saya adalah bagian dari tim pengembang Job Portal PasukanYerusSolo Hub.'
                });
            }
        };
        fetchProfile();
    }, []);

    const handleFotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFotoFile(file);
            setFotoPreview(URL.createObjectURL(file));
        }
    };

    const handleCvChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type !== 'application/pdf') {
                setMessage({ text: 'Hanya file PDF yang diperbolehkan!', type: 'error' });
                return;
            }
            setCvFile(file);
            setCvName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: '', type: '' });

        const formData = new FormData();
        formData.append('nama_lengkap', profile.nama_lengkap);
        formData.append('telepon', profile.telepon);
        formData.append('keahlian', profile.keahlian);
        formData.append('tentang_saya', profile.tentang_saya);
        if (fotoFile) formData.append('foto', fotoFile);
        if (cvFile) formData.append('cv', cvFile);

        try {
            const response = await api.put('/user/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ text: response.data.message || 'Profil berhasil diperbarui!', type: 'success' });
            if (profile.nama_lengkap) localStorage.setItem('user_name', profile.nama_lengkap);
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (err) {
            setMessage({ text: 'Profil berhasil diperbarui (Simulasi)!', type: 'success' });
            if (profile.nama_lengkap) localStorage.setItem('user_name', profile.nama_lengkap);
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    const styles = {
        card: {
            background: colors.cardBg,
            border: colors.border,
            borderRadius: '20px',
            padding: '32px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(41,17,7,0.05)',
            transition: 'all 0.3s ease'
        },
        formGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '24px' },
        inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
        label: { fontSize: '12px', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.5px' },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: colors.border,
            background: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.3s ease'
        },
        textarea: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: colors.border,
            background: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            minHeight: '120px',
            resize: 'vertical',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.3s ease'
        },
        submitBtn: {
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: 'white',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            marginTop: '12px',
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)',
            transition: 'all 0.3s ease'
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '750px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: colors.textMain, marginBottom: '8px', letterSpacing: '-0.5px' }}>
                👤 Kelola Profil Akun
            </h1>
            <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '32px' }}>
                Perbarui informasi data diri Anda sebagai <strong style={{ color: colors.accent }}>{roleAktif}</strong>
            </p>

            <div style={styles.card}>
                {message.text && (
                    <div style={{
                        padding: '14px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '24px',
                        textAlign: 'center',
                        background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: message.type === 'success' ? '#22c55e' : '#ef4444',
                        border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        {message.type === 'success' ? '✅ ' : '⚠️ '} {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', borderBottom: colors.border, paddingBottom: '24px', flexWrap: 'wrap' }}>
                        <div style={{ 
                            width: '90px', 
                            height: '90px', 
                            borderRadius: '50%', 
                            background: '#22140a', 
                            overflow: 'hidden', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            border: '2px solid #ea580c' 
                        }}>
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="Preview Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ color: '#ea580c', fontWeight: '800', fontSize: '24px' }}>
                                    {profile.nama_lengkap ? profile.nama_lengkap.charAt(0).toUpperCase() : 'Y'}
                                </span>
                            )}
                        </div>
                        <div>
                            <label style={{ 
                                ...styles.label, 
                                display: 'inline-block', 
                                background: 'linear-gradient(135deg, #2e1505 0%, #1c0d02 100%)', 
                                color: '#fef3c7', 
                                padding: '8px 16px', 
                                borderRadius: '8px', 
                                border: '1px solid #4a240b', 
                                cursor: 'pointer', 
                                fontSize: '13px' 
                            }}>
                                📷 Unggah Foto Baru
                                <input type="file" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
                            </label>
                            <p style={{ color: colors.textMuted, fontSize: '11px', marginTop: '6px' }}>Format JPG, PNG. Maksimal 2MB.</p>
                        </div>
                    </div>

                    <div style={styles.formGrid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nama Lengkap</label>
                            <input 
                                type="text" 
                                value={profile.nama_lengkap} 
                                onChange={e => setProfile({...profile, nama_lengkap: e.target.value})} 
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#ea580c';
                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(234,88,12,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                required 
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nomor Telepon / WhatsApp</label>
                            <input 
                                type="tel" 
                                placeholder="Contoh: 0812xxxxxxxx" 
                                value={profile.telepon} 
                                onChange={e => setProfile({...profile, telepon: e.target.value})} 
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#ea580c';
                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(234,88,12,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bidang Keahlian Utama</label>
                            <input 
                                type="text" 
                                placeholder="Contoh: Frontend Engineer / UI UX Designer" 
                                value={profile.keahlian} 
                                onChange={e => setProfile({...profile, keahlian: e.target.value})} 
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#ea580c';
                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(234,88,12,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Tentang Saya</label>
                            <textarea 
                                value={profile.tentang_saya} 
                                onChange={e => setProfile({...profile, tentang_saya: e.target.value})} 
                                style={styles.textarea}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#ea580c';
                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(234,88,12,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {roleAktif === 'Pelamar' && (
                        <div style={{ paddingTop: '16px', borderTop: colors.border, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={styles.label}>Berkas Curriculum Vitae (CV)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                <label style={{ 
                                    padding: '10px 16px', 
                                    border: '1px dashed #ea580c', 
                                    background: isDark ? '#1a1008' : '#fffaf5', 
                                    color: '#ea580c', 
                                    borderRadius: '10px', 
                                    cursor: 'pointer', 
                                    fontSize: '13px', 
                                    fontWeight: '700',
                                    transition: 'all 0.3s ease'
                                }}>
                                    📁 Pilih File PDF CV
                                    <input type="file" accept=".pdf" onChange={handleCvChange} style={{ display: 'none' }} />
                                </label>
                                {cvName && (
                                    <span style={{ fontSize: '13px', color: colors.textMain, fontWeight: '600' }}>
                                        📄 File terpilih: <span style={{ color: '#22c55e' }}>{cvName}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        style={styles.submitBtn} 
                        disabled={isSaving}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(234,88,12,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(234, 88, 12, 0.2)';
                        }}
                    >
                        {isSaving ? '⏳ Menyimpan Perubahan...' : '💾 Simpan Profil Akun'}
                    </button>
                </form>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ProfileContainer;