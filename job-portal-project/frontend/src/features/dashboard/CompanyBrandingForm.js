import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const CompanyBrandingForm = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '#262626' : '#e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        accent: '#ea580c'
    };

    const handleFileChange = (e) => {
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
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
            setMessage({ text: '', type: '' });
        }
    };

    const handleUploadLogo = async (e) => {
        e.preventDefault();
        if (!logoFile) {
            setMessage({ text: 'Pilih gambar logo terlebih dahulu!', type: 'error' });
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('logo', logoFile);

        try {
            const response = await api.put('/company/branding', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ text: response.data.message || 'Logo berhasil diupload!', type: 'success' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (err) {
            setMessage({ text: 'Gagal memperbarui aset branding perusahaan', type: 'error' });
        } finally {
            setIsUploading(false);
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '40px auto',
            padding: '20px'
        },
        card: {
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '24px',
            padding: '32px',
            transition: 'all 0.3s ease'
        },
        title: {
            color: colors.textMain,
            fontSize: '24px',
            fontWeight: '800',
            marginBottom: '8px'
        },
        subtitle: {
            color: colors.textMuted,
            fontSize: '14px',
            marginBottom: '24px'
        },
        previewContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
        },
        previewBox: {
            width: '120px',
            height: '120px',
            background: isDark ? '#1c1917' : '#f5f5f4',
            border: `2px dashed ${colors.border}`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
        },
        previewImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        previewPlaceholder: {
            textAlign: 'center',
            color: colors.textMuted
        },
        fileLabel: {
            display: 'block',
            padding: '12px 20px',
            background: isDark ? '#1c1917' : '#f5f5f4',
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'center',
            color: colors.textMain,
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            marginBottom: '16px'
        },
        button: {
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        message: {
            padding: '12px',
            borderRadius: '10px',
            fontSize: '13px',
            marginBottom: '16px',
            textAlign: 'center'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🎨 Branding Perusahaan</h1>
                <p style={styles.subtitle}>Upload logo perusahaan untuk memperkuat identitas brand Anda</p>

                {message.text && (
                    <div style={{
                        ...styles.message,
                        background: message.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        color: message.type === 'success' ? '#22c55e' : '#ef4444',
                        border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`
                    }}>
                        {message.type === 'success' ? '✅ ' : '⚠️ '} {message.text}
                    </div>
                )}

                <form onSubmit={handleUploadLogo}>
                    <div style={styles.previewContainer}>
                        <div style={styles.previewBox}>
                            {logoPreview ? (
                                <img src={logoPreview} alt="Preview Logo" style={styles.previewImage} />
                            ) : (
                                <div style={styles.previewPlaceholder}>
                                    <span style={{ fontSize: '32px' }}>🏢</span>
                                    <p style={{ fontSize: '11px', marginTop: '8px' }}>Preview Logo</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <label 
                        style={styles.fileLabel}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#ea580c';
                            e.currentTarget.style.background = isDark ? '#2e1d11' : '#fef3c7';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = colors.border;
                            e.currentTarget.style.background = isDark ? '#1c1917' : '#f5f5f4';
                        }}
                    >
                        📁 Pilih File Logo
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }} 
                        />
                    </label>
                    
                    <button 
                        type="submit" 
                        style={styles.button}
                        disabled={isUploading}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {isUploading ? '⏳ Mengupload...' : '🚀 Upload Logo Baru'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyBrandingForm;