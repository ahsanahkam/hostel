/**
 * Profile Page
 * ============
 * 
 * Shows personal user information and allows updating phone number
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateProfile } from '../services/api';
import Toast from '../components/Toast';
import Button from '../components/Button';

function Profile() {
    const [user, setUser] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    
    const navigate = useNavigate();
    
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };
    
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    
    const fetchCurrentUser = async () => {
        try {
            const response = await getCurrentUser();
            setUser(response.data);
            setPhoneNumber(response.data.phone_number || '');
            setFirstName(response.data.first_name || '');
            setLastName(response.data.last_name || '');
        } catch (err) {
            console.error('Error fetching user:', err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        const updateData = {
            phone_number: phoneNumber,
            first_name: firstName,
            last_name: lastName
        };
        
        try {
            await updateProfile(updateData);
            showToast('Profile updated successfully!', 'success');
            setShowUpdateForm(false); // Hide form after successful update
            fetchCurrentUser();
        } catch (err) {
            showToast('Error updating profile', 'error');
        }
    };
    
    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }
    
    return (
        <div style={{ padding: '20px' }}>
            <Toast show={toast.show} message={toast.message} type={toast.type} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>My Profile</h1>
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>
            
            {/* User Information */}
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                <h2>My Information</h2>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Name:</strong> {user?.first_name} {user?.last_name}</p>
                <p><strong>Role:</strong> {user?.role}</p>
                <p><strong>Phone Number:</strong> {user?.phone_number || 'Not set'}</p>
                
                <div style={{ marginTop: '20px' }}>
                    <Button 
                        variant="primary" 
                        onClick={() => setShowUpdateForm(!showUpdateForm)}
                    >
                        {showUpdateForm ? 'Cancel Update' : 'Update Profile'}
                    </Button>
                </div>
            </div>
            
            {/* Update Profile Form - Only show when button is clicked */}
            {showUpdateForm && (
                <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h3>Update Profile</h3>
                    <form onSubmit={handleUpdateProfile}>
                        <div style={{ marginBottom: '15px' }}>
                            <label>First Name:</label><br />
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter first name"
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Last Name:</label><br />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter last name"
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Phone Number:</label><br />
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter phone number"
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                        <Button variant="success" type="submit">
                            Save Changes
                        </Button>
                        <p style={{ marginTop: '15px', fontSize: '14px', color: '#6c757d' }}>
                            <strong>Need to change password?</strong> Contact the Warden to reset your password via <a href="/forgot-password" style={{ color: '#007bff' }}>Forgot Password</a>
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Profile;
