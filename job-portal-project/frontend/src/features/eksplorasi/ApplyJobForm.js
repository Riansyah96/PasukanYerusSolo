import React, { useState } from 'react';
import api from '../../services/api';

const ApplyJobForm = ({ jobId, onFormSuccess }) => {
    const [fileCv, setFileCv] = useState(null);
    const [pesan, setPesan] = useState('');

    const handleFileChange = (e) => {
        setFileCv(e.target.files[0]); 
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!fileCv) return alert('Silahkan lampirkan berkas CV anda terlebih dahulu!');

        const formData = new FormData();
        formData.append('id_lowongan', jobId);
        formData.append('pesan_tambahan', pesan);
        formData.append('cv', fileCv);

        try {
            const response = await api.post('/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message || 'Lamaran berhasil dikirim!');
            if (onFormSuccess) onFormSuccess();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengirim berkas lamaran');
        }
    };

    return (
        <form onSubmit={handleApply} style={{ marginTop: '15px', padding: '16px', background: 'rgba(234, 88, 12, 0.06)', borderRadius: '14px', border: '1px dashed #ea580c' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#ea580c', fontWeight: '800' }}>Kirim Lamaran (Upload CV)</h4>
            
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: '#ea580c' }}>BERKAS CV (FORMAT .PDF)</label>
            <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                required 
                style={{ fontSize: '13px', marginBottom: '12px', width: '100%' }}
            />
            
            <textarea 
                placeholder="Pesan tambahan untuk HRD..." 
                value={pesan} 
                onChange={(e) => setPesan(e.target.value)} 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ebdccf', background: '#fff', color: '#000', fontSize: '13px', boxSizing: 'border-box', marginBottom: '12px', minHeight: '60px', resize: 'vertical' }}
            />
            
            <button type="submit" style={{ width: '100%', padding: '10px', background: '#ea580c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                🚀 Upload & Kirim Berkas
            </button>
        </form>
    );
};

export default ApplyJobForm;