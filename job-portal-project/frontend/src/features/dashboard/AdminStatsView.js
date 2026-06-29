import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';
import { UserIcon, BuildingOfficeIcon, BriefcaseIcon, InboxArrowDownIcon, ClockIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const AdminStatsView = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (err) {
                console.error("Gagal memuat statistik", err);
                setStats({
                    total_users: 0,
                    total_companies: 0,
                    total_job_seekers: 0,
                    total_jobs: 0,
                    total_applications: 0
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
        { icon: <UserIcon style={{width: '22px', height: '22px'}} />, title: 'Total Pengguna', value: stats?.total_users || 0, color: '#3b82f6' },
        { icon: <BuildingOfficeIcon style={{width: '22px', height: '22px'}} />, title: 'Total Perusahaan', value: stats?.total_companies || 0, color: '#8b5cf6' },
        { icon: <UserIcon style={{width: '22px', height: '22px'}} />, title: 'Total Pelamar', value: stats?.total_job_seekers || 0, color: '#06b6d4' },
        { icon: <BriefcaseIcon style={{width: '22px', height: '22px'}} />, title: 'Total Lowongan', value: stats?.total_jobs || 0, color: '#10b981' },
        { icon: <InboxArrowDownIcon style={{width: '22px', height: '22px'}} />, title: 'Total Lamaran', value: stats?.total_applications || 0, color: '#f59e0b' }
    ];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: colors.textMuted }}>
                <ClockIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Memuat statistik dashboard...
            </div>
        );
    }

    return (
        <div className="stats-wrapper" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="stats-header" style={{ marginBottom: '20px' }}>
                <h1 className="stats-title" style={{ color: colors.textMain, fontSize: '28px', fontWeight: '800', marginBottom: '6px' }}>
                    <Cog6ToothIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Dashboard Admin
                </h1>
                <p className="stats-subtitle" style={{ color: colors.textMuted, fontSize: '13px' }}>
                    Ringkasan statistik platform PasukanYerusSolo
                </p>
            </div>

            <div className="stats-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                marginBottom: '32px'
            }}>
                {statCards.map((card, index) => (
                    <div 
                        key={index}
                        className="stats-card"
                        style={{
                            background: colors.cardBg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: '16px',
                            padding: '20px',
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
                        <div className="stats-icon" style={{
                            width: '46px',
                            height: '46px',
                            background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                            borderRadius: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            marginBottom: '14px',
                            color: '#fff'
                        }}>
                            {card.icon}
                        </div>
                        <h3 className="stats-label" style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                            {card.title}
                        </h3>
                        <p className="stats-value" style={{ color: colors.textMain, fontSize: '28px', fontWeight: '800', margin: 0 }}>
                            {card.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            <style>{`
                .stats-wrapper { padding: 32px 0; }

                @media (min-width: 641px) {
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 16px;
                    }
                }

                @media (max-width: 640px) {
                    .stats-wrapper { padding: 12px 0; }
                    .stats-header { margin-bottom: 12px !important; }
                    .stats-title { font-size: 20px !important; }
                    .stats-subtitle { font-size: 12px !important; }

                    .stats-grid {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 10px;
                        margin-bottom: 0 !important;
                    }
                    .stats-card {
                        padding: 14px !important;
                        border-radius: 14px !important;
                    }
                    .stats-card:last-child {
                        grid-column: 1 / -1 !important;
                    }
                    .stats-icon {
                        width: 36px !important;
                        height: 36px !important;
                        font-size: 17px !important;
                        margin-bottom: 10px !important;
                        border-radius: 11px !important;
                    }
                    .stats-label { font-size: 11px !important; margin-bottom: 4px !important; }
                    .stats-value { font-size: 20px !important; }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default AdminStatsView;
