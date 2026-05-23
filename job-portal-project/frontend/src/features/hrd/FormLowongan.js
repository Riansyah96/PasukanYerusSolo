import React from 'react';

const FormLowongan = () => {
    return (
        <div className="form-container">
            <h2>Publikasikan Lowongan Baru</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Judul Posisi:</label><br />
                    <input type="text" name="judul_posisi" placeholder="Contoh: React Developer" />
                </div>
                <div>
                    <label>Kategori:</label><br />
                    <input type="text" name="kategori" placeholder="IT / Design / Marketing" />
                </div>
                <div>
                    <label>Lokasi:</label><br />
                    <input type="text" name="lokasi" placeholder="Contoh: Jakarta / Remote" />
                </div>
                <button type="submit">Simpan Lowongan</button>
            </form>
        </div>
    );
};

export default FormLowongan;