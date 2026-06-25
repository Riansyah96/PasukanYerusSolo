import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import { ThemeContext } from '../../context/ThemeContext';

const HowItWorks = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const c = {
    cardBg: isDark ? '#120b06' : '#ffffff',
    border: isDark ? '1px solid rgba(38,38,38,0.5)' : '1px solid rgba(229,229,229,0.5)',
    textPrimary: isDark ? '#fef3c7' : '#1c1917',
    accent: '#ea580c',
    textSecondary: isDark ? '#a8a29e' : '#57534e',
    bg: isDark ? '#080402' : '#f5f5f4'
  };

  const steps = [
    { emoji: '📝', title: 'Buat Akun Gratis', tag: 'Langkah 1', desc: 'Isi data diri dan buat profil profesionalmu dalam 2 menit' },
    { emoji: '🔍', title: 'Cari Lowongan Ideal', tag: 'Langkah 2', desc: 'Filter berdasarkan skill, lokasi, dan gaji yang kamu inginkan' },
    { emoji: '📄', title: 'Lamar Sekali Klik', tag: 'Langkah 3', desc: 'Kirim lamaran cepat dan pantau status secara real-time' },
    { emoji: '🎯', title: 'Dapatkan Pekerjaan', tag: 'Langkah 4', desc: 'Terima tawaran dan mulai karir impianmu!' }
  ];

  return (
    <section style={{
      padding: '100px 20px',
      background: c.bg,
      transition: 'all 0.3s ease'
    }}>
      <ScrollReveal animation="slideLeft" delay={100}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            color: c.accent,
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Cara Kerja
          </span>
          <h2 style={{
            color: c.textPrimary,
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            marginTop: '12px',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>
            Mulai dengan{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              4 Langkah Mudah
            </span>
          </h2>
          <p style={{
            color: c.textSecondary,
            marginTop: '12px',
            fontSize: 'clamp(14px, 4vw, 16px)'
          }}>
            Dari pendaftaran hingga diterima kerja, kami dampingi setiap prosesnya
          </p>
        </div>
      </ScrollReveal>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            flex: '1 1 calc(25% - 24px)',
            minWidth: '220px',
            maxWidth: '280px',
            padding: '36px 24px',
            background: c.cardBg,
            border: c.border,
            borderRadius: '24px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = c.accent;
              e.currentTarget.style.boxShadow = isDark ? '0 15px 30px rgba(0,0,0,0.3)' : '0 15px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{
              fontSize: 'clamp(32px, 5vw, 42px)',
              display: 'block',
              marginBottom: '16px'
            }}>
              {step.emoji}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              background: 'rgba(234,88,12,0.1)',
              padding: '4px 12px',
              borderRadius: '20px',
              color: c.accent,
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              {step.tag}
            </span>
            <h3 style={{
              color: c.textPrimary,
              fontWeight: '800',
              marginBottom: '10px',
              fontSize: 'clamp(16px, 3vw, 18px)'
            }}>
              {step.title}
            </h3>
            <p style={{
              color: c.textSecondary,
              fontSize: 'clamp(13px, 3.5vw, 14px)',
              lineHeight: '1.6',
              margin: 0
            }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '16px 36px',
            background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontWeight: '800',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 20px rgba(234, 88, 12, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(234, 88, 12, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 88, 12, 0.3)';
          }}
        >
          Mulai Sekarang →
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
