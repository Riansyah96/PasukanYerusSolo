import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const ApplyJobForm = ({ jobId, onFormSuccess, onSuccess, onError }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [fileCv, setFileCv] = useState(null);
    const [pesan, setPesan] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('File selected:', file?.name);
        
        if (!file) {
            setFileCv(null);
            setFileName('');
            return;
        }
        
        if (file.type !== 'application/pdf') {
            alert('❌ Hanya file PDF yang diperbolehkan!');
            e.target.value = '';
            setFileCv(null);
            setFileName('');
            return;
        }
        
        if (file.size > 2 * 1024 * 1024) {
            alert('❌ Ukuran file maksimal 2MB!');
            e.target.value = '';
            setFileCv(null);
            setFileName('');
            return;
        }
        
        setFileCv(file);
        setFileName(file.name);
    };

    const handleApply = async (e) => {
        e.preventDefault();
        
        console.log('=== FORM SUBMIT ===');
        console.log('jobId:', jobId);
        console.log('fileCv:', fileCv?.name);
        
        if (!fileCv) {
            alert('❌ Silahkan pilih file CV anda terlebih dahulu!');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('id_lowongan', jobId);
        formData.append('pesan_tambahan', pesan);
        formData.append('cv', fileCv);

        try {
            console.log('Sending POST to /apply...');
            const response = await api.post('/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            console.log('Response success:', response.data);
            
            alert('✅ ' + (response.data.message || 'Lamaran berhasil dikirim!'));
            
            // Reset form
            setFileCv(null);
            setFileName('');
            setPesan('');
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';
            
            if (onSuccess) onSuccess(response.data.message);
            if (onFormSuccess) onFormSuccess();
            
        } catch (err) {
            console.error('Error details:', err);
            console.error('Response status:', err.response?.status);
            console.error('Response data:', err.response?.data);
            
            let errorMsg = 'Gagal mengirim lamaran';
            if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err.message) {
                errorMsg = err.message;
            }
            
            alert('❌ ' + errorMsg);
            
            if (onError) onError(errorMsg);
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
            cursor: 'pointer',
            transition: 'all 0.3s ease'
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
            gap: '8px',
            opacity: isSubmitting ? 0.7 : 1
        },
        fileName: {
            fontSize: '11px',
            marginTop: '-8px',
            marginBottom: '12px',
            color: isDark ? '#86efac' : '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
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
            
            {fileName && (
                <div style={styles.fileName}>
                    <span>✅</span> File siap: {fileName}
                </div>
            )}
            
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
                    if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.4)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {isSubmitting ? (
                    <>
                        <span>⏳</span> Mengirim...
                    </>
                ) : (
                    <>
                        <span>🚀</span> Kirim Lamaran
                    </>
                )}
            </button>
        </form>
    );
};

export default ApplyJobForm;