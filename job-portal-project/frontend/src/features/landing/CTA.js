import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import { ThemeContext } from '../../context/ThemeContext';

const CTA = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const c = {
    textPrimary: isDark ? '#fef3c7' : '#1c1917',
    accent: '#ea580c',
    border: isDark ? '1px solid rgba(38,38,38,0.5)' : '1px solid rgba(229,229,229,0.5)',
    textSecondary: isDark ? '#a8a29e' : '#57534e',
    bg: isDark ? '#0c0a09' : '#f5f5f4'
  };

  return (
    <section style={{
      padding: '80px 20px',
      background: c.bg,
      textAlign: 'center',
      borderTop: `1px solid ${c.border}`,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${isDark ? 'rgba(234,88,12,0.08)' : 'rgba(234,88,12,0.06)'} 0%, transparent 70%)`,
        borderRadius: '50%',
        animation: 'pulse 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      <ScrollReveal animation="scaleIn" delay={200}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            color: c.textPrimary,
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            marginBottom: '16px',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>
            🚀 <span style={{ color: c.accent }}>Siap Melangkah</span> Menuju Karir Impian?
          </h2>
          <p style={{
            color: c.textSecondary,
            marginBottom: '32px',
            fontSize: 'clamp(14px, 4vw, 16px)',
            maxWidth: '500px',
            margin: '0 auto 32px'
          }}>
            Bergabunglah dengan ribuan profesional yang telah sukses mendapatkan pekerjaan terbaik melalui platform kami
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: 'clamp(12px, 4vw, 14px) clamp(30px, 8vw, 40px)',
              background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
              color: '#fff',
              fontWeight: '800',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 4vw, 16px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(234, 88, 12, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(234, 88, 12, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(234, 88, 12, 0.3)';
            }}
            onTouchStart={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
            onTouchEnd={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Daftar Sekarang →
          </button>
        </div>
      </ScrollReveal>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default CTA;
