import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import FilterBox from './FilterBox';
import JobCard from './JobCard';

// =========================================================================
// 1. INLINE COMPONENT: ApplyJobForm (Sistem Unggah Berkas Lamaran)
// =========================================================================
const ApplyJobForm = ({ jobId, onFormSuccess, appTheme }) => {
    const [fileCv, setFileCv] = useState(null);
    const [pesan, setPesan] = useState('');
    const isDark = appTheme === 'dark';

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
            const response = await api.post('/lamaran', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message || 'Lamaran berhasil dikirim!');
            if (typeof onFormSuccess === 'function') onFormSuccess();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengirim berkas lamaran');
        }
    };

    return (
        <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#ea580c' }}>Lampirkan Berkas Lamaran</h5>
            <div>
                <input type="file" accept=".pdf" onChange={handleFileChange} required style={{ fontSize: '12px', color: '#8c7466' }} />
            </div>
            <textarea 
                placeholder="Tulis pesan tambahan atau perkenalan singkat untuk HRD..." 
                value={pesan} 
                onChange={(e) => setPesan(e.target.value)} 
                style={{
                    width: '100%', minHeight: '60px', padding: '10px', borderRadius: '8px',
                    border: isDark ? '1px solid #3d2514' : '1px solid #eaddd3', 
                    background: isDark ? '#0d0703' : '#f9fafb', 
                    color: isDark ? '#fff' : '#000', fontSize: '13px', boxSizing: 'border-box'
                }}
            />
            <button type="submit" style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', color: 'white',
                border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '13px'
            }}>
                Kirim Berkas Sekarang
            </button>
        </form>
    );
};

// =========================================================================
// 2. INLINE COMPONENT: FavoriteHandler (Sistem Manajemen Tombol Favorit)
// =========================================================================
const FavoriteHandler = ({ jobId, appTheme }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const isDark = appTheme === 'dark';

    const handleToggleFavorite = async () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            alert('Akses Ditolak! Anda harus login terlebih dahulu untuk menyimpan favorit.');
            return;
        }
        if (role !== 'Pelamar') {
            alert(`Otorisasi Gagal! Akun bertipe [${role}] tidak diizinkan menyimpan lowongan favorit.`);
            return;
        }

        // Jalankan perubahan state lokal terlebih dahulu demi UX yang responsif
        const nextState = !isFavorited;
        setIsFavorited(nextState);

        if (nextState) {
            try {
                const response = await api.post('/favorit', { id_lowongan: jobId });
                alert(response.data.message || 'Lowongan berhasil disimpan ke favorit!');
            } catch (err) {
                // Kembalikan state ke semula jika API backend mendeteksi token kedaluwarsa / error database
                setIsFavorited(false);
                alert(err.response?.data?.message || 'Gagal menyimpan lowongan ke favorit');
            }
        }
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '12px',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxSizing: 'border-box',
        marginTop: '8px',
        border: isFavorited ? '1px solid #16a34a' : (isDark ? '1px solid #3d2514' : '1px solid #eaddd3'),
        background: isFavorited ? (isDark ? '#062f17' : '#f0fdf4') : 'transparent',
        color: isFavorited ? (isDark ? '#4ade80' : '#16a34a') : (isDark ? '#9e8476' : '#6b7280')
    };

    return (
        <button type="button" onClick={handleToggleFavorite} style={buttonStyle}>
            <span style={{ fontSize: '14px' }}>{isFavorited ? '★' : '☆'}</span>
            {isFavorited ? 'Tersimpan di Favorit' : 'Tambah ke Favorit'}
        </button>
    );
};

// =========================================================================
// 3. MAIN COMPONENT: JobListContainer
// =========================================================================
const JobListContainer = ({ appTheme }) => {
    const isDark = appTheme === 'dark';

    const [jobs] = useState([
        {
            id: 1,
            title: 'Fullstack Developer',
            company: 'PasukanYerusSolo',
            location: 'Solo (Remote)',
            salary: 'Rp 8.000.000',
            type: 'Full-time',
            desc: 'Bertanggung jawab dalam membangun dan mengelola arsitektur web menggunakan React JS, Express JS, dan PHP Laravel. Mengoptimalkan performa database serta memastikan antarmuka adaptif di semua perangkat.'
        },
        {
            id: 2,
            title: 'React Frontend Engineer',
            company: 'TechEase Indonesia',
            location: 'Jakarta',
            salary: 'Rp 12.000.000',
            type: 'Remote',
            desc: 'Fokus pada pengembangan antarmuka pengguna yang interaktif, performan, dan reusable menggunakan React ecosystem. Bekerja sama dengan UI/UX designer untuk mengimplementasikan desain premium.'
        },
        {
            id: 3,
            title: 'Express JS Node Specialist',
            company: 'Nusantara Cloud',
            location: 'Surabaya',
            salary: 'Rp 10.000.000',
            type: 'Contract',
            desc: 'Merancang, membangun, dan memelihura logic sisi server menggunakan Express JS. Berpengalaman dalam pembuatan RESTful API, integrasi middleware, dan arsitektur database relasional.'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('Semua');
    const [selectedJob, setSelectedJob] = useState(jobs[0]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [showApplyForm, setShowApplyForm] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobileStatus = window.innerWidth <= 768;
            setIsMobile(mobileStatus);
            if (!mobileStatus) setIsBottomSheetOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleJobSelect = (job) => {
        setSelectedJob(job);
        setShowApplyForm(false);
        if (isMobile) {
            setIsBottomSheetOpen(true);
        }
    };

    const handleInisiasiLamaran = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            alert('Akses Ditolak! Anda harus login terlebih dahulu.');
            return;
        }
        if (role !== 'Pelamar') {
            alert(`Otorisasi Gagal! Akun bertipe [${role}] tidak diizinkan melamar lowongan kerja.`);
            return;
        }
        setShowApplyForm(true);
    };

    const filteredJobs = jobs.filter(job => {
        const query = (searchTerm || '').toLowerCase().trim();
        const matchesSearch = !query || 
                              (job.title || '').toLowerCase().includes(query) || 
                              (job.company || '').toLowerCase().includes(query);

        const currentType = selectedType || 'Semua';
        const matchesType = currentType === 'Semua' || job.type === currentType;

        return matchesSearch && matchesType;
    });

    const colors = {
        background: isDark ? '#080402' : '#fffbf7',
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#6b7280',
        accent: '#ea580c',
        sectionBg: isDark ? '#110a05' : '#fcfaf7',
        sectionBorder: isDark ? '1px solid #291a0e' : '1px solid #efe5dc'
    };

    const styles = {
        container: { display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', boxSizing: 'border-box' },
        workspace: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', alignItems: 'flex-start', width: '100%' },
        listPane: { flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' },
        detailPane: { width: '380px', position: 'sticky', top: '20px', background: colors.cardBg, border: colors.border, borderRadius: '16px', padding: '24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px' },
        detailDescBox: { background: isDark ? '#0d0703' : '#f9fafb', border: colors.border, borderRadius: '12px', padding: '14px', color: isDark ? '#ffffff' : '#374151', lineHeight: '1.6', fontSize: '13px' },
        applyBtn: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', color: 'white', fontWeight: '800', fontSize: '14px', cursor: 'pointer' },
        label: { display: 'block', fontSize: '11px', fontWeight: '800', color: colors.textMuted, textTransform: 'uppercase', marginBottom: '4px' },
        bottomSheet: { position: 'fixed', bottom: isBottomSheetOpen ? 0 : '-100%', left: 0, right: 0, background: colors.cardBg, borderTopLeftRadius: '24px', borderTopRightRadius: '24px', boxShadow: '0 -8px 30px rgba(0,0,0,0.3)', zIndex: 1000, padding: '24px', maxHeight: '80vh', overflowY: 'auto', transition: 'bottom 0.3s ease' },
        backdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: isBottomSheetOpen ? 'block' : 'none' }
    };

    return (
        <div style={styles.container}>
            <div style={{ borderBottom: colors.border, paddingBottom: '14px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: colors.textMain }}>Eksplorasi Pekerjaan</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colors.textMuted }}>Temukan karir impian Anda bersama aliansi PasukanYerusSolo</p>
            </div>

            <div style={{ width: '100%' }}>
                <FilterBox 
                    appTheme={appTheme} 
                    isMobile={false} 
                    onSearchChange={setSearchTerm} 
                    onTypeChange={setSelectedType} 
                    selectedType={selectedType} 
                />
            </div>

            <div style={styles.workspace}>
                <div style={styles.listPane}>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div key={job.id} onClick={() => handleJobSelect(job)} style={{ cursor: 'pointer', width: '100%' }}>
                                <JobCard job={job} appTheme={appTheme} isMobile={isMobile} />
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', background: colors.cardBg, border: colors.border, borderRadius: '16px', color: colors.textMuted }}>
                            Tidak ada lowongan yang cocok dengan kriteria filter Anda.
                        </div>
                    )}
                </div>

                {!isMobile && selectedJob && (
                    <div style={styles.detailPane}>
                        <div>
                            <span style={{ background: '#ffedd5', color: '#ea580c', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                                {selectedJob.type}
                            </span>
                            <h3 style={{ margin: '10px 0 4px 0', fontSize: '18px', fontWeight: '900', color: colors.textMain }}>{selectedJob.title}</h3>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: colors.accent }}>{selectedJob.company}</span>
                            <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>📍 {selectedJob.location}</div>
                        </div>

                        <div style={{ borderTop: colors.border, paddingTop: '12px' }}>
                            <label style={styles.label}>Estimasi Gaji</label>
                            <span style={{ fontSize: '16px', fontWeight: '800', color: colors.textMain }}>{selectedJob.salary}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: colors.accent, textTransform: 'uppercase' }}>Persyaratan & Deskripsi</label>
                            <div style={styles.detailDescBox}>
                                {selectedJob.desc}
                            </div>
                        </div>

                        {/* PANEL AKSI UTAMA: Kirim Lamaran & Simpan Favorit */}
                        {!showApplyForm ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                                <button style={styles.applyBtn} onClick={handleInisiasiLamaran}>
                                    Kirim Lamaran Sekarang
                                </button>
                                <FavoriteHandler jobId={selectedJob.id} appTheme={appTheme} />
                            </div>
                        ) : (
                            <div style={{ background: colors.sectionBg, padding: '16px', borderRadius: '14px', border: colors.sectionBorder }}>
                                <ApplyJobForm jobId={selectedJob.id} appTheme={appTheme} onFormSuccess={() => setShowApplyForm(false)} />
                                <button 
                                    onClick={() => setShowApplyForm(false)}
                                    style={{ width: '100%', background: 'transparent', border: 'none', color: colors.textMuted, marginTop: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                                >
                                    Batal & Kembali
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* TAMPILAN MOBILE BOTTOM SHEET */}
            <div style={styles.backdrop} onClick={() => setIsBottomSheetOpen(false)} />
            <div style={styles.bottomSheet}>
                {selectedJob && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <span style={{ background: '#ffedd5', color: '#ea580c', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '20px' }}>{selectedJob.type}</span>
                                <h3 style={{ margin: '8px 0 2px 0', fontSize: '18px', fontWeight: '900', color: colors.textMain }}>{selectedJob.title}</h3>
                                <div style={{ fontSize: '13px', color: colors.accent, fontWeight: '700' }}>{selectedJob.company}</div>
                                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '2px' }}>📍 {selectedJob.location}</div>
                            </div>
                            <button onClick={() => setIsBottomSheetOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: colors.textMuted }}>✕</button>
                        </div>

                        <div style={{ borderBottom: colors.border, paddingBottom: '8px' }}>
                            <label style={styles.label}>Estimasi Pendapatan</label>
                            <span style={{ fontSize: '18px', fontWeight: '800', color: colors.accent, display: 'block', marginTop: '2px' }}>
                                {selectedJob.salary} <span style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '500' }}>/ bulan</span>
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={styles.label}>Deskripsi & Kualifikasi</label>
                            <div style={{ ...styles.detailDescBox, padding: '16px', fontSize: '13px' }}>
                                {selectedJob.desc}
                            </div>
                        </div>

                        {!showApplyForm ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                                <button style={{ ...styles.applyBtn, marginTop: '4px' }} onClick={handleInisiasiLamaran}>
                                    Kirim Lamaran Sekarang
                                </button>
                                <FavoriteHandler jobId={selectedJob.id} appTheme={appTheme} />
                            </div>
                        ) : (
                            <div style={{ background: colors.sectionBg, padding: '12px', borderRadius: '14px', border: colors.sectionBorder }}>
                                <ApplyJobForm jobId={selectedJob.id} appTheme={appTheme} onFormSuccess={() => { setShowApplyForm(false); setIsBottomSheetOpen(false); }} />
                                <button 
                                    onClick={() => setShowApplyForm(false)}
                                    style={{ width: '100%', background: 'transparent', border: 'none', color: colors.textMuted, marginTop: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                                >
                                    Kembali
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobListContainer;