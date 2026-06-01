import React from 'react';
import api from '../../services/api';
import FormLowonganControlled from './FormLowonganControlled';
import ApplicationStatusTracker from './ApplicationStatusTracker';

const JobPublisher = ({ appTheme, isMobile }) => {
    const isDark = appTheme === 'dark';

    const handlePublish = async (jobData) => {
        try {
            const response = await api.post('/hrd/lowongan', jobData);
            if (response.data.status === 'success') {
                alert('Sukses: ' + response.data.message);
            }
        } catch (err) {
            alert('Gagal mempublikasikan: ' + (err.response?.data?.message || err.message));
        }
    };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #291a0e' : '1px solid #ebdcd0',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e'
    };

    const styles = {
        layoutContainer: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '24px',
            width: '100%',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            alignItems: 'flex-start'
        },
        leftSection: { flex: isMobile ? '1' : '1.3', width: '100%' },
        rightSection: {
            flex: '1',
            width: '100%',
            background: colors.cardBg,
            border: colors.border,
            borderRadius: '24px',
            padding: '24px',
            boxSizing: 'border-box'
        },
        panelTitle: { fontSize: '18px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' },
        panelSubtitle: { color: colors.textMuted, fontSize: '13px', margin: '0 0 20px 0', lineHeight: '1.4' },
        applicantCard: {
            padding: '16px',
            borderRadius: '16px',
            border: colors.border,
            background: isDark ? '#080402' : '#ffffff'
        },
        applicantName: { fontSize: '15px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' },
        applicantMeta: { fontSize: '12px', color: '#ea580c', fontWeight: '700', margin: 0 }
    };

    return (
        <div style={styles.layoutContainer}>
            {/* SEGMEN KIRI: Formulir Pembuatan Lowongan Baru */}
            <div style={styles.styles?.leftSection || styles.leftSection}>
                <FormLowonganControlled 
                    onSaveJob={handlePublish} 
                    appTheme={appTheme} 
                    isMobile={isMobile} 
                />
            </div>

            {/* SEGMEN KANAN: Panel Pemantauan Pelamar Kerja Masuk */}
            <div style={styles.rightSection}>
                <h3 style={styles.panelTitle}>Pemantauan Berkas Masuk</h3>
                <p style={styles.panelSubtitle}>Kelola kelayakan berkas, jadwalkan interview, atau perbarui status akhir rekrutmen di bawah ini.</p>
                
                {/* Contoh Implementasi Kartu Pelamar Terintegrasi */}
                <div style={styles.applicantCard}>
                    <h4 style={styles.applicantName}>Muhammad Anfasa Umar</h4>
                    <p style={styles.applicantMeta}>Melamar Posisi: Fullstack Developer</p>
                    
                    {/* Mengintegrasikan Pelacakan Status Berkas Riil */}
                    <ApplicationStatusTracker 
                        applicationId="101" 
                        currentStatus="Pending" 
                        appTheme={appTheme} 
                    />
                </div>
            </div>
        </div>
    );
};

export default JobPublisher;