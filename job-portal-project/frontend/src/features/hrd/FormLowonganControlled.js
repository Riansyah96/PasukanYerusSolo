import React, { useState } from 'react';

const FormLowonganControlled = ({ onSaveJob, appTheme, isMobile }) => {
    const [jobData, setJobData] = useState({
        judul_posisi: '', 
        kategori: '', 
        tipe_pekerjaan: 'Full-time', 
        gaji: '', 
        lokasi: '', 
        deskripsi_pekerjaan: ''
    });

    const isDark = appTheme === 'dark';

    // Palet Warna Selaras dengan Workspace Global PasukanYerusSolo
    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #291a0e' : '1px solid #ebdcd0',
        inputBg: isDark ? '#080402' : '#fdfdfd',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e',
        accent: '#ea580c'
    };

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveJob(jobData);
        // Reset form setelah submit sukses
        setJobData({ judul_posisi: '', kategori: '', tipe_pekerjaan: 'Full-time', gaji: '', lokasi: '', deskripsi_pekerjaan: '' });
    };

    const styles = {
        formCard: {
            background: colors.cardBg,
            border: colors.border,
            borderRadius: '24px',
            padding: isMobile ? '20px' : '32px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        title: { fontSize: isMobile ? '20px' : '24px', fontWeight: '800', color: '#ea580c', margin: '0 0 6px 0' },
        subtitle: { color: colors.textMuted, fontSize: '13px', margin: '0 0 28px 0', lineHeight: '1.5' },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
        },
        formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
        fullWidth: { gridColumn: isMobile ? 'span 1' : 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' },
        label: { fontSize: '12px', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.5px' },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: colors.border,
            backgroundColor: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            outline: 'none',
            fontWeight: '500',
            boxSizing: 'border-box'
        },
        textarea: {
            width: '100%',
            padding: '14px 16px',
            borderRadius: '12px',
            border: colors.border,
            backgroundColor: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            outline: 'none',
            fontWeight: '500',
            minHeight: '120px',
            resize: 'vertical',
            boxSizing: 'border-box',
            lineHeight: '1.5'
        },
        submitBtn: {
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(234, 88, 12, 0.15)',
            transition: 'opacity 0.2s'
        }
    };

    return (
        <div style={styles.formCard}>
            <h2 style={styles.title}>Publikasikan Lowongan</h2>
            <p style={styles.subtitle}>Buat dan terbitkan berkas kualifikasi pekerjaan baru ke dalam sistem portal pencarian kerja.</p>
            
            <form onSubmit={handleSubmit}>
                <div style={styles.gridContainer}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Judul Posisi</label>
                        <input type="text" name="judul_posisi" placeholder="Contoh: Senior Fullstack Engineer" value={jobData.judul_posisi} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Kategori</label>
                        <input type="text" name="kategori" placeholder="Contoh: Teknologi / Informasi" value={jobData.kategori} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tipe Pekerjaan</label>
                        <select name="tipe_pekerjaan" value={jobData.tipe_pekerjaan} onChange={handleChange} style={styles.input}>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Remote">Remote</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Estimasi Gaji (Rp)</label>
                        <input type="number" name="gaji" placeholder="Contoh: 12000000" value={jobData.gaji} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.fullWidth}>
                        <label style={styles.label}>Lokasi Penempatan</label>
                        <input type="text" name="lokasi" placeholder="Contoh: Surakarta, Jawa Tengah (Hybrid)" value={jobData.lokasi} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.fullWidth}>
                        <label style={styles.label}>Deskripsi & Spesifikasi Pekerjaan</label>
                        <textarea name="deskripsi_pekerjaan" placeholder="Tuliskan deskripsi tugas pokok, kualifikasi wajib, serta benefit yang didapatkan..." value={jobData.deskripsi_pekerjaan} onChange={handleChange} required style={styles.textarea} />
                    </div>
                </div>
                <button type="submit" style={styles.submitBtn}>Simpan & Publikasikan Lowongan</button>
            </form>
        </div>
    );
};

export default FormLowonganControlled;