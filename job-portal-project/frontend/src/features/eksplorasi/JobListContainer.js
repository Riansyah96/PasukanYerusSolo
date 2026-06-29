import React, { useState, useMemo, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import JobList from '../../components/jobs/JobList';
import FilterBox from './FilterBox';
import ApplyJobForm from '../lamaran/ApplyJobForm';
import api from '../../services/api';
import { ChartBarIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const JobListContainer = ({ variant = 'simple', limit }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('Semua');
    const [sort, setSort] = useState('terbaru');
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [page, setPage] = useState(1);
    const perPage = 12;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {

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

    useEffect(() => {
        setPage(1);
    }, [search, type, sort]);

    const filteredJobs = useMemo(() => {
        let result = jobs;
        const parseGaji = (val) => {
            if (!val) return 0;
            return parseInt(String(val).replace(/[^\d]/g, '')) || 0;
        };
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
        result.sort((a, b) => {
            switch (sort) {
                case 'terbaru': return new Date(b.created_at || 0) - new Date(a.created_at || 0);
                case 'terlama': return new Date(a.created_at || 0) - new Date(b.created_at || 0);
                case 'gaji-tertinggi': return parseGaji(b.gaji) - parseGaji(a.gaji);
                case 'gaji-terendah': return parseGaji(a.gaji) - parseGaji(b.gaji);
                case 'az': return (a.title || '').localeCompare(b.title || '');
                case 'za': return (b.title || '').localeCompare(a.title || '');
                default: return 0;
            }
        });
        return limit ? result.slice(0, limit) : result;
    }, [jobs, search, type, sort, limit]);

    const totalPages = Math.ceil(filteredJobs.length / perPage);
    const pagedJobs = filteredJobs.slice((page - 1) * perPage, page * perPage);

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
                    onSearchChange={(v) => { setSearch(v); setPage(1); }}
                    onTypeChange={(v) => { setType(v); setPage(1); }}
                    onSortChange={(v) => { setSort(v); setPage(1); }}
                    selectedType={type}
                    selectedSort={sort}
                />
            )}

            
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
                        <ChartBarIcon style={{ width: 14, height: 14, verticalAlign: 'middle', marginTop: '-2px', marginRight: '4px' }} />Menampilkan <strong style={{ color: '#ea580c' }}>{filteredJobs.length}</strong> lowongan
                    </span>
                    <button 
                        onClick={() => {
                            setSearch('');
                            setType('Semua');
                            setSort('terbaru');
                            setPage(1);
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
                        Reset Filter <XMarkIcon style={{ width: 14, height: 14, verticalAlign: 'middle', marginTop: '-2px' }} />
                    </button>
                </div>
            )}

            <JobList 
                jobs={variant === 'full' ? pagedJobs : filteredJobs} 
                variant={variant} 
                onSelectJob={(job) => setSelectedJobId(job.id)} 
            />

            {variant === 'full' && totalPages > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '24px',
                    padding: '16px',
                    background: isDark ? '#120b06' : '#ffffff',
                    borderRadius: '12px',
                    border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`
                }}>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        style={{
                            background: 'transparent',
                            border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                            borderRadius: '8px',
                            padding: '6px 12px',
                            cursor: page <= 1 ? 'default' : 'pointer',
                            opacity: page <= 1 ? 0.4 : 1,
                            color: isDark ? '#a3a3a3' : '#57534e',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}
                    >
                        <ChevronLeftIcon style={{ width: 14, height: 14 }} /> Sebelumnya
                    </button>
                    <span style={{ fontSize: '13px', color: isDark ? '#a3a3a3' : '#57534e' }}>
                        Halaman <strong style={{ color: '#ea580c' }}>{page}</strong> dari {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        style={{
                            background: 'transparent',
                            border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                            borderRadius: '8px',
                            padding: '6px 12px',
                            cursor: page >= totalPages ? 'default' : 'pointer',
                            opacity: page >= totalPages ? 0.4 : 1,
                            color: isDark ? '#a3a3a3' : '#57534e',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}
                    >
                        Selanjutnya <ChevronRightIcon style={{ width: 14, height: 14 }} />
                    </button>
                </div>
            )}

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