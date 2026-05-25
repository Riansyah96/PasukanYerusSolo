import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminStatsView = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get('/admin/statistik')
            .then(res => setStats(res.data.data))
            .catch(err => console.error("Gagal memuat statistik", err));
    }, []);

    if (!stats) return <p>Memuat Ringkasan Statistik...</p>;

    return (
        <div style={{ padding: '20px', background: '#f0f2f5', borderRadius: '10px' }}>
            <h2>Dashboard Analitik Proyek</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                <div style={{ padding: '20px', background: '#fff', boxShadow: '1px 1px 5px #ccc' }}>
                    <h4>👤 Total Pengguna</h4>
                    <p>{stats.total_pengguna} Orang</p>
                </div>
                <div style={{ padding: '20px', background: '#fff', boxShadow: '1px 1px 5px #ccc' }}>
                    <h4>💼 Total Lowongan</h4>
                    <p>{stats.total_lowongan} Iklan</p>
                </div>
                <div style={{ padding: '20px', background: '#fff', boxShadow: '1px 1px 5px #ccc' }}>
                    <h4>📩 Total Lamaran masuk</h4>
                    <p>{stats.total_lamaran} Berkas</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStatsView;