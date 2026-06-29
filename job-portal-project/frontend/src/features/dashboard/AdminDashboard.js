// src/features/dashboard/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';
import AdminStatsView from './AdminStatsView';
import { formatRupiah, formatInputRupiah, parseRupiah } from '../../utils/formatRupiah';
import { ChartBarIcon, UsersIcon, BriefcaseIcon, ClipboardDocumentListIcon, ChevronUpIcon, ChevronDownIcon, ArrowsUpDownIcon, ClockIcon, Cog6ToothIcon, ArrowPathIcon, PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon, ChatBubbleLeftRightIcon, StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

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

const AdminDashboard = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('stats');
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', message: '', type: 'success' });
    const [editingUser, setEditingUser] = useState(null);
    const [editingJob, setEditingJob] = useState(null);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showEditJobModal, setShowEditJobModal] = useState(false);
    const [showEditTestimonialModal, setShowEditTestimonialModal] = useState(false);
    const [kategoriLain, setKategoriLain] = useState('');
    const [isKategoriLain, setIsKategoriLain] = useState(false);

    const [userSearch, setUserSearch] = useState('');
    const [userRoleFilter, setUserRoleFilter] = useState('All');
    const [userSort, setUserSort] = useState({ by: 'id_user', dir: 'asc' });

    const [jobSearch, setJobSearch] = useState('');
    const [jobKategoriFilter, setJobKategoriFilter] = useState('All');
    const [jobSort, setJobSort] = useState({ by: 'id_lowongan', dir: 'asc' });

    const [appSearch, setAppSearch] = useState('');
    const [appStatusFilter, setAppStatusFilter] = useState('All');
    const [appSort, setAppSort] = useState({ by: 'id_lamaran', dir: 'asc' });

    const [testSearch, setTestSearch] = useState('');
    const [testActiveFilter, setTestActiveFilter] = useState('All');
    const [testSort, setTestSort] = useState({ by: 'id_testimoni', dir: 'asc' });
    const [page, setPage] = useState({ users: 1, jobs: 1, applications: 1, testimonials: 1 });
    const perPage = 10;

    const icn = { width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px' };

    const showNotification = (title, message, type = 'success') => {
        setModalMessage({ title, message, type });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
    };

    const fetchData = async () => {
        if (activeTab === 'stats') return;
        setLoading(true);
        try {
            if (activeTab === 'users') {
                const res = await api.get('/admin/users');
                setUsers(res.data);
            } else if (activeTab === 'jobs') {
                const res = await api.get('/admin/jobs');
                setJobs(res.data);
            } else if (activeTab === 'applications') {
                const res = await api.get('/admin/applications');
                setApplications(res.data);
            } else if (activeTab === 'testimonials') {
                const res = await api.get('/admin/testimonials');
                setTestimonials(res.data);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            showNotification('Gagal', 'Gagal memuat data', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab !== 'stats') fetchData();
    }, [activeTab, fetchData]);

    useEffect(() => {
        if (activeTab !== 'stats') setPage(p => ({ ...p, [activeTab]: 1 }));
    }, [activeTab]);

    useEffect(() => { setPage(p => ({ ...p, users: 1 })); }, [userSearch, userRoleFilter]);
    useEffect(() => { setPage(p => ({ ...p, jobs: 1 })); }, [jobSearch, jobKategoriFilter]);
    useEffect(() => { setPage(p => ({ ...p, applications: 1 })); }, [appSearch, appStatusFilter]);
    useEffect(() => { setPage(p => ({ ...p, testimonials: 1 })); }, [testSearch, testActiveFilter]);

    // User Management Functions
    const handleDeleteUser = async (userId, userName) => {
        if (window.confirm(`Hapus user "${userName}"?`)) {
            try {
                await api.delete(`/admin/users/${userId}`);
                showNotification('Berhasil', 'User berhasil dihapus', 'success');
                fetchData();
            } catch (err) {
                showNotification('Gagal', 'Gagal menghapus user', 'error');
            }
        }
    };

    const handleUpdateUser = async (userData) => {
        try {
            await api.put(`/admin/users/${userData.id_user}`, userData);
            showNotification('Berhasil', 'User berhasil diperbarui', 'success');
            setShowEditUserModal(false);
            setEditingUser(null);
            fetchData();
        } catch (err) {
            showNotification('Gagal', 'Gagal memperbarui user', 'error');
        }
    };

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            const user = users.find(u => u.id_user === userId);
            await api.put(`/admin/users/${userId}`, {
                ...user,
                role: newRole
            });
            showNotification('Berhasil', 'Role user berhasil diperbarui', 'success');
            fetchData();
        } catch (err) {
            showNotification('Gagal', 'Gagal memperbarui role', 'error');
        }
    };

    // Job Management Functions
    const handleDeleteJob = async (jobId, jobTitle) => {
        if (window.confirm(`Hapus lowongan "${jobTitle}"?`)) {
            try {
                await api.delete(`/admin/jobs/${jobId}`);
                showNotification('Berhasil', 'Lowongan berhasil dihapus', 'success');
                fetchData();
            } catch (err) {
                showNotification('Gagal', 'Gagal menghapus lowongan', 'error');
            }
        }
    };

    const handleUpdateJob = async (jobData) => {
        try {
            const payload = {
                judul_posisi: jobData.judul_posisi,
                kategori: isKategoriLain ? kategoriLain.trim() : jobData.kategori,
                gaji: jobData.gaji
            };
            await api.put(`/admin/jobs/${jobData.id_lowongan}`, payload);
            showNotification('Berhasil', 'Lowongan berhasil diperbarui', 'success');
            setShowEditJobModal(false);
            setEditingJob(null);
            setKategoriLain('');
            setIsKategoriLain(false);
            fetchData();
        } catch (err) {
            showNotification('Gagal', 'Gagal memperbarui lowongan', 'error');
        }
    };

    // Testimonial Management Functions
    const handleDeleteTestimonial = async (id, nama) => {
        if (window.confirm(`Hapus testimonial dari "${nama}"?`)) {
            try {
                await api.delete(`/admin/testimonials/${id}`);
                showNotification('Berhasil', 'Testimonial berhasil dihapus', 'success');
                fetchData();
            } catch (err) {
                showNotification('Gagal', 'Gagal menghapus testimonial', 'error');
            }
        }
    };

    const handleUpdateTestimonial = async (data) => {
        try {
            await api.put(`/admin/testimonials/${data.id_testimoni}`, {
                nama: data.nama,
                role: data.role,
                perusahaan: data.perusahaan,
                teks: data.teks,
                rating: data.rating,
                is_active: data.is_active
            });
            showNotification('Berhasil', 'Testimonial berhasil diperbarui', 'success');
            setShowEditTestimonialModal(false);
            setEditingTestimonial(null);
            fetchData();
        } catch (err) {
            showNotification('Gagal', 'Gagal memperbarui testimonial', 'error');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'Menunggu': { bg: '#f59e0b', text: '#fff', icon: <ClockIcon style={icn} />, label: 'Menunggu' },
            'Review': { bg: '#3b82f6', text: '#fff', icon: <ClipboardDocumentListIcon style={icn} />, label: 'Review' },
            'Interview': { bg: '#8b5cf6', text: '#fff', icon: <ChatBubbleLeftRightIcon style={icn} />, label: 'Interview' },
            'Lolos': { bg: '#22c55e', text: '#fff', icon: <CheckCircleIcon style={icn} />, label: 'Lolos' },
            'Gagal': { bg: '#ef4444', text: '#fff', icon: <XCircleIcon style={icn} />, label: 'Gagal' }
        };
        return statusMap[status] || { bg: '#6b7280', text: '#fff', icon: <ClipboardDocumentListIcon style={icn} />, label: 'Pending' };
    };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '#262626' : '#e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        accent: '#ea580c'
    };

    const tabs = [
        { id: 'stats', label: <><ChartBarIcon style={icn} /> Statistik</>, shortLabel: <ChartBarIcon style={{width: '1em', height: '1em'}} /> },
        { id: 'users', label: <><UsersIcon style={icn} /> Pengguna</>, shortLabel: <UsersIcon style={{width: '1em', height: '1em'}} /> },
        { id: 'jobs', label: <><BriefcaseIcon style={icn} /> Lowongan</>, shortLabel: <BriefcaseIcon style={{width: '1em', height: '1em'}} /> },
        { id: 'applications', label: <><ClipboardDocumentListIcon style={icn} /> Lamaran</>, shortLabel: <ClipboardDocumentListIcon style={{width: '1em', height: '1em'}} /> },
        { id: 'testimonials', label: <><StarIcon style={icn} /> Testimonial</>, shortLabel: <StarIcon style={{width: '1em', height: '1em'}} /> }
    ];

    const styles = {
        container: { padding: '16px', maxWidth: '1400px', margin: '0 auto' },
        title: { fontSize: '24px', fontWeight: '800', color: colors.textMain, marginBottom: '6px' },
        subtitle: { color: colors.textMuted, fontSize: '13px', marginBottom: '24px' },
        tabContainer: {
            display: 'flex', gap: '6px', marginBottom: '24px',
            borderBottom: `1px solid ${colors.border}`, paddingBottom: '10px',
            overflowX: 'auto', whiteSpace: 'nowrap',
            WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'
        },
        tabButton: (isActive) => ({
            padding: '8px 16px',
            borderRadius: '24px',
            border: 'none',
            background: isActive ? colors.accent : 'transparent',
            color: isActive ? '#fff' : colors.textMuted,
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '13px',
            flexShrink: 0
        }),
        card: { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '16px' },
        table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px', fontSize: '13px' },
        th: { padding: '10px 8px', textAlign: 'left', color: colors.accent, borderBottom: `1px solid ${colors.border}`, fontWeight: '700', fontSize: '12px', whiteSpace: 'nowrap' },
        td: { padding: '10px 8px', color: colors.textMain, borderBottom: `1px solid ${colors.border}` },
        deleteBtn: { background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px', padding: '4px 6px', borderRadius: '6px', transition: 'all 0.2s ease' },
        editBtn: { background: 'transparent', border: 'none', color: colors.accent, cursor: 'pointer', fontSize: '16px', padding: '4px 6px', borderRadius: '6px', transition: 'all 0.2s ease', marginRight: '4px' },
        roleSelect: { padding: '4px 8px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.cardBg, color: colors.textMain, cursor: 'pointer', fontSize: '12px', maxWidth: '100px' },
        loadingBox: { textAlign: 'center', padding: '60px', color: colors.textMuted },
        modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '16px' },
        modalContent: { background: colors.cardBg, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px', border: `1px solid ${colors.border}`, maxHeight: '90vh', overflowY: 'auto' },
        modalInput: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.cardBg, color: colors.textMain, marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box' },
        modalButton: { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s ease', fontSize: '13px' },
        filterBar: {
            display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap',
            alignItems: 'center'
        },
        filterInput: {
            padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colors.border}`,
            background: colors.cardBg, color: colors.textMain, fontSize: '13px',
            outline: 'none', flex: 1, minWidth: '140px'
        },
        filterSelect: {
            padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colors.border}`,
            background: colors.cardBg, color: colors.textMain, fontSize: '13px',
            outline: 'none', cursor: 'pointer'
        },
        sortBtn: (active) => ({
            padding: '6px 10px', borderRadius: '6px', border: `1px solid ${active ? colors.accent : colors.border}`,
            background: active ? `${colors.accent}15` : 'transparent',
            color: active ? colors.accent : colors.textMuted, fontSize: '12px',
            cursor: 'pointer', fontWeight: active ? '700' : '500',
            transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '4px'
        })
    };

    const getFilteredUsers = () => {
        let data = [...users];
        if (userSearch) {
            const q = userSearch.toLowerCase();
            data = data.filter(u => u.nama?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));
        }
        if (userRoleFilter !== 'All') data = data.filter(u => u.role === userRoleFilter);
        data.sort((a, b) => {
            const val = userSort.by === 'nama' ? (a.nama || '').localeCompare(b.nama || '') :
                       userSort.by === 'id_user' ? (a.id_user || 0) - (b.id_user || 0) :
                       new Date(a.created_at || 0) - new Date(b.created_at || 0);
            return userSort.dir === 'asc' ? val : -val;
        });
        return data;
    };

    const getFilteredJobs = () => {
        let data = [...jobs];
        if (jobSearch) {
            const q = jobSearch.toLowerCase();
            data = data.filter(j => j.judul_posisi?.toLowerCase().includes(q) || j.nama_perusahaan?.toLowerCase().includes(q));
        }
        if (jobKategoriFilter !== 'All') data = data.filter(j => j.kategori === jobKategoriFilter);
        data.sort((a, b) => {
            const val = jobSort.by === 'judul_posisi' ? (a.judul_posisi || '').localeCompare(b.judul_posisi || '') :
                       jobSort.by === 'gaji' ? (a.gaji || 0) - (b.gaji || 0) :
                       new Date(a.created_at || 0) - new Date(b.created_at || 0);
            return jobSort.dir === 'asc' ? val : -val;
        });
        return data;
    };

    const getFilteredApps = () => {
        let data = [...applications];
        if (appSearch) {
            const q = appSearch.toLowerCase();
            data = data.filter(a => a.nama_pelamar?.toLowerCase().includes(q) || a.judul_posisi?.toLowerCase().includes(q));
        }
        if (appStatusFilter !== 'All') data = data.filter(a => a.status === appStatusFilter);
        data.sort((a, b) => {
            const val = appSort.by === 'status' ? (a.status || '').localeCompare(b.status || '') :
                       new Date(a.tanggal_melamar || 0) - new Date(b.tanggal_melamar || 0);
            return appSort.dir === 'asc' ? val : -val;
        });
        return data;
    };

    const getFilteredTestimonials = () => {
        let data = [...testimonials];
        if (testSearch) {
            const q = testSearch.toLowerCase();
            data = data.filter(t => t.nama?.toLowerCase().includes(q));
        }
        if (testActiveFilter !== 'All') data = data.filter(t => t.is_active === (testActiveFilter === 'Active' ? 1 : 0));
        data.sort((a, b) => {
            const val = testSort.by === 'rating' ? (a.rating || 0) - (b.rating || 0) :
                       new Date(a.created_at || 0) - new Date(b.created_at || 0);
            return testSort.dir === 'asc' ? val : -val;
        });
        return data;
    };

    const SortHeader = ({ label, sortBy, currentSort, onSort }) => (
        <span onClick={() => onSort(sortBy)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', userSelect: 'none' }}>
            {label}
            <span style={{ fontSize: '10px', color: currentSort.by === sortBy ? colors.accent : colors.textMuted }}>
                {currentSort.by === sortBy ? (currentSort.dir === 'asc' ? <ChevronUpIcon style={{width: '1em', height: '1em'}} /> : <ChevronDownIcon style={{width: '1em', height: '1em'}} />) : <ArrowsUpDownIcon style={{width: '1em', height: '1em'}} />}
            </span>
        </span>
    );

    const MobileCard = ({ children, style }) => (
        <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '10px',
            ...style
        }}>
            {children}
        </div>
    );

    const MobileRow = ({ label, value }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${isDark ? '#1c1917' : '#f0f0f0'}`, gap: '8px' }}>
            <span style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '500', flexShrink: 0 }}>{label}</span>
            <span style={{ color: colors.textMain, fontSize: '13px', fontWeight: '600', textAlign: 'right', wordBreak: 'break-word' }}>{value}</span>
        </div>
    );

    if (loading && users.length === 0 && jobs.length === 0 && applications.length === 0 && testimonials.length === 0) {
        return (
            <div style={styles.loadingBox}>
                <div style={{ width: '40px', height: '40px', border: `3px solid ${colors.border}`, borderTop: `3px solid ${colors.accent}`, borderRadius: '50%', margin: '0 auto 16px auto', animation: 'spin 1s linear infinite' }} />
                <p><ClockIcon style={icn} /> Memuat dashboard admin...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={modalMessage.title} message={modalMessage.message} type={modalMessage.type} />

            {/* Edit User Modal */}
            {showEditUserModal && editingUser && (
                <div style={styles.modalOverlay} onClick={() => setShowEditUserModal(false)}>
                    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h3 style={{ color: colors.accent, marginBottom: '20px' }}>Edit Pengguna</h3>
                        <input type="text" value={editingUser.nama || ''} onChange={e => setEditingUser({ ...editingUser, nama: e.target.value })} placeholder="Nama" style={styles.modalInput} />
                        <input type="email" value={editingUser.email || ''} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} placeholder="Email" style={styles.modalInput} />
                        <input type="text" value={editingUser.telepon || ''} onChange={e => setEditingUser({ ...editingUser, telepon: e.target.value })} placeholder="Telepon" style={styles.modalInput} />
                        <textarea value={editingUser.keahlian || ''} onChange={e => setEditingUser({ ...editingUser, keahlian: e.target.value })} placeholder="Keahlian" style={{ ...styles.modalInput, minHeight: '80px' }} />
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button onClick={() => setShowEditUserModal(false)} style={{ ...styles.modalButton, background: 'transparent', border: `1px solid ${colors.border}`, color: colors.textMuted }}>Batal</button>
                            <button onClick={() => handleUpdateUser(editingUser)} style={{ ...styles.modalButton, background: colors.accent, color: '#fff' }}>Simpan</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Job Modal */}
            {showEditJobModal && editingJob && (
                <div style={styles.modalOverlay} onClick={() => setShowEditJobModal(false)}>
                    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h3 style={{ color: colors.accent, marginBottom: '20px' }}>Edit Lowongan</h3>
                        <input type="text" value={editingJob.judul_posisi || ''} onChange={e => setEditingJob({ ...editingJob, judul_posisi: e.target.value })} placeholder="Judul Posisi" style={styles.modalInput} />
                        <select value={editingJob.kategori || ''} onChange={e => {
                            const val = e.target.value;
                            if (val === 'Lainnya') {
                                setIsKategoriLain(true);
                                setEditingJob({ ...editingJob, kategori: '' });
                            } else {
                                setIsKategoriLain(false);
                                setEditingJob({ ...editingJob, kategori: val });
                                setKategoriLain('');
                            }
                        }} style={styles.modalInput} required={!isKategoriLain}>
                            <option value="" disabled hidden>Pilih kategori</option>
                            {kategoriOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                            <option value="Lainnya">Lainnya</option>
                        </select>
                        {isKategoriLain && (
                            <input type="text" placeholder="Tulis kategori Anda..." value={kategoriLain} onChange={(e) => setKategoriLain(e.target.value)} style={{ ...styles.modalInput, marginTop: '8px' }} required />
                        )}
                        <input type="text" value={formatInputRupiah(editingJob.gaji)} onChange={e => setEditingJob({ ...editingJob, gaji: parseRupiah(e.target.value) })} placeholder="Estimasi Gaji" style={styles.modalInput} />
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button onClick={() => setShowEditJobModal(false)} style={{ ...styles.modalButton, background: 'transparent', border: `1px solid ${colors.border}`, color: colors.textMuted }}>Batal</button>
                            <button onClick={() => handleUpdateJob(editingJob)} style={{ ...styles.modalButton, background: colors.accent, color: '#fff' }}>Simpan</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Testimonial Modal */}
            {showEditTestimonialModal && editingTestimonial && (
                <div style={styles.modalOverlay} onClick={() => setShowEditTestimonialModal(false)}>
                    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h3 style={{ color: colors.accent, marginBottom: '20px' }}>Edit Testimonial</h3>
                        <input type="text" value={editingTestimonial.nama || ''} onChange={e => setEditingTestimonial({ ...editingTestimonial, nama: e.target.value })} placeholder="Nama" style={styles.modalInput} />
                        <input type="text" value={editingTestimonial.role || ''} onChange={e => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} placeholder="Posisi" style={styles.modalInput} />
                        <input type="text" value={editingTestimonial.perusahaan || ''} onChange={e => setEditingTestimonial({ ...editingTestimonial, perusahaan: e.target.value })} placeholder="Perusahaan" style={styles.modalInput} />
                        <textarea value={editingTestimonial.teks || ''} onChange={e => setEditingTestimonial({ ...editingTestimonial, teks: e.target.value })} placeholder="Teks testimonial" style={{ ...styles.modalInput, minHeight: '100px' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <label style={{ color: colors.textMuted, fontSize: '13px', fontWeight: '600' }}>Rating:</label>
                            {[1,2,3,4,5].map(r => (
                                <span key={r} onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: r })}
                                    style={{ cursor: 'pointer', display: 'inline-flex' }}>
                                    <StarIcon style={{ width: '22px', height: '22px', color: r <= (editingTestimonial.rating || 5) ? '#f59e0b' : (isDark ? '#262626' : '#d4d4d4') }} />
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <label style={{ color: colors.textMuted, fontSize: '13px', fontWeight: '600' }}>Tampilkan:</label>
                            <button onClick={() => setEditingTestimonial({ ...editingTestimonial, is_active: editingTestimonial.is_active ? 0 : 1 })}
                                style={{
                                    padding: '6px 16px', borderRadius: '20px', border: 'none',
                                    background: editingTestimonial.is_active ? '#10b981' : '#ef4444',
                                    color: '#fff', fontWeight: '600', fontSize: '12px', cursor: 'pointer',
                                    display: 'inline-flex', alignItems: 'center', gap: '4px'
                                }}>
                                {editingTestimonial.is_active ? <><CheckCircleIcon style={{width: '1em', height: '1em'}} /> Aktif</> : <><XCircleIcon style={{width: '1em', height: '1em'}} /> Nonaktif</>}
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button onClick={() => setShowEditTestimonialModal(false)} style={{ ...styles.modalButton, background: 'transparent', border: `1px solid ${colors.border}`, color: colors.textMuted }}>Batal</button>
                            <button onClick={() => handleUpdateTestimonial(editingTestimonial)} style={{ ...styles.modalButton, background: colors.accent, color: '#fff' }}>Simpan</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={styles.container}>
                <h1 style={styles.title}><Cog6ToothIcon style={icn} /> Panel Administrator</h1>
                <p style={styles.subtitle}>Kelola seluruh data pengguna, lowongan, dan lamaran dari satu dashboard</p>

                <div style={styles.tabContainer}>
                    {tabs.map(tab => (
                        <button key={tab.id} style={styles.tabButton(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
                            <span className="tab-label-full">{tab.label}</span>
                            <span className="tab-label-short">{tab.shortLabel}</span>
                        </button>
                    ))}
                    <button onClick={() => fetchData()} style={{ ...styles.tabButton(false), background: isDark ? '#1c1917' : '#f5f5f4', marginLeft: 'auto' }}>
                        <span className="tab-label-full"><ArrowPathIcon style={icn} /> Refresh</span>
                        <span className="tab-label-short"><ArrowPathIcon style={{width: '1em', height: '1em'}} /></span>
                    </button>
                </div>

                {/* STATISTICS TAB */}
                {activeTab === 'stats' && <AdminStatsView />}

                {/* USERS TAB */}
                {activeTab === 'users' && (
                    <div style={styles.card} className="admin-card">
                        <div style={styles.filterBar}>
                            <input type="text" placeholder="Cari nama/email..." value={userSearch} onChange={e => setUserSearch(e.target.value)} style={styles.filterInput} />
                            <select value={userRoleFilter} onChange={e => setUserRoleFilter(e.target.value)} style={styles.filterSelect}>
                                <option value="All">Semua Role</option>
                                <option value="Pelamar">Pelamar</option>
                                <option value="Perusahaan">Perusahaan</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <button onClick={() => setUserSort({ ...userSort, dir: userSort.dir === 'asc' ? 'desc' : 'asc' })} style={styles.sortBtn(true)}>
                                {userSort.dir === 'asc' ? <ChevronUpIcon style={{width: '1em', height: '1em'}} /> : <ChevronDownIcon style={{width: '1em', height: '1em'}} />} {userSort.by === 'nama' ? 'Nama' : userSort.by === 'id_user' ? 'ID' : 'Tanggal'}
                            </button>
                        </div>
                        <div style={styles.table} className="admin-table-wrapper">
                            <table style={{ width: '100%' }} className="desktop-table">
                                <thead>
                                    <tr>
                                        <th style={styles.th}><SortHeader label="ID" sortBy="id_user" currentSort={userSort} onSort={(b) => setUserSort({ by: b, dir: userSort.by === b && userSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}><SortHeader label="Nama" sortBy="nama" currentSort={userSort} onSort={(b) => setUserSort({ by: b, dir: userSort.by === b && userSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Email</th>
                                        <th style={styles.th}>Role</th>
                                        <th style={styles.th}>Telepon</th>
                                        <th style={styles.th}><SortHeader label="Bergabung" sortBy="created_at" currentSort={userSort} onSort={(b) => setUserSort({ by: b, dir: userSort.by === b && userSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredUsers().slice((page.users - 1) * perPage, page.users * perPage).map(user => (
                                        <tr key={user.id_user}>
                                            <td style={styles.td}>{user.id_user}</td>
                                            <td style={styles.td}>{user.nama}</td>
                                            <td style={styles.td}>{user.email}</td>
                                            <td style={styles.td}>
                                                <select value={user.role} onChange={(e) => handleUpdateUserRole(user.id_user, e.target.value)} style={styles.roleSelect}>
                                                    <option value="Pelamar">Pelamar</option>
                                                    <option value="Perusahaan">Perusahaan</option>
                                                    <option value="Admin">Admin</option>
                                                </select>
                                            </td>
                                            <td style={styles.td}>{user.telepon || '-'}</td>
                                            <td style={styles.td}>{formatDate(user.created_at)}</td>
                                            <td style={styles.td}>
                                                <button onClick={() => { setEditingUser(user); setShowEditUserModal(true); }} style={styles.editBtn} title="Edit"><PencilIcon style={{width: '1em', height: '1em'}} /></button>
                                                <button onClick={() => handleDeleteUser(user.id_user, user.nama)} style={styles.deleteBtn} title="Hapus"><TrashIcon style={{width: '1em', height: '1em'}} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                            <div className="mobile-cards">
                                {getFilteredUsers().slice((page.users - 1) * perPage, page.users * perPage).map(user => (
                                <MobileCard key={user.id_user}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '700', fontSize: '15px', color: colors.textMain }}>{user.nama}</span>
                                        <select value={user.role} onChange={(e) => handleUpdateUserRole(user.id_user, e.target.value)} style={styles.roleSelect}>
                                            <option value="Pelamar">Pelamar</option>
                                            <option value="Perusahaan">Perusahaan</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <MobileRow label="Email" value={user.email} />
                                    <MobileRow label="Telepon" value={user.telepon || '-'} />
                                    <MobileRow label="Bergabung" value={formatDate(user.created_at)} />
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px', paddingTop: '8px', borderTop: `1px solid ${isDark ? '#1c1917' : '#f0f0f0'}` }}>
                                        <button onClick={() => { setEditingUser(user); setShowEditUserModal(true); }} style={{ ...styles.editBtn, fontSize: '13px' }}><PencilIcon style={icn} /> Edit</button>
                                        <button onClick={() => handleDeleteUser(user.id_user, user.nama)} style={{ ...styles.deleteBtn, fontSize: '13px' }}><TrashIcon style={icn} /> Hapus</button>
                                    </div>
                                </MobileCard>
                            ))}
                        </div>
                        <Pagination
                            currentPage={page.users}
                            totalPages={Math.ceil(getFilteredUsers().length / perPage)}
                            onPageChange={(p) => setPage(s => ({ ...s, users: p }))}
                        />
                        {getFilteredUsers().length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>Tidak ada data pengguna</div>}
                    </div>
                )}

                {/* JOBS TAB */}
                {activeTab === 'jobs' && (
                    <div style={styles.card} className="admin-card">
                        <div style={styles.filterBar}>
                            <input type="text" placeholder="Cari posisi/perusahaan..." value={jobSearch} onChange={e => setJobSearch(e.target.value)} style={styles.filterInput} />
                            <select value={jobKategoriFilter} onChange={e => setJobKategoriFilter(e.target.value)} style={styles.filterSelect}>
                                <option value="All">Semua Kategori</option>
                                {kategoriOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <button onClick={() => setJobSort({ ...jobSort, dir: jobSort.dir === 'asc' ? 'desc' : 'asc' })} style={styles.sortBtn(true)}>
                                {jobSort.dir === 'asc' ? <ChevronUpIcon style={{width: '1em', height: '1em'}} /> : <ChevronDownIcon style={{width: '1em', height: '1em'}} />} {jobSort.by === 'judul_posisi' ? 'Posisi' : jobSort.by === 'gaji' ? 'Gaji' : 'Tanggal'}
                            </button>
                        </div>
                        <div style={styles.table} className="admin-table-wrapper">
                            <table style={{ width: '100%' }} className="desktop-table">
                                <thead>
                                    <tr>
                                        <th style={styles.th}><SortHeader label="ID" sortBy="id_lowongan" currentSort={jobSort} onSort={(b) => setJobSort({ by: b, dir: jobSort.by === b && jobSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}><SortHeader label="Judul Posisi" sortBy="judul_posisi" currentSort={jobSort} onSort={(b) => setJobSort({ by: b, dir: jobSort.by === b && jobSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Kategori</th>
                                        <th style={styles.th}>Perusahaan</th>
                                        <th style={styles.th}><SortHeader label="Gaji" sortBy="gaji" currentSort={jobSort} onSort={(b) => setJobSort({ by: b, dir: jobSort.by === b && jobSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}><SortHeader label="Dibuat" sortBy="created_at" currentSort={jobSort} onSort={(b) => setJobSort({ by: b, dir: jobSort.by === b && jobSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredJobs().slice((page.jobs - 1) * perPage, page.jobs * perPage).map(job => (
                                        <tr key={job.id_lowongan}>
                                            <td style={styles.td}>{job.id_lowongan}</td>
                                            <td style={styles.td}>{job.judul_posisi}</td>
                                            <td style={styles.td}>{job.kategori}</td>
                                            <td style={styles.td}>{job.nama_perusahaan || '-'}</td>
                                            <td style={styles.td}>{formatRupiah(job.gaji)}</td>
                                            <td style={styles.td}>{formatDate(job.created_at)}</td>
                                            <td style={styles.td}>
                                                <button onClick={() => { setEditingJob(job); setShowEditJobModal(true); }} style={styles.editBtn} title="Edit"><PencilIcon style={{width: '1em', height: '1em'}} /></button>
                                                <button onClick={() => handleDeleteJob(job.id_lowongan, job.judul_posisi)} style={styles.deleteBtn} title="Hapus"><TrashIcon style={{width: '1em', height: '1em'}} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mobile-cards">
                            {getFilteredJobs().slice((page.jobs - 1) * perPage, page.jobs * perPage).map(job => (
                                <MobileCard key={job.id_lowongan}>
                                    <div style={{ fontWeight: '700', fontSize: '15px', color: colors.textMain, marginBottom: '8px' }}>{job.judul_posisi}</div>
                                    <MobileRow label="Kategori" value={job.kategori} />
                                    <MobileRow label="Perusahaan" value={job.nama_perusahaan || '-'} />
                                    <MobileRow label="Gaji" value={formatRupiah(job.gaji)} />
                                    <MobileRow label="Dibuat" value={formatDate(job.created_at)} />
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px', paddingTop: '8px', borderTop: `1px solid ${isDark ? '#1c1917' : '#f0f0f0'}` }}>
                                        <button onClick={() => { setEditingJob(job); setShowEditJobModal(true); }} style={{ ...styles.editBtn, fontSize: '13px' }}><PencilIcon style={icn} /> Edit</button>
                                        <button onClick={() => handleDeleteJob(job.id_lowongan, job.judul_posisi)} style={{ ...styles.deleteBtn, fontSize: '13px' }}><TrashIcon style={icn} /> Hapus</button>
                                    </div>
                                </MobileCard>
                            ))}
                        </div>
                        <Pagination
                            currentPage={page.jobs}
                            totalPages={Math.ceil(getFilteredJobs().length / perPage)}
                            onPageChange={(p) => setPage(s => ({ ...s, jobs: p }))}
                        />
                        {getFilteredJobs().length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>Tidak ada data lowongan</div>}
                    </div>
                )}

                {/* APPLICATIONS TAB */}
                {activeTab === 'applications' && (
                    <div style={styles.card} className="admin-card">
                        <div style={styles.filterBar}>
                            <input type="text" placeholder="Cari pelamar/posisi..." value={appSearch} onChange={e => setAppSearch(e.target.value)} style={styles.filterInput} />
                            <select value={appStatusFilter} onChange={e => setAppStatusFilter(e.target.value)} style={styles.filterSelect}>
                                <option value="All">Semua Status</option>
                                <option value="Menunggu">Menunggu</option>
                                <option value="Review">Review</option>
                                <option value="Interview">Interview</option>
                                <option value="Lolos">Lolos</option>
                                <option value="Gagal">Gagal</option>
                            </select>
                            <button onClick={() => setAppSort({ ...appSort, dir: appSort.dir === 'asc' ? 'desc' : 'asc' })} style={styles.sortBtn(true)}>
                                {appSort.dir === 'asc' ? <ChevronUpIcon style={{width: '1em', height: '1em'}} /> : <ChevronDownIcon style={{width: '1em', height: '1em'}} />} {appSort.by === 'status' ? 'Status' : 'Tanggal'}
                            </button>
                        </div>
                        <div style={styles.table} className="admin-table-wrapper">
                            <table style={{ width: '100%' }} className="desktop-table">
                                <thead>
                                    <tr>
                                        <th style={styles.th}><SortHeader label="ID" sortBy="id_lamaran" currentSort={appSort} onSort={(b) => setAppSort({ by: b, dir: appSort.by === b && appSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Pelamar</th>
                                        <th style={styles.th}>Posisi</th>
                                        <th style={styles.th}>Perusahaan</th>
                                        <th style={styles.th}><SortHeader label="Status" sortBy="status" currentSort={appSort} onSort={(b) => setAppSort({ by: b, dir: appSort.by === b && appSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}><SortHeader label="Tanggal" sortBy="tanggal_melamar" currentSort={appSort} onSort={(b) => setAppSort({ by: b, dir: appSort.by === b && appSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredApps().slice((page.applications - 1) * perPage, page.applications * perPage).map(app => {
                                        const badge = getStatusBadge(app.status);
                                        return (
                                            <tr key={app.id_lamaran}>
                                                <td style={styles.td}>{app.id_lamaran}</td>
                                                <td style={styles.td}>{app.nama_pelamar}</td>
                                                <td style={styles.td}>{app.judul_posisi}</td>
                                                <td style={styles.td}>{app.nama_perusahaan || '-'}</td>
                                                <td style={styles.td}>
                                                    <span style={{ background: badge.bg, color: badge.text, padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                        {badge.icon} {badge.label}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>{new Date(app.tanggal_melamar).toLocaleDateString('id-ID')}</td>
                                                <td style={styles.td}>
                                                    <select onChange={(e) => {
                                                        api.patch(`/admin/applications/${app.id_lamaran}`, { status: e.target.value })
                                                            .then(() => { showNotification('Berhasil', 'Status diperbarui', 'success'); fetchData(); })
                                                            .catch(() => showNotification('Gagal', 'Gagal update status', 'error'));
                                                    }} style={styles.roleSelect} defaultValue={app.status}>
                                                        <option value="Menunggu">Menunggu</option>
                                                        <option value="Review">Review</option>
                                                        <option value="Interview">Interview</option>
                                                        <option value="Lolos">Lolos</option>
                                                        <option value="Gagal">Gagal</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="mobile-cards">
                            {getFilteredApps().slice((page.applications - 1) * perPage, page.applications * perPage).map(app => {
                                const badge = getStatusBadge(app.status);
                                return (
                                    <MobileCard key={app.id_lamaran}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                            <span style={{ fontWeight: '700', fontSize: '15px', color: colors.textMain }}>{app.nama_pelamar}</span>
                                            <span style={{ background: badge.bg, color: badge.text, padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                {badge.icon} {badge.label}
                                            </span>
                                        </div>
                                        <MobileRow label="Posisi" value={app.judul_posisi} />
                                        <MobileRow label="Perusahaan" value={app.nama_perusahaan || '-'} />
                                        <MobileRow label="Tanggal" value={new Date(app.tanggal_melamar).toLocaleDateString('id-ID')} />
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: `1px solid ${isDark ? '#1c1917' : '#f0f0f0'}` }}>
                                            <span style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '500' }}>Status:</span>
                                            <select onChange={(e) => {
                                                api.patch(`/admin/applications/${app.id_lamaran}`, { status: e.target.value })
                                                    .then(() => { showNotification('Berhasil', 'Status diperbarui', 'success'); fetchData(); })
                                                    .catch(() => showNotification('Gagal', 'Gagal update status', 'error'));
                                            }} style={{ ...styles.roleSelect, flex: 1 }} defaultValue={app.status}>
                                                <option value="Menunggu">Menunggu</option>
                                                <option value="Review">Review</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Lolos">Lolos</option>
                                                <option value="Gagal">Gagal</option>
                                            </select>
                                        </div>
                                    </MobileCard>
                                );
                            })}
                        </div>
                        <Pagination
                            currentPage={page.applications}
                            totalPages={Math.ceil(getFilteredApps().length / perPage)}
                            onPageChange={(p) => setPage(s => ({ ...s, applications: p }))}
                        />
                        {getFilteredApps().length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>Tidak ada data lamaran</div>}
                    </div>
                )}

                {/* TESTIMONIALS TAB */}
                {activeTab === 'testimonials' && (
                    <div style={styles.card} className="admin-card">
                        <div style={styles.filterBar}>
                            <input type="text" placeholder="Cari nama..." value={testSearch} onChange={e => setTestSearch(e.target.value)} style={styles.filterInput} />
                            <select value={testActiveFilter} onChange={e => setTestActiveFilter(e.target.value)} style={styles.filterSelect}>
                                <option value="All">Semua Status</option>
                                <option value="Active">Aktif</option>
                                <option value="Inactive">Nonaktif</option>
                            </select>
                            <button onClick={() => setTestSort({ ...testSort, dir: testSort.dir === 'asc' ? 'desc' : 'asc' })} style={styles.sortBtn(true)}>
                                {testSort.dir === 'asc' ? <ChevronUpIcon style={{width: '1em', height: '1em'}} /> : <ChevronDownIcon style={{width: '1em', height: '1em'}} />} {testSort.by === 'rating' ? 'Rating' : 'Tanggal'}
                            </button>
                        </div>
                        <div style={styles.table} className="admin-table-wrapper">
                            <table style={{ width: '100%' }} className="desktop-table">
                                <thead>
                                    <tr>
                                        <th style={styles.th}><SortHeader label="ID" sortBy="id_testimoni" currentSort={testSort} onSort={(b) => setTestSort({ by: b, dir: testSort.by === b && testSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Nama</th>
                                        <th style={styles.th}>Posisi</th>
                                        <th style={styles.th}>Perusahaan</th>
                                        <th style={styles.th}><SortHeader label="Rating" sortBy="rating" currentSort={testSort} onSort={(b) => setTestSort({ by: b, dir: testSort.by === b && testSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Status</th>
                                        <th style={styles.th}><SortHeader label="Tanggal" sortBy="created_at" currentSort={testSort} onSort={(b) => setTestSort({ by: b, dir: testSort.by === b && testSort.dir === 'asc' ? 'desc' : 'asc' })} /></th>
                                        <th style={styles.th}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredTestimonials().slice((page.testimonials - 1) * perPage, page.testimonials * perPage).map(t => (
                                        <tr key={t.id_testimoni}>
                                            <td style={styles.td}>{t.id_testimoni}</td>
                                            <td style={styles.td}>{t.nama}</td>
                                            <td style={styles.td}>{t.role || '-'}</td>
                                            <td style={styles.td}>{t.perusahaan || '-'}</td>
                                            <td style={styles.td}>
                                                <span style={{ color: '#f59e0b', display: 'inline-flex', gap: '2px', verticalAlign: 'middle' }}>
                                                    {Array.from({ length: t.rating || 5 }).map((_, i) => <StarIcon key={`s${i}`} style={{ width: '1em', height: '1em' }} />)}
                                                    {Array.from({ length: 5 - (t.rating || 5) }).map((_, i) => <StarIconOutline key={`o${i}`} style={{ width: '1em', height: '1em' }} />)}
                                                </span>
                                            </td>
                                            <td style={styles.td}>
                                                <span style={{
                                                    padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                                                    background: t.is_active ? '#10b981' : '#6b7280', color: '#fff',
                                                    display: 'inline-flex', alignItems: 'center', gap: '4px'
                                                }}>
                                                    {t.is_active ? <><CheckCircleIcon style={{width: '1em', height: '1em'}} /> Aktif</> : <><XCircleIcon style={{width: '1em', height: '1em'}} /> Nonaktif</>}
                                                </span>
                                            </td>
                                            <td style={styles.td}>{formatDate(t.created_at)}</td>
                                            <td style={styles.td}>
                                                <button onClick={() => { setEditingTestimonial(t); setShowEditTestimonialModal(true); }} style={styles.editBtn} title="Edit"><PencilIcon style={{width: '1em', height: '1em'}} /></button>
                                                <button onClick={() => handleDeleteTestimonial(t.id_testimoni, t.nama)} style={styles.deleteBtn} title="Hapus"><TrashIcon style={{width: '1em', height: '1em'}} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mobile-cards">
                            {getFilteredTestimonials().slice((page.testimonials - 1) * perPage, page.testimonials * perPage).map(t => (
                                <MobileCard key={t.id_testimoni}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                        <span style={{ fontWeight: '700', fontSize: '15px', color: colors.textMain }}>{t.nama}</span>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                                            background: t.is_active ? '#10b981' : '#6b7280', color: '#fff',
                                            display: 'inline-flex', alignItems: 'center', gap: '4px'
                                        }}>
                                            {t.is_active ? <><CheckCircleIcon style={{width: '1em', height: '1em'}} /> Aktif</> : <><XCircleIcon style={{width: '1em', height: '1em'}} /> Nonaktif</>}
                                        </span>
                                    </div>
                                    <MobileRow label="Posisi" value={t.role || '-'} />
                                    <MobileRow label="Perusahaan" value={t.perusahaan || '-'} />
                                    <MobileRow label="Rating" value={<span style={{ color: '#f59e0b', display: 'inline-flex', gap: '2px', verticalAlign: 'middle' }}>
                                        {Array.from({ length: t.rating || 5 }).map((_, i) => <StarIcon key={`s${i}`} style={{ width: '1em', height: '1em' }} />)}
                                        {Array.from({ length: 5 - (t.rating || 5) }).map((_, i) => <StarIconOutline key={`o${i}`} style={{ width: '1em', height: '1em' }} />)}
                                    </span>} />
                                    <MobileRow label="Tanggal" value={formatDate(t.created_at)} />
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px', paddingTop: '8px', borderTop: `1px solid ${isDark ? '#1c1917' : '#f0f0f0'}` }}>
                                        <button onClick={() => { setEditingTestimonial(t); setShowEditTestimonialModal(true); }} style={{ ...styles.editBtn, fontSize: '13px' }}><PencilIcon style={icn} /> Edit</button>
                                        <button onClick={() => handleDeleteTestimonial(t.id_testimoni, t.nama)} style={{ ...styles.deleteBtn, fontSize: '13px' }}><TrashIcon style={icn} /> Hapus</button>
                                    </div>
                                </MobileCard>
                            ))}
                        </div>
                        <Pagination
                            currentPage={page.testimonials}
                            totalPages={Math.ceil(getFilteredTestimonials().length / perPage)}
                            onPageChange={(p) => setPage(s => ({ ...s, testimonials: p }))}
                        />
                        {getFilteredTestimonials().length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>Tidak ada data testimonial</div>}
                    </div>
                )}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-table { display: none; }
                    .mobile-cards { display: block; }
                    .tab-label-full { display: none; }
                    .tab-label-short { display: inline; font-size: 18px; }
                    .admin-card { overflow-x: visible !important; }
                }
                @media (min-width: 769px) {
                    .mobile-cards { display: none; }
                    .tab-label-short { display: none; }
                    .tab-label-full { display: inline; }
                    .admin-table-wrapper { overflow-x: auto; }
                }
            `}</style>
        </>
    );
};

export default AdminDashboard;
