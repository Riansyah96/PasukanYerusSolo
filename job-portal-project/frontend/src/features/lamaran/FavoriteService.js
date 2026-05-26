import React from 'react';
import api from '../../services/api';
import FavoriteHandler from './FavoriteHandler';

const FavoriteService = ({ jobId }) => {
    const sendFavoriteToBackend = async (id) => {
        try {
            const response = await api.post('/favorit', { id_lowongan: id });
            alert(response.data.message);
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menyimpan favorit');
        }
    };

    return <FavoriteHandler jobId={jobId} onAddToFavoriteServer={sendFavoriteToBackend} />;
};

export default FavoriteService;