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
            if (typeof triggerToast === 'function') {
                triggerToast('Silahkan lampirkan berkas CV anda terlebih dahulu!', 'warning');
            }
            return;
        }

        const formData = new FormData();
        formData.append('id_lowongan', jobId);
        formData.append('pesan_tambahan', pesan);
        formData.append('cv', fileCv);

        try {
            const response = await api.post('/lamaran', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (typeof triggerToast === 'function') {
                triggerToast(response.data.message || 'Berkas lamaran berhasil terkirim!', 'success');
            }
            if (typeof onFormSuccess === 'function') onFormSuccess();
        } catch (err) {
            if (typeof triggerToast === 'function') {
                triggerToast(err.response?.data?.message || 'Gagal mengirim berkas lamaran', 'danger');
            }
        }
    };

    return (
        <form onSubmit={handleApply} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            marginTop: '15px' 
        }}>
            <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#ea580c' }}>
                Kirim Lamaran untuk Posisi ini
            </h5>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange}
                    required
                    style={{ 
                        fontSize: '12px',
                        color: isDark ? '#9e8476' : '#6b7280'
                    }} 
                />
            </div>

            <textarea 
                placeholder="Pesan tambahan untuk HRD..."
                value={pesan} 
                onChange={(e) => setPesan(e.target.value)}
                style={{ 
                    width: '100%', 
                    minHeight: '70px', 
                    padding: '10px', 
                    borderRadius: '8px', 
                    border: isDark ? '1px solid #22140a' : '1px solid #eaddd3', 
                    background: isDark ? '#0d0703' : '#f9fafb', 
                    color: isDark ? '#fef3c7' : '#291107', 
                    fontSize: '13px', 
                    boxSizing: 'border-box',
                    resize: 'vertical'
                }} 
            />

            <button type="submit" style={{ 
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
                color: 'white', 
                border: 'none', 
                padding: '11px', 
                borderRadius: '8px', 
                fontWeight: '800', 
                cursor: 'pointer', 
                fontSize: '13px',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.15)'
            }}>
                Kirim Berkas Lamaran (CV)
            </button>
        </form>
    );
};

export default ApplyJobForm;