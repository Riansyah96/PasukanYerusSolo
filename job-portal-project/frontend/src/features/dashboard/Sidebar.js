import React from 'react';

const Sidebar = ({ activeMenu, setActiveMenu, onChangeMenu, appTheme, handleLogout }) => {
    const isDark = appTheme === 'dark';
    
    // Data navigasi menu sidebar
    const menuItems = [
        { id: 'eksplorasi', label: 'Eksplorasi', icon: '🔍' },
        { id: 'favorit', label: 'Lowongan Favorit', icon: '⭐' },
        { id: 'status', label: 'Status Lamaran', icon: '📋' },
        { id: 'profil', label: 'Profil Saya', icon: '👤' },
        { id: 'password', label: 'Ganti Password', icon: '🔒' }
    ];

    const colors = {
        sidebarBg: isDark ? '#0d0703' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#6b7280',
        activeBg: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
        activeText: '#ffffff'
    };

    // Fungsi handle klik menu dengan proteksi berlapis agar tidak memicu error fungsi
    const handleMenuClick = (menuId) => {
        if (typeof setActiveMenu === 'function') {
            setActiveMenu(menuId);
        } else if (typeof onChangeMenu === 'function') {
            onChangeMenu(menuId); // Fallback jika projectmu menggunakan nama prop 'onChangeMenu'
        } else {
            console.warn(`Warning: Fungsi navigasi menu untuk [${menuId}] tidak ditemukan dari parent component.`);
        }
    };

    return (
        <div style={{
            width: '260px',
            minHeight: '100vh',
            background: colors.sidebarBg,
            borderRight: colors.border,
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
        }}>
            {/* Bagian Atas: Logo & Brand */}
            <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#ea580c', letterSpacing: '0.5px' }}>
                    PasukanYerusSolo
                </h1>
                <span style={{ fontSize: '10px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' }}>
                    Job Portal Workspace
                </span>
            </div>

            {/* Bagian Tengah: Daftar Navigasi Menu */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {menuItems.map((item) => {
                    const isActive = activeMenu === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '700',
                                textAlign: 'left',
                                transition: 'all 0.2s ease',
                                background: isActive ? colors.activeBg : 'transparent',
                                color: isActive ? colors.activeText : colors.textMuted,
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.background = isDark ? '#1c1007' : '#fcf8f5';
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <span style={{ fontSize: '14px' }}>{item.icon}</span>
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Bagian Bawah: Informasi Otoritas & Logout */}
            <div style={{ borderTop: colors.border, paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                    background: isDark ? '#110a05' : '#fcfaf7',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: colors.textMuted
                }}>
                    Otoritas: <span style={{ color: '#ea580c', fontWeight: '800' }}>Pelamar</span>
                </div>
                
                {handleLogout && (
                    <button 
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: 'transparent',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '700',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        🚪 Keluar Akun
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;