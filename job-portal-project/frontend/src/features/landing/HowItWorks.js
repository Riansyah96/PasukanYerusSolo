import React from 'react';

const HowItWorks = () => {
    const colors = { cardBg: '#120b06', border: '1px solid #262626', textMain: '#fef3c7', accent: '#ea580c' };

    return (
        <section style={{ padding: '60px 40px', background: '#080402', borderTop: colors.border }}>
            <h2 style={{ textAlign: 'center', color: colors.textMain, marginBottom: '50px', fontWeight: '800' }}>3 Langkah Mudah</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
                {['Daftar Akun', 'Cari Pekerjaan', 'Kirim Lamaran'].map((step, i) => (
                    <div key={i} style={{ padding: '30px', background: colors.cardBg, border: colors.border, borderRadius: '16px', textAlign: 'center' }}>
                        <div style={{ width: '50px', height: '50px', background: colors.accent, borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800' }}>
                            {i + 1}
                        </div>
                        <h3 style={{ color: colors.textMain, fontWeight: '700' }}>{step}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default HowItWorks;