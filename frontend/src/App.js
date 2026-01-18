/**
 * Main App Component
 * ==================
 * 
 * This is the root component that:
 * 1. Sets up routing for all pages
 * 2. Defines which URL shows which page
 * 
 * React Router handles navigation without page reload
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';
import UserManagement from './pages/UserManagement';
import DamageTracking from './pages/DamageTracking';

function App() {
    return (
        <Router>
            <Routes>
                {/* Default route - redirect to signin */}
                <Route path="/" element={<Navigate to="/signin" />} />
                
                {/* Authentication pages */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Main application pages (require login) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/damage-tracking" element={<DamageTracking />} />
            </Routes>
        </Router>
    );
}

export default App;
