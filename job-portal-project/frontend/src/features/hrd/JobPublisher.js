import React, { useContext, useState, useEffect } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';
import FormLowonganControlled from './FormLowonganControlled';
import ApplicationStatusTracker from './ApplicationStatusTracker';
import { formatInputRupiah, parseRupiah, formatRupiah } from '../../utils/formatRupiah';
import { PencilIcon, XMarkIcon, ClockIcon, ArrowDownTrayIcon, MapPinIcon, TrashIcon, InboxIcon, ClipboardDocumentListIcon, BoltIcon, CalendarIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const kategoriOptions = [
    'Teknologi / Informasi',
    'Keuangan / Akuntansi',
    'Pemasaran / Sales',
    'Sumber Daya Manusia',
    'Administrasi',
    'Pendidikan / Pelatihan',
    'Kesehatan',
    'Manufaktur / Engineering',
    'Desain / Kreatif',
    'Hospitality / Pariwisata',
    'Hukum',
    'Logistik / Supply Chain',
    'Media / Komunikasi',
];

const EditJobModal = ({ job, onClose, onSave, isDark }) => {
    const kategoriAwal = job.kategori || '';
    const isKategoriBaku = kategoriOptions.includes(kategoriAwal);
    const [form, setForm] = useState({
        judul_posisi: job.judul_posisi || '',
        kategori: isKategoriBaku ? kategoriAwal : '',
        tipe_pekerjaan: job.tipe_pekerjaan || 'Full-time',
        gaji: job.gaji || '',
        deskripsi_pekerjaan: job.deskripsi_pekerjaan || '',
    });
    const [kategoriLain, setKategoriLain] = useState(isKategoriBaku ? '' : kategoriAwal);
    const [isKategoriLain, setIsKategoriLain] = useState(!isKategoriBaku && !!kategoriAwal);
    const [saving, setSaving] = useState(false);

    const icn = { width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px' };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
        background: isDark ? '#1c1917' : '#f5f5f4',
        color: isDark ? '#fef3c7' : '#1c1917',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form };
            if (!payload.kategori && kategoriLain.trim()) {
                payload.kategori = kategoriLain.trim();
            }
            await api.put(`/auth/hrd/jobs/${job.id_lowongan}`, payload);
            onSave();
            onClose();
        } catch (err) {
            alert('Gagal memperbarui: ' + (err.response?.data?.message || err.message));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
        }} onClick={onClose}>
            <div style={{
                background: isDark ? '#120b06' : '#ffffff',
                border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
            }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, color: isDark ? '#fef3c7' : '#1c1917', fontSize: '20px', fontWeight: '800' }}>
                        <PencilIcon style={icn} /> Edit Lowongan
                    </h3>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none', fontSize: '24px',
                        cursor: 'pointer', color: isDark ? '#a8a29e' : '#57534e',
                    }}><XMarkIcon style={{ width: '1em', height: '1em' }} /></button>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#ea580c', marginBottom: '6px', textTransform: 'uppercase' }}>Judul Posisi</label>
                        <input type="text" value={form.judul_posisi} onChange={(e) => setForm({ ...form, judul_posisi: e.target.value })} style={inputStyle} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#ea580c', marginBottom: '6px', textTransform: 'uppercase' }}>Kategori</label>
                        <select value={form.kategori || ''} onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Lainnya') {
                                setIsKategoriLain(true);
                                setForm({ ...form, kategori: '' });
                            } else {
                                setIsKategoriLain(false);
                                setForm({ ...form, kategori: val });
                                setKategoriLain('');
                            }
                        }} style={inputStyle} required={!isKategoriLain}>
                            <option value="" disabled hidden>Pilih kategori</option>
                            {kategoriOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                            <option value="Lainnya">Lainnya</option>
                        </select>
                        {isKategoriLain && (
                            <input type="text" placeholder="Tulis kategori Anda..." value={kategoriLain} onChange={(e) => setKategoriLain(e.target.value)} style={{ ...inputStyle, marginTop: '8px' }} required />
                        )}
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#ea580c', marginBottom: '6px', textTransform: 'uppercase' }}>Tipe Pekerjaan</label>
                        <select value={form.tipe_pekerjaan} onChange={(e) => setForm({ ...form, tipe_pekerjaan: e.target.value })} style={inputStyle}>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Remote">Remote</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#ea580c', marginBottom: '6px', textTransform: 'uppercase' }}>Estimasi Gaji</label>
                        <input type="text" value={formatInputRupiah(form.gaji)} onChange={(e) => setForm({ ...form, gaji: parseRupiah(e.target.value) })} style={inputStyle} placeholder="Rp 12.000.000" />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#ea580c', marginBottom: '6px', textTransform: 'uppercase' }}>Deskripsi</label>
                        <textarea value={form.deskripsi_pekerjaan} onChange={(e) => setForm({ ...form, deskripsi_pekerjaan: e.target.value })} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} required />
                    </div>
                    <button type="submit" disabled={saving} style={{
                        padding: '14px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                        color: '#fff',
                        fontWeight: '800',
                        fontSize: '14px',
                        cursor: 'pointer',
                        opacity: saving ? 0.7 : 1,
                        marginTop: '8px',
                    }}>
                        {saving ? <><ClockIcon style={icn} /> Menyimpan...</> : <><ArrowDownTrayIcon style={icn} /> Simpan Perubahan</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

const JobPublisher = ({ isMobile }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [applications, setApplications] = useState([]);
    const [myJobs, setMyJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editJob, setEditJob] = useState(null);

    const icn = { width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px' };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a8a29e' : '#57534e',
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [appRes, jobsRes] = await Promise.all([
                api.get('/auth/hrd/applications'),
                api.get('/auth/hrd/jobs'),
            ]);
            setApplications(appRes.data?.length ? appRes.data : []);
            setMyJobs(jobsRes.data?.data || []);
        } catch (err) {
            console.error('Gagal memuat data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handlePublish = async (jobData) => {
        try {
            const response = await api.post('/auth/hrd/jobs', jobData);
            if (response.data.status === 'success') {
                fetchData();
            }
        } catch (err) {
            alert('Gagal: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (jobId) => {
        if (!window.confirm('Yakin ingin menghapus lowongan ini? Semua data lamaran terkait akan ikut terhapus.')) return;
        try {
            await api.delete(`/auth/hrd/jobs/${jobId}`);
            fetchData();
        } catch (err) {
            alert('Gagal menghapus: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: colors.textMuted }}>
                <div style={{
                    width: '40px', height: '40px',
                    border: `3px solid ${colors.border}`,
                    borderTop: '3px solid #ea580c',
                    borderRadius: '50%',
                    margin: '0 auto 16px auto',
                    animation: 'spin 1s linear infinite'
                }} />
                <p><ClockIcon style={icn} /> Memuat dashboard...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <>
            {editJob && (
                <EditJobModal
                    job={editJob}
                    isDark={isDark}
                    onClose={() => setEditJob(null)}
                    onSave={fetchData}
                />
            )}

            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '20px',
                width: '100%',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '20px',
                alignItems: 'flex-start',
            }}>
                {/* Left Column: Create Job */}
                <div style={{ flex: isMobile ? '1' : '1.2', width: '100%' }}>
                    <FormLowonganControlled onSaveJob={handlePublish} isMobile={isMobile} />
                </div>

                {/* Middle Column: My Jobs List */}
                <div style={{
                    flex: '1',
                    width: '100%',
                    background: colors.cardBg,
                    border: colors.border,
                    borderRadius: '24px',
                    padding: '24px',
                    boxSizing: 'border-box',
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' }}>
                        <MapPinIcon style={icn} /> Daftar Lowongan Saya
                    </h3>
                    <p style={{ color: colors.textMuted, fontSize: '13px', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                        Kelola lowongan yang telah Anda publikasikan.
                    </p>

                    {myJobs.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {myJobs.map((job) => (
                                <div key={job.id_lowongan} style={{
                                    padding: '16px',
                                    borderRadius: '16px',
                                    border: colors.border,
                                    background: isDark ? '#080402' : '#ffffff',
                                    transition: 'all 0.3s ease',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{ fontSize: '15px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' }}>
                                                {job.judul_posisi}
                                            </h4>
                                            <p style={{ fontSize: '12px', color: '#ea580c', fontWeight: '600', margin: '0 0 6px 0' }}>
                                                {job.kategori} • {job.tipe_pekerjaan}
                                                {job.gaji ? ` • ${formatRupiah(job.gaji)}` : ''}
                                            </p>
                                            {job.lokasi && (
                                                <p style={{ fontSize: '11px', color: colors.textMuted, margin: '0' }}>
                                                    <MapPinIcon style={icn} /> {job.lokasi}
                                                </p>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                            <button
                                                onClick={() => setEditJob(job)}
                                                style={{
                                                    padding: '8px 14px',
                                                    borderRadius: '10px',
                                                    border: `1px solid #ea580c`,
                                                    background: 'transparent',
                                                    color: '#ea580c',
                                                    fontSize: '12px',
                                                    fontWeight: '700',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#ea580c';
                                                    e.currentTarget.style.color = '#fff';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = '#ea580c';
                                                }}
                                            >
                                                <PencilIcon style={{width: '1em', height: '1em'}} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job.id_lowongan)}
                                                style={{
                                                    padding: '8px 14px',
                                                    borderRadius: '10px',
                                                    border: `1px solid #ef4444`,
                                                    background: 'transparent',
                                                    color: '#ef4444',
                                                    fontSize: '12px',
                                                    fontWeight: '700',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#ef4444';
                                                    e.currentTarget.style.color = '#fff';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = '#ef4444';
                                                }}
                                            >
                                                <TrashIcon style={{width: '1em', height: '1em'}} /> Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>
                            <InboxIcon style={{ width: '48px', height: '48px', display: 'block', margin: '0 auto 16px auto' }} />
                            <p>Belum ada lowongan dipublikasikan</p>
                        </div>
                    )}
                </div>

                {/* Right Column: Applications */}
                <div style={{
                    flex: '1',
                    width: '100%',
                    background: colors.cardBg,
                    border: colors.border,
                    borderRadius: '24px',
                    padding: '24px',
                    boxSizing: 'border-box',
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' }}>
                        <ClipboardDocumentListIcon style={icn} /> Pemantauan Berkas Masuk
                    </h3>
                    <p style={{ color: colors.textMuted, fontSize: '13px', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                        Kelola kelayakan berkas, jadwalkan interview, atau perbarui status akhir rekrutmen.
                    </p>

                    {applications.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {applications.map((applicant, index) => (
                                <div key={applicant.id_lamaran || index} style={{
                                    padding: '16px',
                                    borderRadius: '16px',
                                    border: colors.border,
                                    background: isDark ? '#080402' : '#ffffff',
                                    animation: `fadeInUp 0.3s ease ${index * 0.1}s both`
                                }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: colors.textMain, margin: '0 0 4px 0' }}>
                                        {applicant.nama_pelamar || 'Pelamar'}
                                    </h4>
                                    <p style={{ fontSize: '12px', color: '#ea580c', fontWeight: '700', margin: '0 0 8px 0' }}>
                                        <BoltIcon style={icn} /> {applicant.judul_posisi} • <CalendarIcon style={icn} /> {new Date(applicant.tanggal_melamar).toLocaleDateString('id-ID')}
                                    </p>
                                    <p style={{ fontSize: '11px', color: colors.textMuted, margin: '0 0 8px 0' }}>
                                        <EnvelopeIcon style={icn} /> {applicant.email_pelamar} • <PhoneIcon style={icn} /> {applicant.telepon || '-'}
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
                            <InboxIcon style={{ width: '48px', height: '48px', display: 'block', margin: '0 auto 16px auto' }} />
                            <p>Belum ada lamaran masuk</p>
                        </div>
                    )}
                </div>

                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </>
    );
};

export default JobPublisher;
