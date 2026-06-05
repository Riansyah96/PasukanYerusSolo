// frontend/src/components/jobs/JobList.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import JobCard from './JobCard';

const JobList = ({ jobs, variant, onSelectJob }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        width: '100%',
        padding: '10px',
        transition: 'all 0.3s ease'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '60px 20px',
        background: isDark ? '#120b06' : '#ffffff',
        borderRadius: '20px',
        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
        color: isDark ? '#a3a3a3' : '#57534e'
    };

    const safeJobs = Array.isArray(jobs) ? jobs : [];

    if (safeJobs.length === 0) {
        return (
            <div style={emptyStateStyle}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔍</span>
                <h3 style={{ color: isDark ? '#fef3c7' : '#1c1917', marginBottom: '8px' }}>Belum Ada Lowongan</h3>
                <p>Saat ini belum ada lowongan yang tersedia. Silakan cek kembali nanti.</p>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {safeJobs.map((job) => {
                const uniqueKey = job.id || job.id_lowongan;
                return (
                    <div key={uniqueKey} style={{ width: '100%', height: '100%' }}> 
                        <JobCard 
                            job={{ ...job, id: uniqueKey }} 
                            isFull={variant === 'full'} 
                            onClick={() => onSelectJob && onSelectJob(job)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default JobList;