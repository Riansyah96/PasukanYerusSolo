import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const Hero = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    // Ganti URL gambar sesuai kebutuhan
    const backgroundImageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
    // Alternatif lain:
    // const backgroundImageUrl = '/images/hero-bg.jpg'; // jika menyimpan di public/images

    return (
        <section style={{ 
            position: 'relative',
            padding: '60px 20px', 
            textAlign: 'center', 
            color: '#fff',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed' // efek parallax sederhana
        }}>
            {/* Overlay gelap/terang sesuai tema */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isDark 
                    ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
                zIndex: 1
            }} />

            {/* Elemen dekoratif (lingkaran blur) tetap dipertahankan */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite',
                zIndex: 2
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite reverse',
                zIndex: 2
            }} />

            {/* Konten utama */}
            <div style={{ 
                maxWidth: '900px', 
                margin: '0 auto', 
                position: 'relative', 
                zIndex: 3,
                width: '100%'
            }}>
                <span style={{ 
                    color: '#ea580c', 
                    fontWeight: '800', 
                    letterSpacing: '2px', 
                    fontSize: 'clamp(10px, 3vw, 13px)', 
                    textTransform: 'uppercase', 
                    background: 'rgba(0,0,0,0.4)', 
                    backdropFilter: 'blur(4px)',
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
                    wordBreak: 'break-word',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                    Wujudkan <br/> <span style={{ color: '#ea580c' }}>Potensi Terbesarmu</span>
                </h1>
                <p style={{ 
                    color: '#f0f0f0', 
                    fontSize: 'clamp(14px, 4vw, 18px)', 
                    marginBottom: '35px', 
                    lineHeight: '1.6', 
                    maxWidth: '600px', 
                    margin: '0 auto 35px auto',
                    padding: '0 15px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.2)'
                }}>
                    Temukan ribuan lowongan dari perusahaan terpercaya, 
                    mulai karirmu hari ini bersama <strong style={{ color: '#ea580c' }}>PasukanYerusSolo</strong>
                </p>
                <button 
                    onClick={() => navigate('/eksplorasi')}
                    style={{ 
                        padding: 'clamp(12px, 4vw, 16px) clamp(24px, 8vw, 48px)', 
                        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
                        border: 'none', 
                        borderRadius: '12px', 
                        color: '#fff', 
                        fontWeight: '800', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease', 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
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