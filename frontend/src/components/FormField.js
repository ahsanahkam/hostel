/**
 * FormField Component (Reusable View Layer)
 * =========================================
 * 
 * Reusable form field component for consistent input styling
 * Props:
 * - label: Field label text
 * - type: Input type (text, email, password, number, select, textarea)
 * - name: Input name attribute
 * - value: Input value
 * - onChange: Change handler function
 * - required: Whether field is required
 * - placeholder: Placeholder text
 * - options: Array of options for select type [{value: '', label: ''}]
 * - min: Minimum value for number inputs
 */

import React from 'react';

function FormField({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    required = false, 
    placeholder = '', 
    options = [],
    min
}) {
    const baseInputStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };
    
    return (
        <div style={{ marginBottom: '15px' }}>
            {label && (
                <label style={{ 
                    fontWeight: 'bold', 
                    display: 'block', 
                    marginBottom: '8px' 
                }}>
                    {label}
                    {required && <span style={{ color: 'red' }}> *</span>}
                </label>
            )}
            
            {type === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    style={baseInputStyle}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    style={{ ...baseInputStyle, minHeight: '80px' }}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    min={min}
                    style={baseInputStyle}
                />
            )}
        </div>
    );
}

export default FormField;
