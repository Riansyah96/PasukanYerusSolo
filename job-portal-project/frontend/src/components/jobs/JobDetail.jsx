// frontend/src/components/jobs/JobDetail.jsx
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
    
    // Cek apakah user sudah login (simulasi)
    const isAuthenticated = !!localStorage.getItem('token'); 

    useEffect(() => {
        api.get(`/jobs/${id}`)
            .then(res => {
                setJob(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gagal memuat detail:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={styles.center}>Memuat data...</div>;
    if (!job) return <div style={styles.center}>Lowongan tidak ditemukan.</div>;

    return (
        <div style={styles.container}>
            <button onClick={() => navigate(-1)} style={styles.backButton}>
                ← Kembali ke Eksplorasi
            </button>

            <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h1 style={styles.title}>{job.title}</h1>
                    {isAuthenticated && <FavoriteHandler jobId={job.id} />}
                </div>
                
                <div style={styles.metaContainer}>
                    <span style={styles.badge}>Kategori: {job.kategori}</span>
                    <span style={styles.badge}>Tipe: {job.type}</span>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subTitle}>Gaji Ditawarkan</h3>
                    <p style={styles.salary}>💰 {job.gaji}</p>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subTitle}>Deskripsi Pekerjaan</h3>
                    <p style={styles.desc}>{job.deskripsi}</p>
                </div>

                {/* Tombol Aksi */}
                {isAuthenticated ? (
                    <button 
                        onClick={() => setShowApplyForm(!showApplyForm)}
                        style={styles.applyButton}
                    >
                        {showApplyForm ? 'Tutup Form' : 'Lamar Sekarang'}
                    </button>
                ) : (
                    <button onClick={() => navigate('/login')} style={styles.applyButton}>
                        Login untuk Melamar
                    </button>
                )}

                {/* Integrasi Form */}
                {showApplyForm && (
                    <div style={{ marginTop: '20px' }}>
                        <ApplyJobForm jobId={job.id} onFormSuccess={() => setShowApplyForm(false)} />
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '800px', margin: '40px auto', padding: '20px' },
    center: { textAlign: 'center', marginTop: '50px', color: '#fef3c7' },
    backButton: { background: 'transparent', border: '1px solid #ea580c', color: '#ea580c', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' },
    card: { background: '#0f0f10', padding: '40px', borderRadius: '16px', border: '1px solid #262626' },
    title: { color: '#fef3c7', fontSize: '2rem', marginBottom: '20px' },
    metaContainer: { display: 'flex', gap: '15px', marginBottom: '30px' },
    badge: { background: '#262626', color: '#d4d4d8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem' },
    section: { marginBottom: '30px' },
    subTitle: { color: '#ea580c', fontSize: '1.1rem', marginBottom: '10px' },
    salary: { fontSize: '1.2rem', color: '#fef3c7', fontWeight: 'bold' },
    desc: { color: '#a1a1aa', lineHeight: '1.8' },
    applyButton: { width: '100%', padding: '14px', background: '#ea580c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }
};

export default JobDetail;