import React from 'react';

const Sidebar = ({ activeMenu, setActiveMenu, appTheme, handleLogout }) => {
    const isDark = appTheme === 'dark';
    
    const menuItems = [
        { id: 'eksplorasi', label: 'Eksplorasi', icon: '🔍' },
        { id: 'favorit', label: 'Lowongan Favorit', icon: '⭐' },
        { id: 'status', label: 'Status Lamaran', icon: '📋' },
        { id: 'profil', label: 'Profil Saya', icon: '👤' },
        { id: 'password', label: 'Ganti Password', icon: '🔑' }
    ];

    return (
        <div className="sidebar">
            {/* Header/Logo */}
            <div style={{ marginBottom: '48px', paddingLeft: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#ea580c' }}>
                    PasukanYerusSolo
                </h1>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#9e8476', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Portal Workspace
                </span>
            </div>

            {/* Navigasi - Flex agar memenuhi sisa ruang */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {menuItems.map((item) => {
                    const isActive = activeMenu === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveMenu(item.id)}
                            style={{
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '14px', 
                                width: '100%',
                                padding: '12px 16px', 
                                borderRadius: '12px', 
                                border: 'none', 
                                cursor: 'pointer',
                                fontSize: '14px', 
                                fontWeight: '600', 
                                textAlign: 'left',
                                background: isActive ? 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)' : 'transparent',
                                color: isActive ? '#ffffff' : '#a3a3a3',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span style={{ fontSize: '18px' }}>{item.icon}</span>
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Footer Sidebar (Logout/Status) */}
            <div style={{ borderTop: '1px solid #262626', paddingTop: '24px', marginTop: '24px' }}>
                <button onClick={handleLogout} style={{ 
                    width: '100%', padding: '12px', background: 'transparent',
                    border: '1px solid #ef4444', color: '#ef4444', borderRadius: '12px',
                    cursor: 'pointer', fontWeight: '700', fontSize: '13px' 
                }}>
                    Keluar Akun
                </button>
            </div>
        </div>
    );
};

export default Sidebar;