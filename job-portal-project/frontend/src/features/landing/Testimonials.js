import React from 'react';

const Testimonials = () => {
    const colors = { cardBg: '#120b06', border: '1px solid #262626', textMain: '#fef3c7', accent: '#ea580c', textMuted: '#a3a3a3' };

    return (
        <section style={{ padding: '60px 40px', background: '#080402', borderTop: colors.border }}>
            <h2 style={{ textAlign: 'center', color: colors.textMain, marginBottom: '40px', fontWeight: '800' }}>Apa Kata Mereka?</h2>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', background: colors.cardBg, border: colors.border, borderRadius: '16px', textAlign: 'center' }}>
                <p style={{ color: colors.textMuted, fontStyle: 'italic', lineHeight: '1.6' }}>
                    "Berkat PasukanYerusSolo, saya mendapatkan pekerjaan impian saya di Solo hanya dalam waktu 2 minggu. Prosesnya sangat mudah!"
                </p>
                <p style={{ marginTop: '20px', fontWeight: '800', color: colors.accent }}>- Budi, Fullstack Developer</p>
            </div>
        </section>
    );
};
export default Testimonials;