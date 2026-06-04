// frontend/src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeMenu, setActiveMenu, isAuthenticated, handleLogout }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    // State untuk melacak elemen mana yang sedang di-hover
    const [hoveredMenu, setHoveredMenu] = useState(null);

    const navigateTo = (path, menuId) => {
        if (setActiveMenu) setActiveMenu(menuId);
        navigate(path);
        setIsOpen(false);
    };

    // Style dasar untuk menu
    const getMenuStyle = (menuId) => ({
        background: 'none',
        border: 'none',
        color: hoveredMenu === menuId ? '#ea580c' : '#fff', // Oranye saat di-hover
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'color 0.3s ease' // Animasi transisi halus
    });

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px 5%', 
            background: '#0c0a09', 
            borderBottom: '1px solid #262626',
            position: 'relative'
        }}>
            {/* Logo */}
            <div onClick={() => navigateTo('/', 'home')} style={{ cursor: 'pointer' }}>
                <h1 style={{ color: '#ea580c', margin: 0, fontSize: '20px' }}>PasukanYerusSolo</h1>
            </div>

            {/* Menu */}
            <div className="nav-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button 
                    onClick={() => navigateTo('/', 'home')} 
                    style={getMenuStyle('home')}
                    onMouseEnter={() => setHoveredMenu('home')}
                    onMouseLeave={() => setHoveredMenu(null)}
                >Home</button>
                <button 
                    onClick={() => navigateTo('/eksplorasi', 'eksplorasi')} 
                    style={getMenuStyle('eksplorasi')}
                    onMouseEnter={() => setHoveredMenu('eksplorasi')}
                    onMouseLeave={() => setHoveredMenu(null)}
                >Eksplorasi</button>
                
                {isAuthenticated ? (
                    <>
                        <button 
                            onClick={() => navigateTo('/favorit', 'favorit')} 
                            style={getMenuStyle('favorit')}
                            onMouseEnter={() => setHoveredMenu('favorit')}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >Favorit</button>
                        <button 
                            onClick={handleLogout} 
                            style={{ 
                                padding: '6px 16px', borderRadius: '20px', border: '1px solid #ef4444', 
                                background: hoveredMenu === 'logout' ? '#ef4444' : 'transparent', 
                                color: hoveredMenu === 'logout' ? '#fff' : '#ef4444', 
                                fontWeight: '700', fontSize: '12px', cursor: 'pointer', transition: '0.3s' 
                            }}
                            onMouseEnter={() => setHoveredMenu('logout')}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >Keluar</button>
                    </>
                ) : (
                    <button 
                        onClick={() => navigate('/login')} 
                        style={{ 
                            padding: '6px 16px', borderRadius: '20px', 
                            border: '1px solid #ea580c', 
                            background: hoveredMenu === 'login' ? '#ea580c' : 'transparent', 
                            color: hoveredMenu === 'login' ? '#fff' : '#ea580c', 
                            fontWeight: '700', fontSize: '12px', cursor: 'pointer', transition: '0.3s' 
                        }}
                        onMouseEnter={() => setHoveredMenu('login')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >Login</button>
                )}
            </div>
            
            {/* Gaya Hamburger Menu (Tetap dipertahankan) */}
            <style>{`
                @media (max-width: 768px) {
                    .nav-menu { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;