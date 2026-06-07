// src/components/Modal/Modal.jsx
import React, { useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Modal = ({ isOpen, onClose, title, message, type = 'success', onConfirm }) => {
    const { theme } = React.useContext(ThemeContext);
    const isDark = theme === 'dark';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '✅';
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success':
                return {
                    border: '#22c55e',
                    bg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                    iconBg: '#22c55e'
                };
            case 'error':
                return {
                    border: '#ef4444',
                    bg: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                    iconBg: '#ef4444'
                };
            case 'warning':
                return {
                    border: '#f59e0b',
                    bg: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
                    iconBg: '#f59e0b'
                };
            default:
                return {
                    border: '#22c55e',
                    bg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                    iconBg: '#22c55e'
                };
        }
    };

    const colors = getColors();

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease'
        },
        modal: {
            background: isDark ? '#120b06' : '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: isDark ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 25px 50px -12px rgba(0,0,0,0.25)',
            border: `1px solid ${colors.border}`,
            animation: 'scaleIn 0.3s ease',
            position: 'relative'
        },
        iconWrapper: {
            width: '70px',
            height: '70px',
            background: colors.bg,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            border: `2px solid ${colors.border}`
        },
        icon: {
            fontSize: '36px'
        },
        title: {
            fontSize: '24px',
            fontWeight: '800',
            color: isDark ? '#fef3c7' : '#1c1917',
            marginBottom: '12px',
            letterSpacing: '-0.5px'
        },
        message: {
            fontSize: '14px',
            color: isDark ? '#a3a3a3' : '#57534e',
            lineHeight: '1.6',
            marginBottom: '28px'
        },
        buttonContainer: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
        },
        confirmBtn: {
            padding: '12px 28px',
            borderRadius: '30px',
            border: 'none',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#fff',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        closeBtn: {
            padding: '12px 28px',
            borderRadius: '30px',
            border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
            background: 'transparent',
            color: isDark ? '#a3a3a3' : '#57534e',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.iconWrapper}>
                    <span style={styles.icon}>{getIcon()}</span>
                </div>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.message}>{message}</p>
                <div style={styles.buttonContainer}>
                    {onConfirm ? (
                        <>
                            <button 
                                style={styles.closeBtn} 
                                onClick={onClose}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#ea580c';
                                    e.currentTarget.style.color = '#ea580c';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                                    e.currentTarget.style.color = isDark ? '#a3a3a3' : '#57534e';
                                }}
                            >
                                Batal
                            </button>
                            <button 
                                style={styles.confirmBtn} 
                                onClick={onConfirm}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                Ya, Logout
                            </button>
                        </>
                    ) : (
                        <button 
                            style={styles.confirmBtn} 
                            onClick={onClose}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            Tutup
                        </button>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Modal;