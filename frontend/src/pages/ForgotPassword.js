import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset, verifyResetCode, resetPasswordWithCode } from '../services/api';
import Button from '../components/Button';
import Toast from '../components/Toast';

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    
    const navigate = useNavigate();
    
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };
    
    const handleRequestCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await requestPasswordReset(email);
            showToast('Reset code sent to your email!', 'success');
            setStep(2);
        } catch (err) {
            showToast(err.response?.data?.error || 'Failed to send reset code', 'error');
        } finally {
            setLoading(false);
        }
    };
    
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await verifyResetCode(email, code);
            showToast('Code verified! Enter your new password', 'success');
            setStep(3);
        } catch (err) {
            showToast(err.response?.data?.error || 'Invalid or expired code', 'error');
        } finally {
            setLoading(false);
        }
    };
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 4) {
            showToast('Password must be at least 4 characters', 'error');
            return;
        }
        
        setLoading(true);
        
        try {
            await resetPasswordWithCode(email, code, newPassword);
            showToast('Password reset successfully! Redirecting to login...', 'success');
            setTimeout(() => navigate('/signin'), 2000);
        } catch (err) {
            showToast(err.response?.data?.error || 'Failed to reset password', 'error');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <Toast show={toast.show} message={toast.message} type={toast.type} />
            
            <h2>🔒 Reset Password</h2>
            
            {step === 1 && (
                <form onSubmit={handleRequestCode}>
                    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '5px' }}>
                        <p style={{ margin: 0, color: '#0c5460' }}>
                            Enter your email address and we'll send you a 6-digit reset code.
                        </p>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email Address:</label><br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                        />
                    </div>
                    
                    <Button variant="primary" type="submit" disabled={loading} fullWidth={true}>
                        {loading ? 'Sending...' : 'Send Reset Code'}
                    </Button>
                    
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        <a href="/signin">Back to Sign In</a>
                    </p>
                </form>
            )}
            
            {step === 2 && (
                <form onSubmit={handleVerifyCode}>
                    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
                        <p style={{ margin: 0, color: '#856404' }}>
                            A 6-digit code has been sent to <strong>{email}</strong>. Enter it below.
                        </p>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Reset Code:</label><br />
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px', fontSize: '18px', letterSpacing: '3px', textAlign: 'center' }}
                        />
                    </div>
                    
                    <Button variant="primary" type="submit" disabled={loading} fullWidth={true}>
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </Button>
                    
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        <Button variant="secondary" onClick={() => setStep(1)}>
                            Change Email
                        </Button>
                    </p>
                </form>
            )}
            
            {step === 3 && (
                <form onSubmit={handleResetPassword}>
                    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
                        <p style={{ margin: 0, color: '#155724' }}>
                            Code verified! Enter your new password below.
                        </p>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>New Password:</label><br />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password (min 4 characters)"
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Confirm Password:</label><br />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                        />
                    </div>
                    
                    <Button variant="success" type="submit" disabled={loading} fullWidth={true}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            )}
        </div>
    );
}

export default ForgotPassword;
