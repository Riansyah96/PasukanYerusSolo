import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ApplyJobForm from '../../features/lamaran/ApplyJobForm';
import FavoriteHandler from '../../features/lamaran/FavoriteHandler';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyForm, setShowApplyForm] = useState(false);
    
    const isAuthenticated = !!localStorage.getItem('token');

    // Sesuai dengan data di database: "Full-time", "Remote", "Contract"
    const getBadgeStyle = (type) => {
        const colors = {
            'Full-time': { bg: '#16a34a', text: '#fff' },
            'Remote': { bg: '#8b5cf6', text: '#fff' },
            'Contract': { bg: '#ea580c', text: '#fff' }
        };
        return colors[type] || { bg: '#262626', text: '#d4d4d8' };
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

    if (loading) return <div style={styles.center}>Memuat data...</div>;
    if (!job) return <div style={styles.center}>Lowongan tidak ditemukan.</div>;

    return (
        <div style={styles.container}>
            <button onClick={() => navigate(-1)} style={styles.backButton}>← Kembali</button>

            <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={styles.title}>{job.title}</h1>
                    {isAuthenticated && <FavoriteHandler jobId={job.id} />}
                </div>

                <div style={styles.metaContainer}>
                    <span style={styles.badge}>Kategori: {job.kategori}</span>
                    <span style={{ 
                        ...getBadgeStyle(job.type), 
                        padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold' 
                    }}>
                        {job.type || 'N/A'}
                    </span>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subTitle}>Gaji</h3>
                    <p style={{ color: '#fef3c7' }}>💰 {job.gaji}</p>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subTitle}>Deskripsi</h3>
                    <p style={styles.desc}>{job.deskripsi}</p>
                </div>

                <button onClick={() => isAuthenticated ? setShowApplyForm(!showApplyForm) : navigate('/login')}
                        style={styles.applyButton}>
                    {isAuthenticated ? 'Lamar Sekarang' : 'Login untuk Melamar'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' },
    center: { textAlign: 'center', marginTop: '50px', color: '#fef3c7' },
    backButton: { 
        background: 'transparent', border: '1px solid #ea580c', color: '#ea580c', 
        padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' 
    },
    card: { background: '#120b06', padding: '40px', borderRadius: '16px', border: '1px solid #262626' },
    title: { color: '#fef3c7', fontSize: '2rem', marginBottom: '20px' },
    metaContainer: { display: 'flex', gap: '15px', marginBottom: '30px' },
    badge: { background: '#262626', color: '#d4d4d8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem' },
    section: { marginBottom: '30px' },
    subTitle: { color: '#ea580c', fontSize: '1.1rem', marginBottom: '10px' },
    desc: { color: '#a1a1aa', lineHeight: '1.6' },
    applyButton: { 
        width: '100%', background: '#ea580c', color: '#fff', border: 'none', 
        padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' 
    }
};

export default JobDetail;