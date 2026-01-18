/**
 * Rooms Page (View Layer)
 * ========================
 * 
 * Pure View component for room management
 * Business logic handled by useRooms hook (Controller)
 * Data access handled by api.js (Model)
 */

import React, { useState } from 'react';
import { useRooms } from '../hooks/useRooms';
import Toast from '../components/Toast';
import Button from '../components/Button';
import FormField from '../components/FormField';

function Rooms() {
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    
    // Controller layer - all business logic in custom hook
    const {
        rooms,
        loading,
        showForm,
        editingRoom,
        formData,
        setShowForm,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCancel,
        navigate
    } = useRooms();
    
    // Toast notification helper
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };
    
    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }
    
    return (
        <div style={{ padding: '20px' }}>
            <Toast show={toast.show} message={toast.message} type={toast.type} />
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Room Management</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                    <Button variant="success" onClick={() => showForm ? handleCancel() : setShowForm(true)}>
                        {showForm ? 'Cancel' : 'Add New Room'}
                    </Button>
                </div>
            </div>
            
            {/* Add/Edit Form */}
            {showForm && (
                <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                    <h3>{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>
                    <form onSubmit={(e) => handleSubmit(e, showToast)}>
                        <FormField
                            label="Room Number"
                            type="text"
                            name="room_number"
                            value={formData.room_number}
                            onChange={handleChange}
                            required={true}
                            placeholder="e.g., 101, A-205"
                        />
                        
                        <FormField
                            label="Hostel Name"
                            type="text"
                            name="hostel_name"
                            value={formData.hostel_name}
                            onChange={handleChange}
                            required={true}
                            placeholder="e.g., Block A, Boys Hostel 1"
                        />
                        
                        <FormField
                            label="Floor (Optional)"
                            type="number"
                            name="floor"
                            value={formData.floor}
                            onChange={handleChange}
                            placeholder="e.g., 1, 2, 3"
                        />
                        
                        <FormField
                            label="Student Capacity"
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            min={1}
                            required={true}
                        />
                        
                        <Button type="submit" variant="primary" fullWidth={true}>
                            {editingRoom ? 'Update Room' : 'Create Room'}
                        </Button>
                    </form>
                </div>
            )}
            
            {/* Rooms List */}
            <h2>All Rooms ({rooms.length})</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Room Number</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hostel Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Floor</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Student Capacity</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Assets Count</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{room.room_number}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{room.hostel_name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{room.floor || 'N/A'}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{room.capacity}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{room.asset_count}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <button onClick={() => handleEdit(room)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(room.id, showToast)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {rooms.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d' }}>
                    No rooms found. Click "Add New Room" to create one.
                </p>
            )}
        </div>
    );
}

export default Rooms;
