import React, { useState, useMemo, useEffect } from 'react';
import JobList from '../../components/jobs/JobList';
import FilterBox from './FilterBox';
import ApplyJobForm from '../lamaran/ApplyJobForm';
import api from '../../services/api'; // <--- PASTIKAN IMPORT INI ADA

const JobListContainer = ({ variant = 'simple', limit }) => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('Semua');
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        // Mengambil data dari backend
        api.get('/jobs')
            .then(res => {
                // Backend mengirim { status: "success", data: [...] }
                // Kita ambil res.data.data agar menjadi array
                const dataArray = res.data.data || [];
                setJobs(dataArray);
            })
            .catch(err => console.error("Gagal ambil data:", err));
    }, []);

    const filteredJobs = useMemo(() => {
        let result = jobs;
        if (search) {
            result = result.filter(j => 
                j.title?.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (type !== 'Semua') {
            result = result.filter(j => j.type === type);
        }
        return limit ? result.slice(0, limit) : result;
    }, [jobs, search, type, limit]);

    return (
        <div style={{ width: '100%' }}>
            {variant === 'full' && (
                <FilterBox 
                    appTheme="dark" 
                    isMobile={window.innerWidth < 768}
                    onSearchChange={setSearch}
                    onTypeChange={setType}
                    selectedType={type}
                />
            )}

            <JobList 
                jobs={filteredJobs} 
                variant={variant} 
                onSelectJob={(job) => setSelectedJobId(job.id)} 
            />

            {selectedJobId && (
                <div style={{ marginTop: '20px' }}>
                    <ApplyJobForm 
                        jobId={selectedJobId} 
                        onFormSuccess={() => setSelectedJobId(null)} 
                    />
                </div>
            )}
        </div>
    );
};

export default JobListContainer;