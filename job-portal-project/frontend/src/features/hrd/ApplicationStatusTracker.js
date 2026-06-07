import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';

const ApplicationStatusTracker = ({ applicationId, currentStatus, appTheme }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [status, setStatus] = useState(currentStatus);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus) => {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            const response = await api.patch(`/auth/hrd/lamaran/${applicationId}`, { status: newStatus });
            setStatus(newStatus);
            alert('✅ ' + (response.data.message || 'Status pelamar berhasil diperbarui'));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('❌ Gagal memperbarui status pelamar: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColors = (currentViewStatus) => {
        switch(currentViewStatus) {
            case 'Lolos': return { bg: '#dcfce7', text: '#15803d', icon: '✅' };
            case 'Interview': return { bg: '#fef9c3', text: '#a16207', icon: '🗣️' };
            case 'Gagal': return { bg: '#fee2e2', text: '#b91c1c', icon: '❌' };
            case 'Review': return { bg: '#fef3c7', text: '#b45309', icon: '📋' };
            default: return { bg: isDark ? '#2e1d11' : '#f3e8ff', text: '#ea580c', icon: '🕒' };
        }
    };

    const currentColors = getStatusColors(status);

    const colors = {
        border: isDark ? '1px solid #291a0e' : '1px solid #ebdcd0',
        inputBg: isDark ? '#080402' : '#fdfdfd',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e'
    };

    return (
        <div style={{
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
            transition: 'all 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: colors.textMain }}>
                    Status Berkas:
                </span>
                <span style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    backgroundColor: currentColors.bg,
                    color: currentColors.text,
                    letterSpacing: '0.3px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    {currentColors.icon} {status}
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: colors.textMuted, fontWeight: '500' }}>Ubah ke:</span>
                <select 
                    value={status} 
                    onChange={(e) => handleStatusChange(e.target.value)} 
                    style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: colors.border,
                        backgroundColor: colors.inputBg,
                        color: colors.textMain,
                        fontSize: '13px',
                        fontWeight: '600',
                        outline: 'none',
                        cursor: isUpdating ? 'not-allowed' : 'pointer',
                        opacity: isUpdating ? 0.7 : 1
                    }}
                    disabled={isUpdating}
                >
                    <option value="Menunggu">🕒 Menunggu</option>
                    <option value="Review">📋 Review</option>
                    <option value="Interview">🗣️ Interview</option>
                    <option value="Lolos">✅ Lolos</option>
                    <option value="Gagal">❌ Gagal</option>
                </select>
                {isUpdating && <span style={{ fontSize: '12px', color: colors.accent }}>Menyimpan...</span>}
            </div>
        </div>
    );
};

export default ApplicationStatusTracker;