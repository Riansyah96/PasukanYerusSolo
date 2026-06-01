import React from 'react';
import api from '../../services/api';
import FavoriteHandler from './FavoriteHandler';

const FavoriteService = ({ jobId, triggerToast, appTheme }) => {
    
    const sendFavoriteToBackend = async (id) => {
        try {
            const response = await api.post('/favorit', { id_lowongan: id });
            if (typeof triggerToast === 'function') {
                triggerToast(response.data.message || 'Lowongan berhasil disimpan!', 'success');
            }
        } catch (err) {
            if (typeof triggerToast === 'function') {
                triggerToast(err.response?.data?.message || 'Gagal menyimpan favorit', 'danger');
            }
        }
    };

    return (
        <FavoriteHandler 
            jobId={jobId} 
            onAddToFavoriteServer={sendFavoriteToBackend}
            appTheme={appTheme}
        />
    );
};

export default FavoriteService;