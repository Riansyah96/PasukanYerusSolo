import React, { useState } from 'react';
import api from '../../services/api';

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({ password_lama: '', password_baru: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch('/update-password', passwords);
            alert(response.data.message);
            setPasswords({ password_lama: '', password_baru: '' });
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengubah kata sandi');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h3>Keamanan Akun (Ganti Password)</h3>
            <input type="password" placeholder="Password Lama" value={passwords.password_lama}
                   onChange={(e) => setPasswords({...passwords, password_lama: e.target.value})} required /><br/>
            <input type="password" placeholder="Password Baru" value={passwords.password_baru}
                   onChange={(e) => setPasswords({...passwords, password_baru: e.target.value})} required /><br/>
            <button type="submit">Update Password</button>
        </form>
    );
};

export default ChangePassword;