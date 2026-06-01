import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function StatusTracker({ appTheme, isMobile }) {
    const isDark = appTheme === 'dark';

    // State untuk menyimpan daftar lamaran kerja pelamar
    const [applications, setApplications] = useState([
        // Data Mockup Awal yang sinkron dengan JobListContainer & ApplyJobForm
        {
            id_lamaran: 'APP-001',
            title: 'Fullstack Developer',
            company: 'PasukanYerusSolo',
            applied_date: '2026-05-28',
            status: 'Diproses', // Pilihan status: Diproses, Diterima, Ditolak
            pesan_hrd: 'Berkas CV Anda sedang ditinjau oleh tim developer PasukanYerusSolo.'
        },
        {
            id_lamaran: 'APP-002',
            title: 'React Frontend Engineer',
            company: 'TechEase Indonesia',
            applied_date: '2026-05-15',
            status: 'Diterima',
            pesan_hrd: 'Selamat! Anda diundang untuk mengikuti technical interview. Silahkan cek email Anda.'
        }
    ]);

    const [loading, setLoading] = useState(false);

    // Ambil data asli dari API Backend jika token tersedia
    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            
            try {
                setLoading(true);
                // Endpoint disesuaikan dengan logic /apply multer backend Anda
                const response = await api.get('/user/applications');
                if (response.data && response.data.length > 0) {
                    setApplications(response.data);
                }
            } catch (err) {
                console.error('Gagal mengambil data status lamaran terbaru:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    // Helper styling badge status secara dinamis
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Diterima':
                return { bg: '#dcfce7', text: '#15803d', label: '🎉 Diterima' };
            case 'Ditolak':
                return { bg: '#fee2e2', text: '#b91c1c', label: '❌ Ditolak' };
            default:
                return { bg: '#fef3c7', text: '#b45309', label: '⏳ Diproses' };
        }
    };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#6b7280',
        innerBox: isDark ? '#0d0703' : '#f9fafb'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {/* Header section */}
            <div style={{ borderBottom: colors.border, paddingBottom: '14px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: colors.textMain }}>Tracker Status Lamaran</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colors.textMuted }}>Pantau perkembangan berkas lamaran dan panggilan interview Anda</p>
            </div>

            {loading ? (
                <div style={{ color: colors.textMain, textAlign: 'center', padding: '20px' }}>Memuat status berkas...</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {applications.length > 0 ? (
                        applications.map((app) => {
                            const badge = getStatusStyle(app.status);
                            return (
                                <div key={app.id_lamaran} style={{
                                    background: colors.cardBg,
                                    border: colors.border,
                                    borderRadius: '16px',
                                    padding: '20px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: '16px',
                                    transition: 'transform 0.2s'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', letterSpacing: '0.5px' }}>{app.id_lamaran}</span>
                                            <span style={{ fontSize: '12px', color: colors.textMuted }}>• Dilamar pada {app.applied_date}</span>
                                        </div>
                                        <h3 style={{ margin: '6px 0 2px 0', fontSize: '18px', fontWeight: '800', color: colors.textMain }}>{app.title}</h3>
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#ea580c' }}>{app.company}</span>
                                        
                                        {/* Kotak Pesan atau feedback dari HRD */}
                                        {app.pesan_hrd && (
                                            <div style={{
                                                marginTop: '12px',
                                                background: colors.innerBox,
                                                border: colors.border,
                                                borderRadius: '8px',
                                                padding: '10px 14px',
                                                fontSize: '13px',
                                                color: isDark ? '#ffffff' : '#374151',
                                                lineHeight: '1.5'
                                            }}>
                                                <strong>Catatan HRD:</strong> {app.pesan_hrd}
                                            </div>
                                        )}
                                    </div>

                                    {/* Badge Status Kelulusan */}
                                    <div style={{
                                        background: badge.bg,
                                        color: badge.text,
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        fontWeight: '800',
                                        fontSize: '13px',
                                        textAlign: 'center',
                                        alignSelf: isMobile ? 'flex-start' : 'center',
                                        minWidth: '100px'
                                    }}>
                                        {badge.label}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', background: colors.cardBg, border: colors.border, borderRadius: '16px', color: colors.textMuted }}>
                            📁 Anda belum mengirimkan lamaran pekerjaan apa pun.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}