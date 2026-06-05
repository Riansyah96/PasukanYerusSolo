// frontend/src/components/jobs/JobCard.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './JobCard.module.css';

const JobCard = ({ job, isFull }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const getBadgeStyle = (type) => {
        const colors = {
            'Full-time': { bg: '#16a34a', text: '#fff' },
            'Remote': { bg: '#8b5cf6', text: '#fff' },
            'Contract': { bg: '#ea580c', text: '#fff' }
        };
        const style = colors[type] || { bg: isDark ? '#475569' : '#94a3b8', text: isDark ? '#d4d4d8' : '#fff' };
        
        return {
            background: style.bg,
            color: style.text,
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '6px',
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
        };
    };

    const cardStyles = {
        position: 'relative',
        background: isDark ? '#120b06' : '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    };

    const titleStyles = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '12px',
        marginTop: '8px',
        color: isDark ? '#fef3c7' : '#1c1917',
        transition: 'color 0.3s ease'
    };

    const categoryStyles = {
        fontSize: '13px',
        color: isDark ? '#a3a3a3' : '#57534e',
        marginBottom: '8px'
    };

    const salaryStyles = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#ea580c',
        marginBottom: '12px'
    };

    const detailSectionStyles = {
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`
    };

    const descStyles = {
        fontSize: '13px',
        color: isDark ? '#a3a3a3' : '#57534e',
        lineHeight: '1.5',
        marginBottom: '12px'
    };

    const applyBtnStyles = {
        width: '100%',
        padding: '10px',
        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
    };

    return (
        <div 
            className={styles.card} 
            onClick={() => navigate(`/job/${job.id}`)} 
            style={cardStyles}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#ea580c';
                e.currentTarget.style.boxShadow = isDark ? '0 20px 25px -12px rgba(0, 0, 0, 0.4)' : '0 20px 25px -12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                e.currentTarget.style.boxShadow = isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            }}
        >
            {job.type && <span style={getBadgeStyle(job.type)}>{job.type}</span>}

            <h3 style={titleStyles}>{job.title || "Posisi Tidak Diketahui"}</h3>
            
            <p style={categoryStyles}>📂 Kategori: {job.kategori || "Umum"}</p>
            <p style={salaryStyles}>💰 {job.gaji || "Gaji tidak dicantumkan"}</p>
            
            {isFull && (
                <div style={detailSectionStyles}>
                    <p style={descStyles}>{job.deskripsi || "Deskripsi tidak tersedia."}</p>
                    <button 
                        className={styles.applyBtn}
                        style={applyBtnStyles}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(234, 88, 12, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Lamar Sekarang →
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobCard;