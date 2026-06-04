import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
    const navigate = useNavigate();
    const colors = { textMain: '#fef3c7', accent: '#ea580c', border: '1px solid #262626' };

    return (
        <section style={{ padding: '80px 40px', background: '#080402', textAlign: 'center', borderTop: colors.border }}>
            <h2 style={{ color: colors.textMain, fontSize: '2rem', marginBottom: '20px', fontWeight: '800' }}>Siap Memulai Karier Anda?</h2>
            <button 
                onClick={() => navigate('/register')}
                style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', color: '#fff', fontWeight: '800', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
            >
                Daftar Sekarang
            </button>
        </section>
    );
};
export default CTA;