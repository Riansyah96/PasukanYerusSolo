// src/features/lamaran/FavoriteService.js
import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const FavoriteService = ({ jobId }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            if (!jobId) return;
            const token = localStorage.getItem('token');
            if (!token) {
                setIsFavorited(false);
                return;
            }
            try {
                const response = await api.get(`/favorit/cek/${jobId}`);
                setIsFavorited(response.data.isFavorited);
            } catch (err) {
                setIsFavorited(false);
            }
        };
        checkFavorite();
    }, [jobId]);

    const toggleFavorite = async () => {
        if (isLoading) return;
        
        const token = localStorage.getItem('token');
        if (!token) {
            alert('⚠️ Silakan login terlebih dahulu untuk menyimpan favorit!');
            window.location.href = '/login';
            return;
        }
        
        setIsLoading(true);
        
        try {
            if (isFavorited) {
                await api.delete(`/favorit/${jobId}`);
                setIsFavorited(false);
                alert('⭐ Lowongan dihapus dari favorit');
            } else {
                await api.post('/favorit', { id_lowongan: jobId });
                setIsFavorited(true);
                alert('✨ Lowongan berhasil disimpan ke favorit!');
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Gagal memproses favorit';
            alert(`❌ ${msg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: '700',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        background: isFavorited 
            ? (isDark ? '#062f17' : '#f0fdf4') 
            : (isDark ? '#1a1008' : '#fffaf5'),
        color: isFavorited 
            ? (isDark ? '#4ade80' : '#16a34a') 
            : (isDark ? '#ea580c' : '#ea580c'),
        border: `1px solid ${isFavorited 
            ? (isDark ? '#22c55e' : '#16a34a')
            : (isDark ? '#3d2514' : '#eaddd3')}`,
        width: '100%',
        justifyContent: 'center',
        opacity: isLoading ? 0.7 : 1
    };

    return (
        <button
            onClick={toggleFavorite}
            style={buttonStyle}
            disabled={isLoading}
            onMouseEnter={(e) => {
                if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                }
            }}
        >
            {isLoading ? '⏳...' : (
                <>
                    {isFavorited ? (
                        <><span>⭐</span> Hapus dari Favorit</>
                    ) : (
                        <><span>☆</span> Tambah ke Favorit</>
                    )}
                </>
            )}
        </button>
    );
};

export default FavoriteService;