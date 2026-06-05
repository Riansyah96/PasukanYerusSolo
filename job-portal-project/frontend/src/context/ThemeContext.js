import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.style.backgroundColor = theme === 'dark' ? '#0c0a09' : '#f5f5f4';
        document.body.style.color = theme === 'dark' ? '#fff' : '#1c1917';
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};