import React from 'react';

const JobServices = () => {
    // Konsistensi warna dengan JobListContainer
    const colors = {
        cardBg: '#120b06',
        border: '1px solid #262626',
        textMain: '#fef3c7',
        textMuted: '#a3a3a3',
        accent: '#ea580c'
    };

    const categories = [
        { title: 'Teknologi & IT', desc: 'Pengembangan web, mobile, dan infrastruktur sistem.' },
        { title: 'Marketing & Sales', desc: 'Strategi pemasaran, konten, dan pertumbuhan bisnis.' },
        { title: 'Administrasi', desc: 'Manajemen operasional dan dukungan administratif.' }
    ];

    return (
        <section style={{ padding: '60px 80px', background: '#080402' }}>
            <h2 style={{ 
                color: colors.textMain, 
                fontSize: '28px', 
                fontWeight: '800', 
                textAlign: 'center', 
                marginBottom: '40px' 
            }}>
                Kategori Pekerjaan <span style={{ color: colors.accent }}>Unggulan</span>
            </h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {categories.map((cat, i) => (
                    <div key={i} style={{ 
                        padding: '24px', 
                        background: colors.cardBg, 
                        border: colors.border, 
                        borderRadius: '16px',
                        transition: 'transform 0.2s, border 0.2s',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.border = `1px solid ${colors.accent}`;
                        e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.border = colors.border;
                        e.currentTarget.style.transform = 'translateY(0px)';
                    }}
                    >
                        <h3 style={{ color: colors.textMain, fontSize: '18px', marginBottom: '12px' }}>{cat.title}</h3>
                        <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: '1.6' }}>{cat.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default JobServices;