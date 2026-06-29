import React, { useState, useEffect, useContext, useRef } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const ProfileContainer = ({ currentRole }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const roleAktif = currentRole || 'Pelamar';

    const [profile, setProfile] = useState({
        nama_lengkap: '',
        email: '',
        telepon: '',
        keahlian: '',
        tentang_saya: ''
    });

    const initialProfile = useRef({});
    const [isDirty, setIsDirty] = useState(false);

    const [fotoPreview, setFotoPreview] = useState('');
    const [fotoFile, setFotoFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(true);
    const [fotoHapus, setFotoHapus] = useState(false);

    const colors = {
        pageBg: isDark ? '#080402' : '#f5f5f4',
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #262626' : '1px solid #e5e5e5',
        borderLight: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        inputBg: isDark ? '#080402' : '#ffffff',
        inputBorder: isDark ? '1px solid #3d2514' : '1px solid #d1d5db',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#6b7280',
        textLight: isDark ? '#9e8476' : '#735b4e',
        accent: '#ea580c',
        accentLight: isDark ? '#f59e0b' : '#c2410c',
        successBg: 'rgba(34, 197, 94, 0.1)',
        successText: '#22c55e',
        errorBg: 'rgba(239, 68, 68, 0.1)',
        errorText: '#ef4444',
        btnGradient: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)'
    };

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await api.get('/auth/profile');
                if (response.data && response.data.data) {
                    const data = response.data.data;
                    const fetched = {
                        nama_lengkap: data.nama || data.nama_lengkap || '',
                        email: data.email || '',
                        telepon: data.telepon || '',
                        keahlian: data.keahlian || '',
                        tentang_saya: data.tentang_saya || ''
                    };
                    setProfile(fetched);
                    initialProfile.current = fetched;
                    if (data.foto) setFotoPreview(`http://localhost:5005/uploads/${data.foto}`);
                }
            } catch (err) {
                const savedName = localStorage.getItem('user_name');
                const savedEmail = localStorage.getItem('email');
                const fallback = {
                    nama_lengkap: savedName || 'Anggota Pasukan YerusSolo',
                    email: savedEmail || '',
                    telepon: '',
                    keahlian: '',
                    tentang_saya: ''
                };
                setProfile(fallback);
                initialProfile.current = fallback;
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const current = JSON.stringify(profile);
        const initial = JSON.stringify(initialProfile.current);
        setIsDirty(current !== initial);
    }, [profile]);

    const handleFotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('image/')) {
                setMessage({ text: 'Hanya file gambar yang diperbolehkan!', type: 'error' });
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setMessage({ text: 'Ukuran file maksimal 2MB!', type: 'error' });
                return;
            }
            setFotoFile(file);
            setFotoPreview(URL.createObjectURL(file));
            setFotoHapus(false);
        }
    };

    const handleHapusFoto = () => {
        setFotoFile(null);
        setFotoPreview('');
        setFotoHapus(true);
    };

    const validate = () => {
        const errors = [];
        if (!profile.nama_lengkap.trim()) errors.push('Nama lengkap wajib diisi');
        if (profile.telepon && !/^[\d\s\-+()]{8,20}$/.test(profile.telepon.replace(/\s/g, ''))) {
            errors.push('Format nomor telepon tidak valid');
        }
        if (profile.keahlian && profile.keahlian.length > 200) {
            errors.push('Bidang keahlian maksimal 200 karakter');
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (errors.length > 0) {
            setMessage({ text: errors.join('. '), type: 'error' });
            return;
        }

        setIsSaving(true);
        setMessage({ text: '', type: '' });

        const formData = new FormData();
        formData.append('nama', profile.nama_lengkap);
        formData.append('telepon', profile.telepon);
        formData.append('keahlian', profile.keahlian);
        formData.append('tentang_saya', profile.tentang_saya);
        if (fotoFile) formData.append('foto', fotoFile);
        if (fotoHapus && !fotoFile) formData.append('hapus_foto', 'true');

        try {
            const response = await api.put('/auth/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ text: response.data.message || 'Profil berhasil diperbarui!', type: 'success' });
            if (profile.nama_lengkap) localStorage.setItem('user_name', profile.nama_lengkap);
            setFotoFile(null);
            setFotoHapus(false);
            initialProfile.current = { ...profile };
            setIsDirty(false);

            const refresh = await api.get('/auth/profile');
            if (refresh.data?.data?.foto) {
                setFotoPreview(`http://localhost:5005/uploads/${refresh.data.data.foto}`);
            } else if (fotoHapus) {
                setFotoPreview('');
            }
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menyimpan profil. Silakan coba lagi.';
            setMessage({ text: msg, type: 'error' });
            setTimeout(() => setMessage({ text: '', type: '' }), 4000);
        } finally {
            setIsSaving(false);
        }
    };

    const styles = {
        container: {
            width: '100%',
            maxWidth: '750px',
            margin: '0 auto',
            padding: '20px',
            animation: 'fadeIn 0.5s ease'
        },
        title: {
            fontSize: '28px',
            fontWeight: '800',
            color: colors.textMain,
            marginBottom: '8px',
            letterSpacing: '-0.5px'
        },
        subtitle: {
            color: colors.textMuted,
            fontSize: '14px',
            marginBottom: '8px'
        },
        card: {
            background: colors.cardBg,
            border: colors.border,
            borderRadius: '20px',
            padding: '32px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease'
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px',
            marginTop: '24px'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        label: {
            fontSize: '12px',
            fontWeight: '800',
            color: colors.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: colors.inputBorder,
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
            border: colors.inputBorder,
            background: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            minHeight: '120px',
            resize: 'vertical',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit'
        },
        avatarContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderBottom: colors.borderLight,
            paddingBottom: '24px',
            flexWrap: 'wrap'
        },
        avatarBox: {
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: isDark ? '#22140a' : '#f0f0f0',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `2px solid ${colors.accent}`,
            position: 'relative',
            flexShrink: 0
        },
        avatarText: {
            color: colors.accent,
            fontWeight: '800',
            fontSize: '36px'
        },
        avatarImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        uploadLabel: {
            display: 'inline-block',
            background: isDark ? 'linear-gradient(135deg, #2e1505 0%, #1c0d02 100%)' : '#f5f5f4',
            color: colors.accent,
            padding: '8px 16px',
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#4a240b' : '#e5e5e5'}`,
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
        },
        uploadHint: {
            color: colors.textLight,
            fontSize: '11px',
            marginTop: '6px'
        },
        submitBtn: {
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            background: colors.btnGradient,
            color: 'white',
            fontWeight: '700',
            fontSize: '15px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            marginTop: '24px',
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)',
            transition: 'all 0.3s ease',
            opacity: isSaving ? 0.7 : 1
        },
        messageBox: {
            padding: '14px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease'
        },
        loadingBox: {
            textAlign: 'center',
            padding: '60px',
            color: colors.textMuted
        },
        spinner: {
            width: '40px',
            height: '40px',
            border: `3px solid ${isDark ? '#262626' : '#e5e5e5'}`,
            borderTop: `3px solid ${colors.accent}`,
            borderRadius: '50%',
            margin: '0 auto 16px auto',
            animation: 'spin 1s linear infinite'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingBox}>
                <div style={styles.spinner} />
                <p>Memuat profil...</p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Kelola Profil Akun</h1>
            <p style={styles.subtitle}>
                Perbarui informasi data diri Anda sebagai <strong style={{ color: colors.accent }}>{roleAktif}</strong>
            </p>

            <div style={styles.card}>
                {message.text && (
                    <div style={{
                        ...styles.messageBox,
                        background: message.type === 'success' ? colors.successBg : colors.errorBg,
                        color: message.type === 'success' ? colors.successText : colors.errorText,
                        border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={styles.avatarContainer}>
                        <div style={styles.avatarBox}>
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="Preview Avatar" style={styles.avatarImage} />
                            ) : (
                                <span style={styles.avatarText}>
                                    {profile.nama_lengkap ? profile.nama_lengkap.charAt(0).toUpperCase() : '?'}
                                </span>
                            )}
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <label style={styles.uploadLabel}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.borderColor = colors.accent;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = isDark ? '#4a240b' : '#e5e5e5';
                                    }}>
                                    Unggah Foto
                                    <input type="file" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
                                </label>
                                {(fotoPreview || fotoHapus) && (
                                    <span onClick={handleHapusFoto} style={{
                                        display: 'inline-block',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        border: `1px solid ${isDark ? '#4a240b' : '#e5e5e5'}`,
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: colors.errorText,
                                        transition: 'all 0.3s ease'
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                                        Hapus Foto
                                    </span>
                                )}
                            </div>
                            <p style={styles.uploadHint}>Format JPG, PNG. Maksimal 2MB.</p>
                        </div>
                    </div>

                    <div style={styles.formGrid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nama Lengkap</label>
                            <input
                                type="text"
                                value={profile.nama_lengkap}
                                onChange={e => setProfile({ ...profile, nama_lengkap: e.target.value })}
                                style={styles.input}
                                placeholder="Masukkan nama lengkap Anda"
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = colors.accent;
                                    e.currentTarget.style.boxShadow = `0 0 0 2px rgba(234,88,12,0.2)`;
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? '#3d2514' : '#d1d5db';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                required
                            />
                        </div>

                        {profile.email && (
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    style={{
                                        ...styles.input,
                                        opacity: 0.6,
                                        cursor: 'not-allowed'
                                    }}
                                    disabled
                                />
                            </div>
                        )}

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nomor Telepon / WhatsApp</label>
                            <input
                                type="tel"
                                placeholder="Contoh: 0812xxxxxxxx"
                                value={profile.telepon}
                                onChange={e => setProfile({ ...profile, telepon: e.target.value })}
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = colors.accent;
                                    e.currentTarget.style.boxShadow = `0 0 0 2px rgba(234,88,12,0.2)`;
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? '#3d2514' : '#d1d5db';
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
                                onChange={e => setProfile({ ...profile, keahlian: e.target.value })}
                                style={styles.input}
                                maxLength={200}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = colors.accent;
                                    e.currentTarget.style.boxShadow = `0 0 0 2px rgba(234,88,12,0.2)`;
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? '#3d2514' : '#d1d5db';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Tentang Saya</label>
                            <textarea
                                value={profile.tentang_saya}
                                onChange={e => setProfile({ ...profile, tentang_saya: e.target.value })}
                                style={styles.textarea}
                                placeholder="Ceritakan tentang diri Anda, pengalaman, dan motivasi..."
                                maxLength={1000}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = colors.accent;
                                    e.currentTarget.style.boxShadow = `0 0 0 2px rgba(234,88,12,0.2)`;
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? '#3d2514' : '#d1d5db';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            <div style={{
                                textAlign: 'right',
                                fontSize: '11px',
                                color: colors.textLight,
                                marginTop: '4px'
                            }}>
                                {profile.tentang_saya.length}/1000
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={styles.submitBtn}
                        disabled={isSaving}
                        onMouseEnter={(e) => {
                            if (!isSaving) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(234,88,12,0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(234, 88, 12, 0.2)';
                        }}
                    >
                        {isSaving ? 'Menyimpan Perubahan...' : isDirty ? 'Simpan Profil Akun' : 'Tidak Ada Perubahan'}
                    </button>
                </form>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                input::placeholder, textarea::placeholder {
                    color: ${isDark ? '#6b7280' : '#9ca3af'};
                }
            `}</style>
        </div>
    );
};

export default ProfileContainer;
