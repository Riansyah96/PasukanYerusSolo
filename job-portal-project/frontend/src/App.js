import React, { useState } from 'react';
import Sidebar from './features/dashboard/Sidebar'; // Sesuaikan dengan jalur folder Sidebar.js kamu
import JobListContainer from './features/eksplorasi/JobListContainer';
import FavoriteListContainer from './features/eksplorasi/FavoriteListContainer';

const App = () => {
    // 1. State Manajemen Navigasi Menu Aktif
    const [activeMenu, setActiveMenu] = useState('eksplorasi');
    
    // 2. State Manajemen Tema Tampilan Global (Default: dark menyesuaikan PasukanYerusSolo)
    const [appTheme] = useState('dark'); 

    // 3. Fungsi Simulasi Logout Akun
    const handleLogout = () => {
        localStorage.clear();
        alert('Anda telah berhasil keluar dari akun Workspace.');
        window.location.reload();
    };

    // 4. Struktur Warna Tema Global Workspace
    const isDark = appTheme === 'dark';
    const themeColors = {
        appBg: isDark ? '#080402' : '#fffbf7',
        contentBg: isDark ? '#110a05' : '#fcfaf7',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3'
    };

    // 5. Kondisional Rendering Konten Tengah Berdasarkan Menu yang Dipilih di Sidebar
    const renderContent = () => {
        switch (activeMenu) {
            case 'eksplorasi':
                return <JobListContainer appTheme={appTheme} />;
            case 'favorit':
                return <FavoriteListContainer appTheme={appTheme} />;
            case 'status':
                return (
                    <div style={{ padding: '20px', color: isDark ? '#9e8476' : '#6b7280', textAlign: 'center' }}>
                        <h3>📋 Status Lamaran Kerja</h3>
                        <p>Fitur riwayat pelamaran sedang disinkronisasikan oleh sistem.</p>
                    </div>
                );
            case 'profil':
                return (
                    <div style={{ padding: '20px', color: isDark ? '#9e8476' : '#6b7280', textAlign: 'center' }}>
                        <h3>👤 Profil Saya</h3>
                        <p>Halaman manajemen biodata dan CV Pelamar.</p>
                    </div>
                );
            case 'password':
                return (
                    <div style={{ padding: '20px', color: isDark ? '#9e8476' : '#6b7280', textAlign: 'center' }}>
                        <h3>🔒 Ganti Keamanan Password</h3>
                        <p>Amankan akun Anda dengan melakukan pembaruan kata sandi berkala.</p>
                    </div>
                );
            default:
                return <JobListContainer appTheme={appTheme} />;
        }
    };

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            minHeight: '100vh',
            background: themeColors.appBg,
            fontFamily: "'Inter', sans-serif",
            boxSizing: 'border-box',
            margin: 0,
            padding: 0
        }}>
            {/* PANEL NAVIGASI KIRI: Menyuntikkan State & Fungsi Pengubah ke Sidebar */}
            <Sidebar 
                activeMenu={activeMenu} 
                setActiveMenu={setActiveMenu} 
                appTheme={appTheme} 
                handleLogout={handleLogout} 
            />

            {/* PANEL KONTEN UTAMA KANAN: Tempat Merender Halaman yang Dipilih */}
            <main style={{
                flex: 1,
                padding: '40px',
                background: themeColors.contentBg,
                minHeight: '100vh',
                boxSizing: 'border-box',
                overflowY: 'auto'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default App;