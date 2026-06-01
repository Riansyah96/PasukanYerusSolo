import React, { useState } from 'react';
import api from '../../services/api';

const ApplicationStatusTracker = ({ applicationId, currentStatus, appTheme }) => {
    const [status, setStatus] = useState(currentStatus);
    const isDark = appTheme === 'dark';

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await api.patch(`/hrd/lamaran/${applicationId}`, { status: newStatus });
            setStatus(newStatus);
            alert(response.data.message || 'Status pelamar berhasil diperbarui');
        } catch (err) {
            alert('Gagal memperbarui status pelamar');
        }
    };

    // Pewarnaan Badge Status Dinamis yang Menarik
    const getStatusColors = (currentViewStatus) => {
        switch(currentViewStatus) {
            case 'Lolos': return { bg: '#dcfce7', text: '#15803d' };
            case 'Interview': return { bg: '#fef9c3', text: '#a16207' };
            case 'Ditolak': return { bg: '#fee2e2', text: '#b91c1c' };
            default: return { bg: isDark ? '#2e1d11' : '#f3e8ff', text: '#ea580c' }; // Pending
        }
    };

    const currentColors = getStatusColors(status);

    const colors = {
        border: isDark ? '1px solid #291a0e' : '1px solid #ebdcd0',
        inputBg: isDark ? '#080402' : '#fdfdfd',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e'
    };

    const styles = {
        trackerBox: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '16px',
            borderRadius: '14px',
            background: isDark ? '#1a1008' : '#faf7f4',
            border: colors.border,
            marginTop: '16px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        label: { fontSize: '13px', fontWeight: '600', color: colors.textMain },
        badge: {
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            backgroundColor: currentColors.bg,
            color: currentColors.text,
            letterSpacing: '0.3px'
        },
        selectWrapper: { display: 'flex', alignItems: 'center', gap: '8px' },
        select: {
            padding: '8px 12px',
            borderRadius: '10px',
            border: colors.border,
            backgroundColor: colors.inputBg,
            color: colors.textMain,
            fontSize: '13px',
            fontWeight: '600',
            outline: 'none',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.trackerBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={styles.label}>Aksi Status Berkas:</span>
                <span style={styles.badge}>{status}</span>
            </div>
            <div style={styles.selectWrapper}>
                <span style={{ fontSize: '12px', color: colors.textMuted, fontWeight: '500' }}>Ubah ke:</span>
                <select value={status} onChange={(e) => handleStatusChange(e.target.value)} style={styles.select}>
                    <option value="Pending">🕒 Pending</option>
                    <option value="Interview">🗣️ Interview</option>
                    <option value="Lolos">✅ Lolos</option>
                    <option value="Ditolak">❌ Ditolak</option>
                </select>
            </div>
        </div>
    );
};

export default ApplicationStatusTracker;