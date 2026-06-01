import React from 'react';

const JobCard = ({ job, appTheme, isMobile }) => {
    const isDark = appTheme === 'dark';

    return (
        <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center',
            padding: '20px', background: isDark ? '#120b06' : '#ffffff',
            border: isDark ? '1px solid #22140a' : '1px solid #eaddd3',
            borderRadius: '16px', gap: '16px', width: '100%', boxSizing: 'border-box'
        }}>
            <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '800', color: isDark ? '#fef3c7' : '#291107' }}>
                    {job.title}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#ea580c' }}>{job.company}</span>
                    <span style={{ color: '#9ca3af', display: 'block' }}>•</span>
                    <span style={{ fontSize: '12px', color: isDark ? '#9e8476' : '#6b7280' }}>📍 {job.location}</span>
                </div>
            </div>

            <div style={{ 
                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                borderTop: isMobile ? (isDark ? '1px solid #22140a' : '1px solid #eaddd3') : 'none',
                paddingTop: isMobile ? '12px' : '0px', gap: '12px'
            }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: isDark ? '#facc15' : '#eab308' }}>
                    {job.salary}
                </span>
                <span style={{ 
                    padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800',
                    background: isDark ? '#2e1d11' : '#ffedd5',
                    color: '#ea580c'
                }}>{job.type}</span>
            </div>
        </div>
    );
};

export default JobCard;