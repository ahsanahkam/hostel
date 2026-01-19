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
