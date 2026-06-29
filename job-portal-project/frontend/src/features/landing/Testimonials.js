import React, { useState, useContext } from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import { ThemeContext } from '../../context/ThemeContext';
import { StarIcon } from '@heroicons/react/24/outline';

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);

  const c = {
    cardBg: isDark ? '#120b06' : '#ffffff',
    border: isDark ? '1px solid rgba(38,38,38,0.5)' : '1px solid rgba(229,229,229,0.5)',
    textPrimary: isDark ? '#fef3c7' : '#1c1917',
    accent: '#ea580c',
    textSecondary: isDark ? '#a8a29e' : '#57534e',
    bg: isDark ? '#0c0a09' : '#f5f5f4'
  };

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Fullstack Developer',
      company: 'PT Teknologi Nusantara',
      text: 'Berkat PasukanYerusSolo, saya mendapatkan pekerjaan impian saya di Solo hanya dalam waktu 2 minggu. Prosesnya sangat mudah dan cepat!',
      rating: 5,
      initials: 'BS'
    },
    {
      name: 'Siti Aminah',
      role: 'Digital Marketing Manager',
      company: 'CV Kreatif Mandiri',
      text: 'Platform yang sangat membantu pencari kerja. Fitur filter dan notifikasinya akurat, saya langsung mendapat panggilan interview dalam 3 hari!',
      rating: 5,
      initials: 'SA'
    },
    {
      name: 'Rizky Pratama',
      role: 'UI/UX Designer',
      company: 'Studio Desain Modern',
      text: 'Lowongan yang ditampilkan selalu update dan relevan dengan skill saya. Rekomendasi kerjanya sangat personal dan tepat sasaran.',
      rating: 5,
      initials: 'RP'
    }
  ];

  const t = testimonials[activeIndex];

  const navigateTestimonial = (dir) => {
    if (dir === 'next') setActiveIndex((prev) => (prev + 1) % testimonials.length);
    else setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const btnStyle = (side) => ({
    position: 'absolute',
    [side]: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `1px solid ${c.border}`,
    background: c.cardBg,
    color: c.textSecondary,
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 2
  });

  return (
    <section style={{
      padding: '100px 20px',
      background: c.bg,
      borderTop: `1px solid ${c.border}`,
      transition: 'all 0.3s ease'
    }}>
      <ScrollReveal animation="slideLeft" delay={200}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{
            color: c.accent,
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Testimonial
          </span>
          <h2 style={{
            color: c.textPrimary,
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            marginTop: '12px',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>
            Apa Kata <span style={{ color: c.accent }}>Mereka?</span>
          </h2>
          <p style={{
            color: c.textSecondary,
            marginTop: '12px',
            fontSize: 'clamp(14px, 4vw, 16px)'
          }}>
            Lebih dari 500+ pencari kerja sukses bersama kami
          </p>
        </div>
      </ScrollReveal>

      <div style={{
        maxWidth: '650px',
        margin: '0 auto',
        position: 'relative',
        padding: '0 15px'
      }}>
        <button
          onClick={() => navigateTestimonial('prev')}
          style={btnStyle('left')}
          onMouseEnter={(e) => { e.currentTarget.style.background = c.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = c.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = c.cardBg; e.currentTarget.style.color = c.textSecondary; e.currentTarget.style.borderColor = c.border; }}
        >
          ←
        </button>

        <div style={{
          padding: 'clamp(30px, 5vw, 40px)',
          background: c.cardBg,
          border: c.border,
          borderRadius: '24px',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '800',
            fontSize: '20px',
            boxShadow: '0 8px 20px rgba(234,88,12,0.3)'
          }}>
            {t.initials}
          </div>

          <div style={{ marginBottom: '16px' }}>
            {[...Array(t.rating)].map((_, i) => (
              <StarIcon key={i} style={{ width: 18, height: 18, color: '#f59e0b', display: 'inline', verticalAlign: 'middle' }} />
            ))}
          </div>

          <p style={{
            color: c.textSecondary,
            fontStyle: 'italic',
            lineHeight: '1.7',
            fontSize: 'clamp(14px, 4vw, 16px)',
            marginBottom: '24px'
          }}>
            &ldquo;{t.text}&rdquo;
          </p>

          <p style={{
            fontWeight: '800',
            color: c.accent,
            marginBottom: '4px',
            fontSize: 'clamp(14px, 4vw, 16px)'
          }}>
            {t.name}
          </p>
          <p style={{
            color: c.textSecondary,
            fontSize: 'clamp(12px, 3.5vw, 13px)'
          }}>
            {t.role} &bull; {t.company}
          </p>
        </div>

        <button
          onClick={() => navigateTestimonial('next')}
          style={btnStyle('right')}
          onMouseEnter={(e) => { e.currentTarget.style.background = c.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = c.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = c.cardBg; e.currentTarget.style.color = c.textSecondary; e.currentTarget.style.borderColor = c.border; }}
        >
          →
        </button>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '30px'
        }}>
          {testimonials.map((_, idx) => (
            <div key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: idx === activeIndex ? c.accent : (isDark ? '#262626' : '#d4d4d4'),
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          button[style*="position: absolute"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
