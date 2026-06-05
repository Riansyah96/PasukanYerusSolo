import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const HowItWorks = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    
    const colors = { 
        cardBg: isDark ? '#120b06' : '#ffffff', 
        border: isDark ? '1px solid #262626' : '1px solid #e5e5e5', 
        textMain: isDark ? '#fef3c7' : '#1c1917', 
        accent: '#ea580c', 
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        bg: isDark ? '#080402' : '#f5f5f4'
    };

    const steps = [
        { title: '📝 Daftar Akun Gratis', desc: 'Isi data diri dan buat profil profesionalmu dalam 2 menit' },
        { title: '🔍 Temukan Lowongan Ideal', desc: 'Filter berdasarkan skill, lokasi, dan gaji yang kamu inginkan' },
        { title: '📄 Kirim Lamaran Cepat', desc: 'Lamar pekerjaan impian dengan sekali klik, pantau status secara real-time' }
    ];

    return (
        <section style={{ 
            padding: '80px 20px', 
            background: colors.bg, 
            borderTop: colors.border,
            transition: 'all 0.3s ease'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <span style={{ color: colors.accent, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Proses Mudah</span>
                <h2 style={{ 
                    color: colors.textMain, 
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
                    marginTop: '12px', 
                    fontWeight: '800', 
                    letterSpacing: '-0.02em' 
                }}>
                    3 Langkah Menuju <span style={{ color: colors.accent }}>Sukses</span>
                </h2>
                <p style={{ color: colors.textMuted, marginTop: '12px', fontSize: 'clamp(14px, 4vw, 16px)', padding: '0 15px' }}>
                    Dari pendaftaran hingga diterima kerja, kami dampingi setiap prosesnya
                </p>
            </div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '30px', 
                maxWidth: '1100px', 
                margin: '0 auto',
                padding: '0 15px'
            }}>
                {steps.map((step, i) => (
                    <div key={i} style={{ 
                        padding: '35px 25px', 
                        background: colors.cardBg, 
                        border: colors.border, 
                        borderRadius: '20px', 
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.borderColor = colors.accent;
                        e.currentTarget.style.boxShadow = isDark ? '0 15px 30px rgba(0,0,0,0.3)' : '0 15px 30px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        <div style={{ 
                            width: '70px', 
                            height: '70px', 
                            background: `linear-gradient(135deg, ${colors.accent} 0%, #f59e0b 100%)`, 
                            borderRadius: '50%', 
                            margin: '0 auto 20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: '#fff', 
                            fontWeight: '800',
                            fontSize: '28px',
                            boxShadow: '0 8px 20px rgba(234,88,12,0.3)'
                        }}>
                            {i + 1}
                        </div>
                        <h3 style={{ color: colors.textMain, fontWeight: '800', marginBottom: '12px', fontSize: 'clamp(18px, 4vw, 20px)' }}>{step.title}</h3>
                        <p style={{ color: colors.textMuted, fontSize: 'clamp(13px, 3.5vw, 14px)', lineHeight: '1.6' }}>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default HowItWorks;