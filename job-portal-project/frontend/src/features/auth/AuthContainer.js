import React from 'react';
import api from '../../services/api';
import AuthForm from './AuthForm';

const AuthContainer = ({ onLoginSuccess }) => {
    const handleAuthSubmit = async (formData) => {
        try {
            const endpoint = formData.nama ? '/register' : '/login';
            const response = await api.post(endpoint, formData);

            if (response.data.status === "success" && response.data.token) {
                localStorage.setItem('token', response.data.token);
                onLoginSuccess();
                alert('Otentikasi Berhasil!');
            } else {
                alert(response.data.message || 'Pendaftaran Berhasil, Silahkan Login');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Terjadi kesalahan sistem server');
        }
    };

    return <AuthForm isRegister={true} onSubmitAuth={handleAuthSubmit} />;
};

export default AuthContainer;