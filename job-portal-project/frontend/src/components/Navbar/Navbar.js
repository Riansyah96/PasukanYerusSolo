import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ activeMenu, setActiveMenu, isAuthenticated, handleLogout }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // State untuk buka/tutup menu mobile

    const navigateTo = (path, menuId) => {
        if (setActiveMenu) setActiveMenu(menuId);
        navigate(path);
        setIsOpen(false); // Tutup menu setelah diklik
    };

    const menuStyle = {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '14px'
    };

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

            {/* Tombol Hamburger (Hanya muncul di mobile) */}
            <button 
                style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '24px' }}
                className="hamburger"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            {/* Menu List */}
            <div className="nav-menu" style={{ 
                display: 'flex', 
                gap: '20px', 
                alignItems: 'center'
            }}>
                <button onClick={() => navigateTo('/', 'home')} style={menuStyle}>Home</button>
                <button onClick={() => navigateTo('/eksplorasi', 'eksplorasi')} style={menuStyle}>Eksplorasi</button>
                
                {isAuthenticated ? (
                    <>
                        <button onClick={() => navigateTo('/favorit', 'favorit')} style={menuStyle}>Favorit</button>
                        <button onClick={handleLogout} style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>Keluar</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')} style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #ea580c', background: 'transparent', color: '#ea580c', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>Login</button>
                )}
            </div>

            {/* Tambahkan CSS Media Query untuk Mobile */}
            <style>{`
                @media (max-width: 768px) {
                    .hamburger { display: block !important; }
                    .nav-menu { 
                        display: ${isOpen ? 'flex !important' : 'none !important'};
                        flex-direction: column;
                        position: absolute;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background: #0c0a09;
                        padding: 20px 0;
                        border-bottom: 1px solid #262626;
                        gap: 15px;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;