// frontend/src/components/jobs/JobList.jsx
import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs, variant, onSelectJob }) => {
    const containerStyle = {
        display: 'grid',
        // Jika layar kecil, jadi 1 kolom, layar besar jadi 2-3 kolom
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px',
        width: '100%',
        padding: '10px' // Tambahkan padding agar tidak mentok ke pinggir HP
    };

    const safeJobs = Array.isArray(jobs) ? jobs : [];

    return (
        <div style={containerStyle}>
            {safeJobs.map((job) => {
                const uniqueKey = job.id || job.id_lowongan;
                return (
                    <div key={uniqueKey} style={{ width: '100%' }}> 
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