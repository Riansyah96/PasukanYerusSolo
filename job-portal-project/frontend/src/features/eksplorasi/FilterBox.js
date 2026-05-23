import React, { useState } from 'react';

const FilterBox = ({ onFilterSearch }) => {
    const [filters, setFilters] = useState({ keyword: '', lokasi: '', kategori: '' });

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearchClick = () => {
        onFilterSearch(filters); // Mengirim state filter saat button diklik
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '10px', background: '#f8f9fa' }}>
            <input type="text" name="keyword" placeholder="Cari posisi..." value={filters.keyword} onChange={handleInputChange} />
            <input type="text" name="lokasi" placeholder="Lokasi..." value={filters.lokasi} onChange={handleInputChange} />
            <input type="text" name="kategori" placeholder="Kategori..." value={filters.kategori} onChange={handleInputChange} />
            <button type="button" onClick={handleSearchClick}>Cari</button>
        </div>
    );
};

export default FilterBox;