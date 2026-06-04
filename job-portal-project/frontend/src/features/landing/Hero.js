import React from 'react';

const Hero = () => {
    const colors = { textMain: '#fef3c7', accent: '#ea580c', textMuted: '#a3a3a3' };
    
    return (
        <section style={{ padding: '80px 40px', textAlign: 'center', background: '#080402', color: colors.textMain }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <span style={{ color: colors.accent, fontWeight: '800', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase' }}>
                    Portal Loker No. 1 di Solo
                </span>
                <h1 style={{ fontSize: '3.5rem', margin: '20px 0', lineHeight: '1.1', fontWeight: '900' }}>
                    Mastering Your <br/> <span style={{ color: colors.accent }}>Career Needs.</span>
                </h1>
                <p style={{ color: colors.textMuted, fontSize: '16px', marginBottom: '40px', lineHeight: '1.6' }}>
                    Temukan lowongan kerja terbaik yang sesuai dengan skill dan passion Anda di wilayah Solo dan sekitarnya.
                </p>
                <button style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '800', cursor: 'pointer' }}>
                    Mulai Eksplorasi
                </button>
            </div>
        </section>
    );
};
export default Hero;