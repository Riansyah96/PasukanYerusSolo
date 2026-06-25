import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Modal from '../Modal/Modal';

const Navbar = ({ isAuthenticated, handleLogout, userRole }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [activeMenu, setActiveMenu] = useState('/');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const isDark = theme === 'dark';

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigateTo = (path) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(path);
        setActiveMenu(path);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        handleLogout();
        setShowLogoutModal(false);
        setShowSuccessModal(true);
        setTimeout(() => {
            setShowSuccessModal(false);
        }, 2000);
    };

    const menuItems = [
        { path: '/', label: 'Beranda', icon: '🏠' },
        { path: '/eksplorasi', label: 'Lowongan', icon: '💼' },
    ];

    const getRoleBasedPath = () => {
        if (!isAuthenticated) return '/login';
        if (userRole === 'Perusahaan') return '/hrd/dashboard';
        if (userRole === 'Pelamar') return '/profile';
        if (userRole === 'Admin') return '/admin/dashboard';
        return '/login';
    };

    const getRoleBasedIcon = () => {
        if (!isAuthenticated) return '🔑';
        if (userRole === 'Perusahaan') return '📋';
        if (userRole === 'Pelamar') return '👤';
        if (userRole === 'Admin') return '⚙️';
        return '🔑';
    };

    const getMenuItemColor = (path) => {
        const isActive = activeMenu === path;
        if (isActive) return '#ea580c';
        return isDark ? '#ffffff' : '#1c1917';
    };

    return (
        <>
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Konfirmasi Logout"
                message="Apakah Anda yakin ingin keluar dari akun Anda?"
                type="warning"
                onConfirm={confirmLogout}
            />

            <Modal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Berhasil Logout"
                message="Anda telah berhasil keluar dari akun. Sampai jumpa kembali!"
                type="success"
            />

            <div style={{
                position: 'fixed',
                bottom: isMobile ? '16px' : 'auto',
                top: isMobile ? 'auto' : '16px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                zIndex: 1000,
                pointerEvents: 'none'
            }}>
                <div style={{ pointerEvents: 'auto' }}>
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '4px' : '6px',
                    background: isDark ? 'rgba(12, 10, 9, 0.85)' : 'rgba(245, 245, 244, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${isDark ? 'rgba(38,38,38,0.5)' : 'rgba(229,229,229,0.5)'}`,
                    borderRadius: '60px',
                    overflow: 'hidden',
                    padding: isMobile ? '6px 8px' : '8px 12px',
                    boxShadow: isDark
                        ? '0 8px 32px rgba(0,0,0,0.4)'
                        : '0 8px 32px rgba(0,0,0,0.1)',
                }}>
                    {isMobile ? (
                        <>
                            <button
                                onClick={toggleTheme}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '17px',
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'none';
                                }}
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>

                            {menuItems.map((item) => {
                                const isActive = activeMenu === item.path;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => navigateTo(item.path)}
                                        style={{
                                            position: 'relative',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '8px 12px',
                                            borderRadius: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontWeight: '800',
                                            fontSize: '12px',
                                            color: isActive ? '#fff' : getMenuItemColor(item.path),
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.color = '#ea580c';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.color = getMenuItemColor(item.path);
                                            }
                                        }}
                                    >
                                        {isActive && (
                                            <span style={{
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: '40px',
                                                background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                                zIndex: 0
                                            }} />
                                        )}
                                        <span style={{ position: 'relative', zIndex: 1, fontSize: '16px' }}>
                                            {item.icon}
                                        </span>
                                    </button>
                                );
                            })}

                            {isAuthenticated ? (
                                <button
                                    onClick={() => navigateTo(getRoleBasedPath())}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '17px',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'none';
                                    }}
                                >
                                    {getRoleBasedIcon()}
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigateTo('/login')}
                                    style={{
                                        padding: '7px 14px',
                                        borderRadius: '40px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                        color: '#fff',
                                        fontWeight: '800',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Login
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <div
                                onClick={() => navigateTo('/')}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4px 8px 4px 6px',
                                    borderRadius: '40px',
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                    borderRadius: '50%',
                                    flexShrink: 0
                                }}>
                                    <span style={{ fontSize: '13px', fontWeight: '900', color: '#fff' }}>
                                        ⚡
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '900',
                                    letterSpacing: '-0.3px',
                                    whiteSpace: 'nowrap',
                                    marginLeft: '4px'
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
                                </span>
                            </div>

                            <div style={{
                                width: '1px',
                                height: '22px',
                                background: isDark ? 'rgba(38,38,38,0.5)' : 'rgba(229,229,229,0.5)',
                                flexShrink: 0,
                                margin: '0 1px'
                            }} />

                            {menuItems.map((item) => {
                                const isActive = activeMenu === item.path;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => navigateTo(item.path)}
                                        style={{
                                            position: 'relative',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '6px 14px',
                                            borderRadius: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontWeight: '800',
                                            fontSize: '13px',
                                            color: isActive ? '#fff' : getMenuItemColor(item.path),
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.color = '#ea580c';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.color = getMenuItemColor(item.path);
                                            }
                                        }}
                                    >
                                        {isActive && (
                                            <span style={{
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: '40px',
                                                background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                                zIndex: 0
                                            }} />
                                        )}
                                        <span style={{ position: 'relative', zIndex: 1, fontSize: '15px' }}>
                                            {item.icon}
                                        </span>
                                        <span style={{ position: 'relative', zIndex: 1 }}>
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}

                            <div style={{
                                width: '1px',
                                height: '22px',
                                background: isDark ? 'rgba(38,38,38,0.5)' : 'rgba(229,229,229,0.5)',
                                flexShrink: 0,
                                margin: '0 1px'
                            }} />

                            <button
                                onClick={toggleTheme}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '15px',
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'none';
                                }}
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>

                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogoutClick}
                                    style={{
                                        background: 'none',
                                        border: `1px solid ${isDark ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                        cursor: 'pointer',
                                        padding: '5px 12px',
                                        borderRadius: '40px',
                                        fontWeight: '700',
                                        fontSize: '12px',
                                        color: '#ef4444',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0,
                                        whiteSpace: 'nowrap'
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
                                    Keluar
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigateTo('/login')}
                                    style={{
                                        padding: '5px 14px',
                                        borderRadius: '40px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                        color: '#fff',
                                        fontWeight: '800',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0,
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(234,88,12,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    Login
                                </button>
                            )}
                        </>
                    )}
                </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;
