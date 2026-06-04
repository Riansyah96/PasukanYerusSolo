import React from 'react';

const Footer = () => {
    return (
        <footer style={{ 
            background: '#0c0a09', 
            color: '#a3a3a3', 
            padding: '60px 80px', 
            borderTop: '1px solid #262626',
            marginTop: 'auto'
        }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Bagian Brand */}
                <div>
                    <h2 style={{ color: '#ea580c', margin: '0 0 16px 0' }}>PasukanYerusSolo</h2>
                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        Portal lowongan kerja terpercaya untuk menghubungkan talenta terbaik dengan peluang karier impian.
                    </p>
                </div>

                {/* Bagian Link */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '16px' }}>Navigasi</h4>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li><a href="#" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Tentang Kami</a></li>
                        <li><a href="#" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Kebijakan Privasi</a></li>
                        <li><a href="#" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Syarat & Ketentuan</a></li>
                    </ul>
                </div>

                {/* Bagian Newsletter */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '16px' }}>Berlangganan</h4>
                    <p style={{ fontSize: '12px', marginBottom: '12px' }}>Dapatkan info loker terbaru.</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            type="email" 
                            placeholder="Email Anda" 
                            style={{ 
                                padding: '8px 12px', 
                                borderRadius: '8px', 
                                border: '1px solid #262626', 
                                background: '#171717',
                                color: '#fff',
                                flex: 1
                            }} 
                        />
                        <button style={{ padding: '8px 16px', background: '#ea580c', color: '#fff', borderRadius: '8px', border: 'none' }}>
                            OK
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #262626', fontSize: '12px' }}>
                &copy; {new Date().getFullYear()} PasukanYerusSolo. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;