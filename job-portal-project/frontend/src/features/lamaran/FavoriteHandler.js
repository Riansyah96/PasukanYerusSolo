import React, { useState } from 'react';
import ActionButton from './ActionButton';

const FavoriteHandler = ({ jobId, onAddToFavoriteServer }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorited(!isFavorited);
        if (!isFavorited) {
            onAddToFavoriteServer(jobId); // Menjalankan event handler props
        }
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <ActionButton
                text={isFavorited ? '⭐ Tersimpan di Favorit' : '☆ Tambah ke Favorit'}
                onClick={handleToggleFavorite}
                variant={isFavorited ? 'green' : 'blue'}
            />
        </div>
    );
};

export default FavoriteHandler;