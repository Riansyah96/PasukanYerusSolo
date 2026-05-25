import React, { useState } from 'react';

const FormLowonganControlled = ({ onSaveJob }) => {
    const [jobData, setJobData] = useState({
        judul_posisi: '', kategori: '', tipe_pekerjaan: 'Full-time', gaji: '', lokasi: '', deskripsi_pekerjaan: ''
    });

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveJob(jobData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ddd' }}>
            <input type="text" name="judul_posisi" placeholder="Judul" value={jobData.judul_posisi} onChange={handleChange} required /><br/>
            <input type="text" name="kategori" placeholder="Kategori" value={jobData.kategori} onChange={handleChange} required /><br/>
            <select name="tipe_pekerjaan" value={jobData.tipe_pekerjaan} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
            </select><br/>
            <input type="number" name="gaji" placeholder="Gaji" value={jobData.gaji} onChange={handleChange} /><br/>
            <input type="text" name="lokasi" placeholder="Lokasi" value={jobData.lokasi} onChange={handleChange} required /><br/>
            <textarea name="deskripsi_pekerjaan" placeholder="Deskripsi" value={jobData.deskripsi_pekerjaan} onChange={handleChange} required /><br/>
            <button type="submit">Publish</button>
        </form>
    );
};

export default FormLowonganControlled;