import React, { useState } from 'react';

const ThemeToggle = ({ onThemeChange }) => {
    const [darkMode, setDarkMode] = useState(false);

    const isDark = darkMode;

    const styles = {
        // Container pembungkus utama tetap rapi di pojok kanan atas
        topBar: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '5px 0',
            boxSizing: 'border-box'
        },
        // Track capsule utama sebagai latar tombol geser
        toggleTrack: {
            position: 'relative',
            width: '64px',
            height: '34px',
            borderRadius: '100px',
            // Perpaduan warna bernuansa kopi hangat (light) dan espresso pekat (dark)
            backgroundColor: isDark ? '#1d0f05' : '#f1e4d8',
            border: isDark ? '1px solid rgba(251, 146, 60, 0.2)' : '1px solid #e7d5c3',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            boxSizing: 'border-box',
            boxShadow: isDark 
                ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
                : 'inset 0 2px 4px rgba(124, 45, 18, 0.05)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        // Lingkaran/Dot penunjuk status (Thumb) yang bergeser
        toggleThumb: {
            position: 'absolute',
            left: isDark ? 'calc(100% - 30px)' : '4px', // Bergeser mulus berdasarkan state aktif
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            // Efek gradasi emas-oranye premium
            background: 'linear-gradient(135deg, #ea580c 0%, #facc15 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: isDark 
                ? '0 2px 8px rgba(234, 88, 12, 0.5)' 
                : '0 2px 6px rgba(234, 88, 12, 0.3)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: '13px'
        },
        // Label teks pendukung di sebelah tombol biar makin estetik (opsional)
        themeLabel: {
            marginRight: '10px',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: isDark ? '#fb923c' : '#7c2d12',
            transition: 'color 0.3s ease',
            userSelect: 'none'
        }
    };

    const handleToggle = () => {
        const nextState = !darkMode;
        setDarkMode(nextState);
        if (onThemeChange) {
            onThemeChange(nextState ? 'dark' : 'light');
        }
    };

    return (
        <div style={styles.topBar}>
            {/* Teks indikator nama mode aktif */}
            <span style={styles.themeLabel}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            
            {/* Track Tombol Utama */}
            <div onClick={handleToggle} style={styles.toggleTrack} title="Ganti Tema">
                {/* Bagian lingkaran penunjuk yang bergeser membawa emoji */}
                <div style={styles.toggleThumb}>
                    {isDark ? '🌙' : '☀️'}
                </div>
            </div>
        </div>
    );
};

export default ThemeToggle;