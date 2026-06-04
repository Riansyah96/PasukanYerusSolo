import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Hero from './features/landing/Hero';
import HowItWorks from './features/landing/HowItWorks';
import JobServices from './features/landing/JobServices';
import Testimonials from './features/landing/Testimonials';
import CTA from './features/landing/CTA';
import JobListContainer from './features/eksplorasi/JobListContainer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import JobDetail from './components/jobs/JobDetail';

// 1. Tambahkan Wrapper ini agar tidak error 'not defined'
const JobDetailWrapper = () => {
    const { id } = useParams();
    // Di sini nanti Anda bisa fetch data berdasarkan ID
    return <JobDetail job={{ id, title: 'Lowongan Detail', company: 'PasukanYerusSolo' }} />;
};

const ViewAllButton = () => {
    const navigate = useNavigate();
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
                onClick={() => navigate('/eksplorasi')} 
                style={{ padding: '10px 24px', background: 'transparent', border: '1px solid #ea580c', color: '#ea580c', borderRadius: '8px', cursor: 'pointer' }}
            >
                Lihat Semua Lowongan
            </button>
        </div>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [activeMenu, setActiveMenu] = useState('home');

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} isAuthenticated={isAuthenticated} />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <HowItWorks />
                            <JobServices />
                            <section style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fef3c7', marginBottom: '20px' }}>
                                    Lowongan Terbaru
                                </h2>
                                <JobListContainer variant="simple" limit={4} />
                                <ViewAllButton />
                            </section>
                            <Testimonials />
                            <CTA />
                        </>
                    } />
                    <Route path="/eksplorasi" element={
                        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
                            <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#fef3c7' }}>Semua Lowongan Kerja</h1>
                            <JobListContainer variant="full" />
                        </div>
                    } />
                    {/* Rute Detail Pekerjaan */}
                    <Route path="/job/:id" element={<JobDetailWrapper />} />
                    <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;