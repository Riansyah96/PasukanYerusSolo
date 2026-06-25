import React, { useState, useContext } from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import { ThemeContext } from '../../context/ThemeContext';

const FAQ = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [openIndex, setOpenIndex] = useState(null);

  const c = {
    cardBg: isDark ? '#120b06' : '#ffffff',
    border: isDark ? '1px solid rgba(38,38,38,0.5)' : '1px solid rgba(229,229,229,0.5)',
    textPrimary: isDark ? '#fef3c7' : '#1c1917',
    accent: '#ea580c',
    textSecondary: isDark ? '#a8a29e' : '#57534e',
    bg: isDark ? '#0c0a09' : '#f5f5f4'
  };

  const faqs = [
    {
      q: 'Apakah PasukanYerusSolo benar-benar gratis?',
      a: 'Ya! PasukanYerusSolo gratis untuk pencari kerja. Anda dapat membuat akun, mencari lowongan, dan melamar pekerjaan tanpa biaya sepeserpun.'
    },
    {
      q: 'Bagaimana cara melamar pekerjaan?',
      a: 'Cukup buat akun, lengkapi profil Anda, lalu klik tombol "Lamar" pada lowongan yang sesuai. Lamaran Anda akan langsung terkirim ke perusahaan terkait.'
    },
    {
      q: 'Berapa lama proses review lamaran?',
      a: 'Waktu review bervariasi tergantung kebijakan masing-masing perusahaan. Rata-rata perusahaan memberikan respons dalam 3-7 hari kerja.'
    },
    {
      q: 'Apakah saya bisa melamar lebih dari satu pekerjaan?',
      a: 'Tentu! Anda dapat melamar ke banyak lowongan sekaligus. Tidak ada batasan jumlah lamaran yang bisa Anda kirimkan.'
    },
    {
      q: 'Bagaimana cara perusahaan mendaftar di platform ini?',
      a: 'Perusahaan dapat mendaftar dengan memilih opsi "Daftar Sebagai Perusahaan" saat registrasi. Setelah verifikasi, Anda bisa langsung memposting lowongan.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{
      padding: '100px 20px',
      background: c.bg,
      transition: 'all 0.3s ease'
    }}>
      <ScrollReveal animation="slideRight" delay={250}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{
            color: c.accent,
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            FAQ
          </span>
          <h2 style={{
            color: c.textPrimary,
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            marginTop: '12px',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>
            Pertanyaan <span style={{ color: c.accent }}>Umum</span>
          </h2>
          <p style={{
            color: c.textSecondary,
            marginTop: '12px',
            fontSize: 'clamp(14px, 4vw, 16px)'
          }}>
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </div>
      </ScrollReveal>

      <div style={{
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            borderRadius: '16px',
            border: c.border,
            background: c.cardBg,
            marginBottom: '12px',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <button
              onClick={() => toggleFAQ(i)}
              style={{
                width: '100%',
                padding: '20px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: c.textPrimary,
                fontWeight: '700',
                fontSize: 'clamp(14px, 3vw, 16px)',
                textAlign: 'left',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = c.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = c.textPrimary; }}
            >
              <span style={{ flex: 1 }}>{faq.q}</span>
              <span style={{
                fontSize: '20px',
                color: c.accent,
                transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                flexShrink: 0,
                marginLeft: '16px'
              }}>
                +
              </span>
            </button>
            <div style={{
              maxHeight: openIndex === i ? '300px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.4s ease'
            }}>
              <p style={{
                padding: openIndex === i ? '0 24px 20px' : '0 24px',
                margin: 0,
                color: c.textSecondary,
                fontSize: '14px',
                lineHeight: '1.7'
              }}>
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
