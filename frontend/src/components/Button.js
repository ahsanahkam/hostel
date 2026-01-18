/**
 * Button Component (Reusable View Layer)
 * ======================================
 * 
 * Reusable button component with consistent styling
 * Props:
 * - children: Button text or content
 * - onClick: Click handler function
 * - variant: Button style variant (primary, secondary, success, danger, warning)
 * - type: Button type (button, submit, reset)
 * - disabled: Whether button is disabled
 * - fullWidth: Whether button should take full width
 */

import React from 'react';

function Button({ 
    children, 
    onClick, 
    variant = 'primary', 
    type = 'button', 
    disabled = false,
    fullWidth = false 
}) {
    const variantStyles = {
        primary: { backgroundColor: '#007bff', color: 'white' },
        secondary: { backgroundColor: '#6c757d', color: 'white' },
        success: { backgroundColor: '#28a745', color: 'white' },
        danger: { backgroundColor: '#dc3545', color: 'white' },
        warning: { backgroundColor: '#ffc107', color: '#000' }
    };
    
    const baseStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        opacity: disabled ? 0.6 : 1,
        ...(fullWidth && { width: '100%' }),
        ...variantStyles[variant]
    };
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={baseStyle}
        >
            {children}
        </button>
    );
}

export default Button;
