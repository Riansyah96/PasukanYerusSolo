import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const AdminStatsView = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/statistik');
                setStats(response.data.data);
            } catch (err) {
                console.error("Gagal memuat statistik", err);
                // Data dummy untuk demo
                setStats({
                    total_pengguna: 1250,
                    total_lowongan: 89,
                    total_lamaran: 342,
                    total_perusahaan: 45
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '#262626' : '#e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        accent: '#ea580c'
    };

    const statCards = [
        { icon: '👤', title: 'Total Pengguna', value: stats?.total_pengguna || 0, color: '#3b82f6' },
        { icon: '💼', title: 'Total Lowongan', value: stats?.total_lowongan || 0, color: '#10b981' },
        { icon: '📩', title: 'Total Lamaran', value: stats?.total_lamaran || 0, color: '#f59e0b' },
        { icon: '🏢', title: 'Total Perusahaan', value: stats?.total_perusahaan || 0, color: '#8b5cf6' }
    ];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: colors.textMuted }}>
                ⏳ Memuat statistik dashboard...
            </div>
        );
    }

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ color: colors.textMain, fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
                    ⚙️ Dashboard Admin
                </h1>
                <p style={{ color: colors.textMuted, fontSize: '14px' }}>
                    Ringkasan statistik platform PasukanYerusSolo
                </p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '24px',
                marginBottom: '40px'
            }}>
                {statCards.map((card, index) => (
                    <div 
                        key={index}
                        style={{
                            background: colors.cardBg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: '20px',
                            padding: '24px',
                            transition: 'all 0.3s ease',
                            animation: `fadeInUp 0.3s ease ${index * 0.1}s both`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            marginBottom: '16px'
                        }}>
                            {card.icon}
                        </div>
                        <h3 style={{ color: colors.textMuted, fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                            {card.title}
                        </h3>
                        <p style={{ color: colors.textMain, fontSize: '32px', fontWeight: '800', margin: 0 }}>
                            {card.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

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
};

export default AdminStatsView;