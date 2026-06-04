// frontend/src/components/jobs/JobCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JobCard.module.css';

const JobCard = ({ job, isFull }) => {
    const navigate = useNavigate();

    const getBadgeStyle = (type) => {
        const colors = {
            'Full-time': { bg: '#16a34a', text: '#fff' },
            'Remote': { bg: '#8b5cf6', text: '#fff' },
            'Contract': { bg: '#ea580c', text: '#fff' }
        };
        const style = colors[type] || { bg: '#475569', text: '#d4d4d8' };
        
        return {
            background: style.bg,
            color: style.text,
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '6px',
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontWeight: 'bold'
        };
    };

    return (
        <div className={styles.card} onClick={() => navigate(`/job/${job.id}`)} style={{ position: 'relative' }}>
            {job.type && <span style={getBadgeStyle(job.type)}>{job.type}</span>}

            <h3 className={styles.title}>{job.title || "Posisi Tidak Diketahui"}</h3>
            
            <p className={styles.category}>Kategori: {job.kategori || "Umum"}</p>
            <p className={styles.salary}>💰 {job.gaji || "Gaji tidak dicantumkan"}</p>
            
            {isFull && (
                <div className={styles.detailSection}>
                    <p className={styles.desc}>{job.deskripsi || "Deskripsi tidak tersedia."}</p>
                    <button className={styles.applyBtn}>Lamar Sekarang</button>
                </div>
            )}
        </div>
    );
};

export default JobCard;