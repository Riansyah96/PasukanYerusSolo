import React from 'react';
import api from '../../services/api';
import FormLowonganControlled from './FormLowonganControlled';

const JobPublisher = () => {
    const handlePublish = async (jobData) => {
        try {
            const response = await api.post('/hrd/lowongan', jobData);
            if (response.data.status === 'success') {
                alert('Sukses: ' + response.data.message);
            }
        } catch (err) {
            alert('Gagal mempublikasikan: ' + (err.response?.data?.message || err.message));
        }
    };

    return <FormLowonganControlled onSaveJob={handlePublish} />;
};

export default JobPublisher;