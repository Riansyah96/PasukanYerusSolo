import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const JobDetailView = ({ selectedJobId, onBack }) => {
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (selectedJobId) {
            api.get(`/lowongan/${selectedJobId}`)
                .then(res => setJob(res.data.data))
                .catch(err => alert("Gagal mengambil detail lowongan"));
        }
    }, [selectedJobId]);

    if (!job) return <p>Sedang memuat spesifikasi detail pekerjaan...</p>;

    return (
        <div style={{ padding: '20px', border: '1px solid #aaa' }}>
            <button onClick={onBack}>← Kembali ke List</button>
            <h2>{job.judul_posisi}</h2>
            <h4>Kategori: {job.kategori} | Lokasi: {job.lokasi}</h4>
            <p><strong>Kisaran Gaji:</strong> Rp {Number(job.gaji).toLocaleString()}</p>
            <div style={{ background: '#f9f9f9', padding: '15px', marginTop: '10px' }}>
                <h5>Deskripsi Pekerjaan:</h5>
                <p>{job.deskripsi_pekerjaan}</p>
            </div>
        </div>
    );
};

export default JobDetailView;