import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const ApplyJobForm = ({ jobId, onFormSuccess }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [fileCv, setFileCv] = useState(null);
    const [pesan, setPesan] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== 'application/pdf') {
            alert('Hanya file PDF yang diperbolehkan!');
            return;
        }
        if (file && file.size > 2 * 1024 * 1024) {
            alert('Ukuran file maksimal 2MB!');
            return;
        }
        setFileCv(file);
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!fileCv) {
            alert('Silahkan lampirkan berkas CV!');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('id_lowongan', jobId);
        formData.append('pesan_tambahan', pesan);
        formData.append('cv', fileCv);

        try {
            const response = await api.post('/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message || 'Lamaran berhasil dikirim!');
            setFileCv(null);
            setPesan('');
            if (onFormSuccess) onFormSuccess();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengirim berkas');
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        form: {
            marginTop: '15px',
            padding: '20px',
            background: isDark ? 'rgba(234, 88, 12, 0.08)' : 'rgba(234, 88, 12, 0.04)',
            borderRadius: '16px',
            border: `1px dashed ${isDark ? '#ea580c' : '#ea580c'}`,
            transition: 'all 0.3s ease'
        },
        title: {
            margin: '0 0 16px 0',
            fontSize: '16px',
            color: '#ea580c',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        label: {
            display: 'block',
            fontSize: '11px',
            fontWeight: '700',
            marginBottom: '6px',
            color: '#ea580c',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        input: {
            fontSize: '13px',
            marginBottom: '12px',
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#3d2514' : '#eaddd3'}`,
            background: isDark ? '#0d0703' : '#ffffff',
            color: isDark ? '#fef3c7' : '#291107',
            cursor: 'pointer'
        },
        textarea: {
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: `1px solid ${isDark ? '#3d2514' : '#eaddd3'}`,
            background: isDark ? '#0d0703' : '#ffffff',
            color: isDark ? '#fef3c7' : '#291107',
            fontSize: '13px',
            boxSizing: 'border-box',
            marginBottom: '12px',
            minHeight: '80px',
            resize: 'vertical',
            outline: 'none',
            transition: 'all 0.3s ease'
        },
        button: {
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        }
    };

    return (
        <form onSubmit={handleApply} style={styles.form}>
            <h4 style={styles.title}>
                <span>📄</span> Kirim Lamaran (Upload CV)
            </h4>
            
            <label style={styles.label}>📁 BERKAS CV (FORMAT .PDF, MAX 2MB)</label>
            <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                required 
                style={styles.input}
            />
            
            <textarea 
                placeholder="Pesan tambahan untuk HRD (opsional)..." 
                value={pesan} 
                onChange={(e) => setPesan(e.target.value)} 
                style={styles.textarea}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#ea580c';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(234,88,12,0.2)';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#3d2514' : '#eaddd3';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            />
            
            <button 
                type="submit" 
                style={styles.button}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {isSubmitting ? '⏳ Mengirim...' : '🚀 Upload & Kirim Berkas'}
            </button>
        </form>
    );
};

export default ApplyJobForm;