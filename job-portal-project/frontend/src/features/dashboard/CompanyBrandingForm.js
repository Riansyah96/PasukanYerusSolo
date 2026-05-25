import React, { useState } from 'react';
import api from '../../services/api';

const CompanyBrandingForm = () => {
    const [logoFile, setLogoFile] = useState(null);

    const handleUploadLogo = async (e) => {
        e.preventDefault();
        if(!logoFile) return alert('Pilih gambar logo terlebih dahulu!');

        const dataForm = new FormData();
        dataForm.append('logo', logoFile);

        try {
            const response = await api.put('/perusahaan/branding', dataForm, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
        } catch (err) {
            alert('Gagal memperbarui aset branding perusahaan');
        }
    };

    return (
        <div style={{ padding: '15px', background: '#e2e8f0' }}>
            <h3>Branding Perusahaan</h3>
            <form onSubmit={handleUploadLogo}>
                <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} /><br/>
                <button type="submit" style={{ marginTop: '5px' }}>Upload Logo Baru</button>
            </form>
        </div>
    );
};

export default CompanyBrandingForm;