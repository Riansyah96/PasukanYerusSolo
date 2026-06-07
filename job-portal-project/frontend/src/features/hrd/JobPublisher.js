import React, { useContext, useState, useEffect } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';
import FormLowonganControlled from './FormLowonganControlled';
import ApplicationStatusTracker from './ApplicationStatusTracker';

const JobPublisher = ({ isMobile }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // Gunakan endpoint yang benar
                const response = await api.get('/auth/hrd/applications');
                console.log('Applications response:', response.data);
                
                if (response.data && response.data.length > 0) {
                    setApplications(response.data);
                } else {
                    setApplications([]);
                }
            } catch (err) {
                console.error("Gagal memuat lamaran:", err);
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handlePublish = async (jobData) => {
        try {
            const response = await api.post('/auth/hrd/jobs', jobData);
            if (response.data.status === 'success') {
                alert('✅ Sukses: ' + response.data.message);
            }
        } catch (err) {
            alert('❌ Gagal mempublikasikan: ' + (err.response?.data?.message || err.message));
        }
    };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #291a0e' : '1px solid #ebdcd0',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e'
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: colors.textMuted }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: `3px solid ${colors.border}`,
                    borderTop: `3px solid #ea580c`,
                    borderRadius: '50%',
                    margin: '0 auto 16px auto',
                    animation: 'spin 1s linear infinite'
                }} />
                <p>⏳ Memuat dashboard...</p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '24px',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '20px',
            alignItems: 'flex-start'
        }}>
            <div style={{ flex: isMobile ? '1' : '1.3', width: '100%' }}>
                <FormLowonganControlled 
                    onSaveJob={handlePublish} 
                    isMobile={isMobile} 
                />
            </div>

            <div style={{
                flex: '1',
                width: '100%',
                background: colors.cardBg,
                border: colors.border,
                borderRadius: '24px',
                padding: '24px',
                boxSizing: 'border-box'
            }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' }}>
                    📋 Pemantauan Berkas Masuk
                </h3>
                <p style={{ color: colors.textMuted, fontSize: '13px', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                    Kelola kelayakan berkas, jadwalkan interview, atau perbarui status akhir rekrutmen.
                </p>
                
                {applications.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {applications.map((applicant, index) => (
                            <div 
                                key={applicant.id_lamaran || index}
                                style={{
                                    padding: '16px',
                                    borderRadius: '16px',
                                    border: colors.border,
                                    background: isDark ? '#080402' : '#ffffff',
                                    transition: 'all 0.3s ease',
                                    animation: `fadeInUp 0.3s ease ${index * 0.1}s both`
                                }}
                            >
                                <h4 style={{ fontSize: '15px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' }}>
                                    {applicant.nama_pelamar || 'Pelamar'}
                                </h4>
                                <p style={{ fontSize: '12px', color: '#ea580c', fontWeight: '700', margin: '0 0 8px 0' }}>
                                    🎯 {applicant.judul_posisi} • 📅 {new Date(applicant.tanggal_melamar).toLocaleDateString('id-ID')}
                                </p>
                                <p style={{ fontSize: '11px', color: colors.textMuted, margin: '0 0 8px 0' }}>
                                    📧 {applicant.email_pelamar} • 📞 {applicant.telepon || '-'}
                                </p>
                                
                                <ApplicationStatusTracker 
                                    applicationId={applicant.id_lamaran} 
                                    currentStatus={applicant.status || 'Menunggu'} 
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>
                        <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📭</span>
                        <p>Belum ada lamaran masuk</p>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default JobPublisher;