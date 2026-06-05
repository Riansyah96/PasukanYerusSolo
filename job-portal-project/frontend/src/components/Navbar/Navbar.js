import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = ({ isAuthenticated, handleLogout, userRole }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoHovered, setLogoHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const isDark = theme === 'dark';

    // Debug: Log role untuk memastikan
    useEffect(() => {
        }, [isAuthenticated, userRole]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigateTo = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    const getMenuStyle = (menuPath) => ({
        background: 'none', 
        border: 'none',
        color: hoveredMenu === menuPath || location.pathname === menuPath ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
        fontWeight: '700', 
        cursor: 'pointer', 
        fontSize: isMobile ? '18px' : '14px', 
        transition: 'all 0.3s ease',
        padding: '12px 0',
        position: 'relative',
        letterSpacing: '0.3px',
        width: isMobile ? '100%' : 'auto',
        textAlign: isMobile ? 'center' : 'left'
    });

    // Menu items berdasarkan role - PASTIKAN ROLE SESUAI
    const renderRoleBasedMenu = () => {
        
        if (!isAuthenticated) return null;

        // Gunakan toLowerCase untuk membandingkan role
        const roleLower = userRole?.toLowerCase();
        
        // Role PERUSAHAAN
        if (roleLower === 'perusahaan' || userRole === 'Perusahaan') {
            return (
                <>
                    <button 
                        onClick={() => navigateTo('/hrd/dashboard')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: hoveredMenu === '/hrd/dashboard' ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: isMobile ? '18px' : '14px',
                            transition: 'all 0.3s ease',
                            padding: isMobile ? '12px 0' : '8px 0',
                            width: isMobile ? '100%' : 'auto',
                            textAlign: isMobile ? 'center' : 'left'
                        }}
                        onMouseEnter={() => setHoveredMenu('/hrd/dashboard')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        📊 Dashboard HRD
                    </button>
                    <button 
                        onClick={() => navigateTo('/hrd/branding')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: hoveredMenu === '/hrd/branding' ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: isMobile ? '18px' : '14px',
                            transition: 'all 0.3s ease',
                            padding: isMobile ? '12px 0' : '8px 0',
                            width: isMobile ? '100%' : 'auto',
                            textAlign: isMobile ? 'center' : 'left'
                        }}
                        onMouseEnter={() => setHoveredMenu('/hrd/branding')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        🎨 Branding
                    </button>
                    <button 
                        onClick={() => navigateTo('/status-lamaran')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: hoveredMenu === '/status-lamaran' ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: isMobile ? '18px' : '14px',
                            transition: 'all 0.3s ease',
                            padding: isMobile ? '12px 0' : '8px 0',
                            width: isMobile ? '100%' : 'auto',
                            textAlign: isMobile ? 'center' : 'left'
                        }}
                        onMouseEnter={() => setHoveredMenu('/status-lamaran')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        📋 Status Lamaran
                    </button>
                </>
            );
        }
        
        // Role PELAMAR
        if (roleLower === 'pelamar' || userRole === 'Pelamar') {
            return (
                <>
                    <button 
                        onClick={() => navigateTo('/favorit')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: hoveredMenu === '/favorit' ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: isMobile ? '18px' : '14px',
                            transition: 'all 0.3s ease',
                            padding: isMobile ? '12px 0' : '8px 0',
                            width: isMobile ? '100%' : 'auto',
                            textAlign: isMobile ? 'center' : 'left'
                        }}
                        onMouseEnter={() => setHoveredMenu('/favorit')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        ⭐ Favorit Saya
                    </button>
                    <button 
                        onClick={() => navigateTo('/status-lamaran')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: hoveredMenu === '/status-lamaran' ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: isMobile ? '18px' : '14px',
                            transition: 'all 0.3s ease',
                            padding: isMobile ? '12px 0' : '8px 0',
                            width: isMobile ? '100%' : 'auto',
                            textAlign: isMobile ? 'center' : 'left'
                        }}
                        onMouseEnter={() => setHoveredMenu('/status-lamaran')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        📋 Status Lamaran
                    </button>
                    <button 
                        onClick={() => navigateTo('/profile')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: hoveredMenu === '/profile' ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: isMobile ? '18px' : '14px',
                            transition: 'all 0.3s ease',
                            padding: isMobile ? '12px 0' : '8px 0',
                            width: isMobile ? '100%' : 'auto',
                            textAlign: isMobile ? 'center' : 'left'
                        }}
                        onMouseEnter={() => setHoveredMenu('/profile')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        👤 Profil Saya
                    </button>
                </>
            );
        }
        
        // Role ADMIN
        if (roleLower === 'admin' || userRole === 'Admin') {
            return (
                <button 
                    onClick={() => navigateTo('/admin/dashboard')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: hoveredMenu === '/admin/dashboard' ? '#ea580c' : (isDark ? '#fff' : '#1c1917'),
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontSize: isMobile ? '18px' : '14px',
                        transition: 'all 0.3s ease',
                        padding: isMobile ? '12px 0' : '8px 0',
                        width: isMobile ? '100%' : 'auto',
                        textAlign: isMobile ? 'center' : 'left'
                    }}
                    onMouseEnter={() => setHoveredMenu('/admin/dashboard')}
                    onMouseLeave={() => setHoveredMenu(null)}
                >
                    ⚙️ Admin Panel
                </button>
            );
        }
        
        return null;
    };

    return (
        <>
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: scrolled ? '12px 4%' : '16px 4%', 
                background: scrolled 
                    ? (isDark ? 'rgba(12, 10, 9, 0.95)' : 'rgba(245, 245, 244, 0.95)')
                    : (isDark ? '#0c0a09' : '#f5f5f4'), 
                borderBottom: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease',
                backdropFilter: scrolled ? 'blur(10px)' : 'none'
            }}>
                {/* Logo Section */}
                <div 
                    onClick={() => navigateTo('/')} 
                    style={{ 
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '6px' : '8px'
                    }}
                    onMouseEnter={(e) => {
                        if (!isMobile) {
                            setLogoHovered(true);
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isMobile) {
                            setLogoHovered(false);
                            e.currentTarget.style.transform = 'scale(1)';
                        }
                    }}
                >
                    <div style={{
                        width: isMobile ? '32px' : '36px',
                        height: isMobile ? '32px' : '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, #ea580c, #f59e0b)`,
                        borderRadius: '10px',
                        transform: !isMobile && logoHovered ? 'rotate(5deg) scale(1.05)' : 'rotate(0deg) scale(1)',
                        transition: 'all 0.3s ease',
                        boxShadow: !isMobile && logoHovered ? '0 4px 15px rgba(234, 88, 12, 0.4)' : 'none'
                    }}>
                        <span style={{
                            fontSize: isMobile ? '16px' : '18px',
                            fontWeight: '900',
                            color: '#fff'
                        }}>
                            ⚡
                        </span>
                    </div>
                    
                    <div>
                        <h2 style={{ 
                            color: isDark ? '#fef3c7' : '#1c1917', 
                            margin: 0, 
                            fontSize: isMobile ? '18px' : '22px',
                            fontWeight: '800',
                            letterSpacing: '-0.5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{ 
                                background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent'
                            }}>
                                Pasukan
                            </span>
                            <span style={{ color: '#ea580c' }}>Yerus</span>
                            <span style={{ color: isDark ? '#fef3c7' : '#1c1917' }}>Solo</span>
                        </h2>
                        {!isMobile && (
                            <div style={{
                                fontSize: '8px',
                                letterSpacing: '1px',
                                color: '#ea580c',
                                textTransform: 'uppercase',
                                fontWeight: '700',
                                marginTop: '2px',
                                opacity: logoHovered ? 1 : 0.7,
                                transition: 'opacity 0.3s ease'
                            }}>
                                #1 Portal Karir
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="nav-menu" style={{ 
                    display: isMobile ? 'none' : 'flex', 
                    gap: '30px', 
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button 
                        style={getMenuStyle('/')} 
                        onClick={() => navigateTo('/')} 
                        onMouseEnter={() => setHoveredMenu('/')} 
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        Beranda
                        {location.pathname === '/' && (
                            <span style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                height: '2px',
                                background: '#ea580c',
                                borderRadius: '2px'
                            }} />
                        )}
                    </button>
                    <button 
                        style={getMenuStyle('/eksplorasi')} 
                        onClick={() => navigateTo('/eksplorasi')} 
                        onMouseEnter={() => setHoveredMenu('/eksplorasi')} 
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        Lowongan
                        {location.pathname === '/eksplorasi' && (
                            <span style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                height: '2px',
                                background: '#ea580c',
                                borderRadius: '2px'
                            }} />
                        )}
                    </button>
                    
                    {/* Role-based menu untuk desktop */}
                    {renderRoleBasedMenu()}
                </div>

                {/* Right Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '15px' }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: isDark ? '#1c1917' : '#e5e5e5',
                            border: `1px solid ${isDark ? '#262626' : '#d4d4d4'}`,
                            borderRadius: '50%',
                            width: isMobile ? '36px' : '40px',
                            height: isMobile ? '36px' : '40px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            fontSize: isMobile ? '16px' : '18px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    {!isMobile && (
                        <>
                            {isAuthenticated ? (
                                <button 
                                    onClick={handleLogout} 
                                    style={{ 
                                        padding: '8px 20px', 
                                        borderRadius: '30px', 
                                        border: '1px solid #ef4444', 
                                        color: '#ef4444', 
                                        cursor: 'pointer', 
                                        background: 'transparent',
                                        fontWeight: '600',
                                        fontSize: '13px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#ef4444';
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#ef4444';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Keluar
                                </button>
                            ) : (
                                <button 
                                    onClick={() => navigateTo('/login')} 
                                    style={{ 
                                        padding: '8px 24px', 
                                        borderRadius: '30px', 
                                        border: '1px solid #ea580c', 
                                        background: hoveredMenu === '/login' ? '#ea580c' : 'transparent', 
                                        color: hoveredMenu === '/login' ? '#fff' : '#ea580c', 
                                        fontWeight: '700', 
                                        fontSize: '13px', 
                                        cursor: 'pointer', 
                                        transition: 'all 0.3s ease',
                                        boxShadow: hoveredMenu === '/login' ? '0 4px 15px rgba(234,88,12,0.3)' : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        setHoveredMenu('/login');
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        setHoveredMenu(null);
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Login
                                </button>
                            )}
                        </>
                    )}
                    
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            display: isMobile ? 'block' : 'none',
                            background: 'none',
                            border: 'none',
                            color: isDark ? '#fff' : '#1c1917',
                            fontSize: '24px',
                            cursor: 'pointer',
                            padding: '8px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? '#1c1917' : '#e5e5e5';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDark ? '#0c0a09' : '#f5f5f4',
                    zIndex: 999,
                    padding: '70px 20px 30px 20px',
                    animation: 'slideIn 0.3s ease',
                    overflowY: 'auto'
                }}>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: isDark ? '#1c1917' : '#e5e5e5',
                            border: 'none',
                            color: isDark ? '#fff' : '#1c1917',
                            fontSize: '20px',
                            cursor: 'pointer',
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ✕
                    </button>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            marginBottom: '20px',
                            paddingBottom: '20px',
                            borderBottom: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`
                        }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                background: `linear-gradient(135deg, #ea580c, #f59e0b)`,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '22px', color: '#fff' }}>⚡</span>
                            </div>
                            <div>
                                <h2 style={{ 
                                    color: isDark ? '#fef3c7' : '#1c1917', 
                                    margin: 0, 
                                    fontSize: '20px',
                                    fontWeight: '800'
                                }}>
                                    Pasukan<span style={{ color: '#ea580c' }}>Yerus</span>Solo
                                </h2>
                                <div style={{
                                    fontSize: '10px',
                                    color: '#ea580c',
                                    textAlign: 'center',
                                    marginTop: '4px'
                                }}>
                                    #1 Portal Karir
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => navigateTo('/')} 
                            style={{
                                ...getMenuStyle('/'),
                                padding: '14px 20px',
                                borderRadius: '12px',
                                background: location.pathname === '/' && isDark ? 'rgba(234,88,12,0.1)' : location.pathname === '/' && !isDark ? 'rgba(234,88,12,0.05)' : 'transparent'
                            }}
                        >
                            🏠 Beranda
                        </button>
                        <button 
                            onClick={() => navigateTo('/eksplorasi')} 
                            style={{
                                ...getMenuStyle('/eksplorasi'),
                                padding: '14px 20px',
                                borderRadius: '12px',
                                background: location.pathname === '/eksplorasi' && isDark ? 'rgba(234,88,12,0.1)' : location.pathname === '/eksplorasi' && !isDark ? 'rgba(234,88,12,0.05)' : 'transparent'
                            }}
                        >
                            🔍 Lowongan
                        </button>
                        
                        {/* Role-based menu untuk mobile */}
                        {isAuthenticated && (userRole?.toLowerCase() === 'perusahaan' || userRole === 'Perusahaan') && (
                            <>
                                <button onClick={() => navigateTo('/hrd/dashboard')} style={{ ...getMenuStyle('/hrd/dashboard'), padding: '14px 20px', borderRadius: '12px' }}>
                                    📊 Dashboard HRD
                                </button>
                                <button onClick={() => navigateTo('/hrd/branding')} style={{ ...getMenuStyle('/hrd/branding'), padding: '14px 20px', borderRadius: '12px' }}>
                                    🎨 Branding
                                </button>
                                <button onClick={() => navigateTo('/status-lamaran')} style={{ ...getMenuStyle('/status-lamaran'), padding: '14px 20px', borderRadius: '12px' }}>
                                    📋 Status Lamaran
                                </button>
                            </>
                        )}
                        
                        {isAuthenticated && (userRole?.toLowerCase() === 'pelamar' || userRole === 'Pelamar') && (
                            <>
                                <button onClick={() => navigateTo('/favorit')} style={{ ...getMenuStyle('/favorit'), padding: '14px 20px', borderRadius: '12px' }}>
                                    ⭐ Favorit Saya
                                </button>
                                <button onClick={() => navigateTo('/status-lamaran')} style={{ ...getMenuStyle('/status-lamaran'), padding: '14px 20px', borderRadius: '12px' }}>
                                    📋 Status Lamaran
                                </button>
                                <button onClick={() => navigateTo('/profile')} style={{ ...getMenuStyle('/profile'), padding: '14px 20px', borderRadius: '12px' }}>
                                    👤 Profil Saya
                                </button>
                            </>
                        )}
                        
                        {isAuthenticated && (userRole?.toLowerCase() === 'admin' || userRole === 'Admin') && (
                            <button onClick={() => navigateTo('/admin/dashboard')} style={{ ...getMenuStyle('/admin/dashboard'), padding: '14px 20px', borderRadius: '12px' }}>
                                ⚙️ Admin Panel
                            </button>
                        )}
                        
                        <div style={{
                            marginTop: '20px',
                            paddingTop: '20px',
                            borderTop: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`
                        }}>
                            {isAuthenticated ? (
                                <button 
                                    onClick={handleLogout} 
                                    style={{ 
                                        width: '100%',
                                        padding: '14px 20px', 
                                        borderRadius: '30px', 
                                        border: '1px solid #ef4444', 
                                        color: '#ef4444', 
                                        cursor: 'pointer', 
                                        background: 'transparent',
                                        fontWeight: '600',
                                        fontSize: '16px'
                                    }}
                                >
                                    🚪 Keluar
                                </button>
                            ) : (
                                <button 
                                    onClick={() => navigateTo('/login')} 
                                    style={{ 
                                        width: '100%',
                                        padding: '14px 20px', 
                                        borderRadius: '30px', 
                                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                        color: '#fff', 
                                        fontWeight: '700', 
                                        fontSize: '16px', 
                                        cursor: 'pointer', 
                                        border: 'none'
                                    }}
                                >
                                    🔑 Login / Daftar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
                    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
                }
                @media (max-width: 768px) {
                    .nav-menu { display: none !important; }
                }
                @media (max-width: 480px) {
                    nav { padding: 12px 3% !important; }
                }
            `}</style>
        </>
    );
};

export default Navbar;