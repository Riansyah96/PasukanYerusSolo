import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

const FavoriteListContainer = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', message: '', type: 'success' });

    const showNotification = (title, message, type = 'success') => {
        setModalMessage({ title, message, type });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const response = await api.get('/favorit');
                setFavorites(Array.isArray(response.data) ? response.data : []);
                setError(null);
            } catch (err) {
                console.error("Gagal memuat lowongan favorit:", err);
                setError(err.response?.data?.message || 'Gagal memuat data favorit');
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (idLowongan, e) => {
        e.stopPropagation();
        try {
            await api.delete(`/favorit/${idLowongan}`);
            setFavorites(favorites.filter(f => f.id_lowongan !== idLowongan));
            showNotification('✅ Dihapus dari Favorit', 'Lowongan berhasil dihapus dari daftar favorit!', 'success');
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            showNotification('❌ Gagal', `Gagal menghapus: ${msg}`, 'error');
        }
    };

    const formatRupiah = (angka) => {
        if (!angka) return 'Tidak disebutkan';
        const cleanNumber = String(angka).replace(/\./g, '');
        const number = parseInt(cleanNumber);
        if (isNaN(number)) return angka;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '#262626' : '#e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        accent: '#ea580c'
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: colors.textMuted }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: `3px solid ${colors.border}`,
                    borderTop: `3px solid ${colors.accent}`,
                    borderRadius: '50%',
                    margin: '0 auto 16px auto',
                    animation: 'spin 1s linear infinite'
                }} />
                <p>⏳ Memuat daftar favorit...</p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                color: colors.textMuted,
                background: colors.cardBg,
                borderRadius: '20px',
                border: `1px solid ${colors.border}`,
                margin: '20px'
            }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>⚠️</span>
                <h3 style={{ color: colors.textMain, marginBottom: '8px' }}>Gagal Memuat Data</h3>
                <p>{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: '20px',
                        padding: '10px 24px',
                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,88,12,0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    🔄 Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalMessage.title}
                message={modalMessage.message}
                type={modalMessage.type}
            />

            <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ color: colors.textMain, fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
                        ⭐ Lowongan Favorit
                    </h1>
                    <p style={{ color: colors.textMuted, fontSize: '14px' }}>
                        {favorites.length} lowongan yang Anda simpan
                    </p>
                </div>

                {favorites.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {favorites.map((job, index) => (
                            <div 
                                key={`${job.id_user}-${job.id_lowongan}` || index}
                                style={{
                                    background: colors.cardBg,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: '16px',
                                    padding: '20px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    animation: `fadeInUp 0.3s ease ${index * 0.05}s both`,
                                    position: 'relative'
                                }}
                                onClick={() => navigate(`/job/${job.id_lowongan}`)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                    e.currentTarget.style.borderColor = colors.accent;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.borderColor = colors.border;
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 8px 0', color: colors.textMain, fontSize: '18px', fontWeight: '700' }}>
                                            {job.judul_posisi || 'Lowongan'}
                                        </h3>
                                        <p style={{ margin: '0 0 4px 0', color: colors.accent, fontWeight: '600', fontSize: '13px' }}>
                                            📂 {job.kategori || 'IT'}
                                        </p>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: colors.textMuted }}>
                                            💰 {formatRupiah(job.gaji)}
                                        </p>
                                        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: colors.textMuted }}>
                                            🏷️ {job.tipe_pekerjaan || 'Full-time'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => handleRemoveFavorite(job.id_lowongan, e)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                            color: '#ef4444',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                                            e.currentTarget.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                        title="Hapus dari favorit"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '60px',
                                    fontSize: '20px',
                                    color: '#f59e0b'
                                }}>
                                    ⭐
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '60px', 
                        color: colors.textMuted,
                        background: colors.cardBg,
                        borderRadius: '20px',
                        border: `1px solid ${colors.border}`
                    }}>
                        <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>⭐</span>
                        <h3 style={{ color: colors.textMain, marginBottom: '8px' }}>Belum Ada Lowongan Favorit</h3>
                        <p>Jelajahi lowongan dan klik ★ untuk menyimpan ke favorit!</p>
                        <button 
                            onClick={() => navigate('/eksplorasi')}
                            style={{
                                marginTop: '20px',
                                padding: '10px 24px',
                                background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,88,12,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            🔍 Cari Lowongan
                        </button>
                    </div>
                )}

                <style>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
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

export default FavoriteListContainer;