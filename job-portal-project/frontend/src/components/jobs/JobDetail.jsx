import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import ApplyJobForm from '../../features/lamaran/ApplyJobForm';
import FavoriteService from '../../features/lamaran/FavoriteService';
import { formatRupiah } from '../../utils/formatRupiah';
import { CheckCircleIcon, XCircleIcon, ClockIcon, ArrowLeftIcon, BuildingOfficeIcon, TagIcon, MapPinIcon, ArrowRightIcon, XMarkIcon, PhoneIcon, BookOpenIcon, FolderOpenIcon, CurrencyDollarIcon, ClipboardDocumentListIcon, PencilSquareIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [toast, setToast] = useState({ show: false, text: '', type: '' });
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    
    const isDark = theme === 'dark';
    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ show: false, text: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    const showToast = (text, type) => {
        setToast({ show: true, text, type });
    };

    const handleApplySuccess = (message) => {
        showToast(message || 'Lamaran berhasil dikirim!', 'success');
        setTimeout(() => {
            setShowApplyForm(false);
        }, 2000);
    };

    const handleApplyError = (message) => {
        showToast(message || 'Gagal mengirim lamaran', 'error');
    };

    const getBadgeStyle = (type) => {
        const colors = {
            'Full-time': { bg: '#16a34a', text: '#fff' },
            'Remote': { bg: '#8b5cf6', text: '#fff' },
            'Contract': { bg: '#ea580c', text: '#fff' }
        };
        return colors[type] || { bg: isDark ? '#262626' : '#e5e5e5', text: isDark ? '#d4d4d8' : '#1c1917' };
    };

    useEffect(() => {
        api.get(`/jobs/${id}`)
            .then(res => {
                setJob(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gagal memuat:", err);
                setLoading(false);
                showToast('Gagal memuat detail lowongan', 'error');
            });
    }, [id]);

    const toastStyles = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        padding: '14px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    };

    const styles = {
        container: { 
            maxWidth: '900px', 
            margin: '40px auto', 
            padding: '20px', 
            fontFamily: 'sans-serif',
            transition: 'all 0.3s ease'
        },
        center: { 
            textAlign: 'center', 
            marginTop: '50px', 
            color: isDark ? '#fef3c7' : '#1c1917',
            fontSize: '16px'
        },
        backButton: { 
            background: 'transparent', 
            border: `1px solid #ea580c`, 
            color: '#ea580c', 
            padding: '10px 20px', 
            borderRadius: '10px', 
            cursor: 'pointer', 
            marginBottom: '24px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
        },
        card: { 
            background: isDark ? '#120b06' : '#ffffff', 
            padding: 'clamp(30px, 5vw, 50px)', 
            borderRadius: '24px', 
            border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
            transition: 'all 0.3s ease',
            boxShadow: isDark ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
        },
        headerContainer: { 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '20px'
        },
        title: { 
            color: isDark ? '#fef3c7' : '#1c1917', 
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
            margin: 0,
            fontWeight: '800',
            letterSpacing: '-0.02em'
        },
        favContainer: { 
            flexShrink: 0, 
            marginTop: '5px' 
        },
        metaContainer: { 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '30px',
            flexWrap: 'wrap'
        },
        badge: { 
            background: isDark ? '#262626' : '#f5f5f4', 
            color: isDark ? '#d4d4d8' : '#1c1917', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontSize: '0.85rem',
            fontWeight: '500'
        },
        section: { 
            marginBottom: '30px' 
        },
        subTitle: { 
            color: '#ea580c', 
            fontSize: '1.1rem', 
            marginBottom: '12px',
            fontWeight: '700'
        },
        desc: { 
            color: isDark ? '#a1a1aa' : '#57534e', 
            lineHeight: '1.7',
            fontSize: '15px'
        },
        applyButton: { 
            width: '100%', 
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
            color: '#fff', 
            border: 'none', 
            padding: '14px', 
            borderRadius: '12px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
        }
    };

    if (loading) return <div style={styles.center}><ClockIcon style={{width: '1.2em', height: '1.2em', verticalAlign: 'middle', marginRight: '4px'}} /> Memuat data...</div>;
    if (!job) return <div style={styles.center}><XCircleIcon style={{width: '1.2em', height: '1.2em', verticalAlign: 'middle', color: '#ef4444', marginRight: '4px'}} /> Lowongan tidak ditemukan.</div>;

    return (
        <>
            {/* Toast Notification */}
            {toast.show && (
                <div style={{
                    ...toastStyles,
                    background: toast.type === 'success' 
                        ? (isDark ? '#065f46' : '#dcfce7')
                        : (isDark ? '#991b1b' : '#fee2e2'),
                    color: toast.type === 'success' 
                        ? (isDark ? '#86efac' : '#166534')
                        : (isDark ? '#fecaca' : '#991b1b')
                }}>
                    {toast.type === 'success' ? <CheckCircleIcon style={{width: '1.2em', height: '1.2em', verticalAlign: 'middle'}} /> : <XCircleIcon style={{width: '1.2em', height: '1.2em', verticalAlign: 'middle'}} />}
                    {toast.text}
                </div>
            )}

            <div style={styles.container}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={styles.backButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ea580c';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'translateX(-4px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#ea580c';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }}
                >
                    <ArrowLeftIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Kembali
                </button>

                <div style={styles.card}>
                    <div style={styles.headerContainer}>
                        <h1 style={styles.title}>{job.title}</h1>
                        {isAuthenticated && (
                            <div style={styles.favContainer}>
                                <FavoriteService jobId={job.id} />
                            </div>
                        )}
                    </div>

                    {/* Company Branding */}
                    <div onClick={() => setShowCompanyModal(true)} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px',
                        background: isDark ? '#1c1917' : '#f5f5f4',
                        borderRadius: '14px',
                        marginBottom: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: '1px solid transparent'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#ea580c';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
                            {job.logo && (
                                <img 
                                    src={`http://localhost:5005/uploads/${job.logo}`}
                                    alt={job.nama_perusahaan || 'Perusahaan'}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        width: '100%', height: '100%',
                                        borderRadius: '12px', objectFit: 'cover',
                                        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                                        zIndex: 1
                                    }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            )}
                            <div style={{
                                width: '52px', height: '52px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '24px', color: '#fff'
                            }}>
                                <BuildingOfficeIcon style={{width: '24px', height: '24px'}} />
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: 0, fontWeight: '700', fontSize: '16px', color: isDark ? '#fef3c7' : '#1c1917' }}>
                                {job.nama_perusahaan || 'Perusahaan'}
                            </h3>
                            {job.bidang && (
                                <p style={{ margin: '4px 0 0', fontSize: '12px', color: isDark ? '#a1a1aa' : '#735b4e' }}>
                                    <TagIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> {job.bidang}
                                </p>
                            )}
                            {job.lokasi && (
                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: isDark ? '#a1a1aa' : '#57534e' }}>
                                    <MapPinIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> {job.lokasi}
                                </p>
                            )}
                        </div>
                        <span style={{ fontSize: '12px', color: '#ea580c', fontWeight: '600', whiteSpace: 'nowrap' }}>
                            Lihat info <ArrowRightIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginLeft: '2px'}} />
                        </span>
                    </div>

                    {/* Company Info Modal */}
                    {showCompanyModal && (
                        <div onClick={() => setShowCompanyModal(false)} style={{
                            position: 'fixed', inset: 0, zIndex: 5000,
                            background: 'rgba(0,0,0,0.6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '20px', animation: 'fadeIn 0.2s ease'
                        }}>
                            <div onClick={(e) => e.stopPropagation()} style={{
                                background: isDark ? '#120b06' : '#ffffff',
                                border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                                borderRadius: '20px',
                                padding: '32px 28px',
                                maxWidth: '460px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative'
                            }}>
                                <button onClick={() => setShowCompanyModal(false)} style={{
                                    position: 'absolute', top: '16px', right: '16px',
                                    background: 'none', border: 'none',
                                    fontSize: '20px', cursor: 'pointer',
                                    color: isDark ? '#a8a29e' : '#57534e',
                                    width: '36px', height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'background 0.2s'
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? '#262626' : '#f5f5f4'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                                ><XMarkIcon style={{width: '20px', height: '20px'}} /></button>

                                {/* Header Section */}
                                <div style={{
                                    textAlign: 'center',
                                    padding: '8px 0 20px'
                                }}>
                                    <div style={{
                                        width: '88px', height: '88px',
                                        borderRadius: '20px',
                                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '38px', color: '#fff',
                                        margin: '0 auto 16px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        boxShadow: '0 8px 24px rgba(234, 88, 12, 0.25)'
                                    }}>
                                        {job.logo && (
                                            <img 
                                                src={`http://localhost:5005/uploads/${job.logo}`}
                                                alt={job.nama_perusahaan || 'Perusahaan'}
                                                style={{
                                                    position: 'absolute', inset: 0,
                                                    width: '100%', height: '100%',
                                                    objectFit: 'cover', zIndex: 1
                                                }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <BuildingOfficeIcon style={{width: '38px', height: '38px'}} />
                                    </div>
                                    <h2 style={{
                                        margin: 0, fontSize: '22px', fontWeight: '800',
                                        color: isDark ? '#fef3c7' : '#1c1917',
                                        letterSpacing: '-0.3px'
                                    }}>
                                        {job.nama_perusahaan || 'Perusahaan'}
                                    </h2>
                                </div>

                                {/* Info Grid */}
                                {(job.bidang || job.lokasi || job.no_telepon) && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        marginBottom: '24px'
                                    }}>
                                        {job.bidang && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                background: isDark ? '#1c1917' : '#f5f5f4',
                                                borderRadius: '14px'
                                            }}>
                                                <div style={{
                                                    width: '36px', height: '36px',
                                                    borderRadius: '10px',
                                                    background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '16px', flexShrink: 0
                                                }}><TagIcon style={{width: '16px', height: '16px'}} /></div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{
                                                        margin: 0, fontSize: '11px',
                                                        color: isDark ? '#a1a1aa' : '#735b4e',
                                                        fontWeight: '500', textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>Bidang</p>
                                                    <p style={{
                                                        margin: '2px 0 0', fontSize: '14px',
                                                        color: isDark ? '#f5f5f4' : '#1c1917',
                                                        fontWeight: '600'
                                                    }}>{job.bidang}</p>
                                                </div>
                                            </div>
                                        )}
                                        {job.lokasi && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                background: isDark ? '#1c1917' : '#f5f5f4',
                                                borderRadius: '14px'
                                            }}>
                                                <div style={{
                                                    width: '36px', height: '36px',
                                                    borderRadius: '10px',
                                                    background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '16px', flexShrink: 0
                                                }}><MapPinIcon style={{width: '16px', height: '16px'}} /></div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{
                                                        margin: 0, fontSize: '11px',
                                                        color: isDark ? '#a1a1aa' : '#735b4e',
                                                        fontWeight: '500', textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>Lokasi</p>
                                                    <p style={{
                                                        margin: '2px 0 0', fontSize: '14px',
                                                        color: isDark ? '#f5f5f4' : '#1c1917',
                                                        fontWeight: '600'
                                                    }}>{job.lokasi}</p>
                                                </div>
                                            </div>
                                        )}
                                        {job.no_telepon && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                background: isDark ? '#1c1917' : '#f5f5f4',
                                                borderRadius: '14px'
                                            }}>
                                                <div style={{
                                                    width: '36px', height: '36px',
                                                    borderRadius: '10px',
                                                    background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '16px', flexShrink: 0
                                                }}><PhoneIcon style={{width: '16px', height: '16px'}} /></div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{
                                                        margin: 0, fontSize: '11px',
                                                        color: isDark ? '#a1a1aa' : '#735b4e',
                                                        fontWeight: '500', textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>Telepon</p>
                                                    <p style={{
                                                        margin: '2px 0 0', fontSize: '14px',
                                                        color: isDark ? '#f5f5f4' : '#1c1917',
                                                        fontWeight: '600'
                                                    }}>{job.no_telepon}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tentang Perusahaan */}
                                {job.deskripsi_budaya && (
                                    <div style={{
                                        borderTop: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                                        paddingTop: '24px'
                                    }}>
                                        <h4 style={{
                                            margin: '0 0 12px',
                                            fontSize: '14px',
                                            fontWeight: '800',
                                            color: isDark ? '#fef3c7' : '#1c1917'
                                        }}                                        ><BookOpenIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Tentang Perusahaan</h4>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            lineHeight: '1.8',
                                            color: isDark ? '#a1a1aa' : '#57534e',
                                            whiteSpace: 'pre-line'
                                        }}>
                                            {job.deskripsi_budaya}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div style={styles.metaContainer}>
                        <span style={styles.badge}><FolderOpenIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> {job.kategori}</span>
                        <span style={{ 
                            ...getBadgeStyle(job.type), 
                            padding: '6px 14px', 
                            borderRadius: '20px', 
                            fontWeight: 'bold',
                            fontSize: '0.85rem'
                        }}>
                            {job.type || 'N/A'}
                        </span>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.subTitle}><CurrencyDollarIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Gaji</h3>
                        <p style={{ color: isDark ? '#fef3c7' : '#1c1917', fontSize: '18px', fontWeight: '600' }}>
                            {formatRupiah(job.gaji)}
                        </p>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.subTitle}><ClipboardDocumentListIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Deskripsi Pekerjaan</h3>
                        <p style={styles.desc}>{job.deskripsi}</p>
                    </div>

                    <button 
                        onClick={() => isAuthenticated ? setShowApplyForm(!showApplyForm) : navigate('/login')}
                        style={styles.applyButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(234, 88, 12, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {isAuthenticated ? (showApplyForm ? <><XMarkIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Tutup Form</> : <><PencilSquareIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Lamar Sekarang</>) : <><LockClosedIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Login untuk Melamar</>}
                    </button>

                    {showApplyForm && (
                        <div style={{ marginTop: '24px', animation: 'fadeIn 0.3s ease' }}>
                            <ApplyJobForm 
                                jobId={job.id} 
                                onFormSuccess={() => setShowApplyForm(false)}
                                onSuccess={handleApplySuccess}
                                onError={handleApplyError}
                            />
                        </div>
                    )}
                </div>

                <style>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes slideInRight {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                `}</style>
            </div>
        </>
    );
};

export default JobDetail;