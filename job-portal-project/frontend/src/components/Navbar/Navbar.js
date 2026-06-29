import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Modal from '../Modal/Modal';
import {
    HomeIcon, BriefcaseIcon, UserIcon, StarIcon, ClipboardDocumentListIcon,
    ChartBarIcon, BuildingOfficeIcon, Cog6ToothIcon, KeyIcon, BoltIcon,
    SunIcon, MoonIcon, XMarkIcon, ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Navbar = ({ isAuthenticated, handleLogout, userRole }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [logoHovered, setLogoHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isDark = theme === 'dark';

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setDrawerOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname]);

    const c = {
        bg: isDark ? 'rgba(12, 10, 9, 0.85)' : 'rgba(250, 250, 249, 0.85)',
        border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        textPrimary: isDark ? '#fef3c7' : '#1c1917',
        textSecondary: isDark ? 'rgba(214,211,209,0.5)' : 'rgba(87,83,78,0.5)',
        textMuted: isDark ? 'rgba(214,211,209,0.45)' : 'rgba(87,83,78,0.45)',
        accent: '#ea580c',
        cardBg: isDark ? '#120b06' : '#ffffff',
        drawerBg: isDark ? '#0c0a09' : '#fafaf9',
        navBg: isDark ? 'rgba(12, 10, 9, 0.88)' : 'rgba(250, 250, 249, 0.88)',
    };

    const navigateTo = (path) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(path);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        setShowSuccessModal(true);
        setTimeout(() => {
            handleLogout();
        }, 2000);
    };

    const isActive = (path) => {
        if (path === '/home') return location.pathname === '/' || location.pathname === '/home';
        return location.pathname === path;
    };

    const getMenuItems = () => {
        const items = [
            { path: '/home', label: 'Beranda', icon: HomeIcon },
            { path: '/eksplorasi', label: 'Lowongan', icon: BriefcaseIcon },
        ];

        if (isAuthenticated && userRole === 'Pelamar') {
            items.push(
                { path: '/profile', label: 'Profil', icon: UserIcon },
                { path: '/favorit', label: 'Favorit', icon: StarIcon },
                { path: '/status-lamaran', label: 'Status', icon: ClipboardDocumentListIcon },
            );
        } else if (isAuthenticated && userRole === 'Perusahaan') {
            items.push(
                { path: '/hrd/dashboard', label: 'Dashboard', icon: ChartBarIcon },
                { path: '/hrd/branding', label: 'Branding', icon: BuildingOfficeIcon },
            );
        } else if (isAuthenticated && userRole === 'Admin') {
            items.push(
                { path: '/admin/dashboard', label: 'Admin', icon: Cog6ToothIcon },
            );
        }

        return items;
    };

    const getBottomNavItems = () => {
        const items = [
            { path: '/home', icon: HomeIcon, label: 'Beranda' },
            { path: '/eksplorasi', icon: BriefcaseIcon, label: 'Lowongan' },
        ];
        if (isAuthenticated && userRole === 'Pelamar') {
            items.push({ path: '/favorit', icon: StarIcon, label: 'Favorit' });
            items.push({ path: '/profile', icon: UserIcon, label: 'Profil' });
        } else if (isAuthenticated && userRole === 'Perusahaan') {
            items.push({ path: '/hrd/dashboard', icon: ChartBarIcon, label: 'Dashboard' });
        } else if (isAuthenticated && userRole === 'Admin') {
            items.push({ path: '/admin/dashboard', icon: Cog6ToothIcon, label: 'Admin' });
        } else {
            items.push({ path: '/login', icon: KeyIcon, label: 'Login' });
        }
        return items;
    };

    const desktopMenuItems = getMenuItems();
    const bottomNavItems = getBottomNavItems();

    const drawerBtn = (item) => {
        const IconComponent = item.icon;
        return (
            <button
                key={item.path}
                onClick={() => navigateTo(item.path)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    width: '100%',
                    padding: '14px 20px',
                    background: isActive(item.path) ? 'linear-gradient(135deg, rgba(234,88,12,0.1), rgba(245,158,11,0.1))' : 'none',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: isActive(item.path) ? '700' : '500',
                    color: isActive(item.path) ? c.accent : c.textPrimary,
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                }}
                onMouseEnter={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'; }}
                onMouseLeave={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = 'none'; }}
            >
                <IconComponent style={{ width: '20px', height: '20px' }} />
                {item.label}
            </button>
        );
    };

    const desktopBtn = (item) => {
        const IconComponent = item.icon;
        return (
            <button
                key={item.path}
                style={{
                    position: 'relative',
                    background: isActive(item.path) ? 'linear-gradient(135deg, #ea580c, #f59e0b)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: isActive(item.path) ? '7px 18px' : '7px 14px',
                    borderRadius: '40px',
                    fontWeight: '800',
                    fontSize: '13px',
                    color: isActive(item.path) ? '#fff' : (hoveredMenu === item.path ? c.accent : c.textSecondary),
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap'
                }}
                onClick={() => navigateTo(item.path)}
                onMouseEnter={() => setHoveredMenu(item.path)}
                onMouseLeave={() => setHoveredMenu(null)}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}>
                    <IconComponent style={{ width: '15px', height: '15px' }} />
                    {item.label}
                </span>
            </button>
        );
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

            {isMobile ? (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        background: c.bg,
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderBottom: `1px solid ${c.border}`,
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div onClick={() => navigateTo('/home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'linear-gradient(135deg, #ea580c, #f59e0b)', borderRadius: '10px'
                            }}>
                                <BoltIcon style={{ width: '16px', height: '16px', color: '#fff' }} />
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: '900', color: c.textPrimary }}>
                                <span style={{ background: 'linear-gradient(135deg, #ea580c, #f59e0b)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>Pasukan</span>
                                <span style={{ color: '#ea580c' }}>Yerus</span>Solo
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button onClick={toggleTheme} style={{
                                width: '36px', height: '36px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s ease', color: c.textSecondary
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = c.accent; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = c.textSecondary; }}
                            >
                                {isDark ? <SunIcon style={{ width: '18px', height: '18px' }} /> : <MoonIcon style={{ width: '18px', height: '18px' }} />}
                            </button>

                            <button onClick={() => setDrawerOpen(true)} style={{
                                width: '36px', height: '36px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexDirection: 'column', gap: '3px', padding: '0 8px', transition: 'all 0.2s ease'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'; }}
                            >
                                <span style={{ width: '18px', height: '2px', background: c.textPrimary, borderRadius: '2px', display: 'block' }} />
                                <span style={{ width: '18px', height: '2px', background: c.textPrimary, borderRadius: '2px', display: 'block' }} />
                                <span style={{ width: '18px', height: '2px', background: c.textPrimary, borderRadius: '2px', display: 'block' }} />
                            </button>
                        </div>
                    </div>

                    {drawerOpen && (
                        <>
                            <div
                                onClick={() => setDrawerOpen(false)}
                                style={{
                                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                                    zIndex: 1100, animation: 'fadeIn 0.2s ease'
                                }}
                            />
                            <div style={{
                                position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px',
                                background: c.drawerBg, zIndex: 1200, padding: '20px 16px',
                                display: 'flex', flexDirection: 'column',
                                animation: 'slideIn 0.25s ease',
                                boxShadow: '4px 0 20px rgba(0,0,0,0.2)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 4px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: '900', color: c.textPrimary }}>
                                        Menu
                                    </span>
                                    <button onClick={() => setDrawerOpen(false)} style={{
                                        width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                                        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                        cursor: 'pointer', fontSize: '16px', color: c.textSecondary,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <XMarkIcon style={{ width: '16px', height: '16px' }} />
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                                    {desktopMenuItems.map(drawerBtn)}
                                </div>

                                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {isAuthenticated ? (
                                        <button onClick={handleLogoutClick} style={{
                                            display: 'flex', alignItems: 'center', gap: '14px', width: '100%',
                                            padding: '14px 20px', background: 'none', border: 'none', borderRadius: '12px',
                                            cursor: 'pointer', fontSize: '16px', fontWeight: '500',
                                            color: '#ef4444', transition: 'all 0.2s ease', textAlign: 'left'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                        >
                                            <ArrowLeftOnRectangleIcon style={{ width: '20px', height: '20px' }} />
                                            Keluar
                                        </button>
                                    ) : (
                                        <button onClick={() => navigateTo('/login')} style={{
                                            display: 'flex', alignItems: 'center', gap: '14px', width: '100%',
                                            padding: '14px 20px', background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                            border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '16px',
                                            fontWeight: '700', color: '#fff', textAlign: 'left', justifyContent: 'center'
                                        }}>
                                            <KeyIcon style={{ width: '20px', height: '20px' }} />
                                            Login
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <div style={{
                        position: 'fixed',
                        bottom: '16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        background: c.navBg,
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${c.border}`,
                        borderRadius: '50px',
                        padding: '4px 6px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2px',
                        boxShadow: isDark
                            ? '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
                            : '0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                        maxWidth: 'calc(100vw - 32px)',
                    }}>
                        {bottomNavItems.map(item => {
                            const IconComponent = item.icon;
                            const active = isActive(item.path);
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigateTo(item.path)}
                                    style={{
                                        position: 'relative',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: active ? '6px 10px' : '6px 8px',
                                        borderRadius: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px',
                                        fontWeight: '800',
                                        fontSize: '10px',
                                        color: active ? '#fff' : c.textMuted,
                                        transition: 'all 0.2s ease',
                                        flexShrink: 0,
                                        minWidth: active ? 'auto' : '32px',
                                        minHeight: '32px',
                                        lineHeight: 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.color = c.accent;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.color = c.textMuted;
                                        }
                                    }}
                                >
                                    {active && (
                                        <span style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '30px',
                                            background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                            zIndex: 0,
                                            transition: 'all 0.2s ease'
                                        }} />
                                    )}
                                    <IconComponent style={{
                                        width: '16px', height: '16px',
                                        position: 'relative', zIndex: 1
                                    }} />
                                    {active && (
                                        <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <style>{`
                        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
                        body { padding-bottom: 80px !important; padding-top: 56px !important; }
                    `}</style>
                </>
            ) : (
                <>
                    <div style={{
                        position: 'fixed',
                        top: '16px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 1000,
                        pointerEvents: 'none',
                        padding: '0 20px'
                    }}>
                        <div style={{
                            pointerEvents: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: c.bg,
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: `1px solid ${c.border}`,
                            borderRadius: '60px',
                            padding: '6px 8px',
                            boxShadow: isDark
                                ? '0 8px 32px rgba(0,0,0,0.4)'
                                : '0 8px 32px rgba(0,0,0,0.1)',
                        }}>
                            <div
                                onClick={() => navigateTo('/home')}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 10px 4px 6px',
                                    borderRadius: '40px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    setLogoHovered(true);
                                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
                                }}
                                onMouseLeave={(e) => {
                                    setLogoHovered(false);
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                <div style={{
                                    width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #ea580c, #f59e0b)', borderRadius: '50%',
                                    transform: logoHovered ? 'rotate(5deg) scale(1.05)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <BoltIcon style={{ width: '13px', height: '13px', color: '#fff' }} />
                                </div>
                                <span style={{
                                    fontSize: '12px', fontWeight: '900', letterSpacing: '-0.3px', whiteSpace: 'nowrap'
                                }}>
                                    <span style={{ background: 'linear-gradient(135deg, #ea580c, #f59e0b)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>Pasukan</span>
                                    <span style={{ color: '#ea580c' }}>Yerus</span>
                                    <span style={{ color: c.textPrimary }}>Solo</span>
                                </span>
                            </div>

                            <div style={{ width: '1px', height: '22px', background: c.border }} />

                            {desktopMenuItems.map(desktopBtn)}

                            <div style={{ width: '1px', height: '22px', background: c.border }} />

                            <button
                                onClick={toggleTheme}
                                style={{
                                    width: '34px', height: '34px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                                    background: 'none', fontSize: '15px', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', transition: 'all 0.3s ease', flexShrink: 0,
                                    color: c.textSecondary
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = c.accent; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = c.textSecondary; }}
                            >
                                {isDark ? <SunIcon style={{ width: '15px', height: '15px' }} /> : <MoonIcon style={{ width: '15px', height: '15px' }} />}
                            </button>

                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogoutClick}
                                    style={{
                                        padding: '5px 12px', borderRadius: '40px', border: `1px solid ${isDark ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                        cursor: 'pointer', fontWeight: '700', fontSize: '12px', color: '#ef4444',
                                        transition: 'all 0.3s ease', flexShrink: 0, whiteSpace: 'nowrap', background: 'transparent'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}
                                >
                                    Keluar
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigateTo('/login')}
                                    style={{
                                        padding: '5px 14px', borderRadius: '40px', border: 'none',
                                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                        color: '#fff', fontWeight: '800', fontSize: '12px',
                                        cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0, whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(234,88,12,0.3)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>

                    <style>{`
                        body { padding-top: 76px !important; }
                    `}</style>
                </>
            )}
        </>
    );
};

export default Navbar;
