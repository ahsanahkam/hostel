import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Toast from '../components/Toast';
import Button from '../components/Button';
import FormField from '../components/FormField';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    const [toast, setToast] = useState({ show: false, message: '' });
    
    const { loading, error, handleRegister } = useAuth();
    
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, 2000);
    };
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister(formData, showToast);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <Toast show={toast.show} message={toast.message} />
            
            <h2>Sign Up - Hostel Inventory System</h2>
            
            <div style={{ padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '5px', marginBottom: '15px' }}>
                <strong>Note:</strong> After registration, your account will be pending approval. The Warden must assign you a role before you can log in.
            </div>
            
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            
            <form onSubmit={onSubmit}>
                <FormField
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required={true}
                />
                
                <FormField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                />
                
                <FormField
                    label="First Name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                
                <FormField
                    label="Last Name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                
                <FormField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={true}
                />
                
                <Button type="submit" disabled={loading} variant="success" fullWidth={true}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </form>
            
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Already have an account? <a href="/signin">Sign In</a>
            </p>
        </div>
    );
}

export default SignUp;
