import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageTransition from './components/PageTransition';
import Walkthrough from './features/landing/Walkthrough';
import Hero from './features/landing/Hero';
import { BoltIcon, RocketLaunchIcon, SparklesIcon, ChartBarIcon, MagnifyingGlassIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import InfoPage from './pages/InfoPage';

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
import AdminDashboard from './features/dashboard/AdminDashboard';

const JobDetailWrapper = () => {
  const { id } = useParams();
  return <JobDetail job={{ id, title: 'Lowongan Detail', company: 'PasukanYerusSolo' }} />;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const colors = {
    badge: isDark ? 'rgba(234,88,12,0.1)' : 'rgba(234,88,12,0.15)',
    textPrimary: isDark ? '#fef3c7' : '#1c1917',
    textSecondary: isDark ? '#a8a29e' : '#57534e',
    textMuted: isDark ? '#78716c' : '#a3a3a3',
    bgCard: isDark ? 'rgba(18, 11, 6, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    border: isDark ? '#262626' : '#e5e5e5'
  };

  return (
    <>
      <Hero />
      <JobServices />
      <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #ea580c, #f59e0b)', borderRadius: '2px', margin: '0 auto' }} />
      </div>
      <section className="job-listings-section" style={{
        maxWidth: '1200px',
        margin: '80px auto',
        padding: '0 20px',
        position: 'relative'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <span style={{
                color: '#ea580c',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '8px',
                display: 'inline-block',
                background: colors.badge,
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                <BoltIcon style={{ width: 14, height: 14, verticalAlign: 'middle', marginTop: '-2px' }} /> HOT OPPORTUNITIES
              </span>
              <h2 style={{
                fontSize: 'clamp(28px, 5vw, 42px)',
                fontWeight: 'bold',
                color: colors.textPrimary,
                margin: 0,
                lineHeight: '1.2'
              }}>
                <RocketLaunchIcon style={{ width: 24, height: 24, verticalAlign: 'middle', marginTop: '-4px', color: '#ea580c' }} /> Lowongan <span style={{ color: '#ea580c' }}>Terkini</span> & <br /><span style={{ color: '#ea580c' }}>Paling Banyak</span> Dilirik
              </h2>
              <p style={{
                color: colors.textSecondary,
                fontSize: '16px',
                marginTop: '16px',
                maxWidth: '450px',
                lineHeight: '1.5'
              }}>
                <SparklesIcon style={{ width: 16, height: 16, verticalAlign: 'middle', marginTop: '-3px', color: '#f59e0b' }} /> <strong style={{ color: '#ea580c' }}>6.000+</strong> lowongan tersedia • <strong style={{ color: '#ea580c' }}>500+</strong> perusahaan terpercaya • Bergabung sekarang!
              </p>
            </div>
            <button
              onClick={() => navigate('/eksplorasi')}
              style={{
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
              }}
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
              Jelajahi Semua Lowongan{' '}
              <span style={{
                transform: isButtonHovered ? 'translateX(5px)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
                display: 'inline-block'
              }}>
                →
              </span>
            </button>
          </div>
          <JobListContainer variant="simple" limit={6} />
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: '50px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '20px',
            padding: '16px 32px',
            background: colors.bgCard,
            borderRadius: '60px',
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <p style={{
              color: colors.textMuted,
              fontSize: '14px',
              margin: 0
            }}>
              <ChartBarIcon style={{ width: 16, height: 16, verticalAlign: 'middle', marginTop: '-3px', color: '#ea580c' }} /> <strong style={{ color: '#ea580c' }}>6 Lowongan Terbaru</strong> ditampilkan dari{' '}
              <strong style={{ color: '#ea580c' }}>100+ Lowongan</strong> lainnya
            </p>
            <div style={{
              width: '1px',
              height: '24px',
              background: colors.border
            }} />
            <span
              onClick={() => navigate('/eksplorasi')}
              style={{
                color: '#ea580c',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(5px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}
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
  const [showWalkthrough, setShowWalkthrough] = useState(() => {
    return !localStorage.getItem('walkthroughSeen');
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  const handleWalkthroughComplete = () => {
    localStorage.setItem('walkthroughSeen', 'true');
    setShowWalkthrough(false);
  };

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
    setIsAuthenticated(!!token);
    setUserRole(role);
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
              <MagnifyingGlassIcon style={{ width: 14, height: 14, verticalAlign: 'middle', marginTop: '-2px' }} /> EKSPLORASI
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
              <CursorArrowRaysIcon style={{ width: 18, height: 18, verticalAlign: 'middle', marginTop: '-3px', color: '#ea580c' }} /> Temukan <strong style={{ color: '#ea580c' }}>ribuan peluang karir</strong> dari perusahaan-perusahaan terbaik di seluruh Indonesia • <RocketLaunchIcon style={{ width: 18, height: 18, verticalAlign: 'middle', marginTop: '-3px', color: '#ea580c' }} /> Mulai perjalanan kariermu sekarang!
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
        <div style={{ minHeight: '100vh', position: 'relative', maxWidth: '100vw', overflowX: 'hidden' }}>
          <Navbar isAuthenticated={isAuthenticated} userRole={userRole} handleLogout={handleLogout} />
          <PageTransition>
            <main style={{ paddingBottom: window.innerWidth < 768 ? '80px' : '0' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/eksplorasi" element={<EksplorasiPage />} />
                <Route path="/job/:id" element={<JobDetailWrapper />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tentang-kami" element={<InfoPage slug="tentang-kami" />} />
                <Route path="/kebijakan-privasi" element={<InfoPage slug="kebijakan-privasi" />} />
                <Route path="/syarat-ketentuan" element={<InfoPage slug="syarat-ketentuan" />} />
                <Route path="/faq" element={<InfoPage slug="faq" />} /> <Route path="/hrd/dashboard" element={<div style={{ paddingTop: '80px' }}><JobPublisher isMobile={window.innerWidth < 768} /></div>} />
                <Route path="/hrd/branding" element={<div style={{ paddingTop: '80px' }}><CompanyBrandingForm /></div>} />
                <Route path="/favorit" element={<div style={{ paddingTop: '80px' }}><FavoriteListContainer /></div>} />
                <Route path="/status-lamaran" element={<div style={{ paddingTop: '80px' }}><StatusTracker isMobile={window.innerWidth < 768} /></div>} />
                <Route path="/profile" element={<div style={{ paddingTop: '80px' }}><ProfileContainer currentRole={userRole} /></div>} />
                <Route path="/admin/dashboard" element={<div style={{ paddingTop: '80px' }}><AdminDashboard /></div>} />
              </Routes>
            </main>
          </PageTransition>
          <Footer />
        </div>
      </Router>
      {showWalkthrough && <Walkthrough onComplete={handleWalkthroughComplete} />}
    </ThemeProvider>
  );
};

export default App;
