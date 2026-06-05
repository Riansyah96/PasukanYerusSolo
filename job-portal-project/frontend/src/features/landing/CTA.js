import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const CTA = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    
    const colors = { 
        textMain: isDark ? '#fef3c7' : '#1c1917', 
        accent: '#ea580c', 
        border: isDark ? '1px solid #262626' : '1px solid #e5e5e5',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        bg: isDark ? '#080402' : '#f5f5f4'
    };

    return (
        <section style={{ 
            padding: '80px 20px', 
            background: colors.bg, 
            textAlign: 'center', 
            borderTop: colors.border, 
            position: 'relative', 
            overflow: 'hidden',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 70%)',
                animation: 'pulse 8s ease-in-out infinite',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ 
                    color: colors.textMain, 
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
                    marginBottom: '16px', 
                    fontWeight: '800', 
                    letterSpacing: '-0.02em' 
                }}>
                    🚀 <span style={{ color: colors.accent }}>Siap Melangkah</span> Menuju Karir Impian?
                </h2>
                <p style={{ 
                    color: colors.textMuted, 
                    marginBottom: '32px', 
                    fontSize: 'clamp(14px, 4vw, 16px)', 
                    maxWidth: '500px', 
                    margin: '0 auto 32px auto',
                    padding: '0 15px'
                }}>
                    Bergabunglah dengan ribuan profesional yang telah sukses mendapatkan pekerjaan terbaik melalui platform kami
                </p>
                <button 
                    onClick={() => navigate('/register')}
                    style={{ 
                        padding: 'clamp(12px, 4vw, 14px) clamp(30px, 8vw, 40px)', 
                        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
                        color: '#fff', 
                        fontWeight: '800', 
                        borderRadius: '12px', 
                        border: 'none', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease', 
                        boxShadow: '0 4px 15px rgba(234, 88, 12, 0.3)',
                        fontSize: 'clamp(14px, 4vw, 16px)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(234, 88, 12, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(234, 88, 12, 0.3)';
                    }}
                    onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onTouchEnd={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    Daftar Sekarang → 
                </button>
            </div>
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                @media (max-width: 768px) {
                    .cta-section {
                        padding: 60px 16px;
                    }
                }
            `}</style>
        </section>
    );
};
export default CTA;