import React, { useState } from 'react';
import { useAssets } from '../hooks/useAssets';
import Toast from '../components/Toast';
import Button from '../components/Button';
import FormField from '../components/FormField';

function Assets() {
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    
    const {
        assets,
        loading,
        showForm,
        editingAsset,
        formData,
        setShowForm,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCancel,
        navigate
    } = useAssets();
    
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
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Asset Management</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                    <Button variant="success" onClick={() => showForm ? handleCancel() : setShowForm(true)}>
                        {showForm ? 'Cancel' : 'Add New Asset'}
                    </Button>
                </div>
            </div>
            
            {showForm && (
                <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                    <h3>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</h3>
                    <form onSubmit={(e) => handleSubmit(e, showToast)}>
                        <FormField
                            label="Asset Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={true}
                        />
                        
                        <FormField
                            label="Asset Type"
                            type="select"
                            name="asset_type"
                            value={formData.asset_type}
                            onChange={handleChange}
                            options={[
                                { value: 'Bed', label: 'Bed' },
                                { value: 'Table', label: 'Table' },
                                { value: 'Chair', label: 'Chair' },
                                { value: 'Cupboard', label: 'Cupboard' },
                                { value: 'Fan', label: 'Fan' },
                                { value: 'Light', label: 'Light' },
                                { value: 'Other', label: 'Other' }
                            ]}
                        />
                        
                        <FormField
                            label="Total Quantity"
                            type="number"
                            name="total_quantity"
                            value={formData.total_quantity}
                            onChange={handleChange}
                            min={1}
                            required={true}
                        />
                        
                        <FormField
                            label="Condition"
                            type="select"
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            options={[
                                { value: 'Good', label: 'Good' },
                                { value: 'Damaged', label: 'Damaged' }
                            ]}
                        />
                        
                        <Button type="submit" variant="primary" fullWidth={true}>
                            {editingAsset ? 'Update Asset' : 'Create Asset'}
                        </Button>
                    </form>
                </div>
            )}
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Type</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Qty</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Condition</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map(asset => (
                        <tr key={asset.id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.asset_type}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.total_quantity}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <span style={{ 
                                    padding: '5px 10px', 
                                    borderRadius: '3px',
                                    backgroundColor: asset.condition === 'Good' ? '#d4edda' : '#f8d7da',
                                    color: asset.condition === 'Good' ? '#155724' : '#721c24'
                                }}>
                                    {asset.condition}
                                </span>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <button onClick={() => handleEdit(asset)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(asset.id, showToast)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {assets.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d' }}>
                    No assets found. Click "Add New Asset" to create one.
                </p>
            )}
        </div>
    );
}

export default Assets;
