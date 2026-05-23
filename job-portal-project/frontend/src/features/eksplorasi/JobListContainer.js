import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import JobCard from './JobCard';
import FilterBox from './FilterBox';

const JobListContainer = () => {
    const [jobs, setJobs] = useState([]);
    const [queryParam, setQueryParam] = useState({});

    // Memicu fetch data ulang ketika queryParam berubah (Materi Pertemuan 10)
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/lowongan', { params: queryParam });
                setJobs(response.data.data);
            } catch (err) {
                console.error("Gagal memuat lowongan", err);
            }
        };
        fetchJobs();
    }, [queryParam]);

    return (
        <div>
            <h2>Eksplorasi Lowongan Pekerjaan</h2>
            <FilterBox onFilterSearch={(filters) => setQueryParam(filters)} />
            <div className="job-list">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} onDetailClick={(id) => alert('ID Lowongan: ' + id)} />
                ))}
            </div>
        </div>
    );
};

export default JobListContainer;