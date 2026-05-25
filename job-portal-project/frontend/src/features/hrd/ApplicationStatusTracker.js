import React, { useState } from 'react';
import api from '../../services/api';

const ApplicationStatusTracker = ({ applicationId, currentStatus }) => {
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await api.patch(`/hrd/lamaran/${applicationId}`, { status: newStatus });
            setStatus(newStatus);
            alert(response.data.message);
        } catch (err) {
            alert('Gagal memperbarui status pelamar');
        }
    };

    return (
        <div style={{ padding: '8px', border: '1px dashed #777', marginTop: '5px' }}>
            <span>Status Pelamar Saat ini: <strong>{status}</strong></span><br />
            <select value={status} onChange={(e) => handleStatusChange(e.target.value)} style={{ marginTop: '5px' }}>
                <option value="Pending">Pending</option>
                <option value="Interview">Interview</option>
                <option value="Lolos">Lolos</option>
                <option value="Ditolak">Ditolak</option>
            </select>
        </div>
    );
};

export default ApplicationStatusTracker;