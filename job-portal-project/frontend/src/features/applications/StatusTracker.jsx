import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';

export default function StatusTracker({ appTheme, isMobile }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get('/user/applications');
                if (response.data && response.data.length > 0) {
                    setApplications(response.data);
                } else {
                    // Data dummy untuk demo
                    setApplications([
                        { id_lamaran: 'APP-001', title: 'Fullstack Developer', company: 'PasukanYerusSolo', applied_date: '2026-05-28', status: 'Diproses', pesan_hrd: 'Berkas CV Anda sedang ditinjau.' },
                        { id_lamaran: 'APP-002', title: 'React Frontend Engineer', company: 'TechEase Indonesia', applied_date: '2026-05-15', status: 'Diterima', pesan_hrd: 'Selamat! Anda diundang interview.' }
                    ]);
                }
            } catch (err) {
                console.error("Gagal memuat lamaran:", err);
                setApplications([
                    { id_lamaran: 'APP-001', title: 'Fullstack Developer', company: 'PasukanYerusSolo', applied_date: '2026-05-28', status: 'Diproses', pesan_hrd: 'Berkas CV Anda sedang ditinjau.' },
                    { id_lamaran: 'APP-002', title: 'React Frontend Engineer', company: 'TechEase Indonesia', applied_date: '2026-05-15', status: 'Diterima', pesan_hrd: 'Selamat! Anda diundang interview.' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const getStatusBadge = (status) => {
        const statusMap = {
            'Diproses': { bg: 'linear-gradient(135deg, #f59e0b, #ea580c)', text: '#fff', label: '🕒 Diproses' },
            'Diterima': { bg: 'linear-gradient(135deg, #22c55e, #16a34a)', text: '#fff', label: '✅ Diterima' },
            'Ditolak': { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', text: '#fff', label: '❌ Ditolak' },
            'Interview': { bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', text: '#fff', label: '🗣️ Interview' }
        };
        return statusMap[status] || { bg: 'linear-gradient(135deg, #6b7280, #4b5563)', text: '#fff', label: '📋 Pending' };
    };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '#262626' : '#e5e5e5',
        accent: '#f59e0b',
        textMain: isDark ? '#ffffff' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e'
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: colors.textMuted }}>
                ⏳ Memuat data lamaran...
            </div>
        );
    }

    return (
        <div style={{ padding: isMobile ? '20px' : '40px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ color: colors.textMain, fontSize: isMobile ? '24px' : '32px', fontWeight: '800', marginBottom: '8px' }}>
                    📋 Riwayat Lamaran
                </h1>
                <p style={{ color: colors.textMuted, fontSize: '14px' }}>
                    Total <strong style={{ color: '#ea580c' }}>{applications.length}</strong> lamaran yang telah Anda kirim
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {applications.map((app, index) => {
                    const badge = getStatusBadge(app.status);
                    return (
                        <div 
                            key={app.id_lamaran || index} 
                            style={{ 
                                background: colors.cardBg,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '20px',
                                padding: isMobile ? '20px' : '24px',
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                justifyContent: 'space-between',
                                alignItems: isMobile ? 'flex-start' : 'center',
                                gap: '16px',
                                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.05)',
                                borderLeft: `4px solid #ea580c`,
                                transition: 'all 0.3s ease',
                                animation: `fadeInUp 0.3s ease ${index * 0.1}s both`
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 4px 0', color: colors.textMain, fontSize: isMobile ? '16px' : '18px', fontWeight: '700' }}>
                                    {app.title}
                                </h3>
                                <p style={{ margin: '0 0 12px 0', color: '#ea580c', fontWeight: '600', fontSize: '13px' }}>
                                    {app.company}
                                </p>
                                <p style={{ margin: '0', fontSize: '12px', color: colors.textMuted }}>
                                    📅 Melamar pada: {app.applied_date}
                                </p>
                                {app.pesan_hrd && (
                                    <div style={{ 
                                        marginTop: '12px', 
                                        padding: '10px 14px', 
                                        background: isDark ? '#1a1008' : '#fef3c7', 
                                        borderRadius: '10px', 
                                        fontSize: '12px', 
                                        color: colors.textMuted, 
                                        borderLeft: `2px solid #ea580c` 
                                    }}>
                                        💬 {app.pesan_hrd}
                                    </div>
                                )}
                            </div>

                            <div style={{
                                background: badge.bg,
                                color: badge.text,
                                padding: isMobile ? '4px 12px' : '6px 16px',
                                borderRadius: '20px',
                                fontWeight: '800',
                                fontSize: isMobile ? '11px' : '12px',
                                whiteSpace: 'nowrap'
                            }}>
                                {badge.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {applications.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '60px', 
                    color: colors.textMuted,
                    background: colors.cardBg,
                    borderRadius: '20px',
                    border: `1px solid ${colors.border}`
                }}>
                    <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📭</span>
                    <h3 style={{ color: colors.textMain, marginBottom: '8px' }}>Belum Ada Lamaran</h3>
                    <p>Anda belum mengirimkan lamaran apapun. Yuk, cari lowongan sekarang!</p>
                </div>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}