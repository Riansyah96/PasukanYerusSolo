import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const FavoriteListContainer = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // baseURL sudah '/api', jadi panggil '/favorit'
                const response = await api.get('/favorit');
                // Backend mengirim rows langsung, bukan object dengan properti 'data'
                setFavorites(response.data || []); 
            } catch (err) {
                console.error("Gagal memuat lowongan favorit:", err);
            }
        };
        fetchFavorites();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Daftar Favorit</h2>
            {favorites.length > 0 ? (
                favorites.map(job => (
                    <div key={job.id_favorit} style={{ marginBottom: '10px', padding: '15px', border: '1px solid #eaddd3', borderRadius: '8px' }}>
                        <h3 style={{ margin: '0 0 5px 0' }}>{job.judul_posisi}</h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{job.lokasi}</p>
                    </div>
                ))
            ) : (
                <p>Belum ada lowongan favorit.</p>
            )}
        </div>
    );
};

export default FavoriteListContainer;