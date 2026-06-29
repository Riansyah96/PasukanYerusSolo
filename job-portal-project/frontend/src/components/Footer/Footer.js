import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { BoltIcon, CheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Footer = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isDark = theme === 'dark';

    const navLinks = [
        { label: 'Tentang Kami', path: '/tentang-kami' },
        { label: 'Kebijakan Privasi', path: '/kebijakan-privasi' },
        { label: 'Syarat & Ketentuan', path: '/syarat-ketentuan' },
        { label: 'FAQ', path: '/faq' },
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setIsSubmitted(true);
            setEmail('');
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    const c = {
        bg: isDark ? '#0c0a09' : '#fafaf9',
        textSecondary: isDark ? '#a8a29e' : '#57534e',
        textMuted: isDark ? '#57534e' : '#a3a3a3',
        textPrimary: isDark ? '#fef3c7' : '#1c1917',
        border: isDark ? 'rgba(41,37,36,0.6)' : 'rgba(231,229,228,0.6)',
        inputBg: isDark ? '#1c1917' : '#ffffff',
        accent: '#ea580c',
        accentGrad: 'linear-gradient(135deg, #ea580c, #f59e0b)'
    };

    const navigateTo = (path) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(path);
    };

    const SocialIcon = ({ path, label }) => (
        <span role="button" tabIndex={0} aria-label={label} style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: isDark ? '#1c1917' : '#e7e5e4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s ease',
            color: c.textSecondary
        }}
            onMouseEnter={(e) => { e.currentTarget.style.background = c.accentGrad; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? '#1c1917' : '#e7e5e4'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.color = c.textSecondary; }}
        >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d={path} /></svg>
        </span>
    );

    return (
        <footer style={{
            background: c.bg,
            borderTop: `1px solid ${c.border}`,
            marginTop: 'auto',
            position: 'relative',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                height: '3px',
                background: `${c.accentGrad}`,
                backgroundSize: '200% 100%',
                animation: 'gradientMove 3s ease infinite'
            }} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1.4fr',
                gap: '48px',
                maxWidth: '1120px',
                margin: '0 auto',
                padding: '56px 24px 48px'
            }}>
                <div>
                    <h2 style={{
                        color: c.textPrimary, margin: 0,
                        fontSize: '22px', fontWeight: '900',
                        letterSpacing: '-0.5px'
                    }}>
                        <BoltIcon style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} /> <span style={{
                            background: c.accentGrad,
                            backgroundClip: 'text', WebkitBackgroundClip: 'text',
                            color: 'transparent'
                        }}>Pasukan</span>YerusSolo
                    </h2>
                    <p style={{
                        color: c.textSecondary, fontSize: '14px',
                        lineHeight: '1.8', margin: '12px 0 0',
                        maxWidth: '320px'
                    }}>
                        Portal lowongan kerja terpercaya untuk menghubungkan talenta terbaik dengan peluang karier impian di Solo Raya.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                        <SocialIcon
                            path="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            label="Facebook"
                        />
                        <SocialIcon
                            path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                            label="Twitter"
                        />
                        <SocialIcon
                            path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                            label="LinkedIn"
                        />
                        <SocialIcon
                            path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            label="Instagram"
                        />
                    </div>
                </div>

                <div>
                    <h4 style={{
                        color: c.textPrimary, margin: 0,
                        fontSize: '13px', fontWeight: '800',
                        textTransform: 'uppercase', letterSpacing: '1.5px'
                    }}>Tautan</h4>
                    <div style={{
                        width: '24px', height: '2px',
                        background: c.accentGrad,
                        borderRadius: '1px', marginTop: '10px', marginBottom: '16px'
                    }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {navLinks.map((item, i) => (
                            <span key={i} onClick={() => navigateTo(item.path)} style={{
                                color: c.textSecondary, fontSize: '14px',
                                cursor: 'pointer', textDecoration: 'none',
                                transition: 'all 0.2s ease', display: 'inline-block'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = c.accent; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = c.textSecondary; e.currentTarget.style.transform = 'translateX(0)'; }}
                            >{item.label}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 style={{
                        color: c.textPrimary, margin: 0,
                        fontSize: '13px', fontWeight: '800',
                        textTransform: 'uppercase', letterSpacing: '1.5px'
                    }}>Newsletter</h4>
                    <div style={{
                        width: '24px', height: '2px',
                        background: c.accentGrad,
                        borderRadius: '1px', marginTop: '10px', marginBottom: '16px'
                    }} />
                    <p style={{ color: c.textSecondary, fontSize: '13px', lineHeight: '1.6', margin: '0 0 14px' }}>
                        Dapatkan info lowongan terbaru langsung ke email Anda setiap minggu.
                    </p>
                    <form onSubmit={handleSubscribe} style={{
                        display: 'flex', borderRadius: '10px',
                        border: `1px solid ${c.border}`,
                        overflow: 'hidden', transition: 'all 0.2s ease'
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; }}
                    >
                        <input type="email" placeholder="Masukkan email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                flex: 1, padding: '11px 14px', border: 'none',
                                background: c.inputBg, color: c.textPrimary,
                                fontSize: '13px', outline: 'none', minWidth: 0
                            }}
                        />
                        <button type="submit" style={{
                            padding: '11px 18px',
                            background: c.accentGrad, color: '#fff',
                            border: 'none', cursor: 'pointer',
                            fontWeight: '700', fontSize: '13px',
                            transition: 'all 0.2s ease', whiteSpace: 'nowrap'
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                        >
                            {isSubmitted ? <CheckIcon style={{ width: '14px', height: '14px' }} /> : 'Kirim'}
                        </button>
                    </form>
                    {isSubmitted && (
                        <div style={{
                            marginTop: '10px', padding: '8px 12px',
                            background: 'rgba(74,222,128,0.1)',
                            border: '1px solid rgba(74,222,128,0.25)',
                            borderRadius: '8px', fontSize: '12px',
                            color: '#4ade80', textAlign: 'center'
                        }}>
                            <CheckCircleIcon style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} /> Berhasil berlangganan!
                        </div>
                    )}
                </div>
            </div>

            <div style={{
                textAlign: 'center', padding: '18px 20px',
                borderTop: `1px solid ${c.border}`,
                fontSize: '12px', color: c.textMuted
            }}>
                &copy; {new Date().getFullYear()} PasukanYerusSolo. All Rights Reserved.
            </div>

            <style>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @media (max-width: 820px) {
                    footer > div:nth-child(2) { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 540px) {
                    footer > div:nth-child(2) { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
