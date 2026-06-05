import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Hero = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    
    const colors = { 
        textMain: isDark ? '#fef3c7' : '#1c1917', 
        accent: '#ea580c', 
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        bg: isDark ? '#080402' : '#f5f5f4'
    };
    
    return (
        <section style={{ 
            padding: '60px 20px', 
            textAlign: 'center', 
            background: colors.bg, 
            color: colors.textMain, 
            position: 'relative', 
            overflow: 'hidden',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite reverse',
            }} />
            <div style={{ 
                maxWidth: '900px', 
                margin: '0 auto', 
                position: 'relative', 
                zIndex: 1,
                width: '100%'
            }}>
                <span style={{ 
                    color: colors.accent, 
                    fontWeight: '800', 
                    letterSpacing: '2px', 
                    fontSize: 'clamp(10px, 3vw, 13px)', 
                    textTransform: 'uppercase', 
                    background: isDark ? 'rgba(234,88,12,0.1)' : 'rgba(234,88,12,0.15)', 
                    padding: '6px 14px', 
                    borderRadius: '30px', 
                    display: 'inline-block', 
                    marginBottom: '20px',
                    whiteSpace: 'nowrap'
                }}>
                    ✨ #1 Portal Karir di Solo Raya
                </span>
                <h1 style={{ 
                    fontSize: 'clamp(2rem, 8vw, 4rem)', 
                    margin: '15px 0', 
                    lineHeight: '1.2', 
                    fontWeight: '900', 
                    letterSpacing: '-0.02em',
                    wordBreak: 'break-word'
                }}>
                    Wujudkan <br/> <span style={{ color: colors.accent }}>Potensi Terbesarmu</span>
                </h1>
                <p style={{ 
                    color: colors.textMuted, 
                    fontSize: 'clamp(14px, 4vw, 18px)', 
                    marginBottom: '35px', 
                    lineHeight: '1.6', 
                    maxWidth: '600px', 
                    margin: '0 auto 35px auto',
                    padding: '0 15px'
                }}>
                    Temukan ribuan lowongan dari perusahaan terpercaya, 
                    mulai karirmu hari ini bersama <strong style={{ color: colors.accent }}>PasukanYerusSolo</strong>
                </p>
                <button 
                    style={{ 
                        padding: 'clamp(12px, 4vw, 16px) clamp(24px, 8vw, 48px)', 
                        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
                        border: 'none', 
                        borderRadius: '12px', 
                        color: '#fff', 
                        fontWeight: '800', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease', 
                        boxShadow: '0 4px 20px rgba(234, 88, 12, 0.3)', 
                        fontSize: 'clamp(14px, 4vw, 16px)',
                        width: 'auto',
                        minWidth: '200px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(234, 88, 12, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 88, 12, 0.3)';
                    }}
                    onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onTouchEnd={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    Mulai Eksplorasi →
                </button>
            </div>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                
                @media (max-width: 768px) {
                    .hero-section {
                        padding: 40px 16px;
                    }
                }
                
                @media (max-width: 480px) {
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) translateX(0px); }
                        50% { transform: translateY(-10px) translateX(5px); }
                    }
                }
            `}</style>
        </section>
    );
};
export default Hero;