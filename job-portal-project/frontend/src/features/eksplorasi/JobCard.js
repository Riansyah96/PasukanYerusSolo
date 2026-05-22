import React from 'react';

// Penggunaan Props destructuring sesuai materi Pertemuan 8
const JobCard = ({ job, onDetailClick }) => {
    return (
        <div className="job-card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px 0', borderRadius: '8px' }}>
            <h3>{job.judul_posisi}</h3>
            <p><strong>Kategori:</strong> {job.kategori}</p>
            <p><strong>Lokasi:</strong> {job.lokasi}</p>
            <p><strong>Gaji:</strong> Rp {Number(job.gaji).toLocaleString('id-ID')}</p>
            <button onClick={() => onDetailClick(job.id)}>Lihat Detail</button>
        </div>
    );
};

export default JobCard;