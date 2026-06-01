import React from 'react';

const FilterBox = ({ appTheme, isMobile, onSearchChange, onTypeChange, selectedType }) => {
    const isDark = appTheme === 'dark';

    const inputStyle = {
        width: '100%', 
        padding: '12px 14px', 
        borderRadius: '10px', 
        fontSize: '14px', 
        outline: 'none', 
        boxSizing: 'border-box',
        border: isDark ? '1px solid #3d2514' : '1px solid #d1d5db',
        background: isDark ? '#0d0703' : '#ffffff',
        color: isDark ? '#ffffff' : '#1f2937',
    };

    return (
        <div style={{
            width: '100%', // DIUBAH: Menjadi 100% agar memanjang penuh ke samping
            background: isDark ? '#120b06' : '#ffffff',
            border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
            borderRadius: '16px', 
            padding: '20px', 
            boxSizing: 'border-box',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            flexShrink: 0,
            marginBottom: '8px'
        }} daylight-target="filter">
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>Filter Cari</h4>
            
            {/* DIUBAH: Di desktop menjadi row (memanjang kesamping), di mobile otomatis stack ke bawah */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', width: '100%' }}>
                <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: isDark ? '#9e8476' : '#6b7280' }}>Kata Kunci</label>
                    <input type="text" placeholder="Cari posisi atau nama perusahaan..." style={inputStyle} onChange={(e) => onSearchChange(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: isDark ? '#9e8476' : '#6b7280' }}>Tipe Pekerjaan</label>
                    <select value={selectedType} style={inputStyle} onChange={(e) => onTypeChange(e.target.value)}>
                        <option value="Semua">Semua Tipe</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBox;