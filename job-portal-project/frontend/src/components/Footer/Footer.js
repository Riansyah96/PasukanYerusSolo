import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Footer = () => {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isDark = theme === 'dark';

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setIsSubmitted(true);
            setEmail('');
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    return (
        <footer style={{ 
            background: isDark ? '#0c0a09' : '#f5f5f4', 
            color: isDark ? '#a3a3a3' : '#57534e', 
            padding: '60px 20px', 
            borderTop: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
            marginTop: 'auto',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
        }}>
            {/* Background decorative element */}
            <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '50px',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
                padding: '0 15px'
            }}>
                {/* Bagian Brand */}
                <div>
                    <h2 style={{ 
                        color: '#ea580c', 
                        margin: '0 0 20px 0',
                        fontSize: '24px',
                        fontWeight: '800',
                        letterSpacing: '-0.5px',
                        position: 'relative',
                        display: 'inline-block'
                    }}>
                        PasukanYerusSolo
                        <span style={{
                            position: 'absolute',
                            bottom: '-8px',
                            left: '0',
                            width: '40px',
                            height: '3px',
                            background: '#ea580c',
                            borderRadius: '2px'
                        }} />
                    </h2>
                    <p style={{ 
                        fontSize: '14px', 
                        lineHeight: '1.7',
                        marginBottom: '20px',
                        maxWidth: '250px'
                    }}>
                        Portal lowongan kerja terpercaya untuk menghubungkan talenta terbaik dengan peluang karier impian di Solo Raya.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
                        {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                            <a 
                                key={social}
                                href="#" 
                                style={{ 
                                    color: isDark ? '#a3a3a3' : '#57534e', 
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#ea580c';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = isDark ? '#a3a3a3' : '#57534e';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {social === 'facebook' && '📘'}
                                {social === 'twitter' && '🐦'}
                                {social === 'linkedin' && '🔗'}
                                {social === 'instagram' && '📷'}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bagian Link */}
                <div>
                    <h4 style={{ 
                        color: isDark ? '#fff' : '#1c1917', 
                        marginBottom: '20px',
                        fontSize: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>Navigasi</h4>
                    <ul style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        fontSize: '14px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '12px' 
                    }}>
                        {['Tentang Kami', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'Karier', 'FAQ'].map((item, idx) => (
                            <li key={idx}>
                                <a 
                                    href="#" 
                                    style={{ 
                                        color: isDark ? '#a3a3a3' : '#57534e', 
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        display: 'inline-block'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#ea580c';
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = isDark ? '#a3a3a3' : '#57534e';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bagian Kontak */}
                <div>
                    <h4 style={{ 
                        color: isDark ? '#fff' : '#1c1917', 
                        marginBottom: '20px',
                        fontSize: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>Kontak Kami</h4>
                    <ul style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        fontSize: '13px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '12px' 
                    }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span>📍</span> Jl. Slamet Riyadi No. 123, Solo
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span>📧</span> info@pasukanYerusSolo.com
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span>📞</span> (0271) 1234 5678
                        </li>
                    </ul>
                </div>

                {/* Bagian Newsletter */}
                <div>
                    <h4 style={{ 
                        color: isDark ? '#fff' : '#1c1917', 
                        marginBottom: '20px',
                        fontSize: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>Berlangganan</h4>
                    <p style={{ fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
                        Dapatkan info lowongan terbaru langsung ke email Anda setiap minggu.
                    </p>
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input 
                            type="email" 
                            placeholder="Masukkan email Anda" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ 
                                padding: '12px 16px', 
                                borderRadius: '10px', 
                                border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`, 
                                background: isDark ? '#171717' : '#ffffff',
                                color: isDark ? '#fff' : '#1c1917',
                                flex: 1,
                                minWidth: '180px',
                                fontSize: '13px',
                                transition: 'all 0.3s ease',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#ea580c';
                                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(234,88,12,0.2)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                        <button 
                            type="submit"
                            style={{ 
                                padding: '12px 24px', 
                                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                                color: '#fff', 
                                borderRadius: '10px', 
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '13px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 5px 15px rgba(234,88,12,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {isSubmitted ? '✓ Terkirim!' : 'Berlangganan'}
                        </button>
                    </form>
                    {isSubmitted && (
                        <div style={{
                            marginTop: '12px',
                            padding: '8px 12px',
                            background: 'rgba(34,197,94,0.1)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: '#4ade80',
                            textAlign: 'center',
                            animation: 'fadeInUp 0.3s ease'
                        }}>
                            ✅ Berhasil berlangganan!
                        </div>
                    )}
                </div>
            </div>

            {/* Copyright */}
            <div style={{ 
                textAlign: 'center', 
                marginTop: '50px', 
                paddingTop: '25px', 
                borderTop: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                fontSize: '12px',
                position: 'relative',
                zIndex: 1
            }}>
                <p style={{ margin: 0 }}>
                    &copy; {new Date().getFullYear()} PasukanYerusSolo. All Rights Reserved.
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: isDark ? '#525252' : '#a3a3a3' }}>
                    Membangun karir impian Anda bersama perusahaan terbaik di Indonesia
                </p>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @media (max-width: 768px) {
                    footer {
                        padding: 40px 16px !important;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;