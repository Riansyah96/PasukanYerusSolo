import React, { useState } from 'react';
import api from '../../services/api';

const ApplyJobForm = ({ jobId }) => {
    const [fileCv, setFileCv] = useState(null);
    const [pesan, setPesan] = useState('');

    const handleFileChange = (e) => {
        setFileCv(e.target.files[0]); // Menyimpan object file ke state (Pertemuan 9)
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!fileCv) return alert('Silahkan lampirkan berkas CV anda terlebih dahulu!');

        // Penggunaan FormData untuk file upload sesuai standar backend multer
        const formData = new FormData();
        formData.append('id_lowongan', jobId);
        formData.append('pesan_tambahan', pesan);
        formData.append('cv', fileCv);

        try {
            const response = await api.post('/lamaran', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengirim berkas lamaran');
        }
    };

    return (
        <form onSubmit={handleApply} style={{ marginTop: '15px', padding: '10px', background: '#fff3cd' }}>
            <h4>Kirim Lamaran untuk Posisi ini</h4>
            <input type="file" accept=".pdf" onChange={handleFileChange} required /><br/>
            <textarea placeholder="Pesan tambahan untuk HRD..." value={pesan} onChange={(e) => setPesan(e.target.value)} /><br/>
            <button type="submit">Kirim Berkas Lamaran (CV)</button>
        </form>
    );
};

export default ApplyJobForm;