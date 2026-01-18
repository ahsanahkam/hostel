/**
 * Dashboard Page
 * ==============
 * 
 * What this page does:
 * 1. Shows system summary statistics
 * 2. Displays: total assets, damaged assets, total rooms, total users
 * 3. Shows navigation to other pages
 * 
 * API Used: GET /api/dashboard/summary/
 * Models Used: Asset, Room, User (counts from all tables)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardSummary, logout, getCurrentUser } from '../services/api';
import Button from '../components/Button';

function Dashboard() {
    // State for dashboard data
    const [summary, setSummary] = useState({
        total_assets: 0,
        damaged_assets: 0,
        good_assets: 0,
        total_rooms: 0,
        total_users: 0
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    
    // Fetch data when component loads
    useEffect(() => {
        fetchDashboardData();
        fetchCurrentUser();
    }, []);
    
    const fetchDashboardData = async () => {
        try {
            const response = await getDashboardSummary();
            setSummary(response.data);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            // If unauthorized, redirect to signin
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const fetchCurrentUser = async () => {
        try {
            const response = await getCurrentUser();
            setUser(response.data);
        } catch (err) {
            console.error('Error fetching user:', err);
        }
    };
    
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('user');
            navigate('/signin');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };
    
    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }
    
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Dashboard - Hostel Inventory System</h1>
                <div>
                    <span style={{ marginRight: '15px' }}>
                        Welcome, {user?.username} ({user?.role})
                    </span>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
            
            {/* Navigation Links */}
            <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => navigate('/assets')}>
                    Manage Assets
                </Button>
                <Button variant="primary" onClick={() => navigate('/rooms')}>
                    Manage Rooms
                </Button>
                <Button variant="danger" onClick={() => navigate('/damage-tracking')}>
                    🔧 Damage Tracking
                </Button>
                <Button variant="secondary" onClick={() => navigate('/profile')}>
                    My Profile
                </Button>
                {user?.role === 'Warden' && (
                    <Button variant="warning" onClick={() => navigate('/user-management')}>
                        👥 User Management
                    </Button>
                )}
            </div>
            
            {/* Summary Statistics */}
            <h2>System Summary</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <div style={{ padding: '20px', backgroundColor: '#d4edda', borderRadius: '5px', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Total Assets</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{summary.total_assets}</p>
                </div>
                
                <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '5px', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Good Assets</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{summary.good_assets}</p>
                </div>
                
                <div style={{ padding: '20px', backgroundColor: '#f8d7da', borderRadius: '5px', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Damaged Assets</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{summary.damaged_assets}</p>
                </div>
                
                <div style={{ padding: '20px', backgroundColor: '#d1ecf1', borderRadius: '5px', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Total Rooms</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{summary.total_rooms}</p>
                </div>
                
                <div style={{ padding: '20px', backgroundColor: '#e2e3e5', borderRadius: '5px', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Total Users</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{summary.total_users}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
