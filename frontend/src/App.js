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
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
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
