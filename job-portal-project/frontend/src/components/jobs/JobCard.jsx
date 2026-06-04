// frontend/src/components/jobs/JobCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JobCard.module.css';

const JobCard = ({ job, isFull }) => {
    const navigate = useNavigate();

    // Debugging: Lihat apa isi objek job yang diterima
    // console.log("Data JobCard:", job);

    return (
        <div className={styles.card} onClick={() => navigate(`/job/${job.id}`)}>
            {/* Pastikan menggunakan job.title sesuai alias di Controller */}
            <h3 className={styles.title}>{job.title || "Posisi Tidak Diketahui"}</h3>
            
            <p className={styles.category}>Kategori: {job.kategori || "-"}</p>
            <p className={styles.salary}>💰 {job.gaji || "Gaji tidak dicantumkan"}</p>
            
            {isFull && (
                <div className={styles.detailSection}>
                    <p className={styles.desc}>{job.desc || "Deskripsi tidak tersedia."}</p>
                    <button className={styles.applyBtn}>Lamar Sekarang</button>
                </div>
            )}
        </div>
    );
};

export default JobCard;