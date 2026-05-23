import React from 'react';

const Sidebar = ({ currentRole, onNavigate }) => {
    return (
        <aside style={{ width: '250px', background: '#2c3e50', color: '#fff', height: '100vh', padding: '20px' }}>
            <h3>PasukanYerusSolo Portal</h3>
            <hr />
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <button onClick={() => onNavigate('eksplorasi')}>🔎 Cari Lowongan</button>
                {currentRole === 'Pelamar' && <button onClick={() => onNavigate('favorit')}>⭐ Favorit Saya</button>}
                {currentRole === 'Perusahaan' && <button onClick={() => onNavigate('hrd')}>💼 Panel HRD</button>}
                {currentRole === 'Admin' && <button onClick={() => onNavigate('statistik')}>📊 Statistik Admin</button>}
                <button onClick={() => onNavigate('ganti-password')}>🔑 Ganti Password</button>
            </nav>
        </aside>
    );
};

export default Sidebar;