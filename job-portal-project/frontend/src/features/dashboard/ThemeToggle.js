import React, { useState } from 'react';

const ThemeToggle = ({ onThemeChange }) => {
    const [darkMode, setDarkMode] = useState(false);

    const handleToggle = () => {
        const nextMode = !darkMode;
        setDarkMode(nextMode);
        onThemeChange(nextMode ? 'dark' : 'light'); // Mengirim nilai state baru ke komponen induk
    };

    return (
        <div style={{ padding: '10px', textAlign: 'right' }}>
            <button onClick={handleToggle}>
                {darkMode ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
            </button>
        </div>
    );
};

export default ThemeToggle;