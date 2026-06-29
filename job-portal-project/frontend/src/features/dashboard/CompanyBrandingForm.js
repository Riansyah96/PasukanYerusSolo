import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';
import { BuildingOfficeIcon, FolderIcon, ClockIcon, ArrowDownTrayIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const bidangOptions = [
    'Teknologi / Informasi',
    'Keuangan / Perbankan',
    'Kesehatan / Farmasi',
    'Pendidikan / Pelatihan',
    'Manufaktur / Industri',
    'Pemasaran / Periklanan',
    'Konstruksi / Properti',
    'Transportasi / Logistik',
    'Pertanian / Perkebunan',
    'Media / Hiburan',
    'Pariwisata / Hospitality',
    'Energi / Pertambangan',
    'Ritel / E-commerce',
    'Hukum / Konsultan',
];

const CompanyBrandingForm = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [formData, setFormData] = useState({
        nama_perusahaan: '',
        deskripsi_budaya: '',
        lokasi: '',
        no_telepon: '',
        bidang: '',
    });
    const [bidangLain, setBidangLain] = useState('');
    const [isBidangLain, setIsBidangLain] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [existingLogo, setExistingLogo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const icn = { width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px' };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '#262626' : '#e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        accent: '#ea580c',
        inputBg: isDark ? '#1c1917' : '#f5f5f4',
    };

    useEffect(() => {
        fetchCompanyProfile();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getLogoUrl = (filename) => {
        if (!filename) return null;
        return `http://localhost:5005/uploads/${filename}`;
    };

    const fetchCompanyProfile = async () => {
        try {
            const res = await api.get('/auth/company/profile');
            if (res.data.data) {
                const profile = res.data.data;
                const bidangValue = profile.bidang || '';
                const isBaku = bidangOptions.includes(bidangValue);
                setFormData({
                    nama_perusahaan: profile.nama_perusahaan || '',
                    deskripsi_budaya: profile.deskripsi_budaya || '',
                    lokasi: profile.lokasi || '',
                    no_telepon: profile.no_telepon || '',
                    bidang: isBaku ? bidangValue : '',
                });
                setBidangLain(isBaku ? '' : bidangValue);
                setIsBidangLain(!isBaku && !!bidangValue);
                if (profile.logo) {
                    setExistingLogo(getLogoUrl(profile.logo));
                }
            }
        } catch (err) {
            console.error('Gagal memuat profil perusahaan:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
            setExistingLogo(null);
            setMessage({ text: '', type: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: '', type: '' });

        const formPayload = new FormData();
        formPayload.append('nama_perusahaan', formData.nama_perusahaan);
        formPayload.append('deskripsi_budaya', formData.deskripsi_budaya);
        formPayload.append('lokasi', formData.lokasi);
        formPayload.append('no_telepon', formData.no_telepon);
        formPayload.append('bidang', isBidangLain ? bidangLain.trim() : formData.bidang);
        if (logoFile) {
            formPayload.append('logo', logoFile);
        }

        try {
            const response = await api.put('/auth/company/profile', formPayload);
            setMessage({ text: response.data.message || 'Profil perusahaan berhasil disimpan!', type: 'success' });
            if (logoFile) {
                setExistingLogo(logoPreview);
                setLogoFile(null);
                setLogoPreview(null);
            }
            fetchCompanyProfile();
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Gagal menyimpan profil perusahaan',
                type: 'error'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        background: colors.inputBg,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        color: colors.textMain,
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '100px',
        resize: 'vertical',
    };

    const labelStyle = {
        display: 'block',
        color: colors.textMain,
        fontSize: '13px',
        fontWeight: '700',
        marginBottom: '6px',
    };

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: colors.textMuted }}>
                Memuat profil perusahaan...
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
            <div style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '24px',
                padding: '36px',
                transition: 'all 0.3s ease'
            }}>
                <h1 style={{
                    color: colors.textMain,
                    fontSize: '26px',
                    fontWeight: '800',
                    marginBottom: '6px'
                }}>
                    <BuildingOfficeIcon style={icn} /> Branding Perusahaan
                </h1>
                <p style={{
                    color: colors.textMuted,
                    fontSize: '14px',
                    marginBottom: '28px'
                }}>
                    Lengkapi profil perusahaan agar lebih profesional dan menarik bagi pelamar
                </p>

                {message.text && (
                    <div style={{
                        padding: '14px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        marginBottom: '20px',
                        textAlign: 'center',
                        fontWeight: '600',
                        background: message.type === 'success'
                            ? 'rgba(34,197,94,0.1)'
                            : 'rgba(239,68,68,0.1)',
                        color: message.type === 'success' ? '#22c55e' : '#ef4444',
                        border: `1px solid ${message.type === 'success'
                            ? 'rgba(34,197,94,0.2)'
                            : 'rgba(239,68,68,0.2)'}`
                    }}>
                        {message.type === 'success' ? <CheckCircleIcon style={icn} /> : <ExclamationTriangleIcon style={icn} />} {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Logo Section */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={labelStyle}>Logo Perusahaan</label>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                background: colors.inputBg,
                                border: `2px dashed ${colors.border}`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}>
                                {logoPreview || existingLogo ? (
                                    <img
                                        src={logoPreview || existingLogo}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <BuildingOfficeIcon style={{ width: '36px', height: '36px' }} />
                                )}
                            </div>
                            <label style={{
                                padding: '10px 20px',
                                background: colors.inputBg,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                color: colors.textMain,
                                fontWeight: '600',
                                fontSize: '13px',
                                transition: 'all 0.3s ease',
                            }}>
                                <FolderIcon style={icn} /> Pilih Logo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Nama Perusahaan */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Nama Perusahaan</label>
                        <input
                            type="text"
                            name="nama_perusahaan"
                            value={formData.nama_perusahaan}
                            onChange={handleChange}
                            placeholder="PT. Contoh Makmur Sejahtera"
                            style={inputStyle}
                            required
                        />
                    </div>

                    {/* Deskripsi & Budaya */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Deskripsi & Budaya Perusahaan</label>
                        <textarea
                            name="deskripsi_budaya"
                            value={formData.deskripsi_budaya}
                            onChange={handleChange}
                            placeholder="Ceritakan tentang perusahaan Anda, visi, misi, dan budaya kerja..."
                            style={textareaStyle}
                        />
                    </div>

                    {/* Lokasi */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Lokasi Perusahaan</label>
                        <input
                            type="text"
                            name="lokasi"
                            value={formData.lokasi}
                            onChange={handleChange}
                            placeholder="Jakarta, Bekasi, Bandung, dll."
                            style={inputStyle}
                        />
                    </div>

                    {/* No Telepon / Narahubung */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>No. Telepon / Narahubung</label>
                        <input
                            type="tel"
                            name="no_telepon"
                            value={formData.no_telepon}
                            onChange={handleChange}
                            placeholder="Contoh: 0812xxxxxxxx"
                            style={inputStyle}
                        />
                    </div>

                    {/* Bidang Perusahaan */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={labelStyle}>Bidang Perusahaan</label>
                        <select
                            name="bidang"
                            value={formData.bidang || ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === 'Lainnya') {
                                    setIsBidangLain(true);
                                    setFormData(prev => ({ ...prev, bidang: '' }));
                                } else {
                                    setIsBidangLain(false);
                                    setFormData(prev => ({ ...prev, bidang: val }));
                                    setBidangLain('');
                                }
                            }}
                            style={{
                                ...inputStyle,
                                color: !formData.bidang && !isBidangLain ? (isDark ? '#6b7280' : '#9ca3af') : undefined
                            }}
                            required={!isBidangLain}
                        >
                            <option value="" disabled hidden>Pilih bidang</option>
                            {bidangOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                            <option value="Lainnya">Lainnya</option>
                        </select>
                        {isBidangLain && (
                            <input
                                type="text"
                                placeholder="Tulis bidang perusahaan Anda..."
                                value={bidangLain}
                                onChange={(e) => setBidangLain(e.target.value)}
                                style={{ ...inputStyle, marginTop: '8px' }}
                            />
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSaving}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '14px',
                            fontWeight: '800',
                            fontSize: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            opacity: isSaving ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!isSaving) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(234,88,12,0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {isSaving ? <><ClockIcon style={icn} /> Menyimpan...</> : <><ArrowDownTrayIcon style={icn} /> Simpan Profil Perusahaan</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyBrandingForm;
