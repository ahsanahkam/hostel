import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Toast from '../components/Toast';
import Button from '../components/Button';
import FormField from '../components/FormField';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState({ show: false, message: '' });
    
    const { loading, error, handleLogin } = useAuth();
    
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, 1500);
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, password, showToast);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <Toast show={toast.show} message={toast.message} />
            
            <h2>Sign In - Hostel Inventory System</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            
            <form onSubmit={onSubmit}>
                <FormField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                />
                
                <FormField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />
                
                <Button type="submit" disabled={loading} variant="primary" fullWidth={true}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>
            
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
                <a href="/forgot-password" style={{ color: '#dc3545', textDecoration: 'none' }}>Forgot Password?</a>
            </p>
        </div>
    );
}

export default SignIn;
