/**
 * Toast Component - Reusable notification
 * =======================================
 * 
 * Shows success/error messages in top-right corner
 * Auto-dismisses after specified duration
 */

import React from 'react';

function Toast({ show, message, type = 'success' }) {
    if (!show) return null;
    
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: type === 'error' ? '#dc3545' : '#28a745',
            color: 'white',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 1000,
            fontWeight: 'bold',
            animation: 'slideIn 0.3s ease-out'
        }}>
            {message}
        </div>
    );
}

export default Toast;
