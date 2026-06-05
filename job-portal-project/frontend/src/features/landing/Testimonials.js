import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Testimonials = () => {
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
    
    const testimonials = [
        {
            name: 'Budi Santoso',
            role: 'Fullstack Developer',
            company: 'PT Teknologi Nusantara',
            text: 'Berkat PasukanYerusSolo, saya mendapatkan pekerjaan impian saya di Solo hanya dalam waktu 2 minggu. Prosesnya sangat mudah dan cepat!',
            rating: 5,
            avatar: 'BS'
        },
        {
            name: 'Siti Aminah',
            role: 'Digital Marketing Manager',
            company: 'CV Kreatif Mandiri',
            text: 'Platform yang sangat membantu pencari kerja. Fitur filter dan notifikasinya akurat, saya langsung mendapat panggilan interview dalam 3 hari!',
            rating: 5,
            avatar: 'SA'
        },
        {
            name: 'Rizky Pratama',
            role: 'UI/UX Designer',
            company: 'Studio Desain Modern',
            text: 'Lowongan yang ditampilkan selalu update dan relevan dengan skill saya. Rekomendasi kerjanya sangat personal dan tepat sasaran.',
            rating: 5,
            avatar: 'RP'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const t = testimonials[activeIndex];

    return (
        <section style={{ 
            padding: '80px 20px', 
            background: colors.bg, 
            borderTop: colors.border,
            transition: 'all 0.3s ease'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <span style={{ color: colors.accent, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Testimonial</span>
                <h2 style={{ 
                    color: colors.textMain, 
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
                    marginTop: '12px', 
                    fontWeight: '800', 
                    letterSpacing: '-0.02em' 
                }}>
                    Apa Kata <span style={{ color: colors.accent }}>Mereka?</span>
                </h2>
                <p style={{ color: colors.textMuted, marginTop: '12px', fontSize: 'clamp(14px, 4vw, 16px)', padding: '0 15px' }}>
                    Lebih dari 500+ pencari kerja sukses bersama kami
                </p>
            </div>
            
            <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', padding: '0 15px' }}>
                <button 
                    onClick={prevTestimonial}
                    style={{
                        position: 'absolute',
                        left: '-60px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: colors.cardBg,
                        border: colors.border,
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        color: colors.textMain,
                        cursor: 'pointer',
                        fontSize: '18px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.accent;
                        e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                        e.currentTarget.style.color = colors.textMain;
                    }}
                >
                    ←
                </button>
                
                <div style={{ 
                    padding: 'clamp(30px, 5vw, 40px)', 
                    background: colors.cardBg, 
                    border: colors.border, 
                    borderRadius: '24px', 
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '30px',
                        fontSize: '60px',
                        opacity: 0.1,
                        color: colors.accent,
                        fontFamily: 'serif'
                    }}>
                        ❝
                    </div>
                    
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
                        fontSize: '22px',
                        boxShadow: '0 8px 20px rgba(234,88,12,0.3)'
                    }}>
                        {t.avatar}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                        {[...Array(t.rating)].map((_, i) => (
                            <span key={i} style={{ color: '#f59e0b', fontSize: '18px', marginRight: '4px' }}>★</span>
                        ))}
                    </div>
                    
                    <p style={{ 
                        color: colors.textMuted, 
                        fontStyle: 'italic', 
                        lineHeight: '1.7', 
                        fontSize: 'clamp(14px, 4vw, 16px)', 
                        marginBottom: '24px' 
                    }}>
                        "{t.text}"
                    </p>
                    
                    <p style={{ fontWeight: '800', color: colors.accent, marginBottom: '4px', fontSize: 'clamp(14px, 4vw, 16px)' }}>
                        {t.name}
                    </p>
                    <p style={{ color: colors.textMuted, fontSize: 'clamp(12px, 3.5vw, 13px)' }}>
                        {t.role} • {t.company}
                    </p>
                </div>
                
                <button 
                    onClick={nextTestimonial}
                    style={{
                        position: 'absolute',
                        right: '-60px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: colors.cardBg,
                        border: colors.border,
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        color: colors.textMain,
                        cursor: 'pointer',
                        fontSize: '18px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.accent;
                        e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                        e.currentTarget.style.color = colors.textMain;
                    }}
                >
                    →
                </button>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '30px', flexWrap: 'wrap' }}>
                    {testimonials.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: idx === activeIndex ? colors.accent : (isDark ? '#262626' : '#d4d4d4'),
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Responsive styles for mobile */}
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