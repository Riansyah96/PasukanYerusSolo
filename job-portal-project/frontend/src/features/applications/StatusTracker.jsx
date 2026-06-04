import React, { useState, useEffect } from 'react';

export default function StatusTracker({ appTheme, isMobile }) {
    const [applications] = useState([
        { id_lamaran: 'APP-001', title: 'Fullstack Developer', company: 'PasukanYerusSolo', applied_date: '2026-05-28', status: 'Diproses', pesan_hrd: 'Berkas CV Anda sedang ditinjau.' },
        { id_lamaran: 'APP-002', title: 'React Frontend Engineer', company: 'TechEase Indonesia', applied_date: '2026-05-15', status: 'Diterima', pesan_hrd: 'Selamat! Anda diundang interview.' }
    ]);

    const colors = {
        cardBg: '#120b06', // Latar belakang gelap konsisten
        border: '#262626',
        accent: '#f59e0b',
        textMain: '#ffffff',
        textMuted: '#a3a3a3'
    };

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ color: '#fff', marginBottom: '24px' }}>Status Lamaran Saya</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {applications.map((app) => (
                    <div key={app.id_lamaran} style={{ 
                        background: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '16px',
                        padding: '24px',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        /* Nuansa Fade Oranye pada Border/Shadow */
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        borderLeft: `4px solid ${colors.accent}` // Garis oranye sebagai penanda
                    }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 4px 0', color: colors.textMain }}>{app.title}</h3>
                            <p style={{ margin: '0 0 12px 0', color: colors.accent, fontWeight: '600' }}>{app.company}</p>
                            <p style={{ margin: '0', fontSize: '13px', color: colors.textMuted }}>
                                📅 Melamar pada: {app.applied_date}
                            </p>
                            {app.pesan_hrd && (
                                <div style={{ marginTop: '12px', padding: '8px 12px', background: '#1c1007', borderRadius: '8px', fontSize: '12px', color: colors.textMuted, borderLeft: '2px solid #ea580c' }}>
                                    {app.pesan_hrd}
                                </div>
                            )}
                        </div>

                        {/* Badge dengan background gradasi oranye */}
                        <div style={{
                            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                            color: '#000',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontWeight: '800',
                            fontSize: '12px',
                            marginLeft: '24px'
                        }}>
                            {app.status.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}