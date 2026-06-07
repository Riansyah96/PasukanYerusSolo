// src/features/dashboard/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import Modal from '../../components/Modal/Modal';

const AdminDashboard = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('stats');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', message: '', type: 'success' });
    const [editingUser, setEditingUser] = useState(null);
    const [editingJob, setEditingJob] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showEditJobModal, setShowEditJobModal] = useState(false);

    const showNotification = (title, message, type = 'success') => {
        setModalMessage({ title, message, type });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'stats') {
                const res = await api.get('/admin/stats');
                setStats(res.data);
            } else if (activeTab === 'users') {
                const res = await api.get('/admin/users');
                setUsers(res.data);
            } else if (activeTab === 'jobs') {
                const res = await api.get('/admin/jobs');
                setJobs(res.data);
            } else if (activeTab === 'applications') {
                const res = await api.get('/admin/applications');
                setApplications(res.data);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            showNotification('Gagal', 'Gagal memuat data', 'error');
        } finally {
            setLoading(false);
        }
    };

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
            await api.put(`/admin/jobs/${jobData.id_lowongan}`, {
                judul_posisi: jobData.judul_posisi,
                kategori: jobData.kategori,
                gaji: jobData.gaji
            });
            showNotification('Berhasil', 'Lowongan berhasil diperbarui', 'success');
            setShowEditJobModal(false);
            setEditingJob(null);
            fetchData();
        } catch (err) {
            showNotification('Gagal', 'Gagal memperbarui lowongan', 'error');
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

    const formatRupiah = (angka) => {
        if (!angka) return 'Tidak disebutkan';
        const cleanNumber = String(angka).replace(/\./g, '');
        const number = parseInt(cleanNumber);
        if (isNaN(number)) return angka;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'Menunggu': { bg: '#f59e0b', text: '#fff', label: '🕒 Menunggu' },
            'Review': { bg: '#3b82f6', text: '#fff', label: '📋 Review' },
            'Interview': { bg: '#8b5cf6', text: '#fff', label: '🗣️ Interview' },
            'Lolos': { bg: '#22c55e', text: '#fff', label: '✅ Lolos' },
            'Gagal': { bg: '#ef4444', text: '#fff', label: '❌ Gagal' }
        };
        return statusMap[status] || { bg: '#6b7280', text: '#fff', label: '📋 Pending' };
    };

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '#262626' : '#e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        accent: '#ea580c'
    };

    const tabs = [
        { id: 'stats', label: '📊 Statistik', icon: '📊' },
        { id: 'users', label: '👥 Kelola Pengguna', icon: '👥' },
        { id: 'jobs', label: '💼 Kelola Lowongan', icon: '💼' },
        { id: 'applications', label: '📋 Kelola Lamaran', icon: '📋' }
    ];

    const styles = {
        container: { padding: '20px', maxWidth: '1400px', margin: '0 auto' },
        title: { fontSize: '28px', fontWeight: '800', color: colors.textMain, marginBottom: '8px' },
        subtitle: { color: colors.textMuted, fontSize: '14px', marginBottom: '32px' },
        tabContainer: { display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap', borderBottom: `1px solid ${colors.border}`, paddingBottom: '12px' },
        tabButton: (isActive) => ({
            padding: '10px 24px',
            borderRadius: '30px',
            border: 'none',
            background: isActive ? colors.accent : 'transparent',
            color: isActive ? '#fff' : colors.textMuted,
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px'
        }),
        card: { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '24px', overflowX: 'auto' },
        statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' },
        statCard: { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '24px', textAlign: 'center' },
        statValue: { fontSize: '32px', fontWeight: '800', color: colors.accent },
        statLabel: { fontSize: '13px', color: colors.textMuted, marginTop: '8px' },
        table: { width: '100%', borderCollapse: 'collapse', minWidth: '800px' },
        th: { padding: '12px', textAlign: 'left', color: colors.accent, borderBottom: `1px solid ${colors.border}`, fontWeight: '700' },
        td: { padding: '12px', color: colors.textMain, borderBottom: `1px solid ${colors.border}` },
        deleteBtn: { background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.3s ease' },
        editBtn: { background: 'transparent', border: 'none', color: colors.accent, cursor: 'pointer', fontSize: '18px', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.3s ease', marginRight: '8px' },
        roleSelect: { padding: '6px 12px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.cardBg, color: colors.textMain, cursor: 'pointer' },
        loadingBox: { textAlign: 'center', padding: '60px', color: colors.textMuted },
        modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 },
        modalContent: { background: colors.cardBg, borderRadius: '20px', padding: '32px', width: '90%', maxWidth: '500px', border: `1px solid ${colors.border}` },
        modalInput: { width: '100%', padding: '12px', borderRadius: '8px', border: colors.border, background: colors.inputBg || colors.cardBg, color: colors.textMain, marginBottom: '16px' },
        modalButton: { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease' }
    };

    if (loading && !stats && users.length === 0) {
        return (
            <div style={styles.loadingBox}>
                <div style={{ width: '40px', height: '40px', border: `3px solid ${colors.border}`, borderTop: `3px solid ${colors.accent}`, borderRadius: '50%', margin: '0 auto 16px auto', animation: 'spin 1s linear infinite' }} />
                <p>⏳ Memuat dashboard admin...</p>
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
                        <input type="text" value={editingJob.kategori || ''} onChange={e => setEditingJob({ ...editingJob, kategori: e.target.value })} placeholder="Kategori" style={styles.modalInput} />
                        <input type="text" value={editingJob.gaji || ''} onChange={e => setEditingJob({ ...editingJob, gaji: e.target.value })} placeholder="Gaji" style={styles.modalInput} />
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button onClick={() => setShowEditJobModal(false)} style={{ ...styles.modalButton, background: 'transparent', border: `1px solid ${colors.border}`, color: colors.textMuted }}>Batal</button>
                            <button onClick={() => handleUpdateJob(editingJob)} style={{ ...styles.modalButton, background: colors.accent, color: '#fff' }}>Simpan</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={styles.container}>
                <h1 style={styles.title}>⚙️ Panel Administrator</h1>
                <p style={styles.subtitle}>Kelola seluruh data pengguna, lowongan, dan lamaran dari satu dashboard</p>

                <div style={styles.tabContainer}>
                    {tabs.map(tab => (
                        <button key={tab.id} style={styles.tabButton(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
                            {tab.label}
                        </button>
                    ))}
                    <button onClick={() => fetchData()} style={{ ...styles.tabButton(false), background: isDark ? '#1c1917' : '#f5f5f4', marginLeft: 'auto' }}>
                        🔄 Refresh
                    </button>
                </div>

                {/* STATISTICS TAB */}
                {activeTab === 'stats' && stats && (
                    <div style={styles.statGrid}>
                        <div style={styles.statCard}>
                            <div style={{ fontSize: '40px' }}>👥</div>
                            <div style={styles.statValue}>{stats.total_users?.toLocaleString() || 0}</div>
                            <div style={styles.statLabel}>Total Pengguna</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={{ fontSize: '40px' }}>🏢</div>
                            <div style={styles.statValue}>{stats.total_companies?.toLocaleString() || 0}</div>
                            <div style={styles.statLabel}>Perusahaan</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={{ fontSize: '40px' }}>👨‍💼</div>
                            <div style={styles.statValue}>{stats.total_job_seekers?.toLocaleString() || 0}</div>
                            <div style={styles.statLabel}>Pelamar</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={{ fontSize: '40px' }}>💼</div>
                            <div style={styles.statValue}>{stats.total_jobs?.toLocaleString() || 0}</div>
                            <div style={styles.statLabel}>Lowongan</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={{ fontSize: '40px' }}>📩</div>
                            <div style={styles.statValue}>{stats.total_applications?.toLocaleString() || 0}</div>
                            <div style={styles.statLabel}>Lamaran Masuk</div>
                        </div>
                    </div>
                )}

                {/* USERS TAB */}
                {activeTab === 'users' && (
                    <div style={styles.card}>
                        <div style={styles.table}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr><th style={styles.th}>ID</th><th style={styles.th}>Nama</th><th style={styles.th}>Email</th><th style={styles.th}>Role</th><th style={styles.th}>Telepon</th><th style={styles.th}>Bergabung</th><th style={styles.th}>Aksi</th></tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
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
                                                <button onClick={() => { setEditingUser(user); setShowEditUserModal(true); }} style={styles.editBtn} title="Edit">✏️</button>
                                                <button onClick={() => handleDeleteUser(user.id_user, user.nama)} style={styles.deleteBtn} title="Hapus">🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {users.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>Tidak ada data pengguna</div>}
                    </div>
                )}

                {/* JOBS TAB */}
                {activeTab === 'jobs' && (
                    <div style={styles.card}>
                        <div style={styles.table}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr><th style={styles.th}>ID</th><th style={styles.th}>Judul Posisi</th><th style={styles.th}>Kategori</th><th style={styles.th}>Perusahaan</th><th style={styles.th}>Gaji</th><th style={styles.th}>Dibuat</th><th style={styles.th}>Aksi</th></tr>
                                </thead>
                                <tbody>
                                    {jobs.map(job => (
                                        <tr key={job.id_lowongan}>
                                            <td style={styles.td}>{job.id_lowongan}</td>
                                            <td style={styles.td}>{job.judul_posisi}</td>
                                            <td style={styles.td}>{job.kategori}</td>
                                            <td style={styles.td}>{job.nama_perusahaan || '-'}</td>
                                            <td style={styles.td}>{formatRupiah(job.gaji)}</td>
                                            <td style={styles.td}>{formatDate(job.created_at)}</td>
                                            <td style={styles.td}>
                                                <button onClick={() => { setEditingJob(job); setShowEditJobModal(true); }} style={styles.editBtn} title="Edit">✏️</button>
                                                <button onClick={() => handleDeleteJob(job.id_lowongan, job.judul_posisi)} style={styles.deleteBtn} title="Hapus">🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {jobs.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>Tidak ada data lowongan</div>}
                    </div>
                )}

                {/* APPLICATIONS TAB */}
                {activeTab === 'applications' && (
                    <div style={styles.card}>
                        <div style={styles.table}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr><th style={styles.th}>ID</th><th style={styles.th}>Pelamar</th><th style={styles.th}>Posisi</th><th style={styles.th}>Perusahaan</th><th style={styles.th}>Status</th><th style={styles.th}>Tanggal</th><th style={styles.th}>Aksi</th></tr>
                                </thead>
                                <tbody>
                                    {applications.map(app => {
                                        const badge = getStatusBadge(app.status);
                                        return (
                                            <tr key={app.id_lamaran}>
                                                <td style={styles.td}>{app.id_lamaran}</td>
                                                <td style={styles.td}>{app.nama_pelamar}</td>
                                                <td style={styles.td}>{app.judul_posisi}</td>
                                                <td style={styles.td}>{app.nama_perusahaan || '-'}</td>
                                                <td style={styles.td}>
                                                    <span style={{ background: badge.bg, color: badge.text, padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                                                        {badge.label}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>{new Date(app.tanggal_melamar).toLocaleDateString('id-ID')}</td>
                                                <td style={styles.td}>
                                                    <select onChange={(e) => {
                                                        api.patch(`/admin/applications/${app.id_lamaran}`, { status: e.target.value })
                                                            .then(() => { showNotification('Berhasil', 'Status diperbarui', 'success'); fetchData(); })
                                                            .catch(() => showNotification('Gagal', 'Gagal update status', 'error'));
                                                    }} style={styles.roleSelect} defaultValue={app.status}>
                                                        <option value="Menunggu">🕒 Menunggu</option>
                                                        <option value="Review">📋 Review</option>
                                                        <option value="Interview">🗣️ Interview</option>
                                                        <option value="Lolos">✅ Lolos</option>
                                                        <option value="Gagal">❌ Gagal</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {applications.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>Tidak ada data lamaran</div>}
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;