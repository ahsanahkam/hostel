import React, { useState } from 'react';
import { useDamageTracking } from '../hooks/useDamageTracking';
import Toast from '../components/Toast';
import Button from '../components/Button';
import FormField from '../components/FormField';

function DamageTracking() {
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    
    const {
        rooms,
        damageReports,
        selectedRoom,
        assetType,
        description,
        loading,
        ASSET_TYPES,
        setSelectedRoom,
        setAssetType,
        setDescription,
        handleSubmit,
        handleStatusChange,
        handleDelete,
        navigate
    } = useDamageTracking();
    
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }
    
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Toast show={toast.show} message={toast.message} type={toast.type} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>🔧 Damage Tracking</h1>
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>
            
            <div style={{ backgroundColor: '#d4edda', padding: '20px', borderRadius: '5px', border: '2px solid #28a745', marginBottom: '30px' }}>
                <h2 style={{ marginTop: 0 }}>Report New Damage</h2>
                <form onSubmit={(e) => handleSubmit(e, showToast)}>
                    <FormField
                        label="1. Select Room"
                        type="select"
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        required={true}
                        options={[
                            { value: '', label: '-- Select a Room --' },
                            ...rooms.map(room => ({
                                value: room.id,
                                label: `Room ${room.room_number} - ${room.hostel_name} (Floor ${room.floor})`
                            }))
                        ]}
                    />
                    
                    <FormField
                        label="2. Select Asset Type"
                        type="select"
                        value={assetType}
                        onChange={(e) => setAssetType(e.target.value)}
                        required={true}
                        options={ASSET_TYPES.map(type => ({
                            value: type,
                            label: type
                        }))}
                    />
                    
                    <FormField
                        label="3. Damage Description"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the damage... (e.g., Broken leg, Missing screw, Cracked surface)"
                        required={true}
                    />
                    
                    <Button type="submit" variant="success" fullWidth={true}>
                        Add Damage Report
                    </Button>
                </form>
            </div>
            
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', border: '1px solid #dee2e6' }}>
                <h2 style={{ marginTop: 0 }}>Damage Reports Summary ({damageReports.length})</h2>
                
                {damageReports.length === 0 ? (
                    <p style={{ color: '#6c757d', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
                        No damage reports yet. Add your first report above.
                    </p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Room</th>
                                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Asset Type</th>
                                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
                                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
                                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Reported On</th>
                                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {damageReports.map(report => (
                                    <tr key={report.id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                            Room {report.room_number}
                                        </td>
                                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                            {report.asset_type}
                                        </td>
                                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                            {report.description}
                                        </td>
                                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                            <span style={{
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                backgroundColor: 
                                                    report.status === 'Not Fixed' ? '#f8d7da' :
                                                    report.status === 'Fixed' ? '#d4edda' :
                                                    '#d1ecf1',
                                                color:
                                                    report.status === 'Not Fixed' ? '#721c24' :
                                                    report.status === 'Fixed' ? '#155724' :
                                                    '#0c5460',
                                                fontWeight: 'bold'
                                            }}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                            {new Date(report.reported_at).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <select
                                                    value={report.status}
                                                    onChange={(e) => handleStatusChange(report.id, e.target.value, showToast)}
                                                    style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc', flex: 1 }}
                                                >
                                                    <option value="Not Fixed">Not Fixed</option>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Replaced">Replaced</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDelete(report.id, report.room_number, report.asset_type, showToast)}
                                                    style={{
                                                        padding: '5px 12px',
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '3px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold'
                                                    }}
                                                    title="Delete this damage report"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DamageTracking;
