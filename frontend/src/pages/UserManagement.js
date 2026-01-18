import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, listUsers, updateUser, deleteUser, resetUserPassword } from '../services/api';
import Toast from '../components/Toast';
import Button from '../components/Button';

function UserManagement() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [resetPasswordUserId, setResetPasswordUserId] = useState(null);
    const [newPassword, setNewPassword] = useState('');
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
            
            // Only Warden can access this page
            if (response.data.role !== 'Warden') {
                navigate('/dashboard');
                return;
            }
            
            fetchAllUsers();
        } catch (err) {
            console.error('Error fetching user:', err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const fetchAllUsers = async () => {
        try {
            const response = await listUsers();
            setAllUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };
    
    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUser(userId, { role: newRole });
            showToast('User role updated successfully!', 'success');
            fetchAllUsers();
        } catch (err) {
            showToast('Error updating role: ' + (err.response?.data?.error || 'Unknown error'), 'error');
        }
    };
    
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }
        
        try {
            await deleteUser(userId);
            showToast('User deleted successfully!', 'success');
            fetchAllUsers();
        } catch (err) {
            showToast('Error deleting user: ' + (err.response?.data?.error || 'Unknown error'), 'error');
        }
    };
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (!newPassword || newPassword.length < 4) {
            showToast('Password must be at least 4 characters', 'error');
            return;
        }
        
        try {
            await resetUserPassword(resetPasswordUserId, newPassword);
            showToast('Password reset successfully!', 'success');
            setResetPasswordUserId(null);
            setNewPassword('');
        } catch (err) {
            showToast('Error resetting password: ' + (err.response?.data?.error || 'Unknown error'), 'error');
        }
    };
    
    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }
    
    return (
        <div style={{ padding: '20px' }}>
            <Toast show={toast.show} message={toast.message} type={toast.type} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>👥 User Management</h1>
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>
            
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', border: '2px solid #ffc107', borderRadius: '5px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <h2 style={{ margin: 0 }}>Manage Users</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#856404' }}>Approve pending users and assign roles</p>
                </div>
                
                <h3 style={{ marginTop: '20px' }}>All Users</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', backgroundColor: '#ffffff' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map(u => (
                            <tr key={u.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.username}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.first_name} {u.last_name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.phone_number || 'N/A'}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {u.id === user?.id ? (
                                        <span style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', borderRadius: '3px' }}>
                                            {u.role}
                                        </span>
                                    ) : (
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            style={{ 
                                                width: 'auto', 
                                                padding: '5px 8px', 
                                                backgroundColor: u.role === 'Pending' ? '#6c757d' : u.role === 'Warden' ? '#dc3545' : u.role === 'Sub-Warden' ? '#ffc107' : '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <option value="Pending">Pending (No Access)</option>
                                            <option value="Warden">Warden</option>
                                            <option value="Sub-Warden">Sub-Warden</option>
                                            <option value="Inventory Staff">Inventory Staff</option>
                                        </select>
                                    )}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                                    {u.id !== user?.id ? (
                                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                            <Button 
                                                variant="warning" 
                                                onClick={() => setResetPasswordUserId(u.id)}
                                            >
                                                Reset Password
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteUser(u.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    ) : (
                                        <span style={{ fontStyle: 'italic', color: '#6c757d' }}>You</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {resetPasswordUserId && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        minWidth: '400px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Reset Password</h3>
                        <p>Enter new password for user:</p>
                        <form onSubmit={handleResetPassword}>
                            <div style={{ marginBottom: '15px' }}>
                                <label>New Password:</label><br />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password (min 4 characters)"
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                    autoFocus
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => {
                                        setResetPasswordUserId(null);
                                        setNewPassword('');
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button variant="success" type="submit">
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;
