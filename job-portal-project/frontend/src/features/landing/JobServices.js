import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const JobServices = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    
    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #262626' : '1px solid #e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        accent: '#ea580c',
        bg: isDark ? '#080402' : '#f5f5f4'
    };

    const categories = [
        { title: '💻 Teknologi & IT', desc: 'Fullstack, Frontend, Backend, DevOps, Data Science, Cybersecurity, dan Cloud Engineering.', icon: '🚀' },
        { title: '📊 Marketing & Sales', desc: 'Digital Marketing, Brand Strategist, Sales Executive, Content Creator, dan SEO Specialist.', icon: '🎯' },
        { title: '📋 Administrasi & Operasional', desc: 'Admin Office, HR Generalist, Executive Assistant, Office Manager, dan Data Entry.', icon: '📎' },
        { title: '🎨 Desain & Kreatif', desc: 'UI/UX Designer, Graphic Designer, Video Editor, Animator, dan Creative Director.', icon: '✨' },
        { title: '💰 Keuangan & Akuntansi', desc: 'Financial Analyst, Accountant, Tax Consultant, Auditor, dan Treasury Staff.', icon: '📈' },
        { title: '🔧 Engineering & Manufaktur', desc: 'Mechanical Engineer, Electrical Engineer, Production Supervisor, dan Quality Control.', icon: '⚙️' }
    ];

    return (
        <section style={{ 
            padding: '80px 20px', 
            background: colors.bg,
            transition: 'all 0.3s ease'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <span style={{ color: colors.accent, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Kategori Pekerjaan</span>
                <h2 style={{ 
                    color: colors.textMain, 
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
                    fontWeight: '800', 
                    marginTop: '12px',
                    letterSpacing: '-0.02em'
                }}>
                    Temukan <span style={{ color: colors.accent }}>Bidangmu</span>
                </h2>
                <p style={{ color: colors.textMuted, marginTop: '12px', fontSize: 'clamp(14px, 4vw, 16px)', padding: '0 15px' }}>
                    Ribuan lowongan dari berbagai industri ternama menantimu
                </p>
            </div>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '24px',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 15px'
            }}>
                {categories.map((cat, i) => (
                    <div key={i} style={{ 
                        padding: '28px', 
                        background: colors.cardBg, 
                        border: colors.border, 
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.accent;
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = isDark ? '0 15px 30px rgba(0,0,0,0.3)' : '0 15px 30px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                        e.currentTarget.style.transform = 'translateY(0px)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: `linear-gradient(135deg, ${colors.accent}20 0%, #f59e0b20 100%)`,
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            marginBottom: '20px'
                        }}>
                            {cat.icon}
                        </div>
                        <h3 style={{ color: colors.textMain, fontSize: 'clamp(18px, 4vw, 20px)', marginBottom: '12px', fontWeight: '800' }}>{cat.title}</h3>
                        <p style={{ color: colors.textMuted, fontSize: 'clamp(13px, 3.5vw, 14px)', lineHeight: '1.6', marginBottom: '16px' }}>{cat.desc}</p>
                        <span style={{ color: colors.accent, fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Lihat Lowongan <span style={{ transition: 'transform 0.2s' }}>→</span>
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default JobServices;