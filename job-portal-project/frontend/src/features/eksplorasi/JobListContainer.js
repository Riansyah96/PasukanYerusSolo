import React, { useState, useMemo, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import JobList from '../../components/jobs/JobList';
import FilterBox from './FilterBox';
import ApplyJobForm from '../lamaran/ApplyJobForm';
import api from '../../services/api';

const JobListContainer = ({ variant = 'simple', limit }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('Semua');
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle window resize untuk responsive
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Mengambil data dari backend
        api.get('/jobs')
            .then(res => {
                const dataArray = res.data.data || [];
                setJobs(dataArray);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gagal ambil data:", err);
                setLoading(false);
            });
    }, []);

    const filteredJobs = useMemo(() => {
        let result = jobs;
        if (search) {
            result = result.filter(j => 
                j.title?.toLowerCase().includes(search.toLowerCase()) ||
                j.kategori?.toLowerCase().includes(search.toLowerCase()) ||
                j.company?.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (type !== 'Semua') {
            result = result.filter(j => j.type === type);
        }
        return limit ? result.slice(0, limit) : result;
    }, [jobs, search, type, limit]);

    const loadingStyles = {
        textAlign: 'center',
        padding: '60px 20px',
        background: isDark ? '#120b06' : '#ffffff',
        borderRadius: '16px',
        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
        color: isDark ? '#a3a3a3' : '#57534e'
    };

    if (loading) {
        return (
            <div style={loadingStyles}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: `3px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                    borderTop: `3px solid #ea580c`,
                    borderRadius: '50%',
                    margin: '0 auto 16px auto',
                    animation: 'spin 1s linear infinite'
                }} />
                <p>Memuat data lowongan...</p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', animation: 'fadeIn 0.5s ease' }}>
            {variant === 'full' && (
                <FilterBox 
                    isMobile={isMobile}
                    onSearchChange={setSearch}
                    onTypeChange={setType}
                    selectedType={type}
                />
            )}

            {/* Info hasil pencarian */}
            {variant === 'full' && (search || type !== 'Semua') && (
                <div style={{
                    marginBottom: '20px',
                    padding: '12px 16px',
                    background: isDark ? '#120b06' : '#ffffff',
                    borderRadius: '12px',
                    border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    <span style={{ color: isDark ? '#a3a3a3' : '#57534e', fontSize: '13px' }}>
                        📊 Menampilkan <strong style={{ color: '#ea580c' }}>{filteredJobs.length}</strong> dari <strong>{jobs.length}</strong> lowongan
                    </span>
                    <button 
                        onClick={() => {
                            setSearch('');
                            setType('Semua');
                        }}
                        style={{
                            background: 'transparent',
                            border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            color: isDark ? '#a3a3a3' : '#57534e',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#ea580c';
                            e.currentTarget.style.color = '#ea580c';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                            e.currentTarget.style.color = isDark ? '#a3a3a3' : '#57534e';
                        }}
                    >
                        Reset Filter ✖
                    </button>
                </div>
            )}

            <JobList 
                jobs={filteredJobs} 
                variant={variant} 
                onSelectJob={(job) => setSelectedJobId(job.id)} 
            />

            {selectedJobId && (
                <div style={{ 
                    marginTop: '24px',
                    animation: 'slideUp 0.3s ease'
                }}>
                    <ApplyJobForm 
                        jobId={selectedJobId} 
                        onFormSuccess={() => setSelectedJobId(null)} 
                    />
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default JobListContainer;