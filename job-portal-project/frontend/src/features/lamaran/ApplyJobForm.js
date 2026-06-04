import React, { useState } from 'react';
import api from '../../services/api';

const ApplyJobForm = ({ jobId, onFormSuccess, triggerToast, appTheme }) => {
    const [fileCv, setFileCv] = useState(null);
    const [pesan, setPesan] = useState('');
    const isDark = appTheme === 'dark';

    const handleFileChange = (e) => {
        setFileCv(e.target.files[0]);
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!fileCv) {
            triggerToast?.('Silahkan lampirkan berkas CV anda!', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('id_lowongan', jobId);
        formData.append('pesan_tambahan', pesan);
        formData.append('cv', fileCv);

        try {
            // CUKUP '/apply' karena baseURL sudah '/api'
            const response = await api.post('/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            triggerToast?.(response.data.message || 'Lamaran terkirim!', 'success');
            onFormSuccess?.();
        } catch (err) {
            triggerToast?.(err.response?.data?.message || 'Gagal mengirim lamaran', 'danger');
        }
    };

    return (
        <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: isDark ? '#fef3c7' : '#291107' }}>
                    Lampirkan CV (PDF)
                </label>
                <input type="file" accept=".pdf" onChange={handleFileChange} required style={{ fontSize: '12px', color: isDark ? '#9e8476' : '#6b7280' }} />
            </div>
            <textarea 
                placeholder="Pesan tambahan untuk HRD..."
                value={pesan} 
                onChange={(e) => setPesan(e.target.value)}
                style={{ width: '100%', minHeight: '70px', padding: '10px', borderRadius: '8px', border: isDark ? '1px solid #22140a' : '1px solid #eaddd3', background: isDark ? '#0d0703' : '#f9fafb', color: isDark ? '#fef3c7' : '#291107', fontSize: '13px' }} 
            />
            <button type="submit" style={{ background: '#ea580c', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '13px' }}>
                Kirim Berkas
            </button>
        </form>
    );
};

export default ApplyJobForm;