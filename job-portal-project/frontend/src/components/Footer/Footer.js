import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isDark = theme === 'dark';

  const c = {
    bg: isDark ? '#0c0a09' : '#f5f5f4',
    textSecondary: isDark ? '#a8a29e' : '#57534e',
    textMuted: isDark ? '#78716c' : '#a3a3a3',
    textPrimary: isDark ? '#fef3c7' : '#1c1917',
    border: isDark ? 'rgba(38,38,38,0.5)' : 'rgba(229,229,229,0.5)',
    inputBg: isDark ? '#171717' : '#ffffff',
    cardBg: isDark ? '#120b06' : '#ffffff'
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const socialLinks = [
    { icon: '📘', label: 'Facebook' },
    { icon: '🐦', label: 'Twitter' },
    { icon: '🔗', label: 'LinkedIn' },
    { icon: '📷', label: 'Instagram' }
  ];

  const navLinks = ['Beranda', 'Cari Lowongan', 'Pasang Lowongan', 'Tentang Kami', 'Kontak'];
  const serviceLinks = ['Bantuan', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'FAQ', 'Karier'];

  const colStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const linkStyle = {
    color: c.textSecondary,
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block'
  };

  return (
    <footer style={{
      background: c.bg,
      borderTop: `1px solid ${c.border}`,
      marginTop: 'auto',
      position: 'relative',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        height: '4px',
        background: 'linear-gradient(90deg, #ea580c, #f59e0b, #ea580c)',
        backgroundSize: '200% 100%',
        animation: 'gradientMove 3s ease infinite'
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <div style={colStyle}>
          <h2 style={{
            color: c.textPrimary,
            margin: 0,
            fontSize: '24px',
            fontWeight: '900',
            letterSpacing: '-0.5px'
          }}>
            ⚡ <span style={{ background: 'linear-gradient(135deg, #ea580c, #f59e0b)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>Pasukan</span>YerusSolo
          </h2>
          <p style={{ color: c.textSecondary, fontSize: '14px', lineHeight: '1.7', maxWidth: '300px', margin: 0 }}>
            Portal lowongan kerja terpercaya untuk menghubungkan talenta terbaik dengan peluang karier impian di Solo Raya.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
            {socialLinks.map((s, i) => (
              <a key={i} href="#" style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: isDark ? '#171717' : '#e5e5e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: c.textSecondary
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #ea580c, #f59e0b)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? '#171717' : '#e5e5e5'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.color = c.textSecondary; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={colStyle}>
          <h4 style={{ color: c.textPrimary, margin: 0, fontSize: '16px', fontWeight: '800' }}>Navigasi</h4>
          {navLinks.map((item, i) => (
            <a key={i} href="#" style={linkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ea580c'; e.currentTarget.style.transform = 'translateX(5px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = c.textSecondary; e.currentTarget.style.transform = 'translateX(0)'; }}
            >{item}</a>
          ))}
        </div>

        <div style={colStyle}>
          <h4 style={{ color: c.textPrimary, margin: 0, fontSize: '16px', fontWeight: '800' }}>Layanan</h4>
          {serviceLinks.map((item, i) => (
            <a key={i} href="#" style={linkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ea580c'; e.currentTarget.style.transform = 'translateX(5px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = c.textSecondary; e.currentTarget.style.transform = 'translateX(0)'; }}
            >{item}</a>
          ))}
        </div>

        <div style={colStyle}>
          <h4 style={{ color: c.textPrimary, margin: 0, fontSize: '16px', fontWeight: '800' }}>Newsletter</h4>
          <p style={{ color: c.textSecondary, fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
            Dapatkan info lowongan terbaru langsung ke email Anda setiap minggu.
          </p>
          <form onSubmit={handleSubscribe} style={{
            display: 'flex',
            borderRadius: '12px',
            border: `1px solid ${c.border}`,
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ea580c'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; }}
          >
            <input type="email" placeholder="Masukkan email Anda" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                background: c.inputBg,
                color: c.textPrimary,
                fontSize: '13px',
                outline: 'none',
                minWidth: 0
              }}
            />
            <button type="submit" style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '13px',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              {isSubmitted ? '✓' : 'Kirim'}
            </button>
          </form>
          {isSubmitted && (
            <div style={{
              padding: '8px 12px',
              background: 'rgba(74,222,128,0.1)',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#4ade80',
              textAlign: 'center'
            }}>
              ✅ Berhasil berlangganan!
            </div>
          )}

          <div style={{ ...colStyle, gap: '8px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: c.textSecondary, fontSize: '13px' }}>
              <span>📍</span> Jl. Slamet Riyadi No. 123, Solo
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: c.textSecondary, fontSize: '13px' }}>
              <span>📧</span> info@pasukanYerusSolo.com
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: c.textSecondary, fontSize: '13px' }}>
              <span>📞</span> (0271) 1234 5678
            </div>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: `1px solid ${c.border}`,
        fontSize: '13px',
        color: c.textMuted
      }}>
        &copy; {new Date().getFullYear()} PasukanYerusSolo. All Rights Reserved.
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 968px) {
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
