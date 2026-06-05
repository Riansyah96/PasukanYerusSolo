import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
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
import JobPublisher from './features/hrd/JobPublisher';
import CompanyBrandingForm from './features/dashboard/CompanyBrandingForm';
import FavoriteListContainer from './features/eksplorasi/FavoriteListContainer';
import StatusTracker from './features/applications/StatusTracker';
import ProfileContainer from './features/dashboard/ProfileContainer';
import AdminStatsView from './features/dashboard/AdminStatsView';

const JobDetailWrapper = () => {
    const { id } = useParams();
    return <JobDetail job={{ id, title: 'Lowongan Detail', company: 'PasukanYerusSolo' }} />;
};

const HomePage = () => {
    const navigate = useNavigate();
    const { theme } = React.useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    
    const styles = {
        section: {
            maxWidth: '1200px', 
            margin: '80px auto', 
            padding: '0 20px',
            position: 'relative'
        },
        headerWrapper: {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '40px', 
            flexWrap: 'wrap', 
            gap: '20px'
        },
        badge: {
            color: '#ea580c', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            marginBottom: '8px', 
            display: 'inline-block',
            background: isDark ? 'rgba(234,88,12,0.1)' : 'rgba(234,88,12,0.15)',
            padding: '4px 12px',
            borderRadius: '20px'
        },
        title: {
            fontSize: 'clamp(28px, 5vw, 42px)', 
            fontWeight: 'bold', 
            color: isDark ? '#fef3c7' : '#1c1917', 
            margin: 0,
            lineHeight: '1.2'
        },
        subtitle: {
            color: isDark ? '#a8a29e' : '#57534e', 
            fontSize: '16px', 
            marginTop: '16px',
            maxWidth: '450px',
            lineHeight: '1.5'
        },
        button: {
            padding: '14px 32px', 
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
            border: 'none', 
            color: '#fff', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: '700', 
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(234, 88, 12, 0.3)',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        footerText: {
            color: isDark ? '#78716c' : '#57534e', 
            fontSize: '14px'
        },
        link: {
            color: '#ea580c', 
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
        }
    };
    
    return (
        <>
            <Hero />
            <HowItWorks />
            <JobServices />
            
            <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                position: 'relative'
            }}>
                <div style={{
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #ea580c, #f59e0b)',
                    borderRadius: '2px',
                    margin: '0 auto'
                }} />
            </div>

            <section className="job-listings-section" style={styles.section}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={styles.headerWrapper}>
                        <div>
                            <span style={styles.badge}>
                                🔥 HOT OPPORTUNITIES
                            </span>
                            <h2 style={styles.title}>
                                🚀 Lowongan <span style={{ color: '#ea580c' }}>Terkini</span> & 
                                <br /><span style={{ color: '#ea580c' }}>Paling Banyak</span> Dilirik
                            </h2>
                            <p style={styles.subtitle}>
                                🌟 <strong style={{ color: '#ea580c' }}>6.000+</strong> lowongan tersedia • 
                                <strong style={{ color: '#ea580c' }}> 500+</strong> perusahaan terpercaya • 
                                Bergabung sekarang!
                            </p>
                        </div>
                        <button 
                            onClick={() => navigate('/eksplorasi')} 
                            style={styles.button}
                            onMouseEnter={(e) => { 
                                setIsButtonHovered(true);
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(234, 88, 12, 0.4)';
                            }}
                            onMouseLeave={(e) => { 
                                setIsButtonHovered(false);
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(234, 88, 12, 0.3)';
                            }}
                        >
                            Jelajahi Semua Lowongan 
                            <span style={{ 
                                transform: isButtonHovered ? 'translateX(5px)' : 'translateX(0)',
                                transition: 'transform 0.3s ease',
                                display: 'inline-block'
                            }}>→</span>
                        </button>
                    </div>
                    <JobListContainer variant="simple" limit={6} />
                </div>

                <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '16px 32px',
                        background: isDark ? 'rgba(18, 11, 6, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '60px',
                        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                        backdropFilter: 'blur(10px)',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <p style={styles.footerText}>
                            📊 <strong style={{ color: '#ea580c' }}>6 Lowongan Terbaru</strong> ditampilkan dari 
                            <strong style={{ color: '#ea580c' }}> 100+ Lowongan</strong> lainnya
                        </p>
                        <div style={{
                            width: '1px',
                            height: '24px',
                            background: isDark ? '#262626' : '#e5e5e5'
                        }} />
                        <span 
                            style={styles.link} 
                            onClick={() => navigate('/eksplorasi')}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            Lihat Semua Lowongan →
                        </span>
                    </div>
                </div>
            </section>
            <Testimonials />
            <CTA />
        </>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    
    // Sync state dengan localStorage setiap ada perubahan
    useEffect(() => {
        const syncAuthState = () => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            setIsAuthenticated(!!token);
            setUserRole(role);
        };
        
        window.addEventListener('storage', syncAuthState);
        return () => window.removeEventListener('storage', syncAuthState);
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserRole(null);
        window.location.href = '/';
    };

    const handleLoginSuccess = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        console.log('handleLoginSuccess - token:', !!token);
        console.log('handleLoginSuccess - role from storage:', role);
        
        setIsAuthenticated(!!token);
        setUserRole(role);
        
        // Force re-render
        window.dispatchEvent(new Event('storage'));
    };

    const EksplorasiPage = () => {
        const { theme } = React.useContext(ThemeContext);
        const isDark = theme === 'dark';
        
        return (
            <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ 
                    marginBottom: '40px',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '200px',
                        height: '200px',
                        background: `radial-gradient(circle, rgba(234,88,12,${isDark ? '0.05' : '0.08'}) 0%, transparent 70%)`,
                        borderRadius: '50%',
                        zIndex: 0
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <span style={{
                            color: '#ea580c',
                            fontSize: '14px',
                            fontWeight: '700',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            display: 'inline-block',
                            marginBottom: '16px',
                            background: isDark ? 'rgba(234,88,12,0.1)' : 'rgba(234,88,12,0.1)',
                            padding: '6px 16px',
                            borderRadius: '30px'
                        }}>
                            🔍 EKSPLORASI
                        </span>
                        <h1 style={{ 
                            fontSize: 'clamp(32px, 6vw, 48px)', 
                            marginBottom: '16px', 
                            color: isDark ? '#fef3c7' : '#1c1917',
                            fontWeight: '800',
                            letterSpacing: '-0.02em'
                        }}>
                            <span style={{ color: isDark ? '#fef3c7' : '#1c1917' }}>Semua</span>{' '}
                            <span style={{ color: '#ea580c' }}>Lowongan Kerja</span>
                        </h1>
                        <div style={{
                            width: '80px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #ea580c, #f59e0b)',
                            borderRadius: '2px',
                            margin: '0 auto 20px auto'
                        }} />
                        <p style={{ 
                            color: isDark ? '#a8a29e' : '#57534e', 
                            fontSize: 'clamp(16px, 4vw, 18px)',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            🎯 Temukan <strong style={{ color: '#ea580c' }}>ribuan peluang karir</strong> dari perusahaan-perusahaan 
                            terbaik di seluruh Indonesia • 🚀 Mulai perjalanan kariermu sekarang!
                        </p>
                    </div>
                </div>
                <JobListContainer variant="full" />
            </div>
        );
    };

    return (
        <ThemeProvider>
            <Router>
                <div style={{ minHeight: '100vh' }}>
                    <Navbar 
                        isAuthenticated={isAuthenticated} 
                        userRole={userRole} 
                        handleLogout={handleLogout}
                    />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/eksplorasi" element={<EksplorasiPage />} />
                            <Route path="/job/:id" element={<JobDetailWrapper />} />
                            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/hrd/dashboard" element={<JobPublisher appTheme="dark" isMobile={window.innerWidth < 768} />} />
                            <Route path="/hrd/branding" element={<CompanyBrandingForm />} />
                            <Route path="/favorit" element={<FavoriteListContainer />} />
                            <Route path="/status-lamaran" element={<StatusTracker appTheme="dark" isMobile={window.innerWidth < 768} />} />
                            <Route path="/profile" element={<ProfileContainer appTheme="dark" currentRole={userRole} />} />
                            <Route path="/admin/dashboard" element={<AdminStatsView />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;