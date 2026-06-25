import React, { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    emoji: '📝',
    title: 'Buat Akun Gratis',
    desc: 'Daftar dalam 2 menit, isi data diri dan buat profil profesionalmu. Tidak perlu biaya sepeserpun!',
    tag: 'Langkah 1 dari 4'
  },
  {
    emoji: '🔍',
    title: 'Cari Lowongan Ideal',
    desc: 'Temukan ribuan lowongan dari perusahaan terpercaya. Filter berdasarkan skill, lokasi, dan gaji impianmu.',
    tag: 'Langkah 2 dari 4'
  },
  {
    emoji: '📄',
    title: 'Lamar Sekali Klik',
    desc: 'Kirim lamaran dengan satu klik. Pantau status lamaran secara real-time tanpa ribet.',
    tag: 'Langkah 3 dari 4'
  },
  {
    emoji: '🎯',
    title: 'Dapatkan Pekerjaan',
    desc: 'Terima tawaran dari perusahaan impian dan mulai langkah pertamamu menuju karir gemilang!',
    tag: 'Langkah 4 dari 4'
  }
];

const bgImages = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
];

const Walkthrough = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, []);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide === slides.length - 1) {
          onComplete();
        } else {
          nextSlide();
        }
      }
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, nextSlide, prevSlide, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      overflow: 'hidden'
    }}>
      {bgImages.map((img, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: i === bgIndex ? 1 : 0,
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
        background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 100%)',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        zIndex: 3
      }}>
        <button
          onClick={onComplete}
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#a8a29e',
            padding: '8px 20px',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '700',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a8a29e'; }}
        >
          Lewati →
        </button>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%'
        }}>
          <span style={{
            color: '#ea580c',
            fontSize: '13px',
            fontWeight: '800',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            background: 'rgba(234,88,12,0.15)',
            padding: '6px 16px',
            borderRadius: '30px',
            display: 'inline-block',
            marginBottom: '32px'
          }}>
            {slides[currentSlide].tag}
          </span>

          <div style={{
            fontSize: 'clamp(64px, 15vw, 100px)',
            marginBottom: '24px',
            animation: 'float 3s ease-in-out infinite',
            display: 'block'
          }}>
            {slides[currentSlide].emoji}
          </div>

          <h1 style={{
            color: '#fef3c7',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: '900',
            margin: '0 0 20px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            {slides[currentSlide].title}
          </h1>

          <p style={{
            color: '#a8a29e',
            fontSize: 'clamp(16px, 3vw, 18px)',
            lineHeight: '1.7',
            maxWidth: '480px',
            margin: '0 auto 40px'
          }}>
            {slides[currentSlide].desc}
          </p>

          {currentSlide === slides.length - 1 ? (
            <button
              onClick={onComplete}
              style={{
                padding: '18px 48px',
                background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                border: 'none',
                borderRadius: '14px',
                color: '#fff',
                fontWeight: '900',
                cursor: 'pointer',
                fontSize: '18px',
                boxShadow: '0 8px 30px rgba(234, 88, 12, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(234, 88, 12, 0.5)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(234, 88, 12, 0.4)'; }}
            >
              🚀 Mulai Sekarang
            </button>
          ) : (
            <button
              onClick={nextSlide}
              style={{
                padding: '16px 40px',
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
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(234, 88, 12, 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 88, 12, 0.3)'; }}
            >
              Lanjut →
            </button>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '60px'
        }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{
              width: i === currentSlide ? '32px' : '10px',
              height: '10px',
              borderRadius: '5px',
              border: 'none',
              background: i === currentSlide ? '#ea580c' : 'rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              padding: 0
            }} />
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px'
        }}>
          {currentSlide > 0 && (
            <button onClick={prevSlide} style={{
              background: 'none',
              border: 'none',
              color: '#a8a29e',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              padding: '4px 12px',
              transition: 'color 0.3s ease'
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ea580c'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#a8a29e'; }}
            >
              ← Sebelumnya
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default Walkthrough;
