// src/features/lamaran/FavoriteService.js
import React from 'react';
import api from '../../services/api';
import FavoriteHandler from './FavoriteHandler';

const FavoriteService = ({ jobId, triggerToast, appTheme }) => {
    
    const sendFavoriteToBackend = async (id) => {
        try {
            const response = await api.post('/favorit', { id_lowongan: id });
            
            // Cek apakah triggerToast ada sebelum dipanggil
            if (triggerToast && typeof triggerToast === 'function') {
                triggerToast(response.data.message || 'Lowongan berhasil disimpan!', 'success');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menyimpan favorit';
            console.error("Gagal:", msg);
            
            if (triggerToast && typeof triggerToast === 'function') {
                triggerToast(msg, 'danger');
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