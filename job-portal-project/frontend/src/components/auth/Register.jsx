import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        email: '',
        password: '',
        role: 'Pelamar' // Default role pendaftaran
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Pastikan key object sesuai dengan yang diminta backend (nama, bukan nama_lengkap)
        const payload = {
            nama: formData.nama_lengkap, 
            email: formData.email,
            password: formData.password,
            role: formData.role
        };

        try {
            await api.post('/auth/register', payload); // Kirim payload yang sudah disesuaikan
            alert('Pendaftaran berhasil! Silakan masuk.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Terjadi kesalahan saat pendaftaran.');
        } finally {
            setLoading(false);
        }
    };

   const styles = {
        container: { display: 'flex',justifyContent: 'center',alignItems: 'center',minHeight: '100vh',background: '#120902',padding: '1rem' },
        card: { width: '100%', maxWidth: '400px', background: 'linear-gradient(180deg, #1c0d02 0%, #2e1505 100%)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(45, 15, 0, 0.4)', color: '#fef3c7' },
        brand: { textAlign: 'center', marginBottom: '1.5rem' },
        logo: { fontSize: '1.75rem', fontWeight: '900', background: 'linear-gradient(135deg, #fb923c 0%, #facc15 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 },
        subBrand: { fontSize: '0.75rem', color: '#ea580c', letterSpacing: '0.2rem', fontWeight: '800', textTransform: 'uppercase', marginTop: '0.25rem' },
        title: { fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', textAlign: 'center', marginBottom: '1.5rem' },
        label: { fontSize: '0.75rem', fontWeight: '700', color: '#fb923c', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' },
        input: { width: '100%', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(254, 215, 170, 0.15)', backgroundColor: '#2e1d11', fontSize: '1rem', color: '#fef3c7', marginBottom: '1rem', boxSizing: 'border-box' },
        select: { width: '100%', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(254, 215, 170, 0.15)', backgroundColor: '#2e1d11', fontSize: '1rem', color: '#fef3c7', marginBottom: '1.25rem', cursor: 'pointer' },
        btn: { width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', color: '#fff', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' },
        footerText: { textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#fca5a5' },
        link: { color: '#facc15', fontWeight: '700', marginLeft: '0.25rem', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.brand}>
                    <h1 style={styles.logo}>YerusSolo</h1>
                    <div style={styles.subBrand}>Job Portal</div>
                </div>

                <h2 style={styles.title}>Buat Akun Baru</h2>

                <form onSubmit={handleRegister}>
                    <label style={styles.label}>Nama Lengkap</label>
                    <input 
                        type="text" 
                        name="nama_lengkap"
                        placeholder="Masukkan nama lengkap Anda"
                        value={formData.nama_lengkap}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Alamat Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Kata Sandi</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Buat kata sandi minimal 8 karakter"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Daftar Sebagai (Tipe Akun)</label>
                    <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        style={styles.select}
                    >
                        <option value="Pelamar" style={{background: '#2e1505'}}>Pelamar Kerja (Mencari Pekerjaan)</option>
                        <option value="Perusahaan" style={{background: '#2e1505'}}>Perusahaan / HRD Partner</option>
                    </select>

                    <button type="submit" style={styles.btn} disabled={loading}>
                        {loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Sudah punya akun? 
                    <span onClick={() => navigate('/login')} style={styles.link}>Masuk di sini</span>
                </p>
            </div>
        </div>
    );
};

export default Register;