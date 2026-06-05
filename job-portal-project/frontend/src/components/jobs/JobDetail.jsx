// frontend/src/components/jobs/JobDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import ApplyJobForm from '../../features/lamaran/ApplyJobForm';
import FavoriteHandler from '../../features/lamaran/FavoriteHandler';
import FavoriteService from '../../features/lamaran/FavoriteService';


const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyForm, setShowApplyForm] = useState(false);
    
    const isDark = theme === 'dark';
    const isAuthenticated = !!localStorage.getItem('token');

    const getBadgeStyle = (type) => {
        const colors = {
            'Full-time': { bg: '#16a34a', text: '#fff' },
            'Remote': { bg: '#8b5cf6', text: '#fff' },
            'Contract': { bg: '#ea580c', text: '#fff' }
        };
        return colors[type] || { bg: isDark ? '#262626' : '#e5e5e5', text: isDark ? '#d4d4d8' : '#1c1917' };
    };

    useEffect(() => {
        api.get(`/jobs/${id}`)
            .then(res => {
                setJob(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gagal memuat:", err);
                setLoading(false);
            });
    }, [id]);

    const styles = {
        container: { 
            maxWidth: '900px', 
            margin: '40px auto', 
            padding: '20px', 
            fontFamily: 'sans-serif',
            transition: 'all 0.3s ease'
        },
        center: { 
            textAlign: 'center', 
            marginTop: '50px', 
            color: isDark ? '#fef3c7' : '#1c1917',
            fontSize: '16px'
        },
        backButton: { 
            background: 'transparent', 
            border: `1px solid #ea580c`, 
            color: '#ea580c', 
            padding: '10px 20px', 
            borderRadius: '10px', 
            cursor: 'pointer', 
            marginBottom: '24px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
        },
        card: { 
            background: isDark ? '#120b06' : '#ffffff', 
            padding: 'clamp(30px, 5vw, 50px)', 
            borderRadius: '24px', 
            border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
            transition: 'all 0.3s ease',
            boxShadow: isDark ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
        },
        headerContainer: { 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '20px'
        },
        title: { 
            color: isDark ? '#fef3c7' : '#1c1917', 
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
            margin: 0,
            fontWeight: '800',
            letterSpacing: '-0.02em'
        },
        favContainer: { 
            flexShrink: 0, 
            marginTop: '5px' 
        },
        metaContainer: { 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '30px',
            flexWrap: 'wrap'
        },
        badge: { 
            background: isDark ? '#262626' : '#f5f5f4', 
            color: isDark ? '#d4d4d8' : '#1c1917', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontSize: '0.85rem',
            fontWeight: '500'
        },
        section: { 
            marginBottom: '30px' 
        },
        subTitle: { 
            color: '#ea580c', 
            fontSize: '1.1rem', 
            marginBottom: '12px',
            fontWeight: '700'
        },
        desc: { 
            color: isDark ? '#a1a1aa' : '#57534e', 
            lineHeight: '1.7',
            fontSize: '15px'
        },
        applyButton: { 
            width: '100%', 
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
            color: '#fff', 
            border: 'none', 
            padding: '14px', 
            borderRadius: '12px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
        }
    };

    if (loading) return <div style={styles.center}>📡 Memuat data...</div>;
    if (!job) return <div style={styles.center}>❌ Lowongan tidak ditemukan.</div>;

    return (
        <div style={styles.container}>
            <button 
                onClick={() => navigate(-1)} 
                style={styles.backButton}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ea580c';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ea580c';
                    e.currentTarget.style.transform = 'translateX(0)';
                }}
            >
                ← Kembali
            </button>

            <div style={styles.card}>
                <div style={styles.headerContainer}>
                    <h1 style={styles.title}>{job.title}</h1>
                    {isAuthenticated && (
                        <div style={styles.favContainer}>
                            <FavoriteService jobId={job.id} />
                        </div>
                    )}
                </div>

                <div style={styles.metaContainer}>
                    <span style={styles.badge}>📂 {job.kategori}</span>
                    <span style={{ 
                        ...getBadgeStyle(job.type), 
                        padding: '6px 14px', 
                        borderRadius: '20px', 
                        fontWeight: 'bold',
                        fontSize: '0.85rem'
                    }}>
                        {job.type || 'N/A'}
                    </span>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subTitle}>💰 Gaji</h3>
                    <p style={{ color: isDark ? '#fef3c7' : '#1c1917', fontSize: '18px', fontWeight: '600' }}>
                        {job.gaji}
                    </p>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subTitle}>📋 Deskripsi Pekerjaan</h3>
                    <p style={styles.desc}>{job.deskripsi}</p>
                </div>

                <button 
                    onClick={() => isAuthenticated ? setShowApplyForm(!showApplyForm) : navigate('/login')}
                    style={styles.applyButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(234, 88, 12, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    {isAuthenticated ? (showApplyForm ? '✖ Tutup Form' : '📝 Lamar Sekarang') : '🔒 Login untuk Melamar'}
                </button>

                {showApplyForm && (
                    <div style={{ marginTop: '24px', animation: 'fadeIn 0.3s ease' }}>
                        <ApplyJobForm jobId={job.id} onFormSuccess={() => setShowApplyForm(false)} />
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
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

export default JobDetail;