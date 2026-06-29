import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { MagnifyingGlassIcon, DocumentTextIcon, TagIcon, BoltIcon, BarsArrowDownIcon } from '@heroicons/react/24/outline';

const FilterBox = ({ isMobile, onSearchChange, onTypeChange, selectedType, onSortChange, selectedSort }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

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
        transition: 'all 0.3s ease'
    };

    const inputFocusStyle = {
        borderColor: '#ea580c',
        boxShadow: '0 0 0 2px rgba(234, 88, 12, 0.2)'
    };

    const containerStyle = {
        width: '100%',
        background: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
        borderRadius: '16px', 
        padding: '20px', 
        boxSizing: 'border-box',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        flexShrink: 0,
        marginBottom: '8px',
        transition: 'all 0.3s ease'
    };

    const labelStyle = {
        display: 'block', 
        fontSize: '11px', 
        fontWeight: '700', 
        marginBottom: '6px', 
        color: isDark ? '#9e8476' : '#6b7280',
        letterSpacing: '0.5px'
    };

    const handleInputFocus = (e) => {
        Object.assign(e.currentTarget.style, inputFocusStyle);
    };

    const handleInputBlur = (e) => {
        e.currentTarget.style.borderColor = isDark ? '#3d2514' : '#d1d5db';
        e.currentTarget.style.boxShadow = 'none';
    };

    return (
        <div style={containerStyle} className="filter-box">
            <h4 style={{ 
                margin: 0, 
                fontSize: '13px', 
                fontWeight: '800', 
                color: '#ea580c', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <MagnifyingGlassIcon style={{ width: 16, height: 16, verticalAlign: "middle", marginTop: "-2px" }} /> Filter Pencarian
            </h4>
            
            <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                gap: '16px', 
                width: '100%' 
            }}>
                <div style={{ flex: 2 }}>
                    <label style={labelStyle}><DocumentTextIcon style={{ width: 12, height: 12, verticalAlign: "middle", marginTop: "-2px" }} /> Kata Kunci</label>
                    <input 
                        type="text" 
                        placeholder="Cari posisi atau nama perusahaan..." 
                        style={inputStyle}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChange={(e) => onSearchChange(e.target.value)} 
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}><TagIcon style={{ width: 12, height: 12, verticalAlign: "middle", marginTop: "-2px" }} /> Tipe Pekerjaan</label>
                    <select 
                        value={selectedType} 
                        style={inputStyle}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChange={(e) => onTypeChange(e.target.value)}
                    >
                        <option value="Semua">Semua Tipe</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}><BarsArrowDownIcon style={{ width: 12, height: 12, verticalAlign: "middle", marginTop: "-2px" }} /> Urutkan</label>
                    <select 
                        value={selectedSort}
                        style={inputStyle}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="terbaru">Terbaru</option>
                        <option value="terlama">Terlama</option>
                        <option value="gaji-tertinggi">Gaji Tertinggi</option>
                        <option value="gaji-terendah">Gaji Terendah</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
            </div>

            
            <div style={{
                marginTop: '8px',
                paddingTop: '12px',
                borderTop: `1px solid ${isDark ? '#22140a' : '#eaddd3'}`,
                fontSize: '12px',
                color: isDark ? '#9e8476' : '#6b7280',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span><BoltIcon style={{ width: 14, height: 14, verticalAlign: "middle", marginTop: "-2px" }} /> Gunakan filter untuk mempersempit pencarian</span>
                {(selectedType !== 'Semua' || selectedSort !== 'terbaru') && (
                    <span style={{ color: '#ea580c', fontSize: '11px' }}>
                        Filter aktif
                    </span>
                )}
            </div>
        </div>
    );
};

export default FilterBox;