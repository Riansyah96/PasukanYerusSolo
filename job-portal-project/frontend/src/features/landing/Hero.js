import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ctaHover, setCtaHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 60px',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      {images.map((img, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: i === currentSlide ? 1 : 0,
          transition: 'opacity 1.5s ease',
          zIndex: 0
        }} />
      ))}

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDark
          ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 100%)',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 2,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 3,
        textAlign: 'center'
      }}>
        <span style={{
          color: '#ea580c',
          fontSize: '13px',
          fontWeight: '800',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          background: 'rgba(234,88,12,0.1)',
          padding: '6px 16px',
          borderRadius: '30px',
          display: 'inline-block',
          marginBottom: '24px'
        }}>
          ✨ #1 Portal Karir di Solo Raya
        </span>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '900',
          margin: '0 0 20px',
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          color: '#fff',
          textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)'
        }}>
          Wujudkan{' '}
          <span style={{
            background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Potensi Terbesarmu
          </span>
        </h1>

        <p style={{
          color: '#d4d4d4',
          fontSize: 'clamp(16px, 2vw, 18px)',
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: '1.7'
        }}>
          Temukan ribuan lowongan dari perusahaan terpercaya,
          mulai karirmu hari ini bersama <strong style={{ color: '#ea580c' }}>PasukanYerusSolo</strong>
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/eksplorasi')}
            style={{
              padding: '16px 36px',
              background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: ctaHover
                ? '0 8px 30px rgba(234, 88, 12, 0.5)'
                : '0 4px 20px rgba(234, 88, 12, 0.3)',
              transform: ctaHover ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            Mulai Eksplorasi →
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '16px 36px',
              background: secondaryHover ? '#ea580c' : 'transparent',
              border: `2px solid ${secondaryHover ? '#ea580c' : (isDark ? '#a8a29e' : '#fff')}`,
              borderRadius: '12px',
              color: isDark ? '#fff' : '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '16px',
              borderColor: secondaryHover ? '#ea580c' : (isDark ? '#a8a29e' : '#fff'),
              transform: secondaryHover ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            Daftar Gratis
          </button>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '60px',
          flexWrap: 'wrap'
        }}>
          {[
            { num: '6,000+', label: 'Lowongan Tersedia' },
            { num: '500+', label: 'Perusahaan' },
            { num: '10,000+', label: 'Talenta Terhubung' }
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center',
              borderTop: `2px solid ${isDark ? '#262626' : 'rgba(255,255,255,0.2)'}`,
              paddingTop: '16px',
              minWidth: '120px'
            }}>
              <div style={{
                fontSize: 'clamp(22px, 4vw, 28px)',
                fontWeight: '900',
                color: '#ea580c'
              }}>
                {stat.num}
              </div>
              <div style={{
                fontSize: '13px',
                color: isDark ? '#a8a29e' : '#d4d4d4',
                marginTop: '4px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 3
      }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} style={{
            width: i === currentSlide ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            border: 'none',
            background: i === currentSlide ? '#ea580c' : (isDark ? '#262626' : 'rgba(255,255,255,0.4)'),
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: 0
          }} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
