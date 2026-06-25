import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import { ThemeContext } from '../../context/ThemeContext';

const JobServices = () => {
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

  const categories = [
    {
      title: 'Teknologi & IT',
      desc: 'Fullstack, Frontend, Backend, DevOps, Data Science, Cybersecurity.',
      img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      color: '#3b82f6'
    },
    {
      title: 'Marketing & Sales',
      desc: 'Digital Marketing, Brand Strategist, Sales Executive, Content Creator.',
      img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      color: '#8b5cf6'
    },
    {
      title: 'Administrasi & Operasional',
      desc: 'Admin Office, HR Generalist, Executive Assistant, Office Manager.',
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      color: '#10b981'
    },
    {
      title: 'Desain & Kreatif',
      desc: 'UI/UX Designer, Graphic Designer, Video Editor, Animator.',
      img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      color: '#f59e0b'
    },
    {
      title: 'Keuangan & Akuntansi',
      desc: 'Financial Analyst, Accountant, Tax Consultant, Auditor.',
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2011&q=80',
      color: '#ef4444'
    },
    {
      title: 'Engineering & Manufaktur',
      desc: 'Mechanical Engineer, Electrical Engineer, Production Supervisor.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      color: '#06b6d4'
    }
  ];

  return (
    <section style={{
      padding: '100px 20px',
      background: c.bg,
      transition: 'all 0.3s ease'
    }}>
      <ScrollReveal animation="slideRight" delay={150}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            color: c.accent,
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Kategori Pekerjaan
          </span>
          <h2 style={{
            color: c.textPrimary,
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: '800',
            marginTop: '12px',
            letterSpacing: '-0.02em'
          }}>
            Temukan <span style={{ color: c.accent }}>Bidangmu</span>
          </h2>
          <p style={{
            color: c.textSecondary,
            marginTop: '12px',
            fontSize: 'clamp(14px, 4vw, 16px)'
          }}>
            Ribuan lowongan dari berbagai industri ternama menantimu
          </p>
        </div>
      </ScrollReveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {categories.map((cat, i) => (
          <div key={i}
            onClick={() => navigate('/eksplorasi')}
            style={{
              borderRadius: '20px',
              background: c.cardBg,
              border: c.border,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = c.accent;
              e.currentTarget.style.boxShadow = isDark ? '0 15px 30px rgba(0,0,0,0.3)' : '0 15px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'relative',
              height: '180px',
              overflow: 'hidden'
            }}>
              <img src={cat.img} alt={cat.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: cat.color,
                border: '2px solid rgba(255,255,255,0.8)'
              }} />
            </div>
            <div style={{ padding: '20px 24px 24px' }}>
              <h3 style={{
                color: c.textPrimary,
                fontSize: 'clamp(16px, 3vw, 18px)',
                fontWeight: '800',
                margin: '0 0 8px'
              }}>
                {cat.title}
              </h3>
              <p style={{
                color: c.textSecondary,
                fontSize: 'clamp(13px, 3vw, 14px)',
                lineHeight: '1.6',
                margin: '0 0 16px'
              }}>
                {cat.desc}
              </p>
              <span style={{
                color: c.accent,
                fontSize: '14px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'gap 0.2s'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.gap = '10px'; }}
                onMouseLeave={(e) => { e.currentTarget.style.gap = '6px'; }}
              >
                Lihat Lowongan →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobServices;
