/**
 * useAuth Hook (Controller Layer)
 * ================================
 * 
 * Business logic for Authentication (SignIn and SignUp)
 * Handles: state management, login, registration, navigation
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    
    // Login logic
    const handleLogin = async (username, password, showToast) => {
        setError('');
        setLoading(true);
        
        try {
            const response = await login({ username, password });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            showToast('Login successful!', 'success');
            
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Login failed. Check your username and password.';
            setError(errorMessage);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    // Registration logic
    const handleRegister = async (formData, showToast) => {
        setError('');
        setLoading(true);
        
        try {
            await register(formData);
            showToast('Registration successful! Redirecting to login...', 'success');
            
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.error || 
                           err.response?.data?.username?.[0] || 
                           'Registration failed. Please check your details.';
            setError(errorMsg);
            console.error('Registration error:', err.response?.data);
        } finally {
            setLoading(false);
        }
    };
    
    return {
        loading,
        error,
        handleLogin,
        handleRegister,
        navigate
    };
};
