import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const FavoriteListContainer = ({ appTheme }) => {
    const [favoriteJobs, setFavoriteJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const isDark = appTheme === 'dark';

    useEffect(() => {
        const fetchFavorit = async () => {
            try {
                const response = await api.get('/favorit');
                // Pastikan backend mengembalikan array data lowongan
                setFavoriteJobs(response.data || []); 
            } catch (err) {
                console.error("Gagal memuat lowongan favorit", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorit();
    }, []);

    const colors = {
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#6b7280',
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3'
    };

    if (loading) {
        return <div style={{ color: colors.textMuted, padding: '20px' }}>Memuat daftar favorit Anda...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div style={{ borderBottom: colors.border, paddingBottom: '14px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: colors.textMain }}>Lowongan Favorit Anda</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colors.textMuted }}>Daftar pekerjaan yang telah Anda simpan untuk dipantau kembali.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {favoriteJobs.length > 0 ? (
                    favoriteJobs.map((job) => (
                        <div key={job.id} style={{
                            background: colors.cardBg,
                            border: colors.border,
                            padding: '16px',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h4 style={{ margin: 0, color: colors.textMain, fontSize: '16px' }}>{job.title}</h4>
                                <span style={{ color: '#ea580c', fontSize: '13px', fontWeight: '600' }}>{job.company}</span>
                                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>📍 {job.location} | 💰 {job.salary}</div>
                            </div>
                            <span style={{ fontSize: '12px', background: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '6px', fontWeight: '700' }}>
                                Tersimpan
                            </span>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', background: colors.cardBg, border: colors.border, borderRadius: '16px', color: colors.textMuted }}>
                        Belum ada lowongan pekerjaan yang Anda tambahkan ke favorit.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteListContainer;